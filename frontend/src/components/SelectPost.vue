<template>
    <div class="posts">
        <h1 class="card-title"> {{ post.title }} </h1>
        <div class="box" :key="post.id">
            <div class="container mt-5">
                <div class="d-flex justify-content-center row">
                    <div class="col-md-8"> 
                    <p class="card-content"> {{ post.content }} </p>
                    <div>
                        <p>{{ currentUser.name }}</p>
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
    name: 'SelectPost',
	//moment ou vue est affichée 
	mounted() {
		this.$store.dispatch('getOnePost')
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
