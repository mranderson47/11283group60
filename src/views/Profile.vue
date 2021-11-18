<template>
    <div class="profile-container">
        <div class="row">
        <h1 class="col-md-11">Profile</h1>
        <div class="form-group col-md-1 container-sm">
                <button
                    type="button"
                    class="btn btn-success header-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    @click="openModal()"
                >
                Settings
                </button>
            </div>
        </div>

<img v-if="!profileImage" src="https://cdn.mos.cms.futurecdn.net/wtqqnkYDYi2ifsWZVW2MT4-1200-80.jpg" alt="Avatar">
<img v-else :src="`${profileImage}`" alt="Avatar">


<div class = "Name"> 
<h2>{{$store.state.profileFirstName}} {{$store.state.profileLastName}}</h2>
</div>

<div
        class="modal fade"
        :id="`edit-profile`"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        >
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Profile</h5>
                    <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <div
                    ref="messages"
                    v-if="errorMessages.length"
                    class="alert alert-danger fade show"
                    >
                    <span
                        v-for="(msg, index) in errorMessages"
                        :key="index"
                        id="message"
                        v-html="msg"
                    ></span>
                    <button
                        type="button"
                        class="btn-close"
                        @click="errorMessages = []"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                    </div>
                    <form novalidate>
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Profile Photo</label><br>
                            <input type="file" @change="selectImage" class="form-control form-control-file">
                        </div>
                        <div class="form-group">
                            <label for="firstName">First Name<span class="requierd-span">*</span></label>
                            <input v-model="firstName" type="text" class="form-control" placeholder="Enter First Name">
                        </div>          
                        <div class="form-group">
                            <label for="lastName">Last Name<span class="requierd-span">*</span></label>
                            <input v-model="lastName" type="text" class="form-control" placeholder="Enter Last Name">
                        </div>            
                    </form>

                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        class="btn btn-primary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Add a new card"
                        @click="onSave()"
                    >
                        <font-awesome-icon icon="save" />&nbsp;Save
                    </button>
                </div>
            </div>
        </div>
        </div>


        <!--Beginning of tabs-->

<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Posts</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Liked Events</button>
  </li>
  <!-- <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
  </li> -->
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

    <h2 v-if="eventsFirstHalf.length>0">Events you've created</h2>
    <i v-else>You haven't created any events yet</i>
        <div class="row event-container">
            <div class="col">
                <div v-for="(event, index) in eventsFirstHalf" :key="index"> 
                    <event-card :event="event" :key="event.id" />
                </div>
            </div>
            <div class="col">
                <div v-for="(event, index) in eventsSecondHalf" :key="index">
                     <event-card :event="event" :key="event.id" />
                </div>
            </div>
        </div>


  </div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

    <h2 v-if="likedEventsFirstHalf.length>0">Events you've liked</h2>
    <i v-else>You don't like any events :(</i>
        <div class="row event-container">
            <div class="col">
                <div v-for="(event, index) in likedEventsFirstHalf" :key="index"> 
                    <event-card :event="event" :key="event.id" />
                </div>
            </div>
            <div class="col">
                <div v-for="(event, index) in likedEventsSecondHalf" :key="index">
                     <event-card :event="event" :key="event.id" />
                </div>
            </div>
        </div>

  </div>
  <!-- <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div> -->
</div>

<br/><br/>
        <!--Ending of tabs-->


    </div>
</template>

<script>

import { Modal } from "bootstrap";

import { mapState } from "vuex";
import EventCard from "../components/EventCard.vue"
export default {
    name: "Profile",
    components: {
        EventCard
    },
    data(){
        return{
            errorMessages: [],
            image: null,
            activeModal: null,
        };
    },

    methods: {
        updateProfile(){
            this.$store.dispatch("updateUserSettings");
            //this.$router.push({name: "Home"});
        },

        closeModal() {
            if (typeof this.activeModal.hide === "function") {
                this.activeModal.hide();
            }
        },
        openModal() {
            const modalElem = this.setUpModalElement();
            this.activeModal = new Modal(modalElem, {});
            this.activeModal.show();
        },
        setUpModalElement() {
            const self = this,
                modalElem = document.getElementById(
                `edit-profile`
                );
            return modalElem;
        },
        async onSave() {
            // Validate input first

            if (this.image) {
                this.profileImage = await this.$store.dispatch("getImageUrl", this.image);
            }
            this.updateProfile();
            this.closeModal();
        },
        selectImage(e) {
            if (e.target.files[0]) {
                this.image = e.target.files[0];
            }
        },
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
        },

        profileImage: {
            get() {
                return this.$store.state.profileImage;
            },
            set(payload) {
                this.$store.commit("changeProfileImage", payload);
            },
        },
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

    img {
    border-radius: 50%;
    max-width: 22%;
    max-height: 22%;
    margin-left: 40%;
    margin-top: 5%;

    }

    .Name {

        margin-left: 43%;

    }

    .rounded-circle {

        max-width: 20rem;
        max-height: 20rem;

    }

</style>