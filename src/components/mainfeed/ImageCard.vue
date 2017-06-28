<template>
	<div class="imageCard_container col d-flex justify-content-center">
		<div class="row">
			<div class="image-content">
	            <div class="image-card col-12">
	            	<img class="imageCard_image" :src="imageCard.image" alt="image">
	            </div>
				<div class="image-details col-12">
					<h3>{{imageCard.content.title}}</h3> 
                    <p class="text-muted">{{imageCard.content.desc}}</p> 
                    <p class="text-muted">{{imageCard.content.location}}</p> 
	                <span class="date imageCard_date text-muted"> {{ imageCard.timestamp | fromNow }}</span>
	            </div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import moment from 'moment'

	export default {
		name: 'image-card',
		props:['imageCard'],
		computed: {
			...mapGetters(['currentUser'])
		},
		methods: {

            isFile(message){
                return message.content == null && message.image != null
            }
		},
		filters: {
			fromNow (value) {
				return moment(value).fromNow()
			}
		}
	}
</script>

<style scoped>
	.imageCard_container{
		/*border:3px dotted pink;*/
	}
	.image-content{
		/*border:1px dotted red;*/
	}
	.image-details{
		/*border:1px dotted red;*/
		text-align: right;
		position: relative;
	    bottom: 87px;
	    color: white;
	    padding: 0 4%;
	    font-family: 'Roboto', sans-serif;
	}
</style>
