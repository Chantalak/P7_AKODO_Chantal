<template>
    <main class="main">
        <div class="card">
            <img class="logo" src="../../assets/logo.png" alt="logo Groupomania" />
            <form class="form" @submit.prevent="signup" enctype="multipart/form-data">
                <h1 >S'inscrire</h1>
                
                <input v-model="email" type="email" placeholder="E-mail" required/>
                <input v-model="name" type="text" placeholder="Nom complet" required/>
                <input v-model="password" type="password" placeholder="Mot de passe" autocomplete="on" required/>
                
                <button aria-label="Création de compte" type="submit" @click="signup()"> Créer un compte </button>

                <p class="message"> Déjà un compte? 
                    <span v-on:click="switchToLogin()"> Connectez-vous </span>
                </p>
            </form>
        </div>
    </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Signup',
    data() {
        return {
            email: '',
            name: '',
            password: '',
        }
    },
    computed: {
        ...mapState(['status'])
    },
    methods: {
        switchToLogin() {
            this.$router.push({name: 'AuthLogin' });
        },
        signup() {
            const self = this;
            this.$store.dispatch('signup', {
                email: this.email,
                name: this.name,
                password: this.password,
            })
            .then((response) => {
                console.log(response);
                self.$router.push({name: 'AuthLogin' });
            })
            .catch((error) => {
                alert(error)
            })
        }
    }
}
</script>

<style scoped>
    .card {
        display: flex;
        align-items: center;
        width: 360px;
        padding: 3% 0 0;
        margin: auto;
        border: none;
    }
    .logo {
        display: flex;
        width: 70%;
        margin-bottom: 5%;
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
        font-size: 14px;
    }
    .form .message span {
        color: #0095f6;
        text-decoration: none;
        cursor: pointer;
    }
</style>