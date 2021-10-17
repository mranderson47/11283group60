<template>
    <div>
        <form>
            <div class="row">
                <div class="form-group col-md-4">
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ZipCode" v-model="searchKey">
                </div>
                <div class="form-group col-md-4">
                    <button type="button" class="btn btn-primary" @click="search">Search</button>
                </div>
                <div class="form-group col-md-4">
                    <button
                        type="button"
                        title="Create Event"
                        class="btn btn-primary"
                        @click="openModal"
                    >
                    CREATE EVENT
                    </button>
                </div>
            </div>
            
        </form>


        <div
        class="modal fade"
        :id="`create-event`"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        >
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">CREATE EVENT</h5>
                    <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <!--
                        Create event form
                        -->

                        <!--
                    <div class="custom-file">
                    <input type="file" class="custom-file-input" id="customFile">
                    <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
                    -->

                
                <div class="form-group">
                    <label for="exampleFormControlFile1">Cover Photo</label><br>
                    <input type="file" class="form-control-file" id="exampleFormControlFile1">
                </div>
                


                    <form>

                    <div class="form-group">
                        <label for="eventName">Event Name</label>
                        <input v-model= "event.name" type="text" class="form-control" id="eventNameInput" aria-describedby="eventName" placeholder="Enter event name">
                        
                    </div>

                    <!--
                        Insert date
                        -->

                    <div class="form-group">
                        <label for="zipCode">Location Name</label>
                        <input v-model= "event.zipCode" type="text" class="form-control" id="zipCode" placeholder="Enter zip code of location">
                    </div>

                    <div class="form-group">
                        <label for="eventLocation">Location Name</label>
                        <input v-model= "event.locationName" type="text" class="form-control" id="locationName" placeholder="Enter name of location">
                    </div>

                    <div class="form-group">    
                        <label for="">Google Maps Link of Location</label>
                        <input v-model= "event.locationLink" type="url" class="form-control" id="locationLink" placeholder="Enter Google Maps link of location">
                    </div>

                    <div class="form-group">    
                        <label for="">Purpose</label><br>
                        <small id="purposeExplanation " class="form-text text-muted">What are you planning to do at this event?</small>
                    <div class="form-horizontal">
                        <div class="form-group">
                            <div class="col-md-6">
                                <textarea v-model= "event.purpose" class="form-control" rows="3" placeholder="Explain what will be done at this event" required></textarea>
                            </div>
                        </div>
                    </div>
                    </div>
                    

                    <!--
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>

                    -->
                    </form>

                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Add a new card"
                        @click="saveEvent"
                    >
                        <font-awesome-icon icon="save" />&nbsp;Save
                    </button>
                </div>
            </div>
        </div>
        </div>
    </div>
    
</template>

<script>
import { Modal } from "bootstrap";
export default {
    
    data() {
        return {
            searchKey: "",
            activeModal: {},
            event: {name: "", locationName: "", locationLink: "", purpose: "", zipCode: ""}
        }
    },
    methods: {
        search() {
          
            console.log("click");
            this.$store.dispatch("action1");
            console.log(this.$store.state.user);
        },
        closeModal() {
            if (typeof this.activeModal.hide === "function") {
                this.activeModal.hide();
            }
        },
        openModal() {
            const modalElem = this.setUpModalElement();
            this.activeModal = new Modal(modalElem, {});
            this.activeModal.show();
        },
        setUpModalElement() {
            const self = this,
                modalElem = document.getElementById(
                `create-event`
                );
            return modalElem;
        },
        saveEvent() {
            console.log("TODO: the event will be saved");
            console.log(this.event);
            this.closeModal();
        }
    },
}
</script>
<style scoped>
.row {
    margin-top: 1rem;
    width: 60%;
    margin-left: 40%;
}

.custom-file {
    padding: 10px;
    box-shadow: 10px 10px 20px #888888;

}

.modal-body {
    padding: 30px;

}

.form-control {
    padding: 5px;
    box-shadow: 5px 5px 10px #888888;

}

.form-group {
    padding: 5px;

}

form {
    padding-top: 30px;

}

.form-control-file {
    box-shadow: 5px 5px 10px #888888;

}

.form-horizontal {

}

</style>