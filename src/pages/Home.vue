<template>
  <div class="home_container">
  	<sidebar></sidebar>
  	<image-feed></image-feed>
  </div>
</template>

<script>
import Sidebar from "../components/sidebar/Sidebar.vue";
import ImageFeed from "../components/mainfeed/ImageFeed.vue";
export default {
	name: 'home',
	components: {Sidebar, ImageFeed},
	data () {
		return {
		}
	}
}
</script>

<style scoped>
	.home_container{
		height: auto;
		display: flex;
    	/*border:1px solid red;*/
	}
</style>