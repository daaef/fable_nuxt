<template>
  <section class="main-content">
    <div class="grid">
      <vs-row>
        <vs-col
          v-for="(product, index) in products"
          :key="index"
          class="pr"
          w="3"
        >
          <vs-card>
            <template #title>
              <h3>{{ product.company }}</h3>
            </template>
            <template #img>
              <img :src="images[`${product.desc.toLowerCase()}`]" alt="" />
            </template>
            <template #text>
              <p>{{ product.farmer }}</p>
              <p class="light">{{ product.location }}</p>
            </template>
            <template #interactions>
              <vs-button danger icon>
                <i class="bx bx-heart"></i>
              </vs-button>
              <vs-button class="btn-chat" shadow primary>
                <span class="span"> {{ product.price | doubleForm }} </span>
              </vs-button>
            </template>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      images: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.authUser
    },
    ...mapGetters({
      products: 'products',
    }),
  },
  async mounted() {
    // console.log('loging storage', this.$fire.storage.ref('banana.png'))
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
    this.images = images
    this.$fire.firestore
      .collection('products')
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        this.$store.commit('setProducts', data)
        // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]
      })
  },
  layout: 'default',
}
</script>
<style>
.main-content {
  width: 100%;
  padding: 40px 40px 40px 300px;
  height: 100vh;
}

.pr {
  padding-right: 10px;
}

.light {
  font-weight: 300;
  opacity: 0.5;
}
</style>

<!--
company:"Gyang Farms"
desc:"Tomatoes"
discount:null
farmer:"David Dung"
id:"6tSCPJNzPdRJH7hP6tFE"
image:"gs://fable-c0c36.appspot.com/tomatoes.png"
location:"Bukuru Jos"
price:"8000"
-->
