<template>
    <form class="addComment">
        <div class="bg-light p-2">
            <div class="d-flex flex-row align-items-start">
                <input class="form-control ml-1 shadow-none textarea" v-model="content" type="text" placeholder="Tapez votre commentaire" required />
            </div>
            <div class="mt-2 text-right">
                <button class="btn btn-primary btn-sm shadow-none" id="btn" type="submit" @click="createComment()">
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
        }
    },
	computed: {
		...mapState([ 'comments', 'comment', 'posts'])
  	},
    methods: {
       createComment() {
            const self = this;
            this.$store.dispatch('create', {
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