<template>
    <div id="app">
        <div id="nav">
            <router-link to="/profil"> <i class="fas fa-user-circle"></i> Profil </router-link> |
            <router-link to="/feed"> <i class="fas fa-search"></i> Feed </router-link> |
            <router-link to="/"> <i class="fas fa-sign-out-alt"></i> Déconnexion </router-link> 
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'Navbar',
}
</script>

<style lang="scss">
#nav {

    padding: 30px;
    
    a {
        font-weight: bold;
        color: #fd2d01;
        text-decoration: none;

        &.router-link-exact-active {
        color: #ffd7d7;
        }
    }
}
</style>
