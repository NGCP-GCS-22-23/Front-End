<template>
    <div>
        <b-button class="waypoint" style="padding: 5px 10px;" @click="wModalShow = !wModalShow">
            ADD POINT
        </b-button>
        <b-modal centered v-model="wModalShow" hide-footer title="Add Waypoint">
            <h3>Enter Waypoint Details:</h3>
            <b-row>
                <b-col>
                    <p>Longitude: {{ longitude }}</p>
                        <input v-model="longitude"  />
                    <p style="padding-top: 10px">Latitude: {{ latitude }}</p>
                        <input v-model="latitude" />
                </b-col>
                <b-col>
                    <b-button variant="success" block @click="submit">
                        Submit
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
        longitude: String,
        latitude: String,
    },
    data() {
        return {
            wModalShow: false,
        };
    },
    methods: {
        submit() {
            this.wModalShow = !this.wModalShow;
            const path = "http://localhost:5000/send";
            let payload = {
                id: "New Waypoint",
                data: {
                    estop: false,
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
</style>
