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
	/*.sidebar{
		position: fixed;
		display: flex;
		flex: 2;
		flex-flow:	column nowrap;
		min-width: 150px;
		padding: 10px;
		top: 0;
		left: 0;
		bottom: 0;
		background-color: #eee;
		padding-top: 110px;
	}*/
	.sidebar{
		flex:2;
		border:1px solid yellow;
		display:none;
	}
</style>