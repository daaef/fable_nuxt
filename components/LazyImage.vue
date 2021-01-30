<template>
  <transition name="appear" mode="in-out">
    <img
      v-if="!src"
      src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
      alt=""
    />
    <img v-else class="lazyload" :src="src" alt="Lazy Image loader" />
  </transition>
</template>

<script>
export default {
  name: 'LazyImage',
  props: {
    src: { type: String, required: true },
  },
}
</script>
