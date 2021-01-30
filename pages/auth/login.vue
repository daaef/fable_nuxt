<template>
  <main>
    <div class="flex-centered">
      <div class="login-card">
        <img class="logo" src="~/assets/img/logo.png" alt="" />
        <div class="mt-input">
          <vs-input v-model="email" type="email" label-placeholder="Email">
            <template #icon>
              <i class="bx bx-user" />
            </template>
            <template v-if="validEmail" #message-success>
              Email Valid
            </template>
            <template v-if="!validEmail && email !== ''" #message-danger>
              Email Invalid
            </template>
          </vs-input>
        </div>

        <div class="mt-input">
          <vs-input
            v-model="password"
            type="password"
            label-placeholder="Password"
            :progress="getProgress"
            :visible-password="hasVisiblePassword"
            icon-after
            @click-icon="hasVisiblePassword = !hasVisiblePassword"
          >
            <template #icon>
              <i v-if="!hasVisiblePassword" class="bx bx-show-alt" />
              <i v-else class="bx bx-hide" />
            </template>

            <template v-if="getProgress >= 100" #message-success>
              Secure password
            </template>
          </vs-input>
        </div>

        <div class="mt-sub--button">
          <vs-button @click.prevent="login"> Submit </vs-button>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
/* eslint-disable no-useless-escape */
export default {
  layout: 'auth',
  data() {
    return {
      email: '',
      password: '',
      subActive: 0,
      hasVisiblePassword: false,
    }
  },
  computed: {
    validEmail() {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
    },
    getProgress() {
      let progress = 0
      // at least one number

      if (/\d/.test(this.password)) {
        progress += 20
      }

      // at least one capital letter

      if (/(.*[A-Z].*)/.test(this.password)) {
        progress += 20
      }

      // at menons a lowercase

      if (/(.*[a-z].*)/.test(this.password)) {
        progress += 20
      }

      // more than 5 digits

      if (this.password.length >= 6) {
        progress += 20
      }

      // at least one special character

      if (/[^A-Za-z0-9]/.test(this.password)) {
        progress += 20
      }

      return progress
    },
  },
  methods: {
    login() {
      console.log('logging in')
      this.$fire.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Signed in
          this.$store.commit('setUser', userCredential.user)
          this.$router.push('/')
        })
        .catch((error) => {
          this.$vs.notification({
            color: 'danger',
            title: 'Login Failed',
            text: `${error.message}`,
          })
        })
    },
    register() {},
  },
}
</script>
