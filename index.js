var runtime =
  (typeof window !== 'undefined' && regeneratorRuntime) ||
  require('regenerator-runtime');

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              return step('next', value);
            },
            function(err) {
              return step('throw', err);
            },
          );
        }
      }
      return step('next');
    });
  };
}

var errorMiddleware = function errorMiddleware(errorHandler) {
  return function(store) {
    return function(next) {
      return (function() {
        var ref = _asyncToGenerator(
          runtime.mark(function _callee(action) {
            return runtime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return next(action);

                    case 3:
                      return _context.abrupt('return', _context.sent);

                    case 6:
                      _context.prev = 6;
                      _context.t0 = _context['catch'](0);

                      errorHandler(
                        _context.t0,
                        store.getState,
                        action,
                        store.dispatch,
                      );
                      return _context.abrupt('return', _context.t0);

                    case 10:
                    case 'end':
                      return _context.stop();
                  }
                }
              },
              _callee,
              undefined,
              [[0, 6]],
            );
          }),
        );

        return function(_x) {
          return ref.apply(this, arguments);
        };
      })();
    };
  };
};

module.exports = errorMiddleware;
