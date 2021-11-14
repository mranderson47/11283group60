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
                        <date-picker class="form-control" type="datetime"></date-picker>
                    </div>
                    <div class="form-group col-md-2">
                        <label>Search Before: </label>
                        <date-picker class="form-control" type="datetime"></date-picker>
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
        <event-form ref="eventF"/>
    </div>
    
</template>

<script>

import 'vue2-datepicker/index.css';
import DatePicker from 'vue2-datepicker';
import { mapState } from "vuex";
import EventCard from "../components/EventCard.vue"
import EventForm from "../components/EventForm.vue"
export default {
    components: {
        EventCard,
        EventForm,
        DatePicker
    },
    computed: {
        ...mapState(["events"]),
        eventsFirstHalf() {
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