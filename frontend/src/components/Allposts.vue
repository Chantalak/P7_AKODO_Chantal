<template>
    <main class="main">
        <h1 class="title">Articles publiés sur le site</h1>
        <section class="section">
            <div class="posts">  
                <button type="button" @click="gotopost()">Créer votre article</button>
                <div class="box" v-for="post in posts" :key="post.id">
                    <div class="container mt-5">
                        <div class="d-flex justify-content-center row">
                            <div class="card col-md-8"> 
                                <h2 class="card-title"> {{ post.title }} </h2>
                                <p class="card-content"> {{ post.content }} </p>
                                <p class="card-attachment"> {{ post.attachment }} </p>
                                <div class="info">
                                    <p>{{ post.createdAt }}</p>
                                </div>
                                <div class="addComment__Title">Commentaires :</div>
                                <div v-for="comment in comments" :key="comment.postId">
                                    <p v-if="post.id == comment.postId">{{ comment.content }}
                                        <span class="btn btn-danger" type="submit" v-on:click="deleteComment()"> <i class="fas fa-minus"></i></span>
                                    </p>
                                </div>
                                <Comments/>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </section>
    </main>
</template>

<script>
import { mapState } from 'vuex'
import Comments from '../components/Comments.vue';

export default {
    name: 'Allposts',
    components: {
        Comments,
    },
	//moment ou vue est affichée 
	mounted() {
		this.$store.dispatch('getAll')
        this.$store.dispatch('getAllComments')
        this.$store.dispatch('deleteComment')
	},
	computed: {
		...mapState([ 'comments', 'comment', 'posts', 'currentUser', 'user'])
  	},
    methods: {
        gotopost(){
            this.$router.push('post');
        },    
        deleteComment() {
            const self = this;
			this.$store.dispatch('deleteComment', {
                id : this.$store.state.comment.id,
            }) 
            .then(() => {
                console.log(self)
            })
            .catch((error) => {
                console.log(error);
            })
		}  
    },
}
</script>

<style scoped>
    .title {
        margin-top: 20px;
    }
    .card {
        padding: 2%;
    }
    .card-title {
        background-color: #ffffff;
    }
    button {
		padding: 10px 0;
		width: 200px;
		margin: 10px 0;
		border-radius: 25px;
		border: none;
		font-size: 20px;
		letter-spacing: 0.2px;
		font-weight: 500;
		background-color: #ffd7d7;
		color: #000000;
	}

	button:hover {
		transform: scale(1.03);
		cursor: pointer;
		transition: all 0.2s ease-in-out;
        color: #ffffff;
        background: #fd2d01;
	}
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
