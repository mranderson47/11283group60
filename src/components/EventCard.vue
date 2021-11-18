
<template>
<div class="row card-event hover-shadow" >
  <div class="col-md-5">
    <img v-if="event.imageUrl" class="card-img-top" :src="`${event.imageUrl}`" alt="Card image cap"> 
    <img v-else class="card-img-top" src="https://clubsolaris.com/imgs/tips-to-take-care-of-the-beach-during-your-vacations/beach-sea-cancun-sun.png" alt="Card image cap">
  </div>
  <div class="col-md-7 card-body yours">
    <h4>{{event.title}}</h4> 
    <span><b>Location: </b>{{event.locationName}} | <b>zip:</b> {{event.zipcode}} </span>
    <br/>
    <span> <b> Date/Time: </b> {{new Date(event.date)}}</span>
    <br/>
    <span v-if="event.locationLink"> <b> Google Maps Link: </b> {{event.locationLink}} </span>
    <br v-if="event.locationLink"/>
    <span v-if="event.description"> <b> Purpose: </b> {{event.description}} </span>
    <br v-if="event.description"/>
    <span> <b> By: </b> {{event.creatorName}} </span>
    <br/>
    <div class="icons">
        <em v-if="canEdit" id="your-label">This is your event<br/></em>
         {{event.likeCount}}
        <font-awesome-icon v-if="isLiked" v-on:click="likeDislike()" :icon="['fas', 'heart']" class="heart"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <font-awesome-icon v-else v-on:click="likeDislike()" :icon="['far', 'heart']" class="heart"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        

        <font-awesome-icon v-if="canEdit" v-on:click="edit()" :icon="['fas', 'edit']" class="icon"/>&nbsp;&nbsp;
        <font-awesome-icon v-if="canEdit" v-on:click="remove()" :icon="['fas', 'trash']" class="icon"/>&nbsp;&nbsp;
      
     
 
    

                
    </div>
  </div>
  
  <event-form 
    :ref="`event${event.id}`" 
    :editEvent="event" 
    v-if="canEdit"
  />
</div>

</template>
<script>
import EventForm from "./EventForm.vue";
import React, { useEffect, useState } from "react";
import Vue from 'vue';
import $ from 'jquery';

export default {
    
    props: {
        event: Object,
    },
    components: {
        EventForm
    },
    computed: {
        formattedDate() {
            var date = new Date(this.event.date.seconds);
            const year = date.getFullYear();

            let month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : `0${month}`;

            let day = date.getDate().toString();
            day = day.length > 1 ? day : `0${day}`;
            let hour = date.getHours();
            let minute = date.getMinutes();

            return `${month}/${day}/${year} ${hour}:${minute}`;
        },
        canEdit: {
           get(){
             return this.$store.state.userEvents.findIndex((it) => it.id == this.event.id) != -1
           },
           set(newVal){
             return newVal
           } 
        },
        isLiked: {
           get(){
             return this.event.usersLiked.findIndex((it) => it == this.$store.state.profileId) != -1
           },
           set(newVal){
             return newVal
           } 
        },
    },
    data() {
        return {
            isSaved: true,
        
    }
},
        
      
    methods: {
        likeDislike() {
            if (!this.isLiked) {
                this.$store.dispatch("addLike", this.event);
            }
            else {
                this.$store.dispatch("removeLike", this.event);
            }
        },
        edit() {
            var id = this.event.id;
            this.$refs[`event${id}`].openModal();
        },
        remove() {
            if (confirm("are you sure you want to delete this event?")) {
                this.$store.dispatch("deleteEvent", this.event);
            }
        },
    },
}

</script>
<style scoped>
.container {
	max-width: 640px;
	margin: 30px auto;
	background: #fff;
	border-radius: 8px;
	padding: 20px;
}
.comment {
	display: block;
	transition: all 1s;
}
.commentClicked {
	min-height: 0px;
	border: 1px solid #eee;
	border-radius: 5px;
	padding: 5px 10px
}
button.primaryContained {
	background: #016ba8;
	color: #fff;
	padding: 10px 10px;
	border: none;
	margin-top: 0px;
	cursor: pointer;
	text-transform: uppercase;
	letter-spacing: 4px;
	box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.25);
	transition: 1s all;
	font-size: 10px;
	border-radius: 5px;
}
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

