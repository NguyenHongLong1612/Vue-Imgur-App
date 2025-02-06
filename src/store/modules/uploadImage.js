'use strict';

const uploadImage = {
    namespaced: true,
    state: {
        uploadImagesList: [],
        isUpload: false,
    },
    getters: {
        getUploadImageList(state) {
            return state.uploadImagesList;
        },
        getIsUpload(state) {
            return state.isUpload;
        },
    },
    mutations: {
        setUploadImageList(state, payload) {
            const newImages = Array.from(payload.images);
            state.uploadImagesList = [...state.uploadImagesList, ...newImages];
        },
        clearUploadImg(state) {
            state.uploadImagesList = [];
        },
        setIsUpload(state, payload) {
            state.isUpload = payload.status;
        },
    },
    actions: {
        setUploadImageList({ commit }, payload) {
            commit('setUploadImageList', payload);
        },
        clearUploadImg({ commit }) {
            commit('clearUploadImg');
        },
        setIsUpload({ commit }, payload) {
            commit('setIsUpload', payload);
        },
    },
};

export default uploadImage;
