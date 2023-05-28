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
import type { Icon, MissionData, Stage, VehicleDataGeneral } from '@/types';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        vehicleData: Object as () => VehicleDataGeneral,
        vehicleName: String as () => keyof MissionData,
        missionData: Object as () => MissionData,
        vehicleIcon: Object as () => Icon,
        vehicleStages: Object as () => Stage[],
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
            return this.vehicleStages;
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
            let currentStage = this.vehicleData.currentStageId;
            if (this.vehicleStages != null) {
                for (let i = 0; i < this.vehicleStages.length; i++) {
                    let stage = this.vehicleStages[i];
                    if (stage.id == currentStage) {
                        return stage.name;
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