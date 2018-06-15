# redux-catch-async

<img src='./catcher.png' width=200 />

Error catcher middleware for Redux reducers and synchronous or asynchronous middlewares. This snippet was inspired and adapted from [redux-catch](https://github.com/PlatziDev/redux-catch).

## Usage

### Apply redux-catch-async as your first middleware

```javascript
import { createStore, applyMiddleware } from 'redux';

import reduxCatchAsync from 'redux-catch-async';

import reducer from './reducer';

function errorHandler(error, getState, lastAction, dispatch) {
  // error - the error object thrown from reducers or middleware
  // getState - function for returning the state of the redux store
  // lastAction - action that resulted in a caught error
  // dispatch - function for dispatching actions if needed
}

// Ensure that reduxCatchAsync is always applied as the first middleware
// so that it can catch middleware errors.
const store = createStore(
  reducer,
  applyMiddleware(reduxCatchAsync(errorHandler)),
);
```

### Tips

* The ErrorHandler function is a great place to set up sentry logging / error analytics.
* Remember to log getState / lastAction as they are great for debugging.
* You have the freedom to do a bit of application state coupling here, for use-cases such as displaying a global error (for example).
* Changing the position from which you apply reduxCatchAsync opens the possibility of selectively catching errors from some of your other middleware.
