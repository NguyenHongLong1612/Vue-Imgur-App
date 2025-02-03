'use strict';

const openImg = {
    namespaced: true,
    state: {
        status: false,
        linkImgShow: '',
    },
    getters: {
        getStatusOpenImg(state) {
            return state.status;
        },
        getLinkImgShow(state) {
            return state.linkImgShow;
        },
    },
    mutations: {
        setStatusOpenImg(state, payload) {
            state.status = payload.status;
        },
        setLinkImgShow(state, payload) {
            state.linkImgShow = payload.linkImgShow;
        },
    },
    actions: {
        setStatusOpenImg({ commit }, payload) {
            commit('setStatusOpenImg', payload);
        },
        setLinkImgShow({ commit }, payload) {
            commit('setLinkImgShow', payload);
        },
    },
};

export default openImg;
