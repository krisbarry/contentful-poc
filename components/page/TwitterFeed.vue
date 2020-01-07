<template>
    <div class="twitter-feed component">
        <a class="twitter-timeline" href="https://twitter.com/ncfarmbureau">
            {{ title }}
        </a>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
            title: 'Tweets by @NCFarmBureau'
        }
    },
    created() {
        if (this.data.title) {
            this.title = this.data.title
        }
    }
}
</script>