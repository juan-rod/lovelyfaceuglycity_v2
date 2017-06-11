<template>
  <div class="sidebar">
  	<user></user>
  	<Search-Item></Search-Item>
  </div>
</template>

<script>
import SearchItem from './SearchItem.vue'
import User from './User.vue'
export default {
	name: 'sidebar',
	components: {SearchItem, User},
	data () {
		return {

		}
	}
}
</script>

<style scoped>
	.sidebar{
		position: fixed;
		display: flex;
		flex: 2;
		flex-flow:	column nowrap;
		width: 200px;
		padding: 10px;
		top: 0;
		left: 0;
		bottom: 0;
		background-color: #eee;
		padding-top: 110px;
	}
</style>