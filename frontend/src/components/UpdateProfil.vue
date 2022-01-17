<template>
    <main class="main">
        <form @submit.prevent="modifyOneUser" method="post" enctype="multipart/form-data">
            <div class="field"> 
                <input type="file" name="image" @change="selectFile" />
                <button @click="modifyOneUser">Envoyer</button>
            </div>
        </form>
    </main>
</template>

<script>
//import { mapState } from 'vuex'
//import axios from 'axios'

export default {
	name: 'UpdateProfil',
    data() {
        return {
            name: "",
            file: null,
        }
    },
    methods: {
        selectFile(event) {
            this.file = event.target.files[0];
            console.log(event)
        },
        modifyOneUser() {
            const formData = new FormData();
            formData.append('file', this.file, this.file.name);

            this.$store.dispatch('modifyOneUser', formData, {
                name: this.name,
                file: this.file,
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })    
 		},
    },
}
</script>