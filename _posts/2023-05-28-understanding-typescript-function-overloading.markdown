---
layout: post
title:  "Understanding TypeScript - Function Overloading"
date:   2023-05-25
---

<p class="intro">Function overloading in TypeScript means that a single function can have multiple versions with different sets of parameters or return types. It's like having different "versions" of a function that can handle different situations. TypeScript will automatically choose the correct version of the function based on the arguments provided when calling it.</p>

Here are three examples to help understand function overloading: 

1. Addition Function

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
    return a + b;
}

const result1 = add(5, 10) // Returns 15 (number)
const result2 = add('Hello', ' World'); // Returns "Hello World" (string)
```

In this example, the `add` function is overloaded with two versions. The first version adds two numbers together, and the second version concatenates two strings. TypeScript will automatically select the correct version based on the types of the arguments you pass. 

2. Calculate Discount

```typescript
function calculateDiscount(price: number, percentage: number): number;
function calculateDiscount(price: number, discount: number): number;
function calculateDiscount(price: number, arg2: number): number {
    if (arg2 <= 1) {
        // The second argument is a discount percentage
        const discountPercentage = arg2 * 100;
        const discountAmount = price * (discountPercentage / 100);
        return price - discountAmount;
    } else {
        return price - arg2;
    }
}

const discountedPrice1 = calculateDiscount(100, 0.2); // Returns 80 (20% discount)
const discountedPrice2 = calculateDiscount(100, 15); // Returns 85 ($15 discount)
```

In this example, the 'calculateDiscount` function is overloaded to calculate the discounted price based on different discount scenarios. The first version takes the original price and a discount percentage, and the second version takes the original price and a fixed discount amount. 

The function implementation checks the value of the second argument (`arg2`). If it's less than or equal to 1, it treats it as a discount percentage and calculates the discount amount accordingly. If it's greater than 1, it treats it as a fixed discount amount and directly subtracts it from the price. 

3. Calculate Area

```typescript
function calculateArea(shape: 'circle', radius: number): number;
function calculateArea(shape: 'rectangle', length: number, width: number): number;
function calculateArea(shape: string, ...args: any[]): number {
    if (shape === 'circle') {
        const radius = args[0];
        return Math.PI * radius * radius
    } else if (shape === 'rectangle') {
        const length = args[0];
        const width = args[1];
        return length * width;
    } else {
        throw new Error('Invalid shape provided.');
    }
}
// Usage
const circleArea = calculateArea("circle", 5); // Returns the area of a circle with radius 5
const rectangleArea = calculateArea("rectangle", 4, 6); // Returns the area of a rectangle with length 4 and width 6
```

In this example, the `calculateArea` function is overloaded to calculate the area of different shapes. If the shape is 'circle', it uses the provided radius to calculate the area using the formula `π * r^2`. If the shape is "rectangle", it uses the provided length and width to calculate the area by multiplying them together. For any other shape, it throws an error indicating an invalid shape was provided.

In summary, function overloading allows us to write functions that can handle different situations without having to create separate functions with different names. It makes our code more flexible and adaptable, and TypeScript helps us choose the correct version of the function automatically based on the arguments we provide.