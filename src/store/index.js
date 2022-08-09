import { api } from '@/services'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      senha: "",
      bairro: "",
      cep: "",
      rua: "",
      numero: "",
      cidade: "",
      estado: "",
    },
    usuario_produtos: null
  },
  getters: {
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload)
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload;
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshift(payload);
    }
  },
  actions: {
    getUsuarioProdutos(context) {
     return api.get(`/produto?usuario_id=${context.state.usuario.id}`).then(res => {
        context.commit('UPDATE_USUARIO_PRODUTOS', res.data)
      })
    },
    getUsuario(context) {
      return api.get(`/usuario`).then(res => {
        context.commit("UPDATE_USUARIO", res.data)
        context.commit("UPDATE_LOGIN", true)
      })
    },
    criarUsuario(context, payload) {
      context.commit('UPDATE_USUARIO', { id: payload.email })
      return api.post("/usuario", payload)
    },
    logarUsuario(context, payload) {
      return api.login({
        username: payload.email,
        password: payload.senha,
      }).then(res => {
        window.localStorage.token = `Bearer ${res.data.token}`;
      });
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        bairro: "",
        cep: "",
        rua: "",
        numero: "",
        cidade: "",
        estado: "",
      });

      window.localStorage.removeItem("token");

      context.commit("UPDATE_LOGIN", false)
    }
  },
  modules: {
  }
})
