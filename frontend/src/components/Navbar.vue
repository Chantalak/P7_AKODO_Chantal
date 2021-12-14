<template>
    <header>
        <nav class="nav--bar">
            <div class="logo">
                <img/>
            </div>
            <ul class="menu">
                <li class="item">
                    <router-link to="/profil"> <i class="fas fa-user-circle"></i> Profil </router-link>
                </li>
                <li class="item">
                    <router-link to="/feed"> <i class="fas fa-search"></i> Feed </router-link>
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
