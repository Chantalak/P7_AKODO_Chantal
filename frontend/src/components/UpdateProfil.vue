<template>
    <main class="main">
        <form @submit.prevent="modifyOneUser" enctype="multipart/form-data">
            <div class="field">
                <input v-model="user.name" type="name"/>
                <input type="file" name="image" @change="selectFile"/>
            </div>
            <div class="button">  
                <button class="btn">Envoyer</button>
                <button class="btn" @click="cancel()">Annuler</button>
            </div>
        </form>
    </main>
</template>

<script>
import { mapState } from 'vuex'
//import axios from 'axios'

export default {
	name: 'UpdateProfil',
    data() {
        return {
            name: '',
            file: null,
        }
    },
    computed: {
		...mapState(['user',])
  	},
    methods: {
        selectFile(event) {
            this.file = event.target.files[0];
            console.log(event)
        },

        async modifyOneUser() {
            const formData = new FormData();
            formData.append('file', this.file);
            const self = this;

            this.$store.dispatch('modifyOneUser', formData)
            .then(() => {
				console.log(self);
                self.$router.push('/profil');
            })
            .catch((error) => {
                console.log(error);
            });
            
 		},

        cancel() {
            this.$router.push('/profil');
        },
    },
}
</script>

<style scoped>
    form {
        margin-top: 10%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        width: 80%;
        padding: 12px 20px;
        margin: 8px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    
    .button {
        display: flex;
        justify-content: space-evenly;
        width: 80%;
    }

    .btn {
        display: block;
        width: 140px;
        height: 40px;
        border: 2px solid rebeccapurple;
    }
</style>