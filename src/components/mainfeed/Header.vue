<template>
	<div class="col header__container">
		<h1>LovelyFaceUglyCity</h1>
		<div class="line-through"></div>
	</div>
</template>
<script>
</script>
<style scoped>
	.header__container{
		height: 5%;
		margin-top: 5%;
    	text-align: center;
    	padding: 0;
	    background: rgba(0, 0, 0, 0.03);
    	overflow: scroll;
	}
	h1{
		font-size: 11rem;
	    color: rgb(66, 204, 162);
	    font-weight: 900;
	    letter-spacing: 4px;
	    text-shadow: 14px -11px 0px rgb(243, 110, 212);
	}
	.line-through{
		border: 1px solid #ffa17f;
		position: absolute;
	    top: 65px;
	    width: 100%;
    	right: -325px;
	}

@media only screen and (min-width: 1200px){
	.line-through{
	    width: 50%;
    	right: 0px;
	}
}    

@media only screen and (min-width: 1024px) and (max-width: 1199px){
	.line-through{
	    width: 50%;
    	right: 0px;
	}
}

@media only screen and (min-width: 768px) and (max-width: 1023px){
	
}

@media only screen and (min-width: 480px) and (max-width: 767px){
		
}

@media only screen and (min-width: 320px) and (max-width: 479px){
	
}
</style>