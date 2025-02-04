<template>
    <div class="image" :style="{ backgroundImage: `url(${link})` }">
        <a :href="link" @click="clickShowImage"></a>
        <div class="trash" @click="openModalDeleteImg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#0a0b1e"
                viewBox="0 0 256 256"
            >
                <path
                    d="M216,48H180V36A28,28,0,0,0,152,8H104A28,28,0,0,0,76,36V48H40a12,12,0,0,0,0,24h4V208a20,20,0,0,0,20,20H192a20,20,0,0,0,20-20V72h4a12,12,0,0,0,0-24ZM100,36a4,4,0,0,1,4-4h48a4,4,0,0,1,4,4V48H100Zm88,168H68V72H188ZM116,104v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm48,0v64a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Z"
                ></path>
            </svg>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: ['id', 'link', 'deleteHash'],
    methods: {
        ...mapActions('openImg', ['setStatusOpenImg', 'setLinkImgShow']),
        ...mapActions('deleteImg', [
            'setOpenModal',
            'setLinkImgDel',
            'setDeleteImageHash',
        ]),
        clickShowImage(event) {
            if (this.link) {
                event.preventDefault();
            }
            this.setStatusOpenImg({ status: true });
            this.setLinkImgShow({ linkImgShow: this.link });
        },
        openModalDeleteImg() {
            this.setOpenModal({ status: true });
            this.setLinkImgDel({ linkImg: this.link });
            this.setDeleteImageHash({ deleteImageHash: this.deleteHash });
        },
    },
};
</script>

<style scoped>
.image {
    width: 550px;
    height: 450px;
    background-size: cover;
    background-position: center;
    border-radius: 16px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: hidden;
    position: relative;
}

.image:hover {
    cursor: pointer;
}

a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    height: 100%;
    width: 100%;
    transition: all 0.25s;
}

.image:hover a {
    background-color: black;
    opacity: 0.5;
}

a::after {
    content: 'Xem ảnh';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40px);
    font-size: 20px;
    font-weight: 900;
    line-height: 1.7;
    opacity: 0;
    color: white;
    transition: all 0.25s;
}

.image:hover a::after {
    transform: translate(-50%, -50%);
    opacity: 1;
}

.trash {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: white;
    height: 60px;
    width: 100px;
    border-top-left-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
}

.trash:hover {
    cursor: url('../../assets/svg/trash-bold.svg'), auto;
    background-color: red;
}

.trash:hover > svg {
    fill: white;
}
</style>
