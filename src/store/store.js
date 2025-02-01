'use strict';

import { createStore } from 'vuex';
import auth from './modules/auth';
import nav from './modules/nav';

const store = createStore({
    modules: {
        auth,
        nav,
    },
});

export default store;
