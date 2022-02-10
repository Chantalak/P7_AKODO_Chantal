<template>
<div>
    <form>
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
    <div class="comment">
        <div v-for="comment in comments" :key="comment.id">
            <div v-show="comment.postId === post.id" class="comment_block w3-row">
                <div v-for="user in users" :key="user.id">
                    <div v-if="comment.userId == user.id">
                        <span> {{ user.name }} </span>
                    </div> 
                </div>
                <span class="w3-rest" style="padding-left:5%">{{ comment.content }} </span> 
                <span v-if="comment.userId == currentUser.userId" @click="deleteOneComment()" class="w3-col" style="width:5%"><i class="fas fa-minus"></i></span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Comment',
     data() {
        return {
            content: '',
            postId: '',
        }
    },
	computed: {
		...mapState([ 'commentary', 'post', 'comments', 'user', 'users', 'currentUser' ])
  	},
    mounted() {
        this.$store.dispatch('getAllComments');
    },
    methods: {
        createOneComment() {
            this.$store.dispatch('createOneComment', {
                content: this.content,
                postId: localStorage.postId,
            })
            .then((response) => {
                console.log(response);
                //window.location.reload();
            })
            .catch((error) => {
                console.log(error)
            })
        },
        deleteOneComment() {
			this.$store.dispatch('deleteOneComment')
            .then(() => {
				alert("Cliquez sur ok et l'utilisateur sera supprimé");
            })
            .catch((error) => {
                console.log(error);
            })
		},
    },
}
</script>

<style scoped>
    .comment_block {
       padding: 2%;
       border: 1px solid #ced4da;
       text-align: left;
    }
</style>