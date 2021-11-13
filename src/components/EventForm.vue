<template>
    <div>
        <div
        class="modal fade"
        :id="`create-event${event.id}`"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        >
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 v-if="!event.id" class="modal-title" id="exampleModalLabel">CREATE EVENT</h5>
                    <h5 v-else class="modal-title" id="exampleModalLabel">EDIT EVENT</h5>
                    <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <div
                    ref="messages"
                    v-if="errorMessages.length"
                    class="alert alert-danger fade show"
                    >
                    <span
                        v-for="(msg, index) in errorMessages"
                        :key="index"
                        id="message"
                        v-html="msg"
                    ></span>
                    <button
                        type="button"
                        class="btn-close"
                        @click="errorMessages = []"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                    ></button>
                    </div>
                    <form novalidate>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="exampleFormControlFile1">Cover Photo</label><br>
                                    <input type="file" class="form-control form-control-file">
                                </div>
                                <div class="form-group">
                                    <label for="eventName">Event Name<span class="requierd-span">*</span></label>
                                    <input v-model="event.title" type="text" class="form-control" placeholder="Enter event name">
                                </div>
                                <div class="form-group">
                                    <label for="EventDate">Event Date<span class="requierd-span">*</span></label>
                                    <date-picker class="form-control" v-model="event.date" type="datetime"></date-picker>
                                </div>
                                <div class="form-group">
                                    <label for="zipCode">Zip Code<span class="requierd-span">*</span></label>
                                    <input v-model="event.zipcode" type="text" class="form-control" placeholder="Enter zip code of location">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label for="eventLocation">Location Name<span class="requierd-span">*</span></label>
                                    <input v-model="event.locationName" type="text" class="form-control" placeholder="Enter name of location">
                                </div>

                                <div class="form-group">    
                                    <label for="">Google Maps Link of Location</label>
                                    <input v-model="event.locationLink" type="url" class="form-control" placeholder="Enter Google Maps link of location">
                                </div>
                                <div class="form-group">    
                                    <label for="">Purpose</label><br>
                                    <small id="purposeExplanation " class="form-text text-muted">What are you planning to do at this event?</small>
                                        <textarea v-model="event.description" class="form-control" rows="3" placeholder="Explain what will be done at this event" required></textarea>
                                    
                                </div>
                            </div>
                        </div>                    
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
                        type="submit"
                        class="btn btn-primary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Add a new card"
                        @click="onSave()"
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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { mapState } from "vuex";
export default {
    props: {
      editEvent: {
        type: Object,
        default: null
      },
    },
    created() {
      const tempObj = { ...this.editEvent };
      this.event = this.editEvent != null ? tempObj : {};
    },
    components: {
        DatePicker,
    },
    emits:["modify-event"],
    data() {
        return {
            event: {},
            activeModal: {},
            errorMessages: []
        }
    },
    methods: {
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
                `create-event${this.event.id}`
                );
            return modalElem;
        },
        saveEvent() {
            if (!this.event.id)
                this.$store.dispatch("saveEventToDB", Object.assign({}, this.event));
            else {
                this.$store.dispatch("editEvent", Object.assign({}, this.event));
                this.$emit("modify-event", this.event);
            }
            this.closeModal();
        },
        onSave() {
            this.errorMessages = [];
            const webAddress = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
            const zipRegex = /^[0-9]{5}$/;
            if (!this.event.title) {
                this.errorMessages.push("<b>Name</b> is required.\n");
            }
            if (!this.event.date) {
                this.errorMessages.push("<b>Date</b> is required.\n");
            }
            if (!this.event.locationName) {
                this.errorMessages.push("<b>Location Name</b> is required.\n");
            }
            if (!this.event.zipcode) {
                this.errorMessages.push("<b>ZipCode</b> is required.\n");
            }
            else if (!zipRegex.test(this.event.zipcode)) {
                this.errorMessages.push("<b>ZipCode</b> is not valid");
            }
            if (this.event.locationLink && !webAddress.test(this.event.locationLink)) {
                this.errorMessages.push("<b>Location Link</b> must be a web address.\n");
            }

            if (this.errorMessages.length === 0) {
                this.saveEvent();
            }
        }
    },
}
</script>
<style scoped>
.headerTop {
    margin-top: 1rem;
    width: 60%;
    margin-left: 40%;
}

.custom-file {
    padding: 10px;
    box-shadow: 10px 10px 20px #888888;

}
.event-container {
    width: 80%;
    margin-left: 10%;
}
.modal-body {
    padding: 10px;

}
.requierd-span {
    color: red;
  }

.form-control {
    padding: 5px;
    box-shadow: 5px 5px 10px #888888;

}

.form-group {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

form {
    padding: 1.5rem;
}

.form-control-file {
    box-shadow: 5px 5px 10px #888888;

}


</style>