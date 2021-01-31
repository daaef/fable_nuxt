<template>
  <main>
    <div class="flex-centered">
      <div class="login-card">
        <img class="logo" src="~/assets/img/logo.png" alt="" />
        <h3 class="mb-20">Create Your Account</h3>
        <div class="mt-input mt-10">
          <vs-input
            v-model="businessName"
            type="text"
            label-placeholder="Business Name"
          >
            <template #icon>
              <i class="bx bxs-business" />
            </template>
          </vs-input>
        </div>
        <div class="mt-input mt-10">
          <vs-input
            v-model="location"
            type="text"
            label-placeholder="Business Location"
          >
            <template #icon>
              <i class="bx bx-current-location" />
            </template>
          </vs-input>
        </div>
        <div class="mt-input mt-10">
          <vs-input
            v-model="phone"
            type="text"
            label-placeholder="Business Phone Number"
          >
            <template #icon>
              <i class="bx bx-phone" />
            </template>
          </vs-input>
        </div>
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

            <template v-if="getProgress === 60" #message-warn>
              Average password
            </template>

            <template v-if="getProgress === 40" #message-warn>
              Weak password
            </template>

            <template v-if="getProgress === 20" #message-danger>
              Insecure password
            </template>
          </vs-input>
        </div>
        <div class="mt-input">
          <vs-input
            v-model="password2"
            type="password"
            label-placeholder="Password"
            :visible-password="hasVisiblePassword2"
            icon-after
            @click-icon="hasVisiblePassword2 = !hasVisiblePassword2"
          >
            <template #icon>
              <i v-if="!hasVisiblePassword2" class="bx bx-show-alt" />
              <i v-else class="bx bx-hide" />
            </template>
            <template v-if="password === password2" #message-success>
              Passwords Match
            </template>
            <template v-else #message-danger>
              Passwords are not the same
            </template>
          </vs-input>
        </div>

        <div class="mt-sub--button">
          <vs-button @click.prevent="signup"> Submit </vs-button>
        </div>
        <div class="mt-10">
          <nuxt-link to="/auth/login">
            Already have an account? Login
          </nuxt-link>
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
      businessName: '',
      phone: '',
      location: '',
      email: '',
      password: '',
      password2: '',
      subActive: 0,
      hasVisiblePassword: false,
      hasVisiblePassword2: false,
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
    signup() {
      console.log('Signing Up...')
      if (this.password !== this.password2) {
        return this.$vs.notification({
          color: 'danger',
          title: 'Cannot Register',
          text: `"${this.password2}" is not the same with "${this.password}"`,
        })
      } else if (this.getProgress < 40) {
        return this.$vs.notification({
          color: 'danger',
          title: 'Insecure Password',
          text: `"${this.password}" is not a secure password!`,
        })
      } else {
        this.$fire.auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            this.$fire.firestore
              .collection('users')
              .doc(userCredential.user.uid)
              .set({
                businessName: this.businessName,
                phone: this.phone,
                location: this.location,
                email: this.email,
              })
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
      }
    },
    register() {},
  },
}
</script>
