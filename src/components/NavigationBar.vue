<template>
    <nav>
        <router-link
            class="logo"
            :to="{ name: 'store' }"
            @click="setNameButton({ nameButton: 'store' })"
        >
            <img src="../assets/img/logo.png" alt="" class="logo--img" />
        </router-link>
        <div class="nav--list">
            <router-link
                :to="{ name: 'store' }"
                class="nav--item"
                :class="{ active: getNameButton === 'store' }"
                @click="setNameButton({ nameButton: 'store' })"
            >
                Kho lưu trữ
            </router-link>
            <router-link
                :to="{ name: 'upload' }"
                class="nav--item"
                :class="{ active: getNameButton === 'upload' }"
                @click="setNameButton({ nameButton: 'upload' })"
            >
                Tải ảnh lên
            </router-link>
            <div
                class="nav--item"
                :class="{ active: getNameButton === 'logout' }"
                @click="clickLogoutBtn"
            >
                Đăng xuất
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions('nav', ['setNameButton']),
        ...mapActions('auth', ['logout']),
        clickLogoutBtn() {
            this.setNameButton({ nameButton: 'logout' });
            this.logout();
            this.$router.push({ name: 'login' });
        },
    },
    computed: {
        ...mapGetters('nav', ['getNameButton']),
    },
};
</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
}

.logo {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
}

.logo > img {
    height: 100%;
    object-fit: cover;
}

.nav--list {
    align-self: stretch;
    display: flex;
    align-items: center;
    gap: 16px;
}

.nav--item {
    padding: 16px 32px;
    font-size: 20px;
    font-weight: 400;
    letter-spacing: -0.5px;
    line-height: 1.7;
    color: #0a0b1e;
}

.nav--item:hover {
    cursor: pointer;
}

.active {
    background-color: #0a0b1e;
    opacity: 0.9;
    color: white;
    border-radius: 16px;
}

.active:hover {
    opacity: 1;
}
</style>
