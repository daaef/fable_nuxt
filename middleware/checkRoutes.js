/* eslint-disable eqeqeq */
export default function ({ store, redirect, route }) {
  if (!store.state.authUser) {
    if (route.name === 'auth-login') {
      return
    }
    return redirect('/auth/login')
  }
}
