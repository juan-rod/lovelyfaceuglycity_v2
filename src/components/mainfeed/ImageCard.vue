<template>
	<!-- <div class="imageCard_container col d-flex justify-content-center"> -->
	<div class="imageCard_container col">
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
	.image-content{
		    margin:5%;
	}
	.image-details{
		text-align: right;
		position: relative;
	    bottom: 87px;
	    left:127px;
	    color: white;
	    padding: 0 4%;
	    /*font-family: 'Roboto', sans-serif;*/
	    font-family: 'Fira Mono', monospace;
	}
	.image-details h3{
		margin:0;
	}
	.image-details p {
		margin: 0;
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
		border: 2px solid #f36ed4;
		width: 80%;
		-webkit-box-shadow: 15px 20px 0px 0px rgb(4, 4, 4);
-moz-box-shadow: 15px 20px 0px 0px rgb(4, 4, 4);
box-shadow: 15px 20px 0px 0px rgb(4, 4, 4);

	}
	.image-details-desc{
		color:#f1f1f1;
		position: absolute;
	    right: 0;
	    top: 12px;
	}
	.image-details-location{
		color:#f1f1f1;
	    position: relative;
	    right: 0;
	    top: 10px;
	    z-index: 1;
	}
	.image-details-timestamp{
		color:#d6d6d6;
		position: relative;
	    top: 0px;
	    left: 0px;
	    width: 100px;
	}
	@media only screen and (min-width: 1200px){

}    

@media only screen and (min-width: 1024px) and (max-width: 1199px){

}

@media only screen and (min-width: 768px) and (max-width: 1023px){
	
}

@media only screen and (min-width: 480px) and (max-width: 767px){
		
}

@media only screen and (min-width: 320px) and (max-width: 479px){
	.image-details{
		left: 0;
	}
}
</style>
