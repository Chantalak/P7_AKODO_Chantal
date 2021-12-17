<template>
    <header>
        <nav class="navbar">
            <div class="navlogo">
                <img class="logo" src="../assets/logoblanc.png" alt="logo Groupomania" />
            </div>
            <ul class="menu">
                <li class="item">
                    <router-link to="/profil"> <i class="fas fa-user-circle"></i> Profil </router-link>
                </li>
                <li class="item">
                    <router-link to="/feed"> <i class="far fa-newspaper"></i> Feed </router-link>
                </li>
                <li class="item">
                    <button type="button" class="btn btn-danger" @click="disconnect">Déconnexion</button>
                </li>
            </ul>
        </nav>
        <router-view />
    </header>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        disconnect() {
            localStorage.clear();
            location.replace(location.origin);
        }
    }
}
</script>

<style lang="scss"> 
.navbar{
    background: linear-gradient(45deg, #ea4f4c 0%, #6d0019 100%);
}  
.menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    list-style: none;

    .item {
        margin-left: 22%;
    }

    a {
        font-weight: bold;
        color: #fd2d01;

        &.router-link-exact-active {
            color: #ffd7d7;
        }
    }
}
</style>
