<template>
    <div>
        <b-container class="emergency-button-container">
            <b-button class="emergency-button" style="padding: 5px 10px;" @click="eModalShow = !eModalShow"
                variant="danger">
                STOP ALL
                <b-img style="width: 42px; color: #ffffff" src="/assets/stop.png">
                </b-img>
            </b-button>
        </b-container>
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
    data() {
        return {
            eModalShow: false,
        };
    },
    methods: {
        sendEmergencyStopCommand() {
            this.eModalShow = !this.eModalShow;
            const path = "http://localhost:5000/api/manualOverride";

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
.emergency-button-container {
    width: 100%;
    padding-top: 10px;
}

</style>