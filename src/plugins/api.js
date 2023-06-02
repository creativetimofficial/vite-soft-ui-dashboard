import {base} from '@/apis/ApiService';

export default {
  install: (app) => {
    app.config.globalProperties.$api = base;
  }
};
