<template>
    <div id="card">
		<div>
			<h1> {{ user.name }} </h1>
			<div class="image-crop">
				<img id="avatar" :src="user.imageURL" />
			</div>
			<div id="buttons">
				<button> <i class="fas fa-user-cog"></i> </button>
				<button> <i class="fas fa-user-times"></i> </button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'UserProfil',
	//moment ou vue est affichée 
	mounted() {
		console.log(this.$store.state.user);
		if (this.$store.state.user.userId == -1) {
			this.$router.push('/');
			return ;
		}
		this.$store.dispatch('profil');
	},
	computed: {
		...mapState({
      		user: 'user',
    	})
  	},
	methods: {
		logout: function () {
			this.$store.commit('logout');
			this.$router.push('/');
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
		box-shadow: 2px 2px 5px #4069E2;
		background-color: #f2f2f2;
	}

	h1 {
		text-align: center;
		width: 100%;
		background-color: #E6EBEE;
		border-radius: 25px 25px 0 0;
		color: #393B45;
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
		justify-content: space-between;
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
		background-color: #4069E2;
		color: #E6EBEE;
	}

	button:hover {
		transform: scale(1.03);
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}
</style>