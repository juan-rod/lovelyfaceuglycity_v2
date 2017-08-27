<template>
	<div class="imageCard_container col d-flex justify-content-center">
		<div class="row">
			<div class="image-content">
	            <div class="image-card col-12">
	            	<img class="imageCard_image" :src="imageCard.image" alt="image">
	            </div>
				<div class="image-details col-12">
					<div class="image-details-border-top"></div>
					<h3>{{imageCard.content.title}}</h3> 
                    <p class="image-details-desc">{{imageCard.content.desc}}</p> 
                    <p class="image-details-location">{{imageCard.content.location}}</p> 
	                <span class="date imageCard_date image-details-timestamp"> {{ imageCard.timestamp | fromNow }}</span>
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

	.image-details{
		text-align: right;
		position: relative;
	    bottom: 87px;
	    color: white;
	    padding: 0 4%;
	    font-family: 'Roboto', sans-serif;
	}
	.image-details-border-top{
		width: 50%;
	    background-color: #ffa17f;
	    height: 1px;
	    position: absolute;
	    left: 50%;
	    margin-top: -8px;
	}
	.image-card img {
		width: 80%;
		-webkit-box-shadow: 1px 1px 8px -1px rgba(0,0,0,0.75);
-moz-box-shadow: 1px 1px 8px -1px rgba(0,0,0,0.75);
box-shadow: 1px 1px 8px -1px rgba(0,0,0,0.75);

	}
	.image-details-desc{
		color:#f1f1f1;
	}
	.image-details-location{
		color:#f1f1f1;

	}
	.image-details-timestamp{
		color:#d6d6d6;

	}
</style>
