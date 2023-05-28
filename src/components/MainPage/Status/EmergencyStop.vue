<template>
    <div>
        <b-button class="emergency-button" style="padding: 5px 10px;" @click="eModalShow = !eModalShow" variant="danger">
            STOP
            <b-img class="mb-1" style="width: 20px; color: #ffffff" src="/assets/stop.png"></b-img>
        </b-button>
        <b-modal centered v-model="eModalShow" hide-footer title="Emergency Stop">
            <h3 class="text-center">Are You Sure?</h3>
            <b-row class="d-flex align-items-between">
              <b-button variant="secondary" class="my-2" block @click="eModalShow = !eModalShow">
                        Cancel stop
                    </b-button>
                    <b-button variant="danger" block @click="sendEmergencyStopCommand">
                        Send emergency stop
                    </b-button>
            </b-row>
        </b-modal>
    </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
    props: {
        vehicleName: String,
    },
    data() {
        return {
            eModalShow: false,
            emergencyTitle: `${this.vehicleName} - Emergency Stop`
        };
    },
    methods: {
        sendEmergencyStopCommand() {
            this.eModalShow = !this.eModalShow;
            const path = `http://localhost:5000/api/manualOverride/${this.vehicleName}`;
            axios
                .post(path)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>

<style scoped>

</style>
