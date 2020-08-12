import Vue from 'vue';
import Vuex from 'vuex';
import message from './modules/message';
import auth from './modules/auth';
import saved from './modules/saved';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
      message,
      auth,
      saved
  },
});
