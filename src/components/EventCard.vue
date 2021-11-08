<template>

<div class="card w-75 hover-shadow" style="width: 18rem;">
  <img class="card-img-top" src="https://clubsolaris.com/imgs/tips-to-take-care-of-the-beach-during-your-vacations/beach-sea-cancun-sun.png" alt="Card image cap"> <!-- Replace the src with the photo from the database for the event -->
  <div class="card-body">
    <span> <h2> Title: {{event.title}} </h2> </span>
    <p class="card-text">
    <span> <h4> Location: </h4> <p1>{{event.locationName}} </p1> </span>
    <span> <h4> ZIP: </h4> <p1>{{event.zipcode}} </p1> </span>
    <span> <h4> Date/Time: </h4> <p1>{{event.date}} </p1> </span>
    <span> <h4> Google Maps Link: </h4> <p1>{{event.locationLink}} </p1> </span>
    <span> <h4> Purpose: </h4> <p1>{{event.description}} </p1> </span>
    </p>
    
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

</template>
<script>

export default {
    props: {
        event: null
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
    .card-container {
        background-color: aqua;

    }

     .card {
        margin-top: 2rem;
        margin-bottom: 2rem;
        box-shadow: 10px 10px 20px #888888;

    } 
</style>
