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

        async uploadListImg({ rootGetters }) {
            const list = rootGetters['uploadImage/getUploadImageList'];

            try {
                await Promise.all(
                    list.map(async (img) => {
                        const formData = new FormData();
                        formData.append('image', img);

                        const response = await fetch(
                            'https://api.imgur.com/3/image',
                            {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                        'token'
                                    )}`,
                                },
                                body: formData,
                            }
                        );

                        if (!response.ok)
                            throw new Error('Không thể tải ảnh lên!');

                        const result = await response.json();
                        console.log('Upload thành công:', result);
                        return result;
                    })
                );
            } catch (error) {
                console.error('Lỗi khi upload ảnh:', error);
            }
        },
    },
};

export default fetchApi;
