<template>
    <div class="posts">
        <h1>Articles publiés sur le site</h1>
        <button @click="gotopost()">Créer votre article</button>
        <div class="box" v-for="post in posts" :key="post.id">
            <div class="container mt-5">
                <div class="d-flex justify-content-center row">
                    <div class="col-md-8"> 
                        <h2 class="card-title"> {{ post.title }} </h2>
                        <p class="card-content"> {{ post.content }} </p>
                        <div>
                            <p>{{ post.createdAt }}</p>
                        </div>
                        
                        <div class="p-2">
                            <div class="d-flex flex-row align-items-start"><textarea class="form-control ml-1 shadow-none textarea"></textarea></div>
                            <div class="mt-2 text-right">
                                <button class="btn btn-primary btn-sm shadow-none" type="button">Post comment</button>
                                <button class="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Allposts',
	//moment ou vue est affichée 
	mounted() {
		this.$store.dispatch('getAll')
	},
	computed: {
		...mapState([ 'posts', 'currentUser'])
  	},
    methods: {
        gotopost(){
            this.$router.push('post');
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
