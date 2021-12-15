<template>
    <div id="card">
		<h1> {{ currentUser.name }} </h1>
		<div id="buttons">
			<button type="button" class="btn btn-danger" v-on:click="deleteUser()"> <i class="fas fa-user-times"></i> </button>
		</div>

	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'UserProfil',
	mounted() {
		console.log(this.$store.state.currentUser);
		if (this.$store.state.currentUser.id == -1) {
			this.$router.push('/');
			return ;
		}
		this.$store.dispatch('profil');
		
	},
	computed: {
		...mapState(['currentUser', 'user'])
	},
	methods: {
		deleteUser() {
			this.$store.dispatch('deleteUser')
            .then(() => {
				this.$store.replaceState({})
				localStorage.clear();
				location.replace(location.origin);
				alert("Cliquez sur ok et l'utilisateur sera supprimé");
            })
            .catch((error) => {
                console.log(error);
            })
		}
	}
}
</script>

<style scoped>
	#card {
		width: 350px;
		margin: 10vh auto;
		border-radius: 25px;
		padding-bottom: 1px;
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
	}

	h1 {
		text-align: center;
		width: 100%;
		background-color: #f2f2f2;
		border-radius: 25px 25px 0 0;
		color: #fd2d01;
		padding: 30px 0;
		font-weight: 800;
		margin: 0;
	}

	.image-crop {
		display: block;
		position: relative;
		background-color: #E6EBEE;
		width: 150px;
		height: 150px;
		margin: 0 auto;
		margin-top: 30px;
		overflow: hidden;
		border-radius: 50%;
		box-shadow: 1px 1px 5px #4069E2;
	}

	#avatar {
		display: inline;
		height: 230px;
		width: auto;
		margin-left: -34px;
	}

	#bio {
		display: block;
		margin: 30px auto;
		width: 280px;
		height: auto;
	}

	#bio p {
		font-weight: lighter;
		font-size: 15px;
		text-align: center;
	}

	#buttons {
		display: flex;
		margin: 0 auto;
		justify-content: center;
		width: 280px;
	}

	button {
		display: block;
		position: relative;
		padding: 10px 0;
		width: 130px;
		margin: 30px 0;
		border-radius: 25px;
		border: none;
		font-size: 20px;
		letter-spacing: 0.2px;
		font-weight: 500;
		background-color: #ffd7d7;
		color: #E6EBEE;
	}

	button i {
		color: #ffffff;
	}

	button:hover {
		transform: scale(1.03);
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}
</style>