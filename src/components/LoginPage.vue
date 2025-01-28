<template>
    <section>
        <div class="login-page">
            <div class="title">
                Imgur - Nơi Chia Sẻ & Lưu Trữ Ảnh Theo Cách Của Bạn
            </div>
            <div class="description">
                Với Imgur, việc lưu trữ ảnh trở nên đơn giản hơn bao giờ hết! Hỗ
                trợ kéo thả linh hoạt, upload nhanh gọn, và lưu trữ an toàn –
                đây là giải pháp hoàn hảo để bạn quản lý mọi khoảnh khắc quý
                giá.
            </div>
            <button @click="detailLogin" class="btn-login">
                Khám phá ngay &rightarrow;
            </button>
        </div>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    methods: {
        ...mapActions('auth', ['login']),

        detailLogin() {
            if (this.isLoggedIn) {
                return this.$router.push({ name: 'loading' });
            } else {
                return this.login();
            }
        },
    },
    computed: {
        ...mapGetters('auth', ['isLoggedIn']),
    },
};
</script>

<style scoped>
section {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fffd63;
}

.login-page {
    max-width: 1200px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
}

.title {
    color: #0a0b1e;
    font-size: 52px;
    font-weight: 700;
    line-height: 1.7;
    letter-spacing: -0.5px;
}

.description {
    width: 70%;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.5px;
    line-height: 1.7;
}

.btn-login {
    background-color: #ffffff;
    color: #0a0b1e;
    padding: 20px 26px;
    border: none;
    border-radius: 16px;
    box-shadow: 0 1px 3px #0a0b1f14, inset 0 -1px #0000001a;
    transition: all 0.2s;
}

.btn-login:hover {
    cursor: pointer;
    background-color: #fafafa;
    box-shadow: 0 3px 6px #0a0b1f26, inset 0 -1px #0000001a;
}
</style>
