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
    },
};

export default fetchApi;
