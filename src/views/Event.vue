<template>
    <div>
        <p>Hi</p>
        <div class="form-group">
             <input type="text" v-model="hi">

            <button type="button" class="btn btn-primary" @click="random">Random</button>
        </div>
    </div>
</template>

<script>

export default {
    
    data() {
        return {
            hi: "",
            IFAIW: [],
            GG: null,
        }
    },
    methods: {
        random() {
          
            console.log("click");
            this.$store.dispatch("action1");
            console.log(this.$store.state.user);
        },
        
    }
}
</script>