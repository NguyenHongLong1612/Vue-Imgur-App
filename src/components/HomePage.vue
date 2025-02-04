<template>
    <teleport to="#app">
        <show-image-vue></show-image-vue>
    </teleport>
    <teleport to="#app">
        <delete-image-vue></delete-image-vue>
    </teleport>
    <teleport to="#app">
        <notification-success-delete-image></notification-success-delete-image>
    </teleport>
    <div class="home-page">
        <div class="page">
            <navigation-bar></navigation-bar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import DeleteImageVue from './DeleteImage.vue';
import NavigationBar from './NavigationBar.vue';
import ShowImageVue from './ShowImage.vue';
import NotificationSuccessDeleteImage from './NotificationSuccessDeleteImage.vue';

export default {
    components: {
        NavigationBar,
        ShowImageVue,
        DeleteImageVue,
        NotificationSuccessDeleteImage,
    },
    created() {
        if (!localStorage.getItem('token')) {
            this.$router.push({ name: 'loading' });
        }
    },
};
</script>

<style scoped>
.home-page {
    height: 100%;
    background-color: #fffd63;
}

.page {
    box-sizing: border-box;
    height: 100%;
    padding: 48px 0;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
}
</style>
