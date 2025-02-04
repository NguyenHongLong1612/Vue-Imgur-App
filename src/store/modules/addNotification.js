'use strict';

const addNotification = {
    namespaced: true,
    state: {
        addNoti: false,
    },
    getters: {
        getAddNoti(state) {
            return state.addNoti;
        },
    },
    mutations: {
        setAddNoti(state, payload) {
            state.addNoti = payload.status;
        },
    },
    actions: {
        setAddNoti({ commit }, payload) {
            commit('setAddNoti', payload);
        },
    },
};

export default addNotification;
