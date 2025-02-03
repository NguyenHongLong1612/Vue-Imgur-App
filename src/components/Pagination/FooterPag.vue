<template>
    <div class="footer-gallery" v-if="getQuantityPage >= 2">
        <div class="left-arrow">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="#0a0b1e"
                viewBox="0 0 256 256"
                v-if="getCurrentPage > 1 && getCurrentPage <= getQuantityPage"
                @click="arrowClick(getCurrentPage - 1)"
            >
                <path
                    d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm52-84a12,12,0,0,1-12,12H117l11.52,11.51a12,12,0,0,1-17,17l-32-32a12,12,0,0,1,0-17l32-32a12,12,0,0,1,17,17L117,116h51A12,12,0,0,1,180,128Z"
                ></path>
            </svg>
        </div>
        <div class="page-number">
            {{ getCurrentPage }}/{{ getQuantityPage }}
        </div>
        <div class="right-arrow">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="#0a0b1e"
                viewBox="0 0 256 256"
                v-if="getCurrentPage >= 1 && getCurrentPage < getQuantityPage"
                @click="arrowClick(getCurrentPage + 1)"
            >
                <path
                    d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm48.49-92.49a12,12,0,0,1,0,17l-32,32a12,12,0,1,1-17-17L139,140H88a12,12,0,0,1,0-24h51l-11.52-11.51a12,12,0,1,1,17-17Z"
                ></path>
            </svg>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    computed: {
        ...mapGetters('pagination', ['getCurrentPage', 'getQuantityPage']),
    },
    methods: {
        ...mapActions('pagination', ['setCurrentPage', 'setImageForCurPage']),
        arrowClick(num) {
            this.setCurrentPage({ value: num });
            this.setImageForCurPage();
        },
    },
};
</script>

<style scoped>
.footer-gallery {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
}

.page-number {
    font-size: 24px;
    font-weight: 900;
    user-select: none; /* Ngăn bôi đen */
    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE/Edge */
}

.left-arrow,
.right-arrow {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

svg:hover {
    cursor: pointer;
}
</style>
