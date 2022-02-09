<template>
  <main class="main">
    <form class="form" @submit.prevent="createOnePost" enctype="multipart/form-data">
        <div class="container mt-5">
            <div class="d-flex justify-content-center row">
                <div class="form col-md-8">
                    <h1>Créer votre article</h1>
                    <input style="height: 50px" v-model="title" name="title" type="text" placeholder="Titre" required />
                    <textarea style="height: 200px" v-model="content" name="content" type="text" placeholder="Contenu de votre article" required />
                    <input type="file" @change="selectFile"/>
                    <div>
                        <button type="submit"> Publier </button>
                        <button @click="cancel()"> Annuler </button> 
                    </div>
                </div>
            </div>
        </div>
    </form>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Post',
    data() {
        return {
            title: '',
            content: '',
            file: null,
        }
    },
    computed: {
		...mapState([ 'status', 'user', 'currentUser', 'post', 'posts' ])
  	},
    methods: {
        selectFile(event) {
            this.file = event.target.files[0];
            console.log(event)
        },

        async createOnePost() {
            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('content', this.content);
            formData.append('file', this.file);
            const self = this;

            this.$store.dispatch('createOnePost', formData)
            .then(() => {
                console.log(self)
            })
            .catch((error) => {
                console.log(error)
            })
        },
        cancel() {
            this.$router.push('/feed');
        },
    }
}
</script>

<style scoped>
    .form {
        
  background-color: #cccccc;
        display: flex;
        flex-flow: column wrap;
        padding: 0%;
    }
    .form-control {
        border: none;
        padding-left: 0%;
    }
    .form button {
        font-family: "Roboto", sans-serif;
        text-transform: uppercase;
        outline: 0;
        background: #ffd7d7;
        border: 0;
        padding: 15px;
        color: #0f0e0e;
        font-size: 14px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
        margin: 5%; 
        border-radius: 6px;

    }
    .form button:hover,.form button:active,.form button:focus {
        color: #ffffff;
        background: #fd2d01;
    }
</style>
