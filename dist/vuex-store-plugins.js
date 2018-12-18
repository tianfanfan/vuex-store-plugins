'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i]
    }
    return arr2
  } else {
    return Array.from(arr)
  }
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments)
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg)
          var value = info.value
        } catch (error) {
          reject(error)
          return
        }
        if (info.done) {
          resolve(value)
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value)
            },
            function(err) {
              step('throw', err)
            }
          )
        }
      }
      return step('next')
    })
  }
}

var storeGrasp = {
  store: null
}

var addMiddleWare = function addMiddleWare(options, loadingStateName, needShowConsole) {
  var basePathArray = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : []

  if (options.actions) {
    var newActionOptions = {}

    var _loop = function _loop(k) {
      var func = options.actions[k]
      newActionOptions[k] = (function() {
        var _ref = _asyncToGenerator(
          /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
            var basePath,
              result,
              _args = arguments
            return regeneratorRuntime.wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      basePath = [].concat(_toConsumableArray(basePathArray), [k]).join('/')

                      if (needShowConsole) {
                        console.log('%caction start: ' + basePath, 'color:#ff6700;font-weight:bold')
                      }
                      storeGrasp.store.commit(loadingStateName + '/setLoadingState', {
                        key: basePath,
                        value: 1
                      })
                      // 无论是不是异步函数，都 await 并得到返回值
                      _context.next = 5
                      return func.apply(undefined, _args)

                    case 5:
                      result = _context.sent

                      storeGrasp.store.commit(loadingStateName + '/setLoadingState', {
                        key: basePath,
                        value: -1
                      })
                      if (needShowConsole) {
                        console.log('%caction end: ' + basePath, 'color:#ff6700;font-weight:bold')
                      }
                      return _context.abrupt('return', result)

                    case 9:
                    case 'end':
                      return _context.stop()
                  }
                }
              },
              _callee,
              undefined
            )
          })
        )

        return function() {
          return _ref.apply(this, arguments)
        }
      })()
    }

    for (var k in options.actions) {
      _loop(k)
    }
    options.actions = newActionOptions
  }
  if (options.modules) {
    for (var k in options.modules) {
      addMiddleWare(
        options.modules[k],
        loadingStateName,
        needShowConsole,
        [].concat(_toConsumableArray(basePathArray), [k])
      )
    }
  }
}

var loadingPlugins = (exports.loadingPlugins = function loadingPlugins(Vuex, storeOptions) {
  var loadingStateName =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'loadingState'
  var needShowConsole = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false

  addMiddleWare(storeOptions, loadingStateName, needShowConsole)
  storeGrasp.store = new Vuex.Store(storeOptions)
  var allStoreAction = storeGrasp.store._actions
  var loadingState = {}
  for (var k in allStoreAction) {
    loadingState[k] = 0
  }
  storeGrasp.store.registerModule([loadingStateName], {
    namespaced: true,
    state: _extends({}, loadingState),
    mutations: {
      setLoadingState: function setLoadingState(state, _ref2) {
        var key = _ref2.key,
          value = _ref2.value

        state[key] = state[key] + value
        if(needShowConsole) {
          console.log('%caction count: ' + state[key], 'color:#ff6700;font-weight:bold')
        }
      }
    }
  })
  return storeGrasp.store
})
