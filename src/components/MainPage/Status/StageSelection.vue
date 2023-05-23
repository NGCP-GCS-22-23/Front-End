<!-- Selection modal for user to select which stage to switch vehicle to -->
<template>
    <div>
        <!-- button to open modal -->
        <b-button class="stage-selection-button" style="padding: 5px 10px;" @click="sModalShow = !sModalShow"
            variant="primary">{{ "STAGE" }}
            <b-img style="width: 24px; color: #ffffff" src="/assets/select.png"></b-img>
        </b-button>

        <!-- dynamic title -->
        <b-modal centered v-model="sModalShow" hide-footer :title="vehicleName + ' Stage Selection'">
            <!-- include form dropdown & submit button -->

            <!-- select a stage -->
            <b-form-select v-model="selected"
                :options="stages ? stages.map(stage => { return { text: stage.stage, value: stage } }) : []">
                <b-form-select-option :value="undefined" disabled>-- Please select an option
                </b-form-select-option>
            </b-form-select>

            <!-- display selected values -->
            <div class="mt-3">
                Selected ID: <strong>{{ selectedId }}</strong>
            </div>
            <div class="mt-3">
                Selected Stage: <strong>{{ selectedStage }}</strong>
            </div>

            <!-- button to submit form (calls endpoint) -->
            <b-button @click="submit()" variant="primary" style="{padding: 5px}">Submit
            </b-button>
        </b-modal>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

type Stage = {
    id: number,
    stage: string,
}

export default defineComponent({
    props: {
        // name of the vehicle
        vehicleName: {
            type: String,
            required: true,
        },
        // shared mission data
        missionData: Object,
        // data regarding specific vehicle
        vehicleData: Object,
    },
    computed: {
        // existential checks, if prop is null, return null
        currentStage(): string | null {
            if (this.vehicleData == null) return null;
            return this.vehicleData.current_stage;
        },
        selectedStage(): string | null {
            if (this.selected) {
                return this.selected.stage;
            }
            return null;
        },
        selectedId(): number | null {
            if (this.selected) {
                return this.selected.id;
            }
            return null;
        },
        /**
         * Returns null if either mission data or vehicleName is missing. Else, returns a list of stages.
         */
        stages(): Stage[] | null {
            if (!this.missionData) return null;
            if (!this.vehicleName) return null;
            // return stages array
            let vehicleStages = this.missionData[this.vehicleName].stages;
            let stages = [];
            for (let i = 0; i < vehicleStages.length; i++) {
                let stage = {
                    id: vehicleStages[i].id,
                    stage: vehicleStages[i].stage,
                };
                stages.push(stage);
            }
            return stages;
        },
    },
    data() {
        return {
            sModalShow: false as Boolean,
            selected: undefined as Stage | undefined,
            form: {
                option: null,
            },
        };
    },
    mounted() {
    },
    methods: {
        /**
         * Submits selection of stage to local REST endpoint. Provides selected stage id/name as well as vehicle name and emergency stop boolean.
         */
        submit() {
            this.sModalShow = !this.sModalShow;
            const path = "http://localhost:5000/send";
            let payload = {
                id: "Stage Selection",
                data: {
                    current_stage: this.selectedId,
                    stage_name: this.selectedStage,
                    vehicle_name: this.vehicleName,
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
});
</script>

<style scoped>
.stage-selection-button {
    height: 41px;
}
</style>