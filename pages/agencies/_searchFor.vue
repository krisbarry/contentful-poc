<template>
    <v-layout class="component-renderer component" wrap>
        <v-flex v-for="(pageComponent, i) in pageContent.pageComponents" :key="i"
            class="page-component" :class="pageComponent.cssClasses">
            <component v-bind:is="pageComponent.type" :data="pageComponent" />
        </v-flex>
    </v-layout>
</template>

<script>
import page from '@/pages/page.vue'
import Dynamic from '@/components/FindAnAgency.vue'

export default {
    extends: page,
    components: {
        'hero-component': () => import('@/components/page/Hero.vue'),
        'dynamic-component': () => import('@/components/page/Dynamic.vue'),
        'rich-text-component': () => import('@/components/page/RichText.vue')
    }
}
</script>