<template>
  <div class="main-content">
    <div class="grid">
      <div class="row">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="vs-col--lg-3 vs-col--sm-6 vs-col--xs-12 pr"
        >
          <vs-card>
            <template #title>
              <h3>{{ product.company }}</h3>
            </template>
            <template #img>
              <LazyImage :src="categories[`${product.desc.toLowerCase()}`]" />
            </template>
            <template #text>
              <p>{{ product.farmer }}</p>
              <p class="light">
                {{ product.location }}
              </p>
            </template>
            <template #interactions>
              <vs-button danger icon>
                <i class="bx bx-heart" />
              </vs-button>
              <vs-button class="btn-chat" shadow primary>
                <span class="span"> {{ product.price | doubleForm }} </span>
              </vs-button>
              <vs-button
                v-if="!!product.discount && !!Number(product.discount)"
                class="btn-discount"
                danger
              >
                <span class="span"> -{{ Number(product.discount) }}% </span>
              </vs-button>
            </template>
          </vs-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  async fetch() {
    console.log('running fetch')
    await this.$store.dispatch('setupProject')
  },
  computed: {
    ...mapGetters({
      user: 'user',
      products: 'products',
      categories: 'categories',
    }),
  },
}
</script>
