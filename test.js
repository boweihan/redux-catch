const middleware = require('./index');
const assert = require('assert');

const store = {
  getState: () => 'state',
  dispatch: () => 'dispatch',
};

describe('ErrorMiddleware', () => {
  describe('success', () => {
    it('should pass the action through successfully', async () => {
      const next = action => action;
      const action = {
        type: 'FAKE_ACTION',
      };
      const errorHandler = (error, getState, action, dispatch) => {};
      const result = await middleware(errorHandler)(store)(next)(action);
      assert.deepEqual(result, { type: 'FAKE_ACTION' });
    });
  });
  describe('catch synchronous error', () => {
    it('should catch error from a synchronous dispatch', async () => {
      // SYNC ERROR
      const next = action => {
        throw new Error('error');
      };
      const action = {
        type: 'FAKE_ACTION',
      };
      const errorHandler = (error, getState, action, dispatch) => {
        assert.equal(error.message, 'error');
        assert.equal(getState(), 'state');
        assert.deepEqual(action, {
          type: 'FAKE_ACTION',
        });
        assert.equal(dispatch(), 'dispatch');
      };
      const result = await middleware(errorHandler)(store)(next)(action);
    });
  });
  describe('catch asynchronous error', () => {
    it('should catch error from an asynchronous dispatch', async () => {
      // ASYNC ERROR
      const next = async action => {
        throw new Error('error');
      };
      const action = {
        type: 'FAKE_ACTION',
      };
      const errorHandler = (error, getState, action, dispatch) => {
        assert.equal(error.message, 'error');
        assert.equal(getState(), 'state');
        assert.deepEqual(action, {
          type: 'FAKE_ACTION',
        });
        assert.equal(dispatch(), 'dispatch');
      };
      const result = await middleware(errorHandler)(store)(next)(action);
    });
  });
});
