<template>
    <div class="imageFeed_container">
        <header-nav></header-nav>
        <transition-group tag="div" name="list">
            <image-card :imageCard="imageCard" v-for="imageCard in imageCards" :key="imageCard.id"></image-card>
        </transition-group>
    </div>
</template>
<script>
    import ImageCard from './ImageCard.vue'
    import { mapGetters } from 'vuex'
    import HeaderNav from './Header.vue'
    export default {
        name: 'image-feed',
        components: {  ImageCard, HeaderNav },
        data () {
            return {
                imageCardRef: firebase.database().ref('imageCard'),
                privateImageCardRef: firebase.database().ref('privateImageCard'),
                searchRef: firebase.database().ref('searchItem'),
                imageCards: [],
                listeners: [],
                searchItemIds: []

            }
        },
        computed: {
            ...mapGetters(['currentSearchItem', 'isPrivate', 'currentUser'])
        },
        watch: {
            currentSearchItem () {
                this.detachListeners()
                this.addListeners()
            }

        },
        mounted () {
            this.addListeners()
        },
        methods: {
            addListeners () {
                console.log("imageCards", this.imageCards)
                let ref = this.getImageRef()
                ref.child(this.currentSearchItem.id).on('child_added', snap => {    
                    console.log("ref snap.val():",snap.val())
                    let image = snap.val()
                    image['id'] = snap.key               
                    this.imageCards.push(image)
                    this.$nextTick( () => {
                        $('html, body').scrollTop($(document).height())
                    })
                    
                    
                })
                
                this.addToListeners(this.currentSearchItem.id, ref, 'child_added')
            },
            addToListeners(id, ref, event){
                let index = this.listeners.findIndex( el => {
                    return el.id === id && el.ref === ref && el.event === event
                })
                if(index === -1){
                    this.listeners.push({id: id, ref: ref, event: event})
                }
            },
            detachListeners () {
                this.listeners.forEach( listener => {
                    listener.ref.child(listener.id).off(listener.event)
                })
                this.listeners = []
                this.images = []
              
            },
            getImageRef () {
                if(this.isPrivate){
                    return this.privateImageCardRef
                }else{
                    return this.imageCardRef
                }
            }
        },
        beforeDestroy () {
            this.detachListeners()
        }

    }
</script>

<style scoped>
  
    .imageFeed_container{
        width: 100%;
        flex:10;
        height:100%;
    }
    .messages_container .comments{
        font-size: 1.2em;
    }  
    .list-enter-active{
        transition: all 0.3s
    }  
    .list-enter, .list-leave-to{
        opacity: 0;
        transform: translateX(30px);
    }
</style>