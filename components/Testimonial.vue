<template>
    <div class="testimonial component">
        <div class="blurb-wrapper">
            <div class="blurb">{{ data.testimonial }}</div>
        </div>
        <div class="who">
            <div class="picture" v-if="data.picture">
                <img :src="data.picture.url" :alt="data.picture.name" />
            </div>
            <div class="details">
                <div class="name">{{ data.name }}</div>
                <div class="location">{{ data.location }}</div>
            </div>
            <div class="clear" />
        </div>
    </div>
</template>

<script>

export default {
    props: ['data']
}
</script>
