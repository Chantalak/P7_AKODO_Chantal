<template>
    <div class="w3-modal-content">
      <div class="w3-container">
        <span class="w3-button w3-display-topright">&times;</span>
        <p> Pour supprimer votre compote cliquez sur le bouton Suppression: </p>
        <button aria-label="Suppression compte" class="btn btn-danger" type="submit" v-on:click="deleteUser()"> suppression </button>
        <button> Annuler </button>
      </div>
    </div>
</template>

<script>
export default {
	name: 'DeleteUser',
	methods: {
		deleteUser() {
			this.$store.dispatch('deleteUser')
      .then(() => {
				this.$store.replaceState({})
				localStorage.clear();
				location.replace(location.origin);
				//alert("Cliquez sur ok et l'utilisateur sera supprimé");
      })
      .catch((error) => {
        console.log(error);
      })
		},
	},
}
</script>