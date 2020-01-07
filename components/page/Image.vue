<template>
    <v-img :lazy-src="data.image.url" :alt="data.title" :height="data.image.height" class="image component" />
</template>

<script>
export default {
    props: ['data']
}
</script>
