'use strict';

const deleteImg = {
    namespaced: true,
    state: {
        isOpenModal: false,
        linkImgDel: '',
        deleteImageHash: '',
    },
    getters: {
        getOpenModal(state) {
            return state.isOpenModal;
        },
        getLinkImgDel(state) {
            return state.linkImgDel;
        },
        getDeleteImageHash(state) {
            return state.deleteImageHash;
        },
    },
    mutations: {
        setOpenModal(state, payload) {
            state.isOpenModal = payload.status;
        },
        setLinkImgDel(state, payload) {
            state.linkImgDel = payload.linkImg;
        },
        setDeleteImageHash(state, payload) {
            state.deleteImageHash = payload.deleteImageHash;
        },
    },
    actions: {
        setOpenModal({ commit }, payload) {
            commit('setOpenModal', payload);
        },
        setLinkImgDel({ commit }, payload) {
            commit('setLinkImgDel', payload);
        },
        setDeleteImageHash({ commit }, payload) {
            commit('setDeleteImageHash', payload);
        },
    },
};

export default deleteImg;
