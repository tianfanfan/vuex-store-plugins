# vuex-store-plugins

> Some plugins for vuex store.

## How to use

```bash
$ npm install -S vuex-store-plugins
```

## Example

1. loadingPlugins

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import { loadingPlugins } from 'vuex-store-plugins'

Vue.use(Vuex)

const storeOptions = {
  state: {},
  mutations: {},
  actions: {
    async foo() {
      const d = await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(1)
        }, 3000)
      })
    }
  }
}

const store = loadingPlugins(Vuex, storeOptions, 'loading', true)
export default store
```

## Explain
#### Wanning: action must be an async function.
* The last two parameter can be transfered,
* The third parameter initial value is 'loadingState',
* The fourth parameter initial value is false, if you need log or not.
* You will have a module named 'loading' to monitor all actions start and end.
* Like before ,the store.state.loading.foo is monitor 'foo' action count.

![github](https://github.com/tianfanfan/vuex-store-plugins/blob/master/dist/example.png?raw=true "使用案例")
<p></p>



## License

[MIT](http://opensource.org/licenses/MIT)
