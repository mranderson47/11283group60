<template>
    <div class="container-fluid">
        <div class="container-sm setting-container">
            <div class="accordion">
                <div class="accordion-item">
                <h2 class="accordion-header"> 
                    <div class="d-flex">
                    <button
                        class="accordion-button accordion-unselectable"
                        data-bs-toggle="collapse"
                        data-bs-target="#settings"
                        aria-expanded="false"
                        aria-controls="settings"
                        type="button"
                    >
                        Settings
                    </button>
                    <div class="d-flex align-items-start accordion-header-buttons">
                    </div>
                    </div>
                </h2>
                <div id="settings">
                    <p>Edit your user settings:</p>
                    <form>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">First Name</label>
                        <input type="text" class="form-control" id="firstName" v-model="firstName"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Last Name</label>
                        <input type="text" class="form-control" id="lastNae" v-model="lastName"/>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" @click="updateProfile();">Save Settings</button>
                    </div>
                    </form>
                </div>
                </div>
            </div> 
        </div>

        <h1>Events you've created</h1>
        <div class="row event-container">
            <div class="col">
                <div v-for="(event, index) in eventsFirstHalf" :key="index"> 
                    <event-card :event="event" />
                </div>
            </div>
            <div class="col">
                <div v-for="(event, index) in eventsSecondHalf" :key="index">
                     <event-card :event="event" />
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from "vuex";
import EventCard from "../components/EventCard.vue"
export default {
    name: "Profile",
    components: {
        EventCard
    },
    data(){
        return{};
    },

    methods: {
        updateProfile(){
            this.$store.dispatch("updateUserSettings");
            this.$router.push({name: "Home"});
        }
    },

    computed: {
        
        ...mapState(["userEvents"]),
        eventsFirstHalf() {
            return this.userEvents.slice(0, Math.ceil(this.userEvents.length/2.));
        },
        eventsSecondHalf() {
            return this.userEvents.slice(Math.ceil(this.userEvents.length/2.));
        },

        firstName: {
            get() {
                return this.$store.state.profileFirstName;
            },
            set(payload) {
                this.$store.commit("changeFirstName", payload);
            },
        },

        lastName: {
            get() {
                return this.$store.state.profileLastName;
            },
            set(payload) {
                this.$store.commit("changeLastName", payload);
            },
        }
    }
}
</script>
<style scoped>
    #settings {
        padding: 2rem;
    }
    .setting-container {
        margin: 1rem;
        padding-left: 60% !important;
    }
</style>