import Vue from 'vue'
import Vuesax from 'vuesax'

const numeral = require('numeral')
Vue.use(Vuesax)

Vue.filter('doubleForm', function (value) {
  return numeral(value).format('0,0.00') // displaying other groupings/separators is possible, look at the docs
})
