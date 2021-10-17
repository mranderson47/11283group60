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
                    <p> We'll add the form here</p>
                    
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
</style>