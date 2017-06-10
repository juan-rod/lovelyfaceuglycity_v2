<template>
  <div class="imageform_container">
  	<div class="addnewImgDiv">
		<h3>Add a photo</h3>
	</div>
	<md-input-container>
	    <md-icon>create</md-icon>
	    <label>Title</label>
	    <md-input type="text" v-model.trim="travelCard.pTitle"></md-input>
	</md-input-container>
	<md-input-container>
	    <md-icon>view_headline</md-icon>
	    <label>Description</label>
	    <md-input type="text" v-model.trim="travelCard.desc"></md-input>
	</md-input-container>
	<md-input-container>
	    <md-icon>label</md-icon>
	    <label>Location</label>
	    <md-input type="text" v-model.trim="travelCard.location"></md-input>
	</md-input-container>
	
	<upload-file></upload-file>

	<md-button type="submit" class="md-raised md-primary">Add #{{ travels.length }}</md-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadFile from './UploadFile.vue'
import uuidV4 from 'uuid/V4'

export default {
	name: 'image-form',
	components: { UploadFile },
	data () {
		return {
			travelCard :{
				title: '',
				desc: '',
				location: ''
			},
			travels:{},
			errors: [],
	        storageRef: firebase.storage().ref(),
	        travelRef: firebase.storage().ref('travels'),
	        uploadTask: null,
	        uploadState: null
		}
	},
	computed: {
		...mapGetters(['currentChannel', 'currentUser', 'isPrivate'])
	},
	methods: {
		sendImageForm () {
			if(this.currentChannel !== null){
				if(this.travelCard.length > 0){
					this.$parent
				}
			}
		},
		createImageForm (fileUrl = null) {
			let travelCard = {
				timestamp : firebase.database.ServerValue.TIMESTAMP,
				user: {
					name:this.currentUser.displayName,
					avatar:this.currentUser.photoURL,
					id: this.currentUser.uid
				}
			}
			if(fileUrl != null){
				travelCard['image'] = fileUrl
			}else{
				travelCard['content'] = this.travelCard
			}
			return travelCard
		}
		
	}
}
</script>

<style scoped>
	.imageform_container{
		height: 100%;    
		padding: 7% 25%;
	}
</style>