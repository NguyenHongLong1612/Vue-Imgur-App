'use strict';
import SETTINGS_PAGINATION from '@/components/Pagination/Settings';

const pagination = {
    namespaced: true,
    state: {
        curPage: SETTINGS_PAGINATION.START_PAGE,
        quantityPage: null,
        imagePerPage: [],
    },
    getters: {
        getCurrentPage(state) {
            return state.curPage;
        },
        getQuantityPage(state) {
            return state.quantityPage;
        },
        getImageForCurPage(state) {
            return state.imagePerPage;
        },
    },
    mutations: {
        dividePage(state, length) {
            state.quantityPage = Math.ceil(
                length / SETTINGS_PAGINATION.IMAGE_PER_PAGE
            );

            if (state.curPage > state.quantityPage) {
                state.curPage = state.quantityPage;
            }
        },
        setCurrentPage(state, payload) {
            state.curPage = payload.value;
        },
        setImageForCurPage(state, arr) {
            state.imagePerPage = arr;
        },
    },
    actions: {
        dividePage({ commit, rootGetters }) {
            commit('dividePage', rootGetters['fetchApi/getImagesList'].length);
        },
        setCurrentPage({ commit }, payload) {
            commit('setCurrentPage', payload);
        },
        setImageForCurPage({ getters, commit, rootGetters }) {
            const imagesList = rootGetters['fetchApi/getImagesList'];

            const startImg =
                SETTINGS_PAGINATION.IMAGE_PER_PAGE *
                (getters.getCurrentPage - 1);

            const endImg =
                SETTINGS_PAGINATION.IMAGE_PER_PAGE * getters.getCurrentPage - 1;

            const arr = [];
            for (let i = startImg; i <= endImg; ++i) {
                if (imagesList[i]) {
                    arr.push(imagesList[i]);
                }
            }
            commit('setImageForCurPage', arr);
        },
    },
};

export default pagination;
