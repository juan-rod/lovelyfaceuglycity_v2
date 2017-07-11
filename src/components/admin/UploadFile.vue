<template>
	<div>
        <!-- <md-input-container>
          <md-icon>add_a_photo</md-icon>
          <label>Upload Image</label> -->
          <!-- <md-file 
            multiple 
            v-model="imageCard.image"
            accept="image/*"
            @change="addFile" >
          </md-file> -->
          <form class="ui form" id="form">
            <div class="field">
                <input type="file" name="file" id="file" @change="addFile">
            </div>
        </form>
        <!-- </md-input-container> -->
        <div class="actions">
            <button class="btn btn-warning">
               Cancel
            </button>
            <button class="btn btn-primary" @click.prevent="sendFile">
                Send
                <i class="checkmark icon"></i>
            </button>
        </div>
    </div> 
</template>


<script>
    import mime from 'mime-types'
    export default {
        name: 'upload-file',
        props: ['imageCard'],
        data () {
            return {
                file: null,
                authorized: ['image/jpeg', 'image/png','image/gif']
            }
        },
        methods : {
            addFile(e){
                let files = e.target.files
                console.log(files)
                if(files.length === 1){
                    this.file = files[0]
                }
            },
            sendFile(){
                if(this.file !== null){
                   
                    if(this.isValid(this.file.name)){
                        let metadata = { contentType: mime.lookup(this.file.name)}
                        this.$parent.uploadFile(this.file, metadata)
                        // $("#fileModal").modal('hide')
                    }
                }
            },
            isValid(filename){
                let index = this.authorized.indexOf(mime.lookup(filename))
                return index !== -1
            },
            resetForm(){
                console.log("reset form")
                $('#form').trigger('reset')
                this.file = null
            }
        }
    }

</script>

<style scoped>
    .actions{
        margin-top: 5%;
        text-align: right;
    }
    input{
        height: 50px;
        font-size: 25px;
    }
    button{
        height: 50px;
        width: 115px;
        font-size: 24px;
        margin: 0 1%;
    }
</style>