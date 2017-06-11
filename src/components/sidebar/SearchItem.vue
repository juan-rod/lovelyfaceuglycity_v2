<template>
	<div class="searchItem_container">
		<!-- <h2 class="ui inverted center aligned header">SeachItems <i class="add square icon add_searchItem" @click="openSearchModal"></i></h2> -->
	  	<div class="searchItem_list">
	  		<ul>
	  			<!-- <li class="searchItem_item"
	  				v-for="search in searchItem"
	  				:key="search.id"
	  				:class="{'is_active': setSearchActive(search)}"
	  				@click="changeSearchItem(search)">
	  				{{search.name}}
	  			</li> -->
	  			<li class="searchItem_item"
	  				v-for="search in searchItem"
	  				:key="search.id"
	  				
	  				@click="changeSearchItem(search)">
                    {{search.name}}
	  			</li>

	  		</ul>
	  	</div>

	  	   <!-- Modal Pour ajouter un Channel -->

        <!-- <div class="ui basic modal" id="searchItemModal">
            <div class="ui icon header">
                Create a New Seach Item
            </div>

            <div class="content">
                <div class="ui inverted form" :class="{'error': hasErrors }">
                    <div class="field">
                        <label for="new_searchItem">Search Item Name</label>
                        <input type="text" name="new_searchItem" v-model="new_searchItem" id="new_searchItem">
                    </div>

                    <div class="ui error message" v-if="hasErrors">
                        <p v-for="error in errors">{{ error }}</p>
                    </div>
                </div>
            </div>

            <div class="actions">
                <div class="ui red basic cancel inverted button">
                    <i class="remove icon"></i>Cancel
                </div>
                <div class="ui green inverted button" @click="addSearchItem">
                    <i class="checkmark icon"></i>Submit
                </div>
            </div>
        </div> -->
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
    import uuidV4 from 'uuid/V4'
    import moment from 'moment'
	export default {
		name: 'searchItem',
		data () {
			return {
				searchItem:[
                    // {id: uuidV4(), name: moment().month(0).format('MMM') },
                    // {id: uuidV4(), name: moment().month(1).format('MMM') },
                    // {id: uuidV4(), name: moment().month(2).format('MMM') },
                    // {id: uuidV4(), name: moment().month(3).format('MMM') },
                    // {id: uuidV4(), name: moment().month(4).format('MMM') },
                    // {id: uuidV4(), name: moment().month(5).format('MMM') },
                    // {id: uuidV4(), name: moment().month(6).format('MMM') },
                    // {id: uuidV4(), name: moment().month(7).format('MMM') },
                    // {id: uuidV4(), name: moment().month(8).format('MMM') },
                    // {id: uuidV4(), name: moment().month(9).format('MMM') },
                    // {id: uuidV4(), name: moment().month(10).format('MMM') },
                    // {id: uuidV4(), name: moment().month(11).format('MMM') }
                ],
				new_searchItem: '',
				searchRef: firebase.database().ref('searchItem'),
				imageCardRef: firebase.database().ref('travelCard'),
				errors:[],
				firstLoad: true,
				search: null,
                thisMonth : moment().get('month')
                
			}
		},
		computed : {
            ...mapGetters(['currentSearchItem', 'isPrivate']),
            hasErrors () {
                return this.errors.length > 0
            }
        },
        mounted () {
        	// this.addListeners()
            // this.addSearchItem()
        },
        methods: {
        	// addListeners () {
         //        this.searchRef.on('child_added', snap => {
         //            console.log("snap:",snap);
        	// 		this.searchItem.push(snap.val())
         //            let monthName = snap.val().name
         //            let searchMonth = moment().month(this.thisMonth).format('MMM')
         //            if(searchMonth !== monthName){
         //                this.addSearchItem()
         //            }

         //            if(this.firstLoad && this.searchItem.length > 0){
         //                console.log("this.searchItem[0]:",this.searchItem[0])
         //                this.$store.dispatch("setCurrentSearchItem", this.searchItem[0])
         //                this.search = this.searchItem[0]
         //                console.log("this.search:",this.search);
         //            }
         //            this.firstLoad = false
         //        })
         //    },
            openSearchModal () {
                $("#searchItemModal").modal('show')
            },
            // addSearchItem () {
            //     this.errors = []
            //     let key = this.searchRef.push().key
            //     let newSearchItem = { id: key, name: searchMonth}
            //     console.log("newSearchItem:",newSearchItem);
            //     this.searchRef.child(key).update(newSearchItem).then( () => {
            //         // this.new_searchItem = ''
            //         // $("#searchItemModal").modal('hide')                 
            //     }).catch( error => {
            //         this.errors.push(error.message)
            //     })
                    
                
            // },
            changeSearchItem(search){   
                // this.resetNotifications()                          
                this.$store.dispatch('setPrivate', false)
                this.$store.dispatch('setCurrentSearchItem', search)
                this.search = search
            },
            detachListeners () {
                this.searchRef.off()
                this.searchItem.forEach( el => {
                    this.imageCardRef.child(el.id).off()
                })
            },
            setSearchActive(search){
                return search.id === this.currentSearchItem.id
            } 
        }
	}
</script>

<style scoped>
.searchItem_container{

}
    .searchItem_list {
        min-height: 100px;
        /*max-height: 300px!important;*/
        overflow-y: auto!important;
    }
    .searchItem_container ul{
        margin: 0;
        padding: 0;
    }
    .searchItem_item{
        height: 30px;
        margin: 8px;
        list-style: none;
        background-color: #ca67ff;
        cursor: pointer;
        line-height: 30px;       
        border-radius: 2px;
        padding-left: 12px;
        font-weight: bold;
        font-size: 1.1em;
        color: black;
    }
    .channel__count{
        float:right;
    }
    .is_active{
        background-color: #9740c5;
    }
    .searchItem_item:hover{
        background-color: #9740c5;
    }
    .add_searchItem{
        cursor: pointer;
        /*color: #8BC34A;*/
    }
    .add_searchItem:hover{
        color: #689F38;
    } 
    #searchItemModal{
    	z-index: 2000;
    }
    .modal-backdrop {
	  z-index: -100 !important;
	}

</style>