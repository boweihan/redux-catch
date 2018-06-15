const errorMiddleware = errorHandler => {
  return store => {
    return next => {
      return async action => {
        try {
          return await next(action);
        } catch (err) {
          errorHandler(err, store.getState, action, store.dispatch);
          return err;
        }
      };
    };
  };
};

module.exports = errorMiddleware;
