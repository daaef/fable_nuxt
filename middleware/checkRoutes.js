/* eslint-disable eqeqeq */
export default function ({ store, redirect, route }) {
  console.log('cheking route.....')
  if (!store.state.authUser) {
    if (route.name === 'auth-login' || route.name === 'auth-signup') {
      return
    }
    return redirect('/auth/login')
  }
  if (store.state.authUser) {
    if (route.name !== 'auth-login' || route.name !== 'auth-signup') {
      return
    }
    return redirect('index')
  }
}
