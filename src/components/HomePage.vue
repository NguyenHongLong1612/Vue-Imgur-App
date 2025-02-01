<template>
    <div class="home-page">
        <div class="page">
            <navigation-bar></navigation-bar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
export default {
    components: {
        NavigationBar,
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
    gap: 48px;
}
</style>
