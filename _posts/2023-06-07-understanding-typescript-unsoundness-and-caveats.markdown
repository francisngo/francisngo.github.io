---
layout: post
title:  "Understanding TypeScript - Unsoundness and Caveats"
date:   2023-06-07
---

<p class="intro">The goal of TypeScript, a static type system for JavaScript is to detect and prevent mistakes. But many statically typed languages have holes in their type safety: they'll allow some code that definitely isn't correct when looked closely. TypeScript is one such language.</p>

The technical term for this is "soundness", a term that comes from mathematics. A sound type system only accepts programs with correct types. If a type system accepts some programs that viole their stated types then it is consiered "unsound". 

Let's examine a TypeScript example to see an example of unsoundness. We'll build up to the unsound operation in a few steps, starting with a simple array of strings: 

```typescript
let animals: string[] = ['Giraffes', 'Lion', 'Elephant'];
```

We can assign our array to a new variable of type `(string | number)[]`. If an array contains only strings, then it seems okay to treat it as an array of `string | number`. This particular array of `string | number` just happens to have no numbers in it right now. 

```typescript
let unsoundAnimals: (string | number)[] = animals;
```

Our array variables have different types, but the underlying array is the same. What happens if we `push` a number on the the second array of type `(string | number)[]`? It seems like that shouldn't be allowed, because the number will also show up in the first array variable of type `string[]`. However, TypeScript allows this, violating the `animals` variable's `string[]` type! 

```typescript
let animals: string[] = ['Giraffes', 'Lion', 'Elephant']
let unsoundAnimals: (string | number)[] = animals;

unsoundAnimals.push(4);
console.log(animals) // ['Giraffes', 'Lion', 'Elephant', 4]
```

This is bad and unfortunately there's no way to fix it. All code in this course runs with TypeScript's strict mode enabled, but this is still allowed even in strict mode. 

Another example of unsoundness is when we index beyond the end of an array, we get `undefined` out. This is true even if the type of the array is `string[]`

```typescript
let animals: string[] = ['Giraffes', 'Lion', 'Elephant']
let animal: string = animals[3];
console.log(animal) // undefined
```

TypeScript has allowed us to violate the static types. It allows `animals` to type check as a `string` but `undefined` is definitely not a string. 

We might be wondering why add all of this static type stuff and the additional tols required and the complexity to learn a system, if TypeScript still allows incorrect code in some cases? The answer is that TypeSCript has made an intentional trade-off, like other popular statically typed languages. 

TypeScript was designed to work with existing web technologies. That includes all the quirky JavaScript code that exists in the wild. TypeScripe can successfully express the types of strange JavaScript code that wasn't design with static type systems in mind...but at what cost? One cost is that TypeScript's type system can't be designed for perfect soundness. 

There are many sound programming languages that compete with TypeScript. Yet TypeScript is the one that's most compatible with the existing ecosystem, so it became the most popular. 

Some other caveats with unsoundness in TypeScript

* Using a string index to access an array:

```typescript
let fruits: string[] = ['apple', 'banana', 'orange'];
let fruit: string = fruits['two']; // No compile time error but result will be undefined
console.log(fruit); // undefined
```

* Using the special type `any`: 

```typescript
const dbType: any = 'postgres';
const b: boolean = dbType;
console.log(b); //'postgres'
```

Bad news is TypeScript's soundness holes can cause real problems in real applications but the good news is that those problems are relatively infrequent. For every soundness-related bug that sneaks through, TypeScript will probably save us from hundres of "cannot read property of undefined" errors. 