<template>
	<div class="imageCard_container">
		<div class="imageCard_content">
			<div class="metadata">
                <span class="date imageCard_date"> {{ imageCard.timestamp | fromNow }}</span>
            </div>
            <div class="text" v-if="!isFile(imageCard)">{{ imageCard.content }}</div>

            <img class="ui image imageCard_image" :src="imageCard.image" alt="image" v-else>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import moment from 'moment'

	export default {
		name: 'image-card',
		props:['image'],
		computed: {
			...mapGetters(['currentUser'])
		},
		methods: {

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
