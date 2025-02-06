<template>
    <div class="box">
        <div class="upload-form">
            <input
                type="file"
                multiple
                accept="image/*"
                ref="fileInput"
                @change="handleFileChange"
            />
            <div class="container" @dragover.prevent @drop.prevent="handleDrop">
                <div class="icon-upload">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="#0a0b1e"
                        viewBox="0 0 256 256"
                    >
                        <path
                            d="M216,40H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V184h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM72,56H216v62.75l-10.07-10.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L72,109.37ZM184,200H40V88H56v80a16,16,0,0,0,16,16H184Zm32-32H72V132l36-36,49.66,49.66a8,8,0,0,0,11.31,0L194.63,120,216,141.38V168ZM160,84a12,12,0,1,1,12,12A12,12,0,0,1,160,84Z"
                        ></path>
                    </svg>
                </div>
                <div class="content">
                    <div class="title">
                        <div class="title-1">
                            Kéo và thả hình ảnh để tải lên hoặc
                        </div>
                        <div
                            class="btn-browse-computer"
                            @click="openBrowseComputer"
                        >
                            Chọn từ máy tính
                        </div>
                    </div>
                    <ul class="description-upload">
                        <li>
                            Bạn có thể tải lên png, apng, jpg, jpeg, gif hoặc
                            tiff
                        </li>
                        <li>Dung lượng tối đa 200mb/ảnh</li>
                        <li>f5 hoặc Refresh lại trang sẽ mất ảnh</li>
                    </ul>
                </div>
            </div>
        </div>
        <button class="btn-submit" @click="submitUploadImg">Xác nhận</button>
        <div class="lds-roller" v-if="getIsUpload">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="grid-img-upload" v-else>
            <image-upload-item
                v-for="(image, index) in listImgUpload"
                :key="image"
                :index="index"
                :image="image"
                @delete-upload-img="deleteUploadImgWithIndex"
            ></image-upload-item>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ImageUploadItem from '../ImageUploadItem.vue';
export default {
    components: {
        ImageUploadItem,
    },
    data() {
        return {
            listImgUpload: [],
        };
    },
    methods: {
        ...mapActions('uploadImage', [
            'setUploadImageList',
            'clearUploadImg',
            'setIsUpload',
        ]),
        ...mapActions('addNotification', [
            'setAddNoti',
            'setTypeNoti',
            'setTitleNoti',
        ]),
        ...mapActions('fetchApi', ['uploadListImg']),
        openBrowseComputer() {
            this.$refs.fileInput.click();
        },
        handleDrop(event) {
            const fileList = event.dataTransfer.files;
            this.addListImgUpload(fileList);
            this.setUploadImageList({ images: fileList });
        },
        handleFileChange(event) {
            const fileList = event.target.files;
            this.addListImgUpload(fileList);
            this.setUploadImageList({ images: fileList });
        },
        addListImgUpload(fileList) {
            const newList = Array.from(fileList).map((item) => {
                return URL.createObjectURL(item);
            });

            this.listImgUpload = [...this.listImgUpload, ...newList];
        },
        deleteUploadImgWithIndex(index) {
            this.listImgUpload.splice(index, 1);
        },
        async submitUploadImg() {
            const btnSubmitUploadImg = document.querySelector('.btn-submit');

            let flag = true;

            if (this.listImgUpload.length === 0) {
                this.setAddNoti({ status: true });

                this.setTypeNoti({ typeNoti: 'error' });

                this.setTitleNoti({ titleNoti: 'Bạn chưa chọn ảnh !' });

                flag = false;
            }

            if (!flag) return;

            //vô hiệu hoá nút
            btnSubmitUploadImg.disabled = true;
            btnSubmitUploadImg.style.cursor = 'not-allowed';

            //bật hiệu ứng load
            this.setIsUpload({ status: true });

            //post api
            await this.uploadListImg();

            this.listImgUpload = [];

            this.clearUploadImg();

            //cho nút trở lại bình thường
            btnSubmitUploadImg.disabled = false;
            btnSubmitUploadImg.style.cursor = 'pointer';

            //bật thông báo
            this.setAddNoti({ status: true });
            this.setTypeNoti({ typeNoti: 'success' });
            this.setTitleNoti({ titleNoti: 'Bạn đã tải lên ảnh thành công !' });

            //tắt hiệu ứng load
            this.setIsUpload({ status: false });
        },
    },
    computed: {
        ...mapGetters('uploadImage', ['getUploadImageList', 'getIsUpload']),
    },
    mounted() {
        if (!this.getIsUpload) {
            this.listImgUpload = this.getUploadImageList.map((item) => {
                return URL.createObjectURL(item);
            });
        }

        if (this.getIsUpload) {
            const btnSubmitUploadImg = document.querySelector('.btn-submit');
            btnSubmitUploadImg.disabled = true;
            btnSubmitUploadImg.style.cursor = 'not-allowed';
        }
    },
};
</script>

<style scoped>
.box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
}
.upload-form {
    width: 100%;
    border: 2px dashed #334155;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: white;
}

input {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
    display: none;
}

.container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    z-index: 100;
    padding: 24px;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 48px;
}

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    font-weight: 700;
}

.title-1 {
    font-size: 20px;
}

.btn-browse-computer {
    font-size: 14px;
    background-color: #e2e8f0;
    border: 1px solid #475569;
    padding: 8px 16px;
    border-radius: 8px;
}

.btn-browse-computer:hover {
    cursor: pointer;
    background-color: #9ca3af;
}

.description-upload {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    font-size: 12px;
    font-weight: 500;
}

li {
    position: relative;
}

li::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-200%, -50%);
    width: 4px;
    height: 4px;
    background-color: #0a0b1e;
    border-radius: 50%;
}

.btn-submit {
    user-select: none;
    align-self: center;
    padding: 12px 24px;
    background-color: #ffffff;
    color: #0a0b1e;
    padding: 20px 26px;
    border: none;
    border-radius: 16px;
    box-shadow: 0 1px 3px #0a0b1f14, inset 0 -1px #0000001a;
    transition: all 0.2s;
}

.btn-submit:hover {
    cursor: pointer;
    background-color: #fafafa;
    box-shadow: 0 3px 6px #0a0b1f26, inset 0 -1px #0000001a;
}

.grid-img-upload {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
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
