<template>
    <div class="profile-container">
        <h1>Profile</h1>
        <div class="container-sm setting-container">
            <div class="accordion">
                <div class="accordion-item">
                <h2 class="accordion-header"> 
                    <div class="d-flex">
                    <button
                        class="accordion-button collapsed "
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
                <div id="settings" class="accordion-collapse collapse">
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
                    <br/>
                    <div class="form-group">
                        <button type="button" class="btn btn-primary" @click="updateProfile();">Save Settings</button>
                    </div>
                    </form>
                </div>
                </div>
            </div> 
        </div>
        <h2>Events you've created</h2>
        <div class="row event-container">
            <div class="col">
                <div v-for="(event, index) in eventsFirstHalf" :key="index"> 
                    <event-card :event="event" :key="`created${event.id}`" />
                </div>
            </div>
            <div class="col">
                <div v-for="(event, index) in eventsSecondHalf" :key="index">
                     <event-card :event="event" :key="`created${event.id}`" />
                </div>
            </div>
        </div>

        <h2>Events you've liked</h2>
        <div class="row event-container">
            <div class="col">
                <div v-for="(event, index) in likedEventsFirstHalf" :key="index"> 
                    <event-card :event="event" :key="`liked${event.id}`" />
                </div>
            </div>
            <div class="col">
                <div v-for="(event, index) in likedEventsSecondHalf" :key="index">
                     <event-card :event="event" :key="`liked${event.id}`" />
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
        
        ...mapState(["userEvents", "likedEvents"]),
        eventsFirstHalf() {
            return this.userEvents.slice(0, Math.ceil(this.userEvents.length/2.));
        },
        eventsSecondHalf() {
            return this.userEvents.slice(Math.ceil(this.userEvents.length/2.));
        },
        likedEventsFirstHalf() {
            return this.likedEvents.slice(0, Math.ceil(this.likedEvents.length/2.));
        },
        likedEventsSecondHalf() {
            return this.likedEvents.slice(Math.ceil(this.likedEvents.length/2.));
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
        width:35%;
        margin-left: 65%;
    }
    .profile-container {
    margin-top:2rem;
    width: 80%;
    margin-left: 10%;
    }
</style>