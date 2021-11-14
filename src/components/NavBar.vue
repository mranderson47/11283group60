<template>
    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="./">Beach Avengers</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>

        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav col-md-11">
                
                <li v-if="!user" class="nav-item active">
                    <a class="nav-link active" href="./login">Log In</a>
                </li>
                <li v-if="!user" class="nav-item active">
                    <a class="nav-link active" href="./register">Register</a>
                </li>
                <li v-if="user" class="nav-item active">
                    <a class="nav-link active" href="./event">Events</a>
                </li>
                <li v-if="user" class="nav-item active">
                    <a class="nav-link active" href="./" @click="signOut">Sign Out</a>
                </li>
            </ul>

            <div v-if="user" class=" user col-md-1">
                <a href="./profile">
                    <font-awesome-icon icon="user-circle" size="2x"/>
                </a>
            </div>

        </div>
        </nav>
</template>

<script>

import firebase from "firebase/app";

export default {

    methods:{
        signOut() {
            firebase.auth().signOut();
            window.location.reload();
        },
    },


    computed: {
        //Return the current user session
        user() {
        return this.$store.state.user;
        },


    }
}
</script>


<style lang="scss" scoped>
    .navbar {
        padding-left: 1rem;
        
    }
    li {
        padding-left: 1rem;
        
        
        
    }
    .user {
        align-content: right;
    }

    .nav-item active{
        &:hover{
            color: rgba(255, 255, 255, 0.384);
        }
    }


</style>