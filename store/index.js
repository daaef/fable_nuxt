export const state = () => ({
  authUser: null,
  products: null,
  categories: null,
  desktop: true,
})

export const mutations = {
  setUser(state, user) {
    console.log('setting user')
    state.authUser = user
  },
  setProducts(state, products) {
    console.log('setting products')
    state.products = products
  },
  setDesktop(state, value) {
    state.desktop = value
  },
  setCategories(state, categories) {
    console.log('setting categories')
    state.categories = categories
  },
  ON_AUTH_STATE_CHANGED_MUTATION(state, { authUser }) {
    if (!authUser) {
      console.log('no auth user')
    } else {
      const { uid, email, emailVerified, displayName } = authUser

      state.authUser = {
        uid,
        displayName,
        email,
        emailVerified,
      }
    }
  },
}

export const actions = {
  // Store action called nuxtServerInit:
  async nuxtServerInit({ dispatch, commit }, { res }) {
    if (res && res.locals && res.locals.user) {
      const { idToken: token, ...authUser } = res.locals.user

      console.log('authUser is from serverinint', authUser)
      await commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser, token })
    }
  },
  async onAuthStateChangedAction({ commit, dispatch }, { authUser }) {
    if (!authUser) {
      await dispatch('cleanupAction')

      return
    }

    // you can request additional fields if theyare optional (e.g. photoURL)
    const { uid, email, emailVerified, displayName } = authUser
    commit('setUser', {
      uid,
      email,
      emailVerified,
      displayName,
    })
  },
  async setupProject({ commit }) {
    console.log('setting up project from vuex')
    const images = {
      banana: await this.$fire.storage.ref('banana.png').getDownloadURL(),
      brownbeans: await this.$fire.storage
        .ref('brownbeans.png')
        .getDownloadURL(),
      casava: await this.$fire.storage.ref('casava.png').getDownloadURL(),
      dates: await this.$fire.storage.ref('dates.png').getDownloadURL(),
      groundnut: await this.$fire.storage.ref('groundnut.png').getDownloadURL(),
      maize: await this.$fire.storage.ref('maize.png').getDownloadURL(),
      plantain: await this.$fire.storage.ref('plantain.png').getDownloadURL(),
      rice: await this.$fire.storage.ref('rice.png').getDownloadURL(),
      tomatoes: await this.$fire.storage.ref('tomatoes.png').getDownloadURL(),
      strawberry: await this.$fire.storage
        .ref('strawberry.png')
        .getDownloadURL(),
      whitebeans: await this.$fire.storage
        .ref('whitebeans.png')
        .getDownloadURL(),
      yam: await this.$fire.storage.ref('yam.png').getDownloadURL(),
    }
    commit('setCategories', images)

    this.$fire.firestore
      .collection('products')
      .get()
      .then(function (querySnapshot) {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        commit('setProducts', data)
      })
  },
  cleanupAction({ commit }) {
    console.log('cleaning up')
    commit('setUser', null)
    commit('setProducts', null)
    commit('setCategories', null)
  },
}

export const getters = {
  user(state) {
    return state.authUser
  },
  products(state) {
    return state.products
  },
  categories(state) {
    return state.categories
  },
  desktop(state) {
    return state.desktop
  },
}
