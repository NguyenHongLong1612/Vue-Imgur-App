<template>
    <div class="img-upload-item" @click="clickShowImage">
        <img :src="image" alt="" />
        <div class="btn-delete" @click="deleteUploadImg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
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
import { mapActions } from 'vuex';
export default {
    emits: ['deleteUploadImg'],
    props: ['image', 'index'],
    methods: {
        ...mapActions('openImg', ['setStatusOpenImg', 'setLinkImgShow']),
        clickShowImage(event) {
            if (this.link) {
                event.preventDefault();
            }
            this.setStatusOpenImg({ status: true });
            this.setLinkImgShow({ linkImgShow: this.image });
        },
        deleteUploadImg(event) {
            event.stopPropagation();
            this.$emit('deleteUploadImg', this.index);
        },
    },
};
</script>

<style scoped>
.img-upload-item {
    background-color: white;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #0a0b1e;
    position: relative;
}

.img-upload-item:hover {
    cursor: pointer;
}

.img-upload-item::after {
    box-sizing: border-box;
    content: 'Xem ảnh';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 16px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.5s;
}

.img-upload-item:hover::after {
    opacity: 1;
}

.img-upload-item img {
    max-width: 100%;
    max-height: 150px;
    object-fit: cover;
    border-radius: 16px;
}
.btn-delete {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    border: 1px solid #0a0b1e;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(30%, -30%);
    z-index: 1000;
}
.btn-delete:hover {
    cursor: pointer;
    background-color: red;
}

.btn-delete:hover svg {
    fill: white;
}
</style>
