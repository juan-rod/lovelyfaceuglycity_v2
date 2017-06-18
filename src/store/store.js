import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	currentUser: null,
	currentSearchItem: null,
	isPrivate: false
}

const mutations = {
	SET_USER(state,user){
		state.currentUser = user
	},
	SET_CURRENT_SEARCHITEM(state, searchItem) {
		console.log("mutations state:", state)
		console.log("mutations searchItem:", searchItem)
		state.currentSearchItem = searchItem
	},
	SET_PRIVATE(state, isPrivate) {
		state.isPrivate = isPrivate
	}

}
const actions = {
	setUser({commit},user){
		commit("SET_USER", user)
	},
	setCurrentSearchItem({commit}, searchItem){
		console.log("actions searchItem:", searchItem)
		commit("SET_CURRENT_SEARCHITEM", searchItem)
	},
	setPrivate({commit}, isPrivate){
		commit("SET_PRIVATE", isPrivate)
	}
}

const getters = {
	currentUser: state => state.currentUser,
	currentSearchItem: state => state.currentSearchItem,
	isPrivate: state => state.isPrivate
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})