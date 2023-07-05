---
layout: post
title:  "Deep Diving into Fundamental React Concepts - Part 2"
date:   2023-06-03
---

This is a continuation of Deep Diving into Fundamental React Concepts. In this blog, we're going to focus on React Hooks.

3. React Hooks

What are React Hooks?

React hooks are functions provided by React that allow you to use state and other React features in functional components. They were introducted in React 16.8 as a way to write reusable and stateful logic without the need for class components. Hooks provide a simpler and more intuitive way to manage state and perform side effects in functional components. 

Here are some reasons React moved way from class components and introduced hooks: 

* Simplicity: Hooks simplify component logic by allowing you to reuse stateful logic without the need for class components and lifecycle methods. Hooks make it easier to understand and reason about the behavior of a component. 
* Reusability: Hooks promote reusability of a logic by making it easier to extract and share stateful and side-effectual code across multiple components. This enables better code organization and reduces duplication.
* Functional approach: Hooks align with the functional programming paradigm, which emphasizes immutability and pure functions. Functional components with hooks are easier to test, reason about and maintain. 
* Better performance: Hooks enable optimizations like memoization and lazy initialization of values, which can improve the performance of components.

React also provides some rules and anti-patterns to follow when using hooks: 

* Hooks at Top Level Only: Hooks should only be called at the top level of a functional component or in custom hooks. Creating hooks dynamically inside loops or conditions can cause issues with the order of hooks and lead to unexpected behavior. Hooks should be called in a consistent and predictable manner. 
* Use Hooks in Functional Components: Hooks are meant to be used in functional components. Avoid using hooks. Avoid using hooks in regular JavaScript functions or class components. 
* Follow Naming Convetions. Hooks should always start with the word "use" to indicate that they are hooks. This convention helps with readability and understanding the purpose of a custom hook. 
* Don't skip dependencies in useEffect: When using the useEffect hook, make sure to specify all the dependencies that the effect relies on. Skipping dependencies can lead to bugs and unexpected behavior. 
* Custom Hooks for Reusable Logic: Extract reusable logic into hooks to promote code reusue and maintainability. Custom hooks provide a way to encapsulate and share stateful and side-effectual logic across multiple components.

List of React Hooks: 

1. `useState`:
    * Definition: `useState` is a hook that allows you to add state to functional components. In other words, `useState` is like having a variable that can hold and update data within a functional component. 
    * Use Case: Use `useState` when you need to stare and update state within a functional component. It is commonly used for managing form inputs, toggling UI elements, or storing component-specific data. 

```javascript
import { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}
```

2. `useEffect`:
    * Definition: `useEffect` is a hook that allows you to perform side effects, such as fetching data, subscribing to events, or manipulating the DOM, in functional components.
    * Use Case: Use `useEffect` when you need to perform actions that have side effects, such as fetching data from an API or subscribing to real-time updates. It is also used for handling component lifecycle events, such as mounting, updating, and unmounting. 

```javascript
import React, { useState, useEffect } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Fetch user data from an API using useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
```

3. `useContext`: 
    * Definition: `useContext` is a hook that allows you to access the value of a React context within a functional component.
    * Use Case: Use `useContext` when you want to access and consume values from a React context, such as theme settings, user authentication, or language preferences, within a functional component.

```javascript
import React, { createContext, useContext, useState } from 'react';

// Create an AuthContext to hold the authentication state and methods
const AuthContext = createContext();

// A component that provides authentication functionality through AuthContext
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulated login functionality
  const login = (username, password) => {
    // Perform authentication logic
    // If authentication is successful, set the user object
    const authenticatedUser = {
      username,
      // other user data...
    };
    setUser(authenticatedUser);
  };

  // Simulated logout functionality
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// A component that consumes the AuthContext for user authentication
const Login = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    // Perform form validation and get username and password
    const username = 'john';
    const password = 'password';

    // Call the login method from AuthContext
    login(username, password);
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

// A component that consumes the AuthContext to display user information
const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please login to view your profile.</p>
      )}
    </div>
  );
};

// The main component that uses the AuthProvider to wrap the application
const App = () => {
  return (
    <AuthProvider>
      <div>
        <h1>My App</h1>
        <Login />
        <UserProfile />
      </div>
    </AuthProvider>
  );
};

export default App;
```

4. `useCallback`:
    * Definition: `useCallback` is used in React to memoize a function, which means it returns a memoized version of the function that only changes if its dependencies have changed. * Use Case: `useCallback` is primarily used to optimize performance by preventing unnecessary re-renders of components that depend on the function. Essentially, it ensures that the function is only recreated if its dependencies change, saving unnecessary re-creation of the function and reducing performance overhead. 

```javascript
import { useState, useCallback } from 'react';

const Form = () => {
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = useCallback(event => {
        const { name, value } = event.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }, []);

    const handleSubmit = useCallback(event => {
        event.preventDefault()

        if(validateForm()) {
            // perform submit action
        }
    }, [formData]);

    const validateForm = useCallback(() => {
        const { name, email, password } = formData;
        // perform validation logic
        const isValid = name.trim() !== '' && email.trim() !== '' && password.trim() !== '';
        return isValid;
    }, [formData])

    return (
        <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
        </form>
    );
}

export default Form;
```

In this example, we have a form component with three input fields: name, email, password. The `handleInputChange` function is wrapped with `useCallback` to memorize it, ensuring that it doesn't get recreated unnecessarily. 

Similarly, the `handleSubmit` function is memoized with `useCallback` and it depends on the `formData` state. Whenever the `formData` changes, a new version of the `handleSubmit` function is created. This ensures that the form's submission logic is executed only when necessary. 

The `validateForm` function is also memoized with `useCallback` and it depends on the `formData` state. It performs the validation logic by checking if the name, email and password fields are not empty. By memoizing the validation function, we prevent unnecessary recalculations of the validation logic during re-renders. 

5. `useMemo`:
    * Definition: `useMemo` is a hook that allows you to memoize the result of a computation and cache it. It takes a function and an array of dependencies as arguments, and it returns the memoized value. The memoized value is only recalculate when one of the dependencies changes. 
    * Use Case: `useMemo` is useful when you have a computationally expensive operation that you want to avoid repeating unnecessarily. Essentially, it helps you remember the result of a complex calculation so that you don't have to recalculate it every time your component renders. 

```javascript
import { useState, useMemo } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('');

    const fetchProducts = () => {
        // make an api call to fetch the products from the server...
        return [
            { id: 1, name: 'iPhone', category: 'Electronics', price: 999 },
            { id: 2, name: 'AirPods', category: 'Electronics', price: 199 },
            { id: 3, name: 'Shoes', category: 'Fashion', price: 79 },
            { id: 4, name: 'Backpack', category: 'Fashion', price: 49 },
        ];
    }

    // fetch the products and memoize the result
    const memoizedProducts = useMemo(() => fetchProducts(), []);

    // apply the filter to the products
    const filteredProducts = useMemo(() => {
        return memoizedProducts.filter(
            (product) => product.category.toLowerCase() === filter.toLowerCase()
        );
    }, [filter, memoizedProducts]);

    const handleFilterChange = event => {
        const { value } = event.target;
        setFilter(value);
    }

    return (
        <div>
        <label htmlFor="filter">Filter by category:</label>
        <input
            type="text"
            id="filter"
            value={filter}
            onChange={handleFilterChange}
        />

        <h2>Filtered Products:</h2>
        <ul>
            {filteredProducts.map((product) => (
            <li key={product.id}>
                {product.name} - ${product.price}
            </li>
            ))}
        </ul>
    </div>
  );
}

export default ProductList;
```

In this example, we have a `ProductList` component that displays a list of products fetched from an API. The component includes a filter input where use can enter a category to filter the products. 

The `fetchProducts` function simulates an API call to retrieve the products. We use `useMemo` to memoize the result of `fetchProducts` so that it is only called once during the initial render.

The `filteredProducts` variable is also memoized using `useMemo`. It applies the filter to the `memoizedProducts` based on the `filter` state. Whenever the `filter` or `memoizedProducts` changes, the filtering logic is re-executed. However, if neither of these dependencies changes, the filtered products are reused from the previous render. 

6. `useRef`:
    * Definition: `useRef` hook provides a way to create a mutable value that persists across renders of a functional component. It allows you to create a reference to a DOM element or any other value and access it consistently throughout the component's lifecycle. 
    * Use Case: `useRef` is used to store a value that won't trigger a re-render when it changes. It's useful when you need to keep track of a value or interact with a DOM element directly. 

```javascript
import { useRef } from 'react';

const InputForm = () => {
    const inputRef = useRef(null);

    const handleSubmit = event => {
        event.preventDefault();
        // access the inpute value using the ref
        console.log(inputRef.current.value);
        // perform submit action
    };

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={inputRef} />
        <button type="submit">Submit</button>
        </form>
  );
}

export default InputForm;
```

In this example, we have an `InputForm` component that renders a form with an input field and a submit button. The `inputRef` is created using `useRef` and assigned to the `ref` prop of the input element. 

When the form is submitted, the `handleSubmit` function is called. By accessing `inputRef.current.value`, we can retrieve the current value of the input field without needing to rely on a state or trigger a re-render. 

The `useRef` hook is handy when you need to access or modify a value without causing a re-render. It's commony used for accessing DOM elements, managing focus, storing previous values, or interacting with third-party libraries that require direct access to an element. 

Keep in mind, if you need to update a value that affects the component's rendering, we would use `useState` or `useReducer` instead.

7. `useReducer`: 
    * Definition: `useReducer` provides a way to manage state in a component using a reducer function. It is an alternative to the `useState` hook when we have more complex state logic that involves multiple values or requires actions to be dispatched. 
    * Use Case: `useReducer` allows us to manage state in a component by specifying how state updates should be handled based on different actions.

```javascript
import { useReducer } from 'react';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

const ShoppingCart = () => {
  const initialState = { cartItems: [] };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const handleAddToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const handleClearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {state.cartItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={handleClearCart}>Clear Cart</button>
      <button onClick={() => handleAddToCart({ id: 1, name: 'Product 1', price: 10 })}>Add Product 1</button>
      <button onClick={() => handleAddToCart({ id: 2, name: 'Product 2', price: 20 })}>Add Product 2</button>
    </div>
  );
};

export default ShoppingCart;
```

In this example, we have a `ShoppingCart` component that uses `useReducer` to manage the state of a shopping cart. The `cartReducer` function handles the state updates based on different actions. 

When the user clicks the `Add Product` buttons, the corresponding product is added to the cart by dispatching the `ADD_TO_CART` action with the product data. 

The component renders the cart items with their names and prices, along with buttons to remove items and clear the cart. 

The reducer function determines how the cart state should be modified based on the dispatched actions, allowing for a more structured and scalable approach to handling the state of the shopping cart. 

There are other React hooks on the documentation but these are the ones that I find myself using more often than others. 

In conclusion, understanding the core principles of React is essential for developers looking to leverage its power in building modern web applications. Through this blog post, we have delved into important concepts such as the Virtual DOM, React state, and React hooks. We have seen how the Virtual DOM enables efficient rendering, allowing for optimized performance and seamless updates. React state has provided us with a means to manage and manipulate data within components, enabling dynamic and interactive user interfaces. Additionally, React hooks have revolutionized the way we write functional components, offering a more concise and reusable approach to state management and side effects. By grasping these concepts and adhering to React's best practices and rules, developers can create scalable, maintainable, and high-performing applications. So, let's continue exploring the possibilities of React, embracing its principles, and pushing the boundaries of web development. Happy coding!