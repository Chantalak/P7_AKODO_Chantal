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
                                <div class="userpost">
                                    <div v-for="user in users" :key="user.id">
                                        <div v-if="post.userId == user.id">
                                           <img class="avatar" :src="user.imageURL" alt="photo de profil utilisateur" />
                                           <span> {{ user.name }} </span>
                                        </div> 
                                    </div>
                                </div>
                                <div class="post">
                                    <h2 class="card-title"> {{ post.title }} </h2>
                                    <p class="card-content"> 
                                        {{ post.content }} 
                                    </p>
                                    <div class="info">
                                        <p> <i>Publié le {{ new Date(post.updatedAt).toLocaleDateString() }}</i> </p>
                                    </div>
                                    <button class="button" type="submit" @click="$router.push(`feed/article/${post.id}`)">Afficher plus</button>
                                </div>
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
    name: 'Posts',
	//moment ou vue est affichée 
	mounted() {
		this.$store.dispatch('getAllPosts')
	},
	computed: {
		...mapState(['posts', 'user', 'currentUser', 'users'])
  	},
    methods: {
        gotopost(){
            this.$router.push('/feed/add');
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
    .card-content {
        white-space: nowrap; 
        width: 100%; 
        overflow: hidden;
        text-overflow: ellipsis; 
        
    }
    button {
		padding: 10px 0;
		width: 150px;
		margin: 10px 0;
		border: none;
		font-size: 15px;
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
        font-size: 20px;
    }
    .userpost {
        text-align: left;
    }
    img {
        margin: 0;
        border-radius: 50px;
        height: 40px;
        border-radius: 50px;
    }
    .post {
        display: flex;
        flex-direction: column;
    }
    .button { 
      margin: 0;   
    }
    .posts {
        margin-bottom: 2%;
    }
</style>
