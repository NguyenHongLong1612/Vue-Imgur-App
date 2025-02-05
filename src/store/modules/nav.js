'use strict';

const nav = {
    namespaced: true,
    state: {
        nameButton: localStorage.getItem('nameButton') || 'store',
    },
    getters: {
        getNameButton(state) {
            return state.nameButton;
        },
    },
    mutations: {
        setNameButton(state, payload) {
            state.nameButton = payload.nameButton;
            localStorage.setItem('nameButton', payload.nameButton);
        },
    },
    actions: {
        setNameButton({ commit }, payload) {
            commit('setNameButton', payload);
        },
    },
};

export default nav;
