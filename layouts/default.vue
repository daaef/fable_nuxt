<template>
  <div class="main-bg">
    <Sidebar />
    <Nuxt />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.main-bg {
  background: var(--vs-theme-layout);
}
</style>
<script>
export default {
  mounted() {
    // $colorMode.preference
    this.$vs.setTheme(this.$colorMode.preference)
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
}
</script>
