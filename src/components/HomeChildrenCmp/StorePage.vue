<template>
    <div class="store--img">
        <div class="lds-roller" v-if="isLoadingData">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="content" v-else>
            <div class="refresh-btn" @click="refreshPage">Làm mới</div>
            <div class="warning" v-if="getImagesList.length === 0">
                Oops! Kho lưu trữ của bạn rỗng. Hãy tải ảnh lên nhé !
            </div>
            <gallery-image-vue></gallery-image-vue>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import GalleryImageVue from '../Pagination/GalleryImage.vue';
export default {
    components: {
        GalleryImageVue,
    },
    data() {
        return {
            isLoadingData: true,
        };
    },
    methods: {
        ...mapActions('fetchApi', ['getApi']),
        async refreshPage() {
            this.isLoadingData = true;
            await this.getApi();
            this.isLoadingData = false;
        },
    },
    async created() {
        await this.getApi();
        this.isLoadingData = false;
    },
    computed: {
        ...mapGetters('fetchApi', ['getImagesList']),
    },
};
</script>

<style scoped>
.store--img {
    flex-grow: 1;
}
.warning {
    box-sizing: border-box;
    padding-top: 98px;
    font-size: 36px;
    height: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
}

.content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
}

.refresh-btn {
    width: 90px;
    line-height: 1.7;
    padding: 8px 0;
    font-size: 16px;
    background-color: #0a0b1e;
    opacity: 0.9;
    color: white;
    border: none;
    border-radius: 16px;
    cursor: pointer;
}

.refresh-btn:hover {
    opacity: 1;
}

.lds-roller,
.lds-roller div,
.lds-roller div:after {
    box-sizing: border-box;
}
.lds-roller {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}
.lds-roller div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;
}
.lds-roller div:after {
    content: ' ';
    display: block;
    position: absolute;
    width: 7.2px;
    height: 7.2px;
    border-radius: 50%;
    background: #0a0b1e;
    margin: -3.6px 0 0 -3.6px;
}
.lds-roller div:nth-child(1) {
    animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
    top: 62.62742px;
    left: 62.62742px;
}
.lds-roller div:nth-child(2) {
    animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
    top: 67.71281px;
    left: 56px;
}
.lds-roller div:nth-child(3) {
    animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
    top: 70.90963px;
    left: 48.28221px;
}
.lds-roller div:nth-child(4) {
    animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
    top: 72px;
    left: 40px;
}
.lds-roller div:nth-child(5) {
    animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
    top: 70.90963px;
    left: 31.71779px;
}
.lds-roller div:nth-child(6) {
    animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
    top: 67.71281px;
    left: 24px;
}
.lds-roller div:nth-child(7) {
    animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
    top: 62.62742px;
    left: 17.37258px;
}
.lds-roller div:nth-child(8) {
    animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
    top: 56px;
    left: 12.28719px;
}
@keyframes lds-roller {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
