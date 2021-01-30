<template>
  <section class="main-bg">
    <Navbar v-if="!desktop" />
    <Sidebar />
    <Nuxt />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async mounted() {
    this.$vs.setTheme(this.$colorMode.preference)
    await this.$store.dispatch('setupProject')
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  computed: {
    ...mapGetters({
      desktop: 'desktop',
    }),
  },
}
</script>
