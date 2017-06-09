import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import firebase from 'firebase'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Home from './pages/Home.vue'
import Admin from './pages/Admin.vue'
import store from './store/store.js'


Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		component: Login
	},
	{
		path: '/register',
		component: Register
	},
	{
		path: '/home',
		component: Home
	},
	{
		path: '/',
		component: Admin,
		beforeEnter: (to, from, next) => {
			if(!firebase.auth().currentUser){
				next('/login');
			}else{
				next();
			}
		}
	}
]
const router = new VueRouter({routes})
//Initialize Firebase

  let config = {
    apiKey: "AIzaSyCIF4o3M1OKuFGVKy4k5s2Gf3aMRz7s7lE",
    authDomain: "lovelyfaceuglycity.firebaseapp.com",
    databaseURL: "https://lovelyfaceuglycity.firebaseio.com",
    projectId: "lovelyfaceuglycity",
    storageBucket: "lovelyfaceuglycity.appspot.com",
    messagingSenderId: "997628556408"
  };
  firebase.initializeApp(config);

  window.firebase = firebase;

const unsubscribe = firebase.auth().onAuthStateChanged(user => {
	store.dispatch('setUser',user);

	new Vue({
	  el: '#app',
	  router,
	  store,
	  render: h => h(App)
	})
	
})