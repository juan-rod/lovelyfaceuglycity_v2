<template>
  <div class="user">
  	<div v-for="user in users" :key="user.uid" >
  		{{user.name}}
  	</div>
  </div>
</template>

<script>
	 import { mapGetters } from 'vuex'
export default {
	name: 'user',
	data () {
		return {
			usersRef: firebase.database().ref('users'),
			users:[]
		}
	},
	computed: {
        ...mapGetters(['currentSearchItem', 'isPrivate', 'currentUser'])
    },
    mounted () {
        // this.addListeners()
    },
	methods: {
		addListeners () {
			// Do I want to add users name to sidebar? if so complete below//
			this.usersRef.child(this.currentUser.uid).on('child_added', snap => {

					this.users.push(snap.val())

                	console.log("this.users:", this.users)
                	console.log("snap.key:", snap.key)
                	
              
            })
		}
	}
}
</script>

<style scoped>

</style>