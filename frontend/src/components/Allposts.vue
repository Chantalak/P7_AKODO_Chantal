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
                                <img :src="post.attachment" alt="photo, image ou gif" />
                                <div class="info">
                                    <p>{{ post.createdAt }}</p>
                                </div>
                                <button type="submit" @click="$router.push(`article/${post.id}`)">Afficher plus</button>
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

export default {
    name: 'Allposts',
	//moment ou vue est affichée 
	mounted() {
		this.$store.dispatch('getAllPosts')
	},
	computed: {
		...mapState(['posts', 'user'])
  	},
    methods: {
        gotopost(){
            this.$router.push('add');
        }, 
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
    .addComment__Title{
        background-color: #ffffff;;
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
