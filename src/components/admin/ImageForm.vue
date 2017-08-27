<template>
  <div class="imageform_container">
  	<div class="extra">
        <button class="ui circular icon right floated button" @click="logout">
            <i class="icon sign out"></i>
        </button>
        <router-link class="ui circular icon right floated button" to="/">
            <i class="icon hand peace"></i>
        </router-link>
    </div>
  	<div class="addnewImgDiv">
		<h3>Add a photo</h3>
	</div>
	<form>
	  <div class="form-group">
	    <input type="text" class="form-control" id="title" aria-describedby="Title" placeholder="Title" v-model.trim="imageCard.title">
	  </div>
	  <div class="form-group">
	    <input type="text" class="form-control" id="description" placeholder="Description" v-model.trim="imageCard.desc">
	  </div>
	  <div class="form-group">
	    <input type="text" class="form-control" id="location" placeholder="Location" v-model.trim="imageCard.location">
	  </div>
		<upload-file :imageCard="imageCard" ref="upload_file"></upload-file>
	</form>
	<!-- <div class="image__preview">
		<image-card :imageCard="imageCard" v-for="imageCard in imageCards" :key="imageCard.id"></image-card>
	</div> -->
	
	

  </div>
</template>

<script>
import ImageCard from '../mainfeed/ImageCard.vue'
import { mapGetters } from 'vuex'
import UploadFile from './UploadFile.vue'
import uuidV4 from 'uuid/V4'
import moment from 'moment'

export default {
	name: 'image-form',
	components: { UploadFile, ImageCard },
	data () {
		return {
			imageCard :{
				title: '',
				desc: '',
				location: ''
			},
			imageCards:{},
			errors: [],
	        storageRef: firebase.storage().ref(),
	        imageCardRef: firebase.database().ref('imageCard'),
            privateImageCardRef: firebase.database().ref('privateImageCard'),
            searchRef: firebase.database().ref('searchItem'),
            presenceRef: firebase.database().ref('presence'),
	        uploadTask: null,
	        uploadState: null,
	        firstLoad: true,
	        searchItem:[],
	        new_searchItem: '',
			search: null,
            thisMonth : moment().get('month')
		}
	},
	computed: {
		...mapGetters(['currentSearchItem', 'currentUser', 'isPrivate'])
	},
	 mounted () {
    	this.addListeners()
    },
	methods: {
		addListeners () {
            this.searchRef.on('child_added', snap => {
                console.log("snap:",snap);
    			this.searchItem.push(snap.val())
                let monthName = snap.val().name
                let searchMonth = moment().month(this.thisMonth).format('MMM')
                if(searchMonth !== monthName){
                    this.addSearchItem()
                }

                if(this.firstLoad && this.searchItem.length > 0){
                    console.log("this.searchItem[0]:",this.searchItem[0])
                    this.$store.dispatch("setCurrentSearchItem", this.searchItem[0])
                    this.search = this.searchItem[0]
                    console.log("this.search:",this.search);
                }
                this.firstLoad = false
            })
        },
        addSearchItem () {
            // this.errors = []
            let key = this.searchRef.push().key
            let newSearchItem = { id: key, name: searchMonth}
            console.log("newSearchItem:",newSearchItem);
            this.searchRef.child(key).update(newSearchItem).then( () => {
                // this.new_searchItem = ''
                // $("#searchItemModal").modal('hide')                 
            }).catch( error => {
                this.errors.push(error.message)
            })
                
            
        },
		sendImageCard () {
			if(this.currentSearchItem !== null){
				if(this.imageCard.length > 0){
					this.$parent.getImageRef().child(this.currentSearchItem.id).push().set(this.createImageCard()).then( () => {

					}).catch(error => {
						this.errors.push(error.message)
					})
					this.imageCard = ""
				}
			}else{
				console.log("this.currentSearchItem === null:",this.currentSearchItem);
			}
		},
		createImageCard (fileUrl = null) {
			let imageCard = {
				timestamp : firebase.database.ServerValue.TIMESTAMP,
				user: {
					name:this.currentUser.displayName,
					avatar:this.currentUser.photoURL,
					id: this.currentUser.uid
				}
			}
			if(fileUrl != null){
				imageCard['image'] = fileUrl
				imageCard['content'] = this.imageCard
				imageCard['id'] = this.search.id
			}else{
				imageCard['content'] = this.imageCard
			}
			console.log("imageCard:",imageCard);
			return imageCard
		},
		uploadFile(file, metadata) {
			if(file === null) return false
			console.log("file:",file);
			console.log("metadata:",metadata);
			console.log("this.currentSearchItem:",this.currentSearchItem);
			// if(this.currentSearchItem.id === null){
			// 	this.searchRef.on('child_added', snap => {
			// 		let id = snap.val().id
			// 			console.log("pathToUpload:",pathToUpload);
			// 	})
			// }
					let pathToUpload = this.currentSearchItem.id
			// let pathToUpload = this.imageCard
			let ref = this.getImageRef()
			let filePath = this.getPath() + '/' + uuidV4() 
		

			//upload file

			this.uploadTask = this.storageRef.child(filePath).put(file, metadata)
			this.uploadState = 'uploading'
			this.uploadTask.on('state_changed', snap => {
				let percent = (snap.bytesTransferred / snap.totalBytes) * 100
                  $("#uploadedFile").progress("set percent", percent)
			}, error => {
				this.errors.push(error.message)
                this.uploadState = 'error'
                this.uploadTask = null
			}, () => {
				this.uploadState = 'done'
	            this.$refs.upload_file.resetForm()
	            //Retrieving the file url
	            let fileUrl = this.uploadTask.snapshot.downloadURL
	            this.sendFileImage(fileUrl, ref, pathToUpload)
			})
		},
		sendFileImage(fileUrl, ref, pathToUpload){
			console.log("fileUrl:",fileUrl);
			console.log("ref:",ref);
			console.log("pathToUpload:",pathToUpload);
                
	        ref.child(pathToUpload).push().set(this.createImageCard(fileUrl)).then( () => {
	            this.$nextTick(() => {
	                $("html, body").scrollTop($(document).height())
	            })
	        }).catch( error => {
	            this.errors.push(error.message)
	        })
	    },
	    logout () {                
            this.presenceRef.child(this.currentUser.uid).remove()
            firebase.auth().signOut()
            this.$store.dispatch("setUser", null)
            this.$router.push('/login')
        },
	    getPath() {
          	if(this.isPrivate){
            	return 'tchat/private/'+this.currentChannel.id
          	}else{
            	return 'tchat/public'
          	}
      	},
      	getImageRef () {
            if(this.isPrivate){
                return this.privateImageCardRef
            }else{
                return this.imageCardRef
            }
        }    
	},
	beforeDestroy () {
      	if(this.uploadTask !== null){
          this.uploadTask.cancel()
          this.uploadTask = null
      	}
  	}
}
</script>

<style scoped>
	.imageform_container{
		height: 100vh;    
		padding: 7% 10%;
	}
	form {
		margin-top: 10%;
	}
	input{
		height: 50px;
    	font-size: 25px;
	}
</style>