<template>
  <div class="admin_container">
  	<!-- <sidebar></sidebar> -->
  	<image-form></image-form>
  </div>
</template>

<script>
// import Sidebar from "../components/sidebar/Sidebar.vue";
import ImageForm from "../components/admin/ImageForm.vue";
export default {
	name: 'admin',
	components: {ImageForm},
	data () {
		return {
		}
	}
}
</script>

<style scoped>
	.home_container{
		height: 100%;
	}
</style>