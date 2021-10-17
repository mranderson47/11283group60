<template>
    
    <div class="container-sm">
        <p>Edit your user settings:</p>
        <form>
          <div class="form-group">
            <label for="exampleFormControlInput1">First Name</label>
            <input type="text" class="form-control" id="firstName" v-model="firstName"/>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Last Name</label>
            <input type="text" class="form-control" id="lastNae" v-model="lastName"/>
          </div>
          <div class="form-group">
            <button type="button" class="btn btn-primary" @click="updateProfile();">Save Settings</button>
          </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "Profile",
    components: {},
    data(){
        return{};
    },

    methods: {
        updateProfile(){
            this.$store.dispatch("updateUserSettings");
            this.$router.push({name: "Home"});
        }
    },

    computed: {

        firstName: {
            get() {
                return this.$store.state.profileFirstName;
            },
            set(payload) {
                this.$store.commit("changeFirstName", payload);
            },
        },

        lastName: {
            get() {
                return this.$store.state.profileLastName;
            },
            set(payload) {
                this.$store.commit("changeLastName", payload);
            },
        }
    }
}
</script>