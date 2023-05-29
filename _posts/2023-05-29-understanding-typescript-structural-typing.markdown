---
layout: post
title:  "Understanding TypeScript - Structural Typing"
date:   2023-05-29
---

<p class="intro">Structural Typing is a concept in TypeScript where the type or behavior of an object is determined by its structure and the operations that can be performed on it, rather than its explicity type declaration. It focuses on the "shape" of an object rather than its specific type.</p>

In programming, structural typing is also known as "duck typing". TypeScript uses duck typing to determine of an object is compatible with a given type based on its structure and the presence of certain properties or methods, rather than relying on explicity type annotations. 

here are three examples to help understand "duck typing" in TypeScript: 

1. Duck Typing with Interfaces

```typescript
interface Quackable {
    quack(): void
}

class Duck implements Quackable {
    quack(): void {
        console.log('Quack!');
    }
}

class Human {
    shout(): void {
        console.log('Hello world!');
    }
}

function makeSound(duck: Quackable): void {
    duck.quack();
}

const realDuck = new Duck();
const humanDuck = new Human();

makeSound(realDuck); // Output: Quack!
makeSound(humanDuck); // Output: Error: Property 'quack' is missing in type 'Human'
```

In this example, we define an interface `Quackable` with a single method `quack()`. The `Duck` class implements this interface and has a `quack()` method. We also have a `Human` class with a `shout()` method but does not implement the `Quackable` interface. When we try to pass a `Duck` and `Human` object to the `makeSound()` function, the duck typing system of TypeScript checks if the object has a `quack()` method, and the `Human` object fails the check.

2. Duck Typing with Objects

```typescript

function printName({name}: { name: string }): void {
    console.log(name);
}

const person = { name: 'Alice', age: 30 };
const car = { make: 'Toyota', model: 'Camry' };

printName(person);  // Output: Alice
printName(car);     // Output: Error: Property 'name' is missing in type '{ make: string; model: string; }'
```

In this example, we have a `printName()` function that takes an object with a `name` property. We can pass an object with the required property, like `person`, and it will be printed correctly. However, when we pass an object like `car` that doesn't have a `name` property, it fails the duck typing check.

3. Duck Typing with Functions

```typescript
type MathOperation = (a: number, b: number) => number;

function performOperation(operation: MathOperation, a: number, b: number): number {
    return operation(a, b);
}

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

const result1 = performOperation(add, 3, 4);       // Output: 7
const result2 = performOperation(multiply, 2, 5);  // Output: 10
```

In this example, we define a `MathOperation` type, which represents a function that takes two numbers and returns a number. We have two functions, `add` and `multiply`, that match this type. The `performOperation()` function takes an operation and two numbres, and it performs the given operation on the numbers. The duck type system ensures that the passed operation matches the expected function signature. 

For comparison, here is the last example, "Duck Typing with Functions" using "explicit type declarations" instead of "duck typing". 

```typescript

type MathOperation = (a: number, b: number) => number;

function performOperation(operation: MathOperation, a: number, b: number): number {
    return operation(a, b);
}

function add(a: number, b: number): number {
    return a + b;
}

function multiply(a: number, b: number): number {
    return a * b;
}

const result1 = performOperation(add, 3, 4);       // Output: 7
const result2 = performOperation(multiply, 2, 5);  // Output: 10
```
In this example, we explicitly declare the `MathOperation` type as a function that takes two numbers and returns a number. The `add` and `multiply` functions have explicit type declarations matching the `MathOperation` type. The `performOperation` function also has explicit type declaratons for the parameters and return type.

By using explicit type declarations, we explicitly state the types of the functions and ensure that they match the expected function signature. This approach provides static type checking and helps catch any type-related errors during the compilation phase.

In summary, duck typing in TypeScript allows us to focus on the shape or structure of objects rather than their explicit types. It enables us to write more flexible and reusable code by checking if objects have the required properties or methods instead of relying on specific type declarations. 