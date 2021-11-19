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

<img v-if="!profileImage" src="data:image/jpeg;base64,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" alt="Avatar">
<img v-else :src="`${profileImage}`" alt="Avatar">


<div class = "Name"> 
<h2><center>{{$store.state.profileFirstName}} {{$store.state.profileLastName}}</center></h2>
</div>

<div
        class="modal fade"
        id="edit-profile"
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
                modalElem = document.getElementById("edit-profile");
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

    .rounded-circle {

        max-width: 20rem;
        max-height: 20rem;

    }

</style>