<template>
    <form class="addComment">
        <input v-model="content" type="text" placeholder="Tapez votre commentaire" required />
        <button id="btn" type="submit" @click="createComment()">
            <i class="fas fa-plus-circle"></i>
        </button>
    </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Comment',
     data() {
        return {
            postId: this.post.id,
            content: '',
        }
    },
	computed: {
		...mapState([ 'comments', 'comment', 'posts'])
  	},
    methods: {
       createComment() {
            const self = this;
            this.$store.dispatch('create', {
                postId: this.postId,
                content: this.content,
            })
            .then(() => {
                self.$store.state.comments
            })
            .catch((error) => {
                console.log(error)
            })
        },
    },
}
</script>