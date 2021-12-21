<template>
	<main class="main">
		<div class="card">
			<h1 class="title"> Profil </h1>
			<div>
				<div class="image-crop"> 
					<img class="avatar" src="../assets/profil.jpg" alt="photo de profil utilisateur" />
				</div>
			</div>
			<div class="info">
				<span> Nom : {{ user.name }} </span>
				<span><a v-bind:href="`mailto:${ user.email }`">Envoyer un mail</a></span>
			</div>
			<div v-if="user.isAdmin == true">
				<div></div>
			</div>
			<div class="delete">
				<button aria-label="Suppression compte" class="btn btn-danger" type="submit" v-on:click="deleteUser()"> <i class="fas fa-user-times"></i> </button>
			</div>
		</div>
	</main>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'UserProfil',
	mounted() {
		this.$store.dispatch('getAllUsers');
		this.$store.dispatch('getOneUser');
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
	.card {
		width: 350px;
		margin: 10vh auto;
		border-radius: 25px;
		padding-bottom: 1px;
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
	}

	.title {
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

	.avatar {
		display: inline;
		height: 230px;
		width: auto;
		margin-left: -40%;
	}

	.info {
		display: flex;
		flex-direction: column;
		margin: 30px auto;
		width: 280px;
		height: auto;
	}

	.info span {
		font-weight: bold;
		font-size: 20px;
		text-align: center;
	}

	.info a {
		color: #0095f6;
	}

	.delete {
		display: flex;
		margin: 0 auto;
		justify-content: center;
		width: 280px;
	}

	button {
		display: block;
		position: relative;
		padding: 10px 0;
		width: 150px;
		margin: 10px 0;
		border-radius: 25px;
		border: none;
		font-size: 20px;
		letter-spacing: 0.2px;
		font-weight: 500;
		background-color: #ffd7d7;
		color: #000000;
	}

	button:hover {
		transform: scale(1.03);
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}
</style>