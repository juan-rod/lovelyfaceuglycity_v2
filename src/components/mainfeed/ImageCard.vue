<template>
	<div class="imageCard_container col">
		<div class="imageCard_content row">
            <div class="text col-8">
            	<img class="ui image imageCard_image" :src="imageCard.image" alt="image">
            </div>
			<div class="metadata col-4">
                <span class="date imageCard_date"> {{ imageCard.timestamp | fromNow }}</span>
            	{{ imageCard.content }}
            </div>

		</div>
		<!-- <div v-for="imageCard in imageCards"> 
                    {{imageCard}}
                    <p>{{imageCard.content.title}}</p> 
                    <p>{{imageCard.content.location}}</p> 
                    <p>{{imageCard.content.desc}}</p> 
                    <p>{{imageCard.user.name}}</p> 
                    <img :src="imageCard.image">
                </div> -->
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
		border:1px dotted black;
	}
	.imageCard_content{
		border:1px dotted red;
	}
</style>
