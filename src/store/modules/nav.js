'use strict';

const nav = {
    namespaced: true,
    state: {
        nameButton: 'store',
    },
    getters: {
        getNameButton(state) {
            return state.nameButton;
        },
    },
    mutations: {
        setNameButton(state, payload) {
            state.nameButton = payload.nameButton;
        },
    },
    actions: {
        setNameButton({ commit }, payload) {
            commit('setNameButton', payload);
        },
    },
};

export default nav;
