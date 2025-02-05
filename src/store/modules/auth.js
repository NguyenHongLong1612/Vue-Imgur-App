'use strict';

import client from '../client';

const auth = {
    namespaced: true,
    state: {
        token: localStorage.getItem('token'),
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token;
        },
    },
    mutations: {
        setToken(state, payload) {
            state.token = payload.value;
        },
    },
    actions: {
        logout({ commit }) {
            commit('setToken', { value: null });
            localStorage.removeItem('token');
            localStorage.removeItem('nameButton');
        },

        login() {
            window.location = `https://api.imgur.com/oauth2/authorize?client_id=${client.client_id}&response_type=token`;
        },

        setToken({ commit }, payload) {
            commit('setToken', payload);
        },
    },
};

export default auth;
