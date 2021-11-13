<template>

<div class="row card-event hover-shadow" >
  <div class="col-md-5">
    <img class="card-img-top" src="https://clubsolaris.com/imgs/tips-to-take-care-of-the-beach-during-your-vacations/beach-sea-cancun-sun.png" alt="Card image cap"> <!-- Replace the src with the photo from the database for the event -->
  </div>
  <div class="col-md-7 card-body yours">
    <h4>{{event.title}}</h4> 
    <span><b>Location: </b>{{event.locationName}} | <b>zip:</b> {{event.zipcode}} </span>
    <br/>
    <span> <b> Date/Time: </b> {{formattedDate}}  </span>
    <br/>
    <span v-if="event.locationLink"> <b> Google Maps Link: </b> {{event.locationLink}} </span>
    <br v-if="event.locationLink"/>
    <span v-if="event.description"> <b> Purpose: </b> {{event.description}} </span>
    <br v-if="event.description"/>
    <span> <b> By: </b> {{event.creatorName}} </span>
    <br/>
    <div class="icons">
        <em v-if="canEdit" id="your-label">This is your event<br/></em>
        <font-awesome-icon v-if="isLiked" v-on:click="likeDislike()" :icon="['fas', 'heart']" class="heart"/> &nbsp;&nbsp;
        <font-awesome-icon v-else v-on:click="likeDislike()" :icon="['far', 'heart']" class="heart"/> &nbsp;&nbsp;
        
        <font-awesome-icon v-if="isSaved" v-on:click="saveOrUnsave()" :icon="['far', 'bookmark']" class=" icon"/> &nbsp;&nbsp;
        <font-awesome-icon v-else v-on:click="saveOrUnsave()" :icon="['fas', 'bookmark']" class="icon"/>&nbsp;&nbsp;

        <font-awesome-icon v-if="canEdit" v-on:click="edit()" :icon="['fas', 'edit']" class="icon"/>&nbsp;&nbsp;
        <font-awesome-icon v-if="canEdit" v-on:click="remove()" :icon="['fas', 'trash']" class="icon"/>&nbsp;&nbsp;

    </div>
  </div>
  <event-form 
    :ref="`event${event.id}`" 
    :editEvent="event" 
    v-if="canEdit"
    @modify-event="modifyEvent"
  />
</div>

</template>
<script>
import EventForm from "./EventForm.vue";

export default {
    props: {
        event: Object
    },
    components: {
        EventForm
    },
    computed: {
        formattedDate() {
            var date = new Date(this.event.date);
            const year = date.getFullYear();

            let month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : `0${month}`;

            let day = date.getDate().toString();
            day = day.length > 1 ? day : `0${day}`;
            let hour = date.getHours();
            let minute = date.getMinutes();

            return `${month}/${day}/${year} ${hour}:${minute}`;
        },
    },
    created() {
        this.canEdit = (this.$store.state.userEvents.findIndex((it) => it.id == this.event.id) != -1);
    },
    data() {
        return {
            isLiked: false,
            isSaved: true,
            canEdit: true
        }
    },
    methods: {
        likeDislike() {
            this.isLiked = !this.isLiked;
        },
        saveOrUnsave() {
            this.isSaved = !this.isSaved;
        },
        edit() {
            var id = this.event.id;
            //open edit modal
            console.log(id);
            this.$refs[`event${id}`].openModal();
        },
        remove() {

        },
        modifyEvent(result) {
            this.event = result;
        }
    },
}
</script>
<style scoped>

     .card-event {
        margin: 2rem;

        box-shadow: 10px 10px 20px #c5c5c5;
    } 
    .card-img-top {
        padding: 2px;
        height: 100%;
        width: 100%;
    }
    .heart:hover {
        color:red;
    }
    .heart {
        color: pink;
    }
    .icons {
        margin-top: 1rem;
    }
    .icon {
        color:cornflowerblue;
    }
    .icon:hover {
        color: black;
    }
    #your-label {
        color:cornflowerblue;
        font-size: 0.7rem;
    }
</style>
