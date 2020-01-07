<template>
  <component-renderer :page-components="pageContent.pageComponents" />
</template>

<script>
import page from '@/pages/page.vue'

export default {
  extends: page
}
</script>
