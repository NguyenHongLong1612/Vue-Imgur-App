'use strict';

const addNotification = {
    namespaced: true,
    state: {
        addNoti: false,
        typeNoti: '',
        titleNoti: '',
    },
    getters: {
        getAddNoti(state) {
            return state.addNoti;
        },
        getTypeNoti(state) {
            return state.typeNoti;
        },
        getTitleNoti(state) {
            return state.titleNoti;
        },
    },
    mutations: {
        setAddNoti(state, payload) {
            state.addNoti = payload.status;
        },
        setTypeNoti(state, payload) {
            state.typeNoti = payload.typeNoti;
        },
        setTitleNoti(state, payload) {
            state.titleNoti = payload.titleNoti;
        },
    },
    actions: {
        setAddNoti({ commit }, payload) {
            commit('setAddNoti', payload);
        },
        setTypeNoti({ commit }, payload) {
            commit('setTypeNoti', payload);
        },
        setTitleNoti({ commit }, payload) {
            commit('setTitleNoti', payload);
        },
    },
};

export default addNotification;
