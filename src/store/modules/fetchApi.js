'use strict';

const fetchApi = {
    namespaced: true,
    state: {
        imagesList: [],
    },
    getters: {
        getImagesList(state) {
            return state.imagesList;
        },
    },
    mutations: {
        setImagesList(state, payload) {
            state.imagesList = payload.images;
        },
    },
    actions: {
        async getApi({ state, commit, dispatch }) {
            try {
                const response = await fetch(
                    'https://api.imgur.com/3/account/me/images',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                );

                if (!response.ok)
                    throw Error('Can not get data from imgur api');

                const { data } = await response.json();

                commit('setImagesList', { images: data.reverse() });

                console.log(state.imagesList);

                dispatch('pagination/dividePage', null, { root: true });

                dispatch('pagination/setImageForCurPage', null, { root: true });
            } catch (err) {
                console.error(err);
            }
        },

        setImagesList({ commit }, payload) {
            commit('setImagesList', payload);
        },

        async deleteImgWithImgHash({ rootGetters }) {
            try {
                const delHash = rootGetters['deleteImg/getDeleteImageHash'];

                const response = await fetch(
                    `https://api.imgur.com/3/image/${delHash}`,
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                );

                if (!response.ok) throw Error('Can not delete image !');

                console.log('Xoa anh thanh cong');
            } catch (err) {
                console.error(err);
            }
        },
    },
};

export default fetchApi;
