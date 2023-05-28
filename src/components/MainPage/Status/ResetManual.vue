<template>
    <div>
        <b-button class="reset-button" style="padding: 5px 10px;" @click="eModalShow = !eModalShow" variant="success">
            RESET MANUAL
        </b-button>
        <b-modal centered v-model="eModalShow" hide-footer title="Reset to Automatic">
            <h3 class="text-center">Are You Sure?</h3>
            <b-row>
              <b-button variant="secondary" class="my-2 col-6" @click="eModalShow = !eModalShow">
                        Cancel reset
                    </b-button>
                    <b-button variant="success my-2 col-6" @click="sendAutomaticReset">
                        Reset to automatic
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
        };
    },
    methods: {
        sendAutomaticReset() {
            this.eModalShow = !this.eModalShow;
            const path = `http://localhost:5000/api/vehicleData/${this.vehicleName}?db_type=general`;
            let payload = {manualMode: false};
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
.reset-button {
    height: 41px;
}
</style>