import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'
import './assets/css/global.less'
import utils from "./common/utils";

/*//先引入loading组件
import LoadingComponent from './components/common/loading/Loading'

const Loading = {}
Loading.install = function (Vue) {
// 生成一个Vue的子类 同时这个子类也就是组件
  const LoadingConstructor = Vue.extend(LoadingComponent)
// 生成一个该子类的实例
  const instance = new LoadingConstructor()
// 将这个实例挂载在我创建的div上
// 并将此div加入全局挂载点内部
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)
//注入vue的原型链
  Vue.prototype.$loading = {
    show() {
      instance.show = true
    },
    close() {
      instance.show = false
    }
  }
}
export default Loading*/
Vue.prototype.resetSetItem = function (key, newVal) {
  //这个key就是我们要监听的那个key
  if (key === 'audioUrl') {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        //这里可以灵活更改local和session
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, newVal);
  }
}

Vue.use(less)
Vue.prototype.utils = utils
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

