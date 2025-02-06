<template>
    <div class="modal-delete-image" v-if="getOpenModal" @click="exitModal">
        <div class="container" @click="cancelModal">
            <div class="title">Bạn chắc chắn muốn xoá ?</div>
            <div
                class="img-delete"
                :style="{ backgroundImage: `url(${getLinkImgDel})` }"
            ></div>
            <div class="btn">
                <button class="btn-cancel" @click="exitModal">Huỷ</button>
                <button class="btn-delete" @click="deleteImage">Xoá</button>
            </div>
        </div>
        <div class="exit" @click="exitModal">
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
import { mapActions, mapGetters } from 'vuex';
export default {
    methods: {
        ...mapActions('deleteImg', ['setOpenModal']),
        ...mapActions('fetchApi', ['setImagesList', 'deleteImgWithImgHash']),
        ...mapActions('pagination', ['dividePage', 'setImageForCurPage']),
        ...mapActions('addNotification', [
            'setAddNoti',
            'setTypeNoti',
            'setTitleNoti',
        ]),

        exitModal() {
            this.setOpenModal({ status: false });
        },
        cancelModal(event) {
            event.stopPropagation();
        },
        async deleteImage() {
            const btnDeleteImage = document.querySelector('.btn-delete');

            btnDeleteImage.disabled = true;
            btnDeleteImage.style.cursor = 'not-allowed';

            const oldListImages = this.getImagesList;

            const index = oldListImages.findIndex(
                (img) => img.deletehash === this.getDeleteImageHash
            );

            if (index !== -1) {
                oldListImages.splice(index, 1);
                this.setImagesList({ images: [...oldListImages] });
            }

            this.dividePage();

            this.setImageForCurPage();

            await this.deleteImgWithImgHash();

            this.setOpenModal({ status: false });

            btnDeleteImage.disabled = false;
            btnDeleteImage.style.cursor = 'pointer';

            this.setAddNoti({ status: true });
            this.setTypeNoti({ typeNoti: 'success' });
            this.setTitleNoti({ titleNoti: 'Bạn đã xoá ảnh thành công !' });
        },
    },
    computed: {
        ...mapGetters('deleteImg', [
            'getOpenModal',
            'getLinkImgDel',
            'getDeleteImageHash',
        ]),
        ...mapGetters('fetchApi', ['getImagesList']),
        ...mapGetters('pagination', ['getCurrentPage']),
    },
};
</script>

<style scoped>
.modal-delete-image {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 600px;
    height: 400px;
    background-color: #fffd63;
    border-radius: 16px;
}
.title,
.btn {
    user-select: none;
}

.title {
    font-size: 30px;
    font-weight: 900;
    color: #0a0b1e;
}

.img-delete {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 16px;
    background-position: center;
    background-size: 200px;
    background-repeat: no-repeat;
}

.btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.btn-cancel {
    background-color: #ffffff;
    color: #0a0b1e;
    padding: 20px 26px;
    border: none;
    border-radius: 16px;
    box-shadow: 0 2px 4px #0a0b1f14, inset 0 -1px #0000001a;
    transition: all 0.2s;
}

.btn-cancel:hover {
    cursor: pointer;
    background-color: #fafafa;
    box-shadow: 0 4px 8px #0a0b1f26, inset 0 -1px #0000001a;
}

.btn-delete {
    background-color: rgba(255, 0, 0, 0.9);
    color: white;
    padding: 20px 26px;
    border: none;
    border-radius: 16px;
    box-shadow: 0 2px 4px #0a0b1f14, inset 0 -1px #0000001a;
    transition: all 0.2s;
}

.btn-delete:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px #0a0b1f26, inset 0 -1px #0000001a;
    background-color: red;
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
