<template>
  <vs-navbar shadow center-collapsed v-model="nav">
    <template #left>
      <img class="nav-logo" src="/icon.png" alt="" />
    </template>
    <template #right>
      <vs-button @click="$store.commit('setDesktop', !desktop)" flat icon>
        <i class="bx bx-menu"></i>
      </vs-button>
    </template>
  </vs-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  data() {
    return {
      nav: false,
    }
  },
  computed: {
    ...mapGetters({
      desktop: 'desktop',
    }),
  },
}
</script>

<style scoped></style>
