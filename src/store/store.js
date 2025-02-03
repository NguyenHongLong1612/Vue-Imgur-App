'use strict';

import { createStore } from 'vuex';
import auth from './modules/auth';
import nav from './modules/nav';
import fetchApi from './modules/fetchApi';
import pagination from './modules/pagination';
import openImg from './modules/openImage';
import deleteImg from './modules/deleteImage';

const store = createStore({
    modules: {
        auth,
        nav,
        fetchApi,
        pagination,
        openImg,
        deleteImg,
    },
});

export default store;
