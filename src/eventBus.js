import { reactive } from 'vue';

export const bus = reactive(new EventTarget());

export default {
  install(app) {
    app.config.globalProperties.$bus = bus;
  }
}
