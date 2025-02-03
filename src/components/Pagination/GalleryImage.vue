<template>
    <div class="gallery">
        <div class="grid-gallery">
            <image-item-vue
                v-for="image in getImageForCurPage"
                :key="image.id"
                :id="image.id"
                :link="image.link"
                :deleteHash="image.deleteHash"
            ></image-item-vue>
        </div>
        <footer-pag-vue></footer-pag-vue>
    </div>
</template>

<script>
import FooterPagVue from './FooterPag.vue';
import { mapGetters } from 'vuex';
import ImageItemVue from './ImageItem.vue';
export default {
    components: {
        FooterPagVue,
        ImageItemVue,
    },
    computed: {
        ...mapGetters('pagination', ['getImageForCurPage']),
    },
};
</script>

<style scoped>
.gallery {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.grid-gallery {
    height: 100%;
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
}
</style>
