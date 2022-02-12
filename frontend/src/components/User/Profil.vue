<template>
	<main class="main">
		<div class="card">
			<h1 class="title"> Profil </h1>
			<div class="image-crop"> 
				<img class="avatar" :src="user.imageURL" alt="photo de profil utilisateur" />
			</div>
			<div class="info">
				<span> Nom : {{ user.name }} </span>
				<!-- <span><a v-bind:href="`mailto:${ user.email }`">Envoyer un mail</a></span> -->
				<div v-if="user.isAdmin == true">
					<span>Nombre d'utilisateurs :</span>
						{{ users.length }}
				</div>
			</div>
			<div class="delete">
				<button class="update" v-on:click="gotoupdate()"><i class="fas fa-user-edit"></i></button>
				<button onclick="document.getElementById('id01').style.display='block'"><i class="fas fa-user-times"></i></button>
			</div>
			

			<div id="id01" class="modal">
			<span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
			<form class="modal-content">
				<div class="container">
				<h1> Suppression compte </h1>
				<p> Êtes-vous certain(e)s de vouloir supprimer votre compte ?</p>
				
				<div class="center">
					<button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Annuler</button>
					<button type="button" v-on:click="deleteUser()" class="deletebtn">Delete</button>
				</div>
				</div>
			</form>
			</div>
		</div>
	</main>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'Profil',
	mounted() {
		this.$store.dispatch('getOneUser');
		this.$store.dispatch('getAllUsers');
	},
	computed: {
		...mapState(['user', 'users', 'currentUser'])
  	},
	methods: {
		modal() {
			var modal = document.getElementById('id01');

			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = "none";
				}
			}
		},
		gotoupdate() {
            this.$router.push('/profil/update');
        }, 
		deleteUser() {
			this.$store.dispatch('deleteUser')
            .then(() => {
				this.$store.replaceState({})
				localStorage.clear();
				location.replace(location.origin);
            })
            .catch((error) => {
                console.log(error);
            })
		},
	},
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
		display: flex;
  		flex-direction: column;
  		flex-wrap: wrap;
  		align-items: center;
		margin-top: 2%;
	}

	img{
		width: 100px;
  		height: 100px; 
	}

	.avatar {
		object-fit: fill;
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

	.update {
		margin-right: 5%;
	}

	.cancelbtn {
		margin-right: 5%;
	}

	.center {
		display: flex;
		justify-content: center;
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

	.container {
		padding: 16px;
		text-align: center;
		width: 70%;
	}

	.modal {
		display: none; 
		position: fixed; 
		z-index: 1; 
		left: 0;
		top: 30%;
		width: 100%; 
		height: 100%; 
		overflow: auto; 
		padding-top: 50px;
	}

	.close {
		position: absolute;
		right: 35px;
		top: 15px;
		font-size: 40px;
		font-weight: bold;
		color: #070707;
	}
</style>