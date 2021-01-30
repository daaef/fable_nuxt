/* eslint-disable eqeqeq */

export default async function ({ store, redirect, route }) {
  if (process.client) {
    await console.log('Setting up Project.....')
  }
}
