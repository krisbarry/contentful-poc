<template>
    <div class="promo component">
        <div class="image" v-if="data.image">
            <img :src="data.image.url" :alt="data.image.name" />
        </div>
        <div class="subtitle">{{ data.title }}</div>
        <div class="body">{{ data.body }}</div>
    </div>
</template>

<script>

export default {
    props: ['data']
}
</script>
