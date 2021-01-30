/* eslint-disable eqeqeq */
export default function ({ store, redirect, route }) {
  console.log('Setting up Project.....')
  store.dispatch('setupProject')
}
