---
layout: post
title:  "Understanding TypeScript - Generics"
date:   2023-05-25
---

<p class="intro">Generic functions in TypeScript are functions that can work with different types of data. They allow the ability to write reusable code that can handle multiple data types without sacrificing type safety.</p>

Here are three examples that demonstrate the usage of generic functions: 

1. Identity Function:
```typescript
function identity<T>(arg: T): T{
    return arg;
}

// usage
const result1 = identity<number>(5) // Returns 5 (type: number)
const result2 = identify<string>('Hello') // Returns "Hello" (type: string)
```

In this example, the `identity` function takes an argument of type `T` and returns the same value of type `T`. The generic type `T` is determined based on the type of the argument provided during the function call.

2. Array Reversal: 
```typescript
function reverseArray<T>(array: T[]): T[] {
    return array.reverse();
}

// usage
const numbers = [1, 2, 3, 4, 5];
const reversedNumbers = reverseArray(numbers); // Returns [5, 4, 3, 2, 1]

const names = ['John', 'Jane', 'Alice'];
const reversedNames = reverseArray(names); // Returns ['Alice', 'Jane', 'John']
```

In this example, the `reverseArray` function takes an array of type `T` and returns a new array with the elements reversed. The generic type `T` allows the function to work with arrays of different data types.

3. Pairing Values:
```typescript
function pairValues<T, U>(value1: T, value2: U): [T, U] {
    return [value1, value2];
}

const pair1 = pairValues<number, string>(10, 'Hello'); // Returns [10, 'Hello'] (type: [number, string])
const pair1 = pairValues<boolean, number>(true, 42); // Returns [true, 42] (type: [boolean, number])
```

In this example, the `pairValues` function takes two values of different types `T` and `U` and returns them as a tuple. The generic types `T` and `U` allow the function to handle different combinations of value types. 

In summary, generic functions in TypeScript provide a way to write flexible and resuable code that can work with different types of data. They allow us to create functions that are adaptable and maintain type safety, making our code more versatile and efficient. 
