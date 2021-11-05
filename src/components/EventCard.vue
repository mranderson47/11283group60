<template>
    <div class="card-container">
        <div class=col>
            <span> Location: {{event.locationName}} </span>
        </div>
        <div class=col>
            <span> TITLE: {{event.name}} </span>
        </div>
        <button
            type="button"
            title="Create Event"
            class="btn btn-primary"
            @click="like"
        >
         <font-awesome-icon icon="heart" size="2x"/>
        </button>
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
</style>
