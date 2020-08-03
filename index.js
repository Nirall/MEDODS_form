//import Vue from 'vue';
//import Vuelidate from 'vuelidate';
Vue.use(window.vuelidate.default)
//Vue.use(Vuelidate);

var app = new Vue({
  el: '#app',
  data: {
    message: "Hello!",
    description: "My first vue app",
    image: "image.png",
    altText: "Yolochka",
    link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
    inStock: 20,
    onSale: true,
  }
})
