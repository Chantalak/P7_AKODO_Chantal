<template>
    <div class="card">
        <div class="post">
            <h1 class="card-title"> {{ post.title }} </h1>
            <div class="box">
                <div class="container mt-5">
                    <div class="d-flex justify-content-center row">
                        <div class="col-md-8"> 
                            <p class="card-content"> {{ post.content }} </p>
                            <div v-if="post.attachment">
                                <img class="avatar" :src="post.attachment" alt="photo du post" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="currentUser.userId == post.userId || currentUser.isAdmin == true">
                <button aria-label="Suppression de votre post" class="btn btn-danger" type="submit" v-on:click="deleteOnePost()"> Supprimer votre Article </button>
            </div>
        </div>
        <Comments/>
        <div>
            <div class="comments">
                <div class="w3-border w3-row" v-for="comment in comments" :key="comment.id">
                    <div class="w3-container w3-threequarter" v-if="post.id == comment.postId">
                        {{ comment.content }}
                    </div>
                    <div class="w3-container w3-quarter"><i class="fas fa-times"></i></div>
                </div>
            </div>
        </div>
    </div>              
</template>

<script>
import { mapState } from 'vuex'
import Comments from '../components/Comments.vue'

export default {
    name: 'SelectPost',
    data() {
        return {
            postId: this.$route.params.id,
            content: '',
        }
    },
    components: {
        Comments,
    },
    computed: {
		...mapState(['post', 'currentUser', 'comments', 'comment'])
  	},
    mounted() {
        if (localStorage.postId) {
            localStorage.postId = this.postId;
        }
        this.$store.dispatch('getOnePost');
        this.$store.dispatch('getAllComments');
    },
    methods: {
        deleteOnePost() {
            const self = this;
			this.$store.dispatch('deleteOnePost')
            .then(() => {
				self.$router.push('/feed');
            })
            .catch((error) => {
                console.log(error);
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
    .btn-danger {
        margin: 2% 0;
    }
    .comments {
        background-color: #f2f2f2;
    }
    .w3-row {
        padding: 2%;
    }
</style>
