<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>
export default {
  mounted() {
    this.$vs.setTheme(this.$colorMode.preference)
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
}
</script>
