<template>
    <div v-html="data.html" class="html component" />
</template>

<script>
export default {
    props: ['data']
}
</script>
