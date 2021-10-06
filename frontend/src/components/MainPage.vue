<template>
    <div>
        <p> Hello </p>
        <button 
            type="submit"
            @click="test()"
        >
            Button
        </button>

        <p>Successful requests to backend: {{this.numberOfRequests}} </p>
        <p>Number of clicks: {{this.clicks}} </p>
    </div>
</template>
<script>
export default {
    name: 'MainPage',
    data() {
        return {
            numberOfRequests: 0,
            clicks: 0,
        }
    }, 
    created() {

    },
    computed: {

    },
    methods: {
        test() {
            this.clicks++;
            this.$store.dispatch("example", "hi").then(
                res => {
                    if (res.error) {
                        alert(res.error);
                        return;
                    }
                    else 
                        this.numberOfRequests++;
                }
            )
        },
    }
}
</script>
