<template>
  <vs-sidebar :open="desktop" v-model="active" absolute>
    <template #logo>
      <img class="nav-logo" src="/icon.png" alt="" />
    </template>
    <nuxt-link to="/">
      <vs-sidebar-item>
        <template #icon>
          <i class="bx bx-home" />
        </template>
        Home
      </vs-sidebar-item>
    </nuxt-link>
    <nuxt-link to="/addproduct">
      <vs-sidebar-item class="side--link">
        <template #icon>
          <i class="bx bx-add-to-queue" />
        </template>
        Add Products
      </vs-sidebar-item>
    </nuxt-link>
    <template #footer>
      <vs-row justify="space-between">
        <vs-avatar>{{ user.displayName[0].toUpperCase() }}</vs-avatar>
        <vs-button @click="logOut"> Logout </vs-button>
      </vs-row>
    </template>
  </vs-sidebar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  data() {
    return {
      active: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.authUser
    },
    ...mapGetters({
      desktop: 'desktop',
    }),
  },
  methods: {
    async logOut() {
      await this.$fire.auth
        .signOut()
        .then(async () => {
          await this.$nuxt.$loading.start()
          await this.$store.dispatch('cleanupAction')
          await this.$router.push('/auth/login')
        })
        .catch((error) => {
          // An error happened.
          console.log(error)
        })
    },
  },
  mounted() {
    console.log('device state', this.$device)
    if (this.$device.isMobileOrTablet) {
      this.$store.commit('setDesktop', false)
    }
  },
}
</script>

<style scoped></style>
