'use strict';

const openImg = {
    namespaced: true,
    state: {
        status: false,
        linkImg: '',
    },
    getters: {
        getStatusOpenImg(state) {
            return state.status;
        },
        getLinkImg(state) {
            return state.linkImg;
        },
    },
    mutations: {
        setStatusOpenImg(state, payload) {
            state.status = payload.status;
        },
        setLinkImg(state, payload) {
            state.linkImg = payload.linkImg;
        },
    },
    actions: {
        setStatusOpenImg({ commit }, payload) {
            commit('setStatusOpenImg', payload);
        },
        setLinkImg({ commit }, payload) {
            commit('setLinkImg', payload);
        },
    },
};

export default openImg;
