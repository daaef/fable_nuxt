<template>
  <section class="main-bg">
    <Navbar v-if="!desktop" />
    <Sidebar />
    <div v-if="$fetchState.pending" class="mini-loader" ref="loader1"></div>
    <Nuxt />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async mounted() {
    this.$vs.setTheme(this.$colorMode.preference)
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
    this.$vs.loading({
      target: this.$refs['loader1'],
      text: 'Loading...',
      type: 'waves',
    })
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      console.log('fetching')
      this.$fetch()
    }
  },
  async fetch() {
    console.log('running fetch')
    await this.$store.dispatch('setupProject')
  },
  computed: {
    ...mapGetters({
      desktop: 'desktop',
    }),
  },
}
</script>
