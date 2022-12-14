import { createStore } from "vuex";

let store = createStore({
  state() {
    return {
      cartItems: [],
      isAuthenticated: false,
      totalPrice: 0,
    };
  },
  mutations: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },

    getProducts(state, payload) {
      let item = state.cartItems.find((i) => i.id === payload.id);

      if (item) {
        item.quantity++;
      } else {
        state.cartItems.push({ ...payload, quantity: 1 });
      }
    },

    deleteProduct(state, payload) {
      let tempProduct = state.cartItems;
      let productid = payload.id;

      console.log(productid);
      console.log(tempProduct);
      tempProduct = tempProduct.filter((item) => {
        return item.id != productid;
      });
      state.cartItems = tempProduct;
    },
  },
  getters: {
    totalPrice: (state) => {
      return state.cartItems.reduce((a, b) => a + b.price * b.quantity, 0);
    },
  },
  actions: {
    getProducts(context, product) {
      context.commit("getProducts", product);
      console.log(product);
    },
    deleteProduct(context, product) {
      context.commit("deleteProduct", product);
      console.log(product);
    },
  },
});

export default store;
