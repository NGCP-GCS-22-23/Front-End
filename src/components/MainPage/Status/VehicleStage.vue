<template>
    <b-container class="stage-container">
        <b-row class="justify-content-md-center">
            <svg class="vehicleImg" v-if="path && fillColor" viewBox="0 0 100 100">
                <path :d="path" :fill="fillColor" />
            </svg>
            <h4 style="padding-bottom: -10px;">{{ vehicleName }}: {{ currentStage }}</h4>
        </b-row>
    </b-container>
</template>

<script lang="ts">
import type { Icon, MissionData, Stage, VehicleData } from '@/types';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        vehicleData: Object as () => VehicleData,
        vehicleName: String as () => keyof MissionData,
        missionData: Object as () => MissionData,
        vehicleIcon: Object as () => Icon,
        large: Boolean,
    },
    computed: {
        path(): string | undefined {
            return this.vehicleIcon?.path;
        },
        fillColor(): string | undefined {
            return this.vehicleIcon?.fillColor;
        },
        stages(): Stage[] | undefined {
            if (!this.missionData) return undefined;
            if (!this.vehicleName) return undefined;
            // return stages array
            let vehicleStages: Stage[] = this.missionData[this.vehicleName].stages;
            return vehicleStages
            // let stages = [];
            // for (let i = 0; i < vehicleStages.length; i++) {
            //     let stage = {
            //         id: vehicleStages[i].id,
            //         stage: vehicleStages[i].stage,
            //     };
            //     stages.push(stage);
            // }
            // return stages;
        },
        currentStage(): string {
            if (this.vehicleData == null) return "No Stage Selected";
            let currentStage = this.vehicleData.current_stage;
            if (this.stages != null) {
                for (let i = 0; i < this.stages.length; i++) {
                    let stage = this.stages[i];
                    if (stage.id == currentStage) {
                        return stage.stage;
                    }
                }
            }

            return "ERROR - INVALID STAGE";
        },
    },
});
</script>

<style scoped>
.stage-container {
    margin-top: -5px;
    margin-left: -10px;
}

.vehicleName {
    padding: 10px 0px;
}

.vehicleImg {
    width: 50px;
    height: 50px;
    margin-top: -8px;
    margin-right: 10px;
}
</style>