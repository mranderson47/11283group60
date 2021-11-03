<template>
    <div>
        <form>
            <div class="row headerTop">
                <div class="form-group col-md-4">
                    <input type="text" class="form-control" id="zip" placeholder="ZipCode" v-model="searchKey">
                </div>
                <div class="form-group col-md-4">
                    <button type="button" class="btn btn-primary" @click="search">Search</button>
                </div>
                <div class="form-group col-md-4">
                    <button
                        type="button"
                        title="Create Event"
                        class="btn btn-primary"
                        @click="openModal"
                    >
                    CREATE EVENT
                    </button>
                </div>
            </div>
            
        </form>
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

        <div
        class="modal fade"
        :id="`create-event`"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        >
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">CREATE EVENT</h5>
                    <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form novalidate @submit.prevent="onSave">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="exampleFormControlFile1">Cover Photo</label><br>
                                    <input type="file" class="form-control form-control-file">
                                </div>
                                <div class="form-group">
                                    <label for="eventName">Event Name</label>
                                    <input v-model= "event.name" type="text" class="form-control" placeholder="Enter event name">
                                </div>
                                <div class="form-group">
                                    <label for="EventDate">Event Date</label>
                                    <date-picker class="form-control" v-model="event.date" type="datetime"></date-picker>
                                </div>
                                <div class="form-group">
                                    <label for="zipCode">Zip Code</label>
                                    <input v-model= "event.zipCode" type="text" class="form-control" placeholder="Enter zip code of location">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label for="eventLocation">Location Name</label>
                                    <input v-model= "event.locationName" type="text" class="form-control" placeholder="Enter name of location">
                                </div>

                                <div class="form-group">    
                                    <label for="">Google Maps Link of Location</label>
                                    <input v-model= "event.locationLink" type="url" class="form-control" placeholder="Enter Google Maps link of location">
                                </div>
                                <div class="form-group">    
                                    <label for="">Purpose</label><br>
                                    <small id="purposeExplanation " class="form-text text-muted">What are you planning to do at this event?</small>
                                        <textarea v-model= "event.purpose" class="form-control" rows="3" placeholder="Explain what will be done at this event" required></textarea>
                                    
                                </div>
                            </div>
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
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Add a new card"
                        @click="saveEvent"
                    >
                        <font-awesome-icon icon="save" />&nbsp;Save
                    </button>
                </div>
            </div>
        </div>
        </div>
    </div>
    
</template>

<script>

import { Modal } from "bootstrap";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { mapState } from "vuex";
import EventCard from "../components/EventCard.vue"
export default {
    components: {
        DatePicker,
        EventCard
    },
    computed: {
        ...mapState(["events"]),
        eventsFirstHalf() {
            return this.events.slice(0, this.events.length/2);
        },
        eventsSecondHalf() {
            return this.events.slice(this.events.length/2);
        }
    },
    name: 'Events',
    data() {
        return {
            searchKey: "",
            activeModal: {},
            event: {}
        }
    },
    methods: {
        search() {
            const zipRegex = /^[0-9]{5}$/;
            const input = document.getElementById(`zip`);
            if (!zipRegex.test(this.searchKey)) {
                input.classList.add("is-invalid");
                return;
            }
            input.classList.remove("is-invalid");
            console.log("click");
            this.$store.dispatch("action1");
            console.log(this.$store.state.user);
        },
        closeModal() {
            this.event = {};
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
                `create-event`
                );
            return modalElem;
        },
        saveEvent() {
            console.log("TODO: the event will be saved");
            this.events.push(this.event);
            console.log("store: "+this.$store.state.events);
            this.closeModal();
        },
        onSave() {
        }
    },
}
</script>
<style scoped>
.headerTop {
    margin-top: 1rem;
    width: 60%;
    margin-left: 40%;
}

.custom-file {
    padding: 10px;
    box-shadow: 10px 10px 20px #888888;

}
.event-container {
    width: 60%;
    margin-left: 20%;
}
.modal-body {
    padding: 10px;

}

.form-control {
    padding: 5px;
    box-shadow: 5px 5px 10px #888888;

}

.form-group {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

form {
    padding: 1.5rem;
}

.form-control-file {
    box-shadow: 5px 5px 10px #888888;

}


</style>