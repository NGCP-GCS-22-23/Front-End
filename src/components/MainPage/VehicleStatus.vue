<template>
    <b-container class="status-container">
        <b-card class="status-card">
            <!-- top row -->
            <b-row>
                <b-col>
                    <VehicleStage :vehicleData="vehicleData" :vehicleName="vehicleName" :missionData="missionData" :vehicleStages="vehicleStages"
                        :vehicleIcon="vehicleIcon" />
                </b-col>
            </b-row>

            <!-- middle row -->
            <b-row>
                <!-- middle left -->
                <b-col cols="6">
                    <ConnectionStatus :status="status" :latency="latency" />
                </b-col>
                <!-- middle right -->
                <b-col cols="6">
                    <b-row>
                        <b-col cols="6">
                            <Mode class="text-center" :mode="mode" />
                        </b-col>
                        <b-col cols="6">
                            <Battery class="text-center" :batteryPct="batteryPct" />
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <!-- bottom row -->
            <div class="mt-4 d-flex justify-content-between">
                <!-- bottom left -->
                <StageSelection 
                      :vehicleName="vehicleName" 
                      :missionData="missionData" 
                      :vehicleData="vehicleData" 
                      :vehicleStages="vehicleStages"
                    />
                    <AddWaypoint :vehicleName="vehicleName" />
                    <EmergencyStop v-if="vehicleData?.manualMode == false" :vehicleName="vehicleName" />
                    <ResetManual v-if="vehicleData?.manualMode == true" :vehicleName="vehicleName" />
                <!-- <b-col col="4" class="mx-auto">
                    
                </b-col>
                <b-col col="4" class="mx-auto">
                    
                </b-col> -->
                <!-- bottom right -->
                <!-- <b-col col="4" class="mx-auto">
                    
                </b-col> -->
                
              </div>
        </b-card>
    </b-container>
</template> 

<script lang="ts">
import VehicleStage from "@/components/MainPage/Status/VehicleStage.vue";
import ConnectionStatus from "@/components/MainPage/Status/ConnectionStatus.vue";
import EmergencyStop from "@/components/MainPage/Status/EmergencyStop.vue";
import ResetManual from "@/components/MainPage/Status/ResetManual.vue";
import Battery from "@/components/MainPage/Status/Battery.vue";
import Mode from "@/components/MainPage/Status/Mode.vue";
import StageSelection from "@/components/MainPage/Status/StageSelection.vue";
import AddWaypoint from "@/components/MainPage/Status/AddWaypoint.vue";
import { defineComponent } from "vue";
import type { Icon, MissionData, Stage, VehicleData, VehicleDataAir, VehicleDataGround } from "@/types";

export default defineComponent({
    props: {
        // Respective vehicle name string
        vehicleName: { required: true, type: String as () => keyof MissionData },
        // Respective vehicle icon object
        vehicleIcon: Object as () => Icon,
        // Respective vehicle data object
        vehicleData: Object as () => VehicleDataAir | VehicleDataGround,
        // Respective mission data object
        missionData: Object as () => MissionData,
        vehicleStages: Object as () => Stage[]
    },
    components: {
        VehicleStage,               // Component for displaying current vehicle stage
        ConnectionStatus,           // Component for displaying connection status
        EmergencyStop,
        ResetManual,              // Component for displaying emergency stop button
        Battery,                    // Component for displaying battery status
        Mode,                       // Component for displaying current mode of vehicle
        StageSelection,             // Component for stage selection button
        AddWaypoint,
    },
    computed: {
        //If vehicle data is null display battery percentage as -1, otherwise return the battery percentage
        batteryPct(): number {
            if (!this.vehicleData) return -1;
            if('batteryLife' in this.vehicleData) return this.vehicleData.batteryLife;
            return this.vehicleData.batteryLife1;
        },
        //If vehicle data is null display latency as 0, otherwise return the last packet time for latency
        latency(): number {
            if (!this.vehicleData) return 0;
            return 0;
        },
        // If the vehicle data is null display mode as None, otherwise return the vehicle data mode
        mode(): string {
            if (!this.vehicleData) return "None";
            if (this.vehicleData.manualMode === false) return "Automatic";
            return "Manual";
        },
        // If the vehicle data is null, display status as offline, otherwise return online
        status(): string {
            if (!this.vehicleData) return "Offline";
            return "Online";
        },
    },
});
</script>

<style scoped>
.status-container {
    margin-top: 10px;
}


img {
    width: 20;
    height: 20;
}
</style>