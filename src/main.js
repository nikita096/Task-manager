import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// Vuelidate
import Vuelidate from 'vuelidate'
//Materialize
import 'materialize-css/dist/js/materialize.min'
//Filters
import dateFilter from '@/filters/date_filter'
//Firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
//Messeges
import messagePlugin from '@/utils/message.plugin'
//Loader
import Loader from '@/components/Loader'
//Pagination
import Paginate from 'vuejs-paginate'
//tooltip
import tooltipDirective from '@/directives/tooltip_directive'
//VueMeta
import VueMeta from 'vue-meta'




Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.filter('date', dateFilter)
Vue.use(messagePlugin);
Vue.directive('tooltip', tooltipDirective)



firebase.initializeApp({
  apiKey: "AIzaSyA54D0NaggvPkQBEOD4tyaSZt_n1LgZMKc",
  authDomain: "task-manager-48a82.firebaseapp.com",
  databaseURL: "https://task-manager-48a82.firebaseio.com",
  projectId: "task-manager-48a82",
  storageBucket: "task-manager-48a82.appspot.com",
  messagingSenderId: "1056520650179",
  appId: "1:1056520650179:web:8947d3a3194671c7889176"
})


let app
firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  } 
})

