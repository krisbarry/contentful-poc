<template>
    <v-layout class="component-renderer component" wrap>
        <component v-for="(pageComponent, i) in pageComponents" :key="i" v-bind:is="pageComponent.type"
            :data="pageComponent" class="flex" :class="pageComponent.cssClasses ? pageComponent.cssClasses : 'xs12'" />
    </v-layout>
</template>

<script>

export default {
    props: ['pageComponents'],
    components: {
        'tab-component': () => import('@/components/page/Tabs.vue'),
        'hero-component': () => import('@/components/page/Hero.vue'),
        'html-component': () => import('@/components/page/HTML.vue'),
        'x-up-component': () => import('@/components/page/XUp.vue'),
        'image-component': () => import('@/components/page/Image.vue'),
        'dynamic-component': () => import('@/components/page/Dynamic.vue'),
        'carousel-component': () => import('@/components/page/Carousel.vue'),
        'rich-text-component': () => import('@/components/page/RichText.vue'),
    }
}
</script>