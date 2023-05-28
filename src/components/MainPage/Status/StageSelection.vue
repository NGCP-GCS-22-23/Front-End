<!-- Selection modal for user to select which stage to switch vehicle to -->
<template>
    <div>
        <!-- button to open modal -->
        <b-button class="stage-selection-button" style="padding: 5px 10px;" @click="sModalShow = !sModalShow"
            variant="primary">SELECT STAGE
            <b-img class="mb-1" style="width: 20px; color: #ffffff" src="/assets/select.png"></b-img>
        </b-button>

        <!-- dynamic title -->
        <b-modal centered v-model="sModalShow" hide-footer :title="vehicleName + ' Stage Selection'">
            <!-- include form dropdown & submit button -->

            <!-- select a stage -->
            <b-form-select v-model="selected">
                <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                <b-form-select-option v-for="stage in vehicleStages" :value="stage.id">{{ stage.name }}</b-form-select-option>
                
            </b-form-select>

            <!-- display selected values -->
            <div class="mt-3">
                Selected ID: <strong>{{ selected }}</strong>
            </div>
            <div class="mt-3">
                Selected Stage: <strong>{{ selected }}</strong>
            </div>

            <!-- button to submit form (calls endpoint) -->
            <b-button @click="submit()" variant="primary" style="{padding: 5px}">Submit
            </b-button>
        </b-modal>
    </div>
</template>

<script lang="ts">
import type { Stage } from "@/types";
import axios from "axios";
import { defineComponent } from "vue";

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
        vehicleStages: Object
    },
    computed: {
        // existential checks, if prop is null, return null
        currentStage(): string | null {
            if (this.vehicleData == null) return null;
            return this.vehicleData.current_stage;
        },
        /**
         * Returns null if either mission data or vehicleName is missing. Else, returns a list of stages.
         */
        stages(): Stage[] | undefined {
            if (!this.vehicleStages) return undefined;
            if (!this.vehicleName) return undefined;
            // return stages array
            let vehicleStages = this.vehicleStages;
            let stages: Stage[] = [];
            stages.push({id: 0, name: '--- Please select an option'})
            for (let i = 0; i < vehicleStages.length; i++) {
                let stage: Stage = {
                    id: vehicleStages[i].id,
                    name: vehicleStages[i].name,
                };
                stages.push(stage);
            }
            return stages;
        },
    },
    data() {
      return {
        sModalShow: false as Boolean,
        selected: null,
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
            const path = `http://localhost:5000/api/currentStage/${this.vehicleName}`;
            let payload = {
              currentStageId: this.selected
            };
            axios
              .post(path, payload)
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                console.log(payload)
              });
        },
    },
});
</script>

<style scoped>
</style>