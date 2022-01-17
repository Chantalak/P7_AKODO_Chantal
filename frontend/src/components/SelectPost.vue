<template>
    <div class="card">
        <div class="post">
            <h1 class="card-title"> {{ post.title }} </h1>
            <div class="box">
                <div class="container mt-5">
                    <div class="d-flex justify-content-center row">
                        <div class="col-md-8"> 
                            <p class="card-content"> {{ post.content }} </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="currentUser.userId == post.userId">
                <button aria-label="Suppression compte" class="btn btn-danger" type="submit" v-on:click="deleteOnePost()"> Supprimer votre Article </button>
            </div>
        </div>
        <div>
            <div class="addComment__Title">Commentaires :
                <div v-for="comment in comments" :key="comment.postId">
                    <div v-if="post.id == comment.postId">
                        {{ comment.content }}
                    </div>
                </div>
            </div>
            <form class="addComment">
                <div class="bg-light p-2">
                    <div class="d-flex flex-row align-items-start">
                        <input class="form-control ml-1 shadow-none textarea" v-model="content" type="text" placeholder="Tapez votre commentaire" required />
                    </div>
                    <div class="mt-2 text-right">
                        <button class="btn btn-primary btn-sm shadow-none" id="btn" type="submit" @click="createOneComment()">
                            Poster
                        </button>
                    </div>
                </div>   
            </form>
        </div>
    </div>        
            
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'SelectPost',
    data() {
        return {
            postId: this.$route.params.id,
            content: '',
        }
    },
    computed: {
		...mapState(['post', 'currentUser', 'comments', 'comment'])
  	},
    mounted() {
        if (localStorage.postId) {
            localStorage.postId = this.postId;
        }
        this.$store.dispatch('getOnePost');
    },
    methods: {
       createOneComment() {
            //const self = this;
            this.$store.dispatch('create', {
                content: this.content,
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

<style scoped>
    .col-md-8 {
        background-color: rgb(241, 232, 232);
    }
    h2 {
        color: #fd2d01;
    }
    img {
      width: 200px;
      margin: 0 0 2rem;
    }
</style>
