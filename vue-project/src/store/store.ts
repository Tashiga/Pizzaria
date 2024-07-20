import { createStore } from 'vuex';
import { ProfilUser } from '@/model/profilUser';
import {type Ref} from 'vue';


export default createStore({

  state: {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    // language : JSON.parse(localStorage.getItem('language') || 'FR')
    language: localStorage.getItem('language') || 'FR'
  },
  mutations: {
    SET_USER(state: any, user: ProfilUser) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    SET_LANGUAGE(state: any, language: String){
      state.language = language;
      localStorage.setItem('language', JSON.stringify(language));
    }
  },
  actions: {
    loginUser({ commit }: any, user: ProfilUser) {
      console.log("loginUser...", user);
      commit('SET_USER', user);//sauvegarde dans le store
      localStorage.setItem('user', JSON.stringify(user)); //sauvegarde dans localStorage
    },
    logoutUser({ commit }: any) {
      commit('SET_USER', null);
      localStorage.removeItem('user');
    },
    translate({ commit }: any, language: String) {
      commit('SET_LANGUAGE', language);
      localStorage.setItem('language', JSON.stringify(language));
    }
  },
  getters: {
    getUser(state: any) {
      console.log("getUser...", state);
      return state.user;
    },
    isLoggedIn(state: any) {
      return state.user !== null;
    },
    isAdmin(state: any) {
      return state.user.adresseMail !== undefined;
    },
    getLanguage(state:any) : Ref<"FR" | "EN">{
      console.log("language : ",state.language);
      return state.language;
    }
  },
});