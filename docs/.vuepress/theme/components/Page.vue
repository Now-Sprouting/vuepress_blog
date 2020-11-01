<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />
    <StructureImg />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import StructureImg from '../../components/structure-img.vue'

export default {
  components: { PageEdit, PageNav, StructureImg },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

</style>
