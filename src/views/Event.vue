<template>
    <div class="event-container">
        <div class="row">
            <div class="form-group col-md-10">
                <h1> EVENTS</h1>
            </div>
            <div class="form-group col-md-2">
                <button
                    type="button"
                    title="Create Event"
                    class="btn btn-success header-btn"
                    @click="$refs.eventF.openModal()"
                >
                CREATE EVENT
                </button>
            </div>
        </div>
        <form>
            <div class="row">
                    <div class="form-group col-md-2">
                        <label>Search After: </label>
                        <Datepicker v-model="dateAfter" :is24="false" />
                    </div>
                    <div class="form-group col-md-2">
                        <label>Search Before: </label>
                        <Datepicker v-model="dateBefore" :is24="false" />
                    </div>
                    <div class="form-group col-md-2">
                        <label>ZipCode: </label>
                        <input type="text" class="form-control" id="zip" v-model="searchKey">
                    </div>
                    <div class="form-group col-md-2">
                        <button type="button" class="btn btn-secondary header-btn" @click="search">FILTER</button>
                    </div>
            </div>
            
        </form>
        <div class="row">
            <div class="col">
                <div v-for="(event) in eventsFirstHalf" :key="event.id"> 
                    <event-card :key="event.id" :event="event" />
                </div>
            </div>
            <div class="col">
                <div v-for="(event) in eventsSecondHalf" :key="event.id">
                     <event-card :key="event.id" :event="event"/>
                </div>
            </div>
        </div>
        <event-form ref="eventF"/>
    </div>
    
</template>

<script>

import Datepicker from 'vue3-date-time-picker';
import 'vue3-date-time-picker/dist/main.css';
import { mapState } from "vuex";
import EventCard from "../components/EventCard.vue"
import EventForm from "../components/EventForm.vue"
export default {
    components: {
        EventCard,
        EventForm,
        Datepicker
    },
    computed: {
        ...mapState(["events"]),
        eventsFirstHalf() {
            console.log(this.events);
            return this.events.slice(0, Math.ceil(this.events.length/2.));
        },
        eventsSecondHalf() {
            return this.events.slice(Math.ceil(this.events.length/2.));
        }
    },
    name: 'Events',
    data() {
        return {
            searchKey: "",
            dateBefore: null,
            dateAfter: null,
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

        },
    },
}
</script>
<style scoped>
.headerTop {
    margin-top: 1rem;
    margin-left: 10%;
}

.custom-file {
    padding: 10px;
    box-shadow: 10px 10px 20px #888888;

}
.event-container {
    margin-top:2rem;
    width: 80%;
    margin-left: 10%;
}
.modal-body {
    padding: 10px;

}
.requierd-span {
    color: red;
  }
.mx-datepicker {
    padding:0px !important;
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
.filter {
    border-style:solid; 
    border-radius:20px; 
    border-color:rgb(204, 204, 204);
    padding-top:0.5rem;
    padding-bottom: 0.5rem;
}
.header-btn {
    margin-top:24px;
}

.form-control-file {
    box-shadow: 5px 5px 10px #888888;

}


</style>