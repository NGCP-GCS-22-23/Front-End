<template>
    <div>
        <b-button class="emergency-button" style="font-weight: bold" @click="eModalShow = !eModalShow" variant="danger">
            EMERGENCY STOP
            <b-img style="padding-left: 5px; width: 42px; color: #ffffff" src="/assets/stop.png"></b-img>
        </b-button>
        <b-modal centered v-model="eModalShow" hide-footer title="Emergency Stop">
            <h3>Send Emergency Stop Command?</h3>
            <b-row>
                <b-col>
                    <b-button variant="danger" block @click="eModalShow = !eModalShow">
                        No
                    </b-button>
                </b-col>
                <b-col>
                    <b-button variant="success" block @click="sendEmergencyStopCommand">
                        Yes
                    </b-button>
                </b-col>
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
        };
    },
    methods: {
        sendEmergencyStopCommand() {
            this.eModalShow = !this.eModalShow;
            const path = "http://localhost:5000/send";
            let payload = {
                id: "Stage Selection",
                data: {
                    current_stage: -1,
                    stage_name: "Emergency Stop",
                    vehicle_name: this.vehicleName,
                    estop: true,
                },
            };
            axios
                .post(path, payload)
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
.emergency-button {
    width: 230px;
    height: 50px;
}
</style>
