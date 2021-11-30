<template>
<div class="card">
    <form class="form">
        <!--Rendu conditionnel login et signup grâce à v-if et v-else-->
        <h1 v-if="mode == 'login'">Connexion</h1> 
        <h1 v-else>Inscription</h1> 
        <!--Récupération des valeurs de nos input avec v-model-->
        <input v-model="email" type="email" placeholder="E-mail" required/>
        <input v-if="mode == 'create'" v-model="name" type="text" placeholder="Nom complet" required/>
        <input v-model="password" type="password" placeholder="Mot de passe" required/>
        
        <button v-if="mode == 'login'" v-on:click="login()"> Connexion </button>
        <button v-else v-on:click="signup()"> Créer un compte </button>

        <p v-if="mode == 'login'" class="message" > Pas encore de compte? <span v-on:click="switchToSignup()"> Créer un compte </span></p>
        <p v-else class="message"> Déjà un compte? <span v-on:click="switchToLogin()"> Connectez-vous </span></p>
    </form>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'LogUser',
    data() {
        return {
            mode: 'login',
            email: '',
            name: '',
            password: '',
        }
    },
    mounted: function () {
        if (this.$store.state.user.userId != -1) {
            this.$router.push('/profile');
            return ;
        }
    },
    computed: {
        ...mapState(['status'])
    },
    methods: {
        //méthodes pour gérer l'affichage du mode login et signup
        switchToSignup() {
            this.mode = 'create';
        },
        switchToLogin() {
            this.mode = 'login';
        },  
        login() {
            const self = this;
            this.$store.dispatch('login', {
                email: this.email,
                password: this.password,
            })
            .then(() => {
              self.$router.push('/profil');
            })
            .catch((error) => {
                console.log(error)
            })
        },
        signup() {
            this.$store.dispatch('signup', {
                email: this.email,
                name: this.name,
                password: this.password,
            })
            .then(() => {
                //permet connexion juste après création compte user
                this.login()
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
    .card {
        width: 360px;
        padding: 2% 0 0;
        margin: auto;
    }
    .logo {
        width: 50%;
    }
    .form {
        position: relative;
        z-index: 1;
        background: #ffffff;
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 45px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    .form input {
        font-family: "Roboto", sans-serif;
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .form button {
        font-family: "Roboto", sans-serif;
        text-transform: uppercase;
        outline: 0;
        background: #ffd7d7;
        width: 100%;
        border: 0;
        padding: 15px;
        color: #0f0e0e;
        font-size: 14px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
    }
    .form button:hover,.form button:active,.form button:focus {
        color: #ffffff;
        background: #fd2d01;
    }
    .form .message {
        margin: 15px 0 0;
        color: #000000;
        font-size: 12px;
    }
    .form .message span {
        color: #fd2d01;
        text-decoration: none;
        cursor: pointer;
    }
</style>