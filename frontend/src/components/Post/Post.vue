<template>
    <main class="main">  
        <div class="card">
            <div class="post" >
                <h1 class="card-title"> {{ post.title }} </h1>
                <div class="box">
                    <p class="card-content"> {{ post.content }} </p>
                    <div v-if="post.attachment">
                        <img class="avatar" :src="post.attachment" alt="photo du post" />
                    </div>
                </div>       
                <div v-if="currentUser.userId == post.userId || currentUser.isAdmin == true">
                    <button aria-label="Suppression de votre post" class="btn btn-danger" type="submit" v-on:click="deleteOnePost()"> Supprimer votre Article </button>
                </div>
            </div>
            <Comments/>
        </div>              
    </main>
</template>

<script>
import { mapState } from 'vuex'
import Comments from '../Post/Comments.vue'

export default {
    name: 'Post',
    data() {
        return {
            postId: this.$route.params.id,
        }
    },
    components: {
        Comments,
    },
    computed: {
		...mapState(['post', 'currentUser', 'comments'])
  	},
    mounted() {
        if (localStorage.postId) {
            localStorage.postId = this.postId;
        }
        this.$store.dispatch('getOnePost');
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
    h1 {
        color: #fd2d01;
        text-transform: uppercase
    }
    .post { 
        padding: 5%;
    }
    .box {
        background-color: rgb(241, 232, 232);;
    }
    img {
    border: 2px solid black;
      width: 50%;
      margin: 0 0 2rem;
    }
    .btn-danger {
        margin: 2% 0;
    }
</style>
