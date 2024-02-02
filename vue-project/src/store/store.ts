import { createStore } from 'vuex';
import { ProfilUser } from '@/model/profilUser';

// interface User {
//   name: string;
//   age: number;
//   // ... autres propriétés d'utilisateur
// }

export default createStore({
  // state: {
  //   user: null as User | null,
  // },

  state: {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  },
  mutations: {
    // SET_USER(state, user: User) {
    //   console.log("set_user...", user);
    //   state.user = user;
    // },

    SET_USER(state: any, user: ProfilUser) {
      state.user = user;
      // Sauvegarder dans LocalStorage
      localStorage.setItem('user', JSON.stringify(user));
    },
  },
  actions: {
    loginUser({ commit }: any, user: ProfilUser) {
      console.log("loginUser...", user);
      // Votre logique d'authentification et de récupération de l'utilisateur
      commit('SET_USER', user);
      // Sauvegarder dans LocalStorage
      localStorage.setItem('user', JSON.stringify(user));
    },
    logoutUser({ commit }: any) {
      // Effacer les données dans le store
      commit('SET_USER', null);
      // Effacer les données dans LocalStorage
      localStorage.removeItem('user');
    },
  },
  getters: {
    getUser(state: any) {
      console.log("getUser...", state);
      return state.user;
    },
    isLoggedIn(state: any) {
      return state.user !== null; // ajustez selon votre logique d'authentification
    },
    isAdmin(state: any) {
      return state.user.adresseMail !== undefined;
    }
  },
});