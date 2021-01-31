<template>
  <div class="main-content">
    <h3 class="mb-10">Add Product</h3>
    <div class="add--products row">
      <div
        class="vs-col--lg-7 vs-col--sm-6 vs-col--xs-12 order-2 product--form"
      >
        <div class="mb-10 p-10 mt-10">
          <vs-input
            v-model="firstname"
            state="dark"
            label-placeholder="First Name"
          />
        </div>
        <div class="mb-10 p-10">
          <vs-input
            v-model="lastname"
            state="dark"
            label-placeholder="Last Name"
          />
        </div>
        <div class="mb-10 p-10">
          <vs-select label-placeholder="Select Product" v-model="category">
            <vs-option label="Banana" value="banana"> Banana </vs-option>
            <vs-option label="Brown Beans" value="brownbeans">
              Brown Beans
            </vs-option>
            <vs-option label="Cassava" value="casava"> Cassava </vs-option>
            <vs-option label="Dates" value="dates"> Dates </vs-option>
            <vs-option label="Groundnut" value="groundnut">
              Groundnut
            </vs-option>
            <vs-option label="Maize" value="maize"> Maize </vs-option>
            <vs-option label="Plantain" value="plantain"> Plantain </vs-option>
            <vs-option label="Rice" value="rice"> Rice </vs-option>
            <vs-option label="Strawberry" value="strawberry">
              Strawberry
            </vs-option>
            <vs-option label="Tomatoes" value="tomatoes"> Tomatoes </vs-option>
            <vs-option label="White Beans" value="whitebeans">
              White Beans
            </vs-option>
            <vs-option label="Yam" value="yam"> Yam </vs-option>
          </vs-select>
        </div>
        <div class="mb-10 p-10 mt-10">
          <vs-input
            v-model="company"
            state="dark"
            label-placeholder="Company"
          />
        </div>
        <div class="mb-10 p-10">
          <vs-input
            v-model="location"
            state="dark"
            label-placeholder="location"
          />
        </div>
        <div class="mb-10 p-10 mt-10">
          <vs-input v-model="price" state="dark" label-placeholder="Price" />
        </div>
        <div class="mb-10 p-10">
          <vs-input
            v-model="discount"
            state="dark"
            type="number"
            label-placeholder="Discount"
          />
        </div>
        <div class="p-10">
          <vs-button class="vs-col--lg-12" @click="addProduct" success>
            Add Product
          </vs-button>
        </div>
        <div class="mt-10 check--preview">Check preview above</div>
      </div>
      <div
        class="vs-col--lg-5 vs-col--sm-6 p-15 vs-col--xs-12 order-1 product--preview"
      >
        <h3 class="mb-10">Product Preview</h3>
        <div class="mb-10 p-10 mt-10">
          <vs-card>
            <template #title>
              <h3>{{ company }}</h3>
            </template>
            <template #img>
              <LazyImage v-if="category" :src="imageUrl" />
            </template>
            <template #text>
              <p>{{ farmer }}</p>
              <p class="light">
                {{ location }}
              </p>
            </template>
            <template #interactions>
              <vs-button danger icon>
                <i class="bx bx-heart" />
              </vs-button>
              <vs-button class="btn-chat" shadow primary>
                <span class="span"> {{ price | doubleForm }} </span>
              </vs-button>
              <vs-button
                v-if="discount && !!Number(discount)"
                class="btn-discount"
                danger
              >
                <span class="span"> -{{ Number(discount) }}% </span>
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
  data() {
    return {
      firstname: '',
      lastname: '',
      category: '',
      company: '',
      discount: 0,
      location: '',
      price: '',
    }
  },
  async fetch() {
    console.log('running fetch')
    await this.$store.dispatch('setupProject')
  },
  computed: {
    user() {
      return this.$store.state.authUser
    },
    farmer() {
      return `${this.firstname} ${this.lastname}`
    },
    desc() {
      return `${this.category[0].toUpperCase()}${this.category.slice(1)}`
    },
    image() {
      return `gs://fable-c0c36.appspot.com/${this.category}.png`
    },
    imageUrl() {
      if (this.categories) {
        return this.categories[`${this.category}`]
      } else {
        return ''
      }
    },
    ...mapGetters({
      categories: 'categories',
    }),
  },
  methods: {
    resetFields() {
      this.firstname = ''
      this.lastname = ''
      this.category = ''
      this.company = ''
      this.discount = 0
      this.location = ''
      this.price = ''
    },
    addProduct() {
      console.log('adding product to DB......')
      this.$fire.firestore
        .collection('products')
        .add({
          company: this.company,
          desc: this.desc,
          discount: this.discount,
          farmer: this.farmer,
          image: this.image,
          location: this.location,
          price: this.price,
        })
        .then((addedData) => {
          this.resetFields()
          console.log('added Data is ', addedData)
          this.$vs.notification({
            color: '#4c7900',
            title: 'Product Added!',
            text: `${this.desc} added successfully`,
          })
        })
    },
  },
}
</script>

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
