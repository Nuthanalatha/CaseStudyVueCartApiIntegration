<template>
  <div>
    <div className="container mt-3">
      <div className="row d-flex justify-content-center align-items-center">
        <div
          v-for="product in products"
          :key="product.id"
          class="card"
          style="width: 18rem"
        >
          <img
            class="card-img-top"
            :src="`../../assets/Images/${product.image}`"
            alt="Card image cap"
          />
          <div class="card-body">
            <p class="card-text">Id: {{ product.id }}</p>
            <h5 class="card-title">ProductName: {{ product.name }}</h5>
            <p class="card-text">ActualPrice: {{ product.actualPrice }}</p>
            <p class="card-text">
              DiscountedPrice: {{ product.discountedPrice }}
            </p>
            <button class="btn btn-danger" @click="DeleteProduct(product.id)">
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      products: [],
    };
  },

  methods: {
    //Get products list
    async fetchProducts() {
      try {
        let response = await axios.get(
          "https://localhost:44343/api/Shop/ProductListCart"
        );
        if (response.data.error) {
          let errMsg = response.data.message;
          console.log("errMsg", errMsg);
        } else {
          let resProducts = response.data.listproducts;
          this.products = resProducts;
          console.log("response.data.listproducts", response.data.listproducts);
          console.log("products", this.products);
        }
      } catch (err) {
        console.log("err", err);
      }
    },

    // delete the product
    async DeleteProduct(ID) {
      try {
        let response = await axios.delete(`/DeleteProduct/${ID}`);
        if (response.data.error) {
          let errMsg = response.data.message;
          console.log("errMsg", errMsg);
        } else {
          let resProducts = response.data.listproducts;
          this.products = resProducts;
          console.log("ID", ID);
          //   console.log("this.products",this.products);
          //   console.log("products", response.data.products);
          this.fetchProducts();
        }
      } catch (err) {
        console.log("err", err);
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style>
.product-card {
  display: flex;
  flex-direction: row;
  margin: 2% 0 0 2%;
  justify-content: space-around;
}

/* .product-card-inside {
  margin: 2%;
} */

#qty {
  width: 2.5rem;
}

.cart-summary {
  margin: 30px 0 0 45%;
}
</style>
