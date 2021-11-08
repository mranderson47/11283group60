<template>

<div class="row card-event hover-shadow" >
  <div class="col-md-5">
    <img class="card-img-top" src="https://clubsolaris.com/imgs/tips-to-take-care-of-the-beach-during-your-vacations/beach-sea-cancun-sun.png" alt="Card image cap"> <!-- Replace the src with the photo from the database for the event -->
  </div>
  <div class="col-md-7 card-body">
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
  </div>
</div>

</template>
<script>

export default {
    props: {
        event: null
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
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        like() {
            //TODO later
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
</style>
