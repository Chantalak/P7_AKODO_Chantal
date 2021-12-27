<template>
  <main class="main">
    <form class="form" @submit.prevent="submit">
        <div class="container mt-5">
            <div class="d-flex justify-content-center row">
                <div class="form col-md-8">
                    <h1>Créer votre article</h1>
                    <input v-model="title" name="title" type="text" placeholder="Titre" required />
                    <textarea v-model="content" name="content" type="text" placeholder="Contenu de votre article" required />
                    <input type="file"/> 
                    <div>
                        <button type="submit" @click="create()"> Publier </button>
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
            attachment: '',
        }
    },
    computed: {
		...mapState([ 'status', 'user', 'currentUser', 'post', 'posts' ])
  	},
    methods: {
        create() {
            //const fd = new FormData();
            //fd.append('image', this.attachment, this.attachment.name)
            const self = this;
            this.$store.dispatch('create', //fd, 
            {
                title: this.title,
                content: this.content,
                attachment: this.attchment,
            })
            .then(() => {
                console.log(self)
            })
            .catch((error) => {
                console.log(error)
            })
        },
        cancel() {
            this.$router.push('feed');
        },
        //onFileSelected(event) {
            //this.attachment = event.target.files[0]
        //}
    }
}
</script>

<style scoped>
    .form {
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
        margin: 1% 2%; 
        border-radius: 6px;

    }
    .form button:hover,.form button:active,.form button:focus {
        color: #ffffff;
        background: #fd2d01;
    }
</style>
