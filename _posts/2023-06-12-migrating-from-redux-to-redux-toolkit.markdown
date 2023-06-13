---
layout: post
title:  "How Migrating from Vanilla Redux to Redux Toolkit Improved State Management"
date:   2023-06-07
---

<p class="intro">In the world of React development, state management is a crucial aspect of building scalable applications. As projects grow in complexity, managing applications state efficently becomes paramount. Redux, a predictable state container of JavaScript applications, emerged as a popular choice but developers often faced challenges due to its verbosity and boilerplate. To address these concerns, the creators of Redux introduced Redux Toolkit, a comprehensive utility kit design to streamline Redux usage.</p>

Redux Toolkit encapsulates best practices, simplifies common tasks, and offers powerful features out-of-the-box By migrating from Redux to Redux Toolkit, developers can enjoy benefits such as reduced boilerplate code and more concise syntax. The "configureStore" function simplifies store setup integrating essential middleware like Redux Thunk. With the "createSlice" funciton, defining reducers and actions becomes effortless, leading to faster development cycles and fewer bugs. 

In this blog series, we will explore the migration process from Redux to Redux Toolkit. We will unlock the full potential of modern state management, boost productivity, and embrace the streamlines experience offered by Redux Toolkit. 

#### Why Did I choose Redux Toolkit? 

I chose Redux Toolkit over Vanilla Redux because if there was a bug, I would need to wade through all the different action creators and types until I could figure out what was actually causing the problem. 

Since Redux logic was really complex, I didn't want to rewrite everything from scratch. I wanted a solution that would allow for reusing some of the code. In Redux Toolkit, you can maintain the same unidirectional flow and tooling as Vanilla Redux but get the benefit of a more terse and easier to read syntax. 

The migration strategy was to migrate to mose of the Redux Toolkit features such as `createSlice` to have the actions and reducers created. Because of reused logic, the advantage is a quick turnaround time, least risk of destablization and greatly increased readability of state management code. 

In the majority of the places we moved from the Vanilla immutable syntax to the easier to read mutable syntax provided by Redux Toolkit. If you haven't seen Vanilla syntax before, here's a simple example where we create a reducer to fetch categories in the Redux State. The `fetchCategoriesPending`, `fetchCategoriesFulfilled`, and `fetchCategoriesRejected` dispatch an action to the reducer under the switch statement.

```typescript
export const client = new ApolloClient({
	uri: `http://localhost:3000/graphql`,
	cache: new InMemoryCache(),
});

// Actions
const FETCH_CATEGORIES_PENDING = 'categories/fetchCategories/pending';
const FETCH_CATEGORIES_FULFILLED = 'categories/fetchCategories/fulfilled';
const FETCH_CATEGORIES_REJECTED = 'categories/fetchCategories/rejected';
const SET_IS_SEARCH_OPEN = 'categories/setIsSearchOpen';

// Action creators
const fetchCategoriesPending = () => ({ 
    type: FETCH_CATEGORIES_PENDING 
});

const fetchCategoriesFulfilled = (categories) => ({ 
    type: FETCH_CATEGORIES_FULFILLED, 
    payload: categories 
});

const fetchCategoriesRejected = (error) => ({ 
    type: FETCH_CATEGORIES_REJECTED, 
    payload: error 
});

const setIsSearchOpen = (isOpen) => ({ 
    type: SET_IS_SEARCH_OPEN, 
    payload: isOpen 
});

export const CATEGORIES_INITIAL_STATE = {
    isSearchOpen: false
    isLoading: false,
    error: null,
    categoriesMap: {},
};

const CATEGORIES = gql`
	query Query {
		categories {
			title
			items {
				id
				name
				imageUrl
				altImg
				price
				priceId
			}
		}
	}
`;

// Redux Thunk async action
const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesPending());
  try {
    const { data } = await client.query({ query: CATEGORIES });
    dispatch(fetchCategoriesFulfilled(data.categories));
  } catch (error) {
    dispatch(fetchCategoriesRejected(error.message || 'Failed to fetch categories'));
  }
};

const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_IS_SEARCH_OPEN:
      return { ...state, isSearchOpen: action.payload };
    case FETCH_CATEGORIES_PENDING:
      return { ...state, loading: true, error: null };
    case FETCH_CATEGORIES_FULFILLED:
      const categoriesMap = action.payload.reduce(
        (acc, category) => {
          const { title, items } = category;
          acc[title.toLowerCase()] = items;
          return acc;
        },
        {}
      );
      return { ...state, loading: false, categoriesMap };
    case FETCH_CATEGORIES_REJECTED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
```

Here is the equivalent Redux Toolkit with `createSlice`: 

```typescript
export const client = new ApolloClient({
	uri: `http://localhost:3000/graphql`,
	cache: new InMemoryCache(),
});

export const CATEGORIES_INITIAL_STATE = {
    isSearchOpen: false
    isLoading: false,
    error: null,
    categoriesMap: {},
};

const CATEGORIES = gql`
	query Query {
		categories {
			title
			items {
				id
				name
				imageUrl
				altImg
				price
				priceId
			}
		}
	}
`;

export const fetchCategories = createAsyncThunk(
	'categories/fetchCategories',
	async () => {
		const { data } = await client.query({
            query: CATEGORIES,
          });
          return data.categories;
	}
);
```

In this example, the fetchCategories in Redux Toolkit is not only easier to read, but it's almost more compact because the slice generates action creators for us. We transitioned to the mutable syntax in the majority of places in the app without any issue. 

`createAsyncThunk` is used to create a asynchronous thunk action creator for fetching categories. It simplifies the process of async actions that involve multiple action types (such as pending, fulfilled, and rejected). 

The first argument to `createAsyncThunk` is a string that represents the type prefix for the action types that will be dispatched during async operation. In this case it's `categories/fetchCategories`. The second argument is an async callback function that performs the actual async operation. In this case, it queries a GraphQL server using `client.query` from an Apollo Client. It awaits the response and returns `data.categories`. When `fetchCategories` thunk action creator is dispatched, it automatically dispatches the corresponding pending action, `categories/fetchCategories/pending`. If the async operation is successful, it dispatches the fulfilled action, `categories/fetchCategories/fulfilled`, with the resolved value. If the async operation fails or throws an error, it dispatches the rejected action, `categories/fetchCategories/rejected`, with the error payload. 

The difference between Redux Toolkit's `createAsyncThunk` and Vanilla Redux's is that it abstracts away the complexity of handling the different action trypes and their corresponding reducers. It provides a standardized way to handle async operations and simplifies the code by generating the action types and action creators for you. 

```typescript
const categoriesSlice = createSlice({
    name: 'categories',
    initialState: CATEGORIES_INITIAL_STATE,
    reducers: {
        setIsSearchOpen: (state, action) => {
            state.isSearchOpen = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error =null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categoriesMap = action.payload.reduce(
                    (
                        acc: { [key: string]: CategoryItem[] },
                        category: Category
                    ) => {
                        const { title, items } = category;
                        acc[title.toLowerCase()] = items;
                        return acc;
                    },
                    {}
                );
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch categories';
            });
    }
});
```

`createSlice` is used to define a slice of the Redux store that manages the `categories` state. It helps simplify the process of defining a reducer and generating corresponding action creators. The argument passed to `createSlice` is an object that contains the key configuration for the slice. The `reducers` object contains the `setIsSearchOpen` reducer function, which updates the `isSearchOpen` property of the state based on the payload of the action (toggles search bar). 

The `extraReducers` property is a function that accepts a `builder` object. It allows you to handle additional actions that are not defined in `reducers`. In this case, it handles asynchronous actions (`fetchCategories.pending`, `fetchCategories.fulfilled`, `fetchCategories.rejected`). The `builder` object providers methods like `addCase` to define how the state should be updated when the corresponding action is dispatched. 

The key difference between `createSlice` and a reducer function in Vanilla Redux is that it automatically generates action types and action creators based on the provided configuration. It also allows you to define reducers as simple functions without worrying about immutability or object spread. 

In Vanilla Redux, we would typically write a separate reducer function that handles different action types and updates the state accordingly. We would manually define action types and action creators, as well as handle immutability and object spread operations ourselves. 

#### Conclusion

In conclusion, migrating from Vanilla Redux to Redux Toolkit offers several benefits for React developers. By adopting Redux Toolkit, developers can experience a significant reduction in boilerplate code and enjoy a more concise syntax. The "configureStore" function simplifies store setup by integrating essential middleware like Redux Thunk, while the "createSlice" function eliminates the need for manual action type and action creator definitions, making the process of defining reducers and actions effortless.

Through this migration, I gain increased productivity and maintainability in my codebase. The streamlined experience provided by Redux Toolkit allows for faster development cycles and fewer bugs. The transition to Redux Toolkit also offers improved readability, as the mutable syntax and generated action creators make the code more accessible.

Overall, the migration from Vanilla Redux to Redux Toolkit empowers developers to unlock the full potential of modern state management. By embracing Redux Toolkit's features and best practices, developers can boost their productivity, enhance code maintainability, and create scalable React applications more efficiently.