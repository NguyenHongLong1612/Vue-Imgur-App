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
    },
    actions: {
        setOpenModal({ commit }, payload) {
            commit('setOpenModal', payload);
        },
        setLinkImgDel({ commit }, payload) {
            commit('setLinkImgDel', payload);
        },
    },
};

export default deleteImg;
