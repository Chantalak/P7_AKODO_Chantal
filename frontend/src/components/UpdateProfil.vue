<template>
    <main class="main">
        <form @submit.prevent="sendFile" enctype="multipart/form-data">
            <div class="field"> 
                <label for="file" class="label"> Télécharger </label>
                <input type="file" name="image" @change="selectFile" />
               
            </div>
            <div class="field">  
                <button class="button is-info">Envoyer</button>
            </div>
        </form>
    </main>
</template>

<script>
//import { mapState } from 'vuex'
import axios from 'axios'

export default {
	name: 'UpdateProfil',
    data() {
        return {
            file: null,
        }
    },
    methods: {
        selectFile(event) {
            this.file = event.target.files[0];
            console.log(event)
        },

        async sendFile() {
            const formData = new FormData();
            formData.append('file', this.file);

            try {
                await axios.post('/upload', formData);
            } catch(err) {
                console.log(err);
            }
 		},
    },
}
</script>