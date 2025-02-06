<template>
    <div class="show--image" v-if="getStatusOpenImg" @click="exitImage">
        <div class="image-container">
            <img :src="getLinkImgShow" alt="" @click="cancelClick" />
        </div>
        <div class="exit" @click="exitImage">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                fill="#ffffff"
                viewBox="0 0 256 256"
            >
                <path
                    d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
                ></path>
            </svg>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions('openImg', ['setStatusOpenImg']),
        exitImage() {
            this.setStatusOpenImg({ status: false });
        },
        cancelClick(event) {
            event.stopPropagation();
        },
    },
    computed: {
        ...mapGetters('openImg', ['getStatusOpenImg', 'getLinkImgShow']),
    },
};
</script>

<style scoped>
.show--image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: black;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

.image-container {
    max-width: 80%;
    max-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-container img {
    max-height: 100%;
    max-width: 100%;
}

.exit {
    position: absolute;
    top: 0;
    right: 0;
}

.exit:hover {
    cursor: pointer;
}

.exit:hover > svg {
    fill: red;
}
</style>
