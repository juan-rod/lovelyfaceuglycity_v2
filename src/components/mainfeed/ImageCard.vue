<template>
	<div class="imageCard_container">
		<div class="imageCard_content">
			<div class="metadata">
                <span class="date imageCard_date"> {{ imageCard.timestamp | fromNow }}</span>
            </div>
            <div class="text">{{ imageCard.content }}</div>

            <img class="ui image imageCard_image" :src="imageCard.image" alt="image">
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

</style>
