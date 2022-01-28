<template>
    <form @submit.prevent="createOneComment">
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
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Comment',
     data() {
        return {
            content: '',
            postId: '',
            commmenId: '',
        }
    },
    mounted() {
         if (localStorage.commmenId) {
            localStorage.commmenId = this.commmenId;
        }
		this.$store.dispatch('getAllComments')
		this.$store.dispatch('getOneComment')
	},
	computed: {
		...mapState([ 'comments', 'commentary', 'comment', 'currentUser', 'post' ])
  	},
    methods: {
        createOneComment() {
            this.$store.dispatch('createOneComment', {
                content: this.content,
                postId: localStorage.postId,
            })
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error)
            })
        },
    
    },
}
</script>