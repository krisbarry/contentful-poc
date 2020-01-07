<template>
    <div class="field-guide-summary component" @click="goToFieldGuideDetails" @enter="goToFieldGuideDetails">
        <div class="image" v-if="data.thumbnail">
            <img :src="data.thumbnail.url" :alt="data.thumbnail.name" />
        </div>
        <div class="subtitle">{{ data.title }}</div>
        <div class="summary">{{ data.summary }}</div>
        <span class="link">View Guide</span>
    </div>
</template>

<script>

export default {
    props: ['data'],
    methods: {
        goToFieldGuideDetails() {
            this.$router.push({
                path: `/field-guide/${this.data.slug}`
            })
        }
    }
}
</script>
