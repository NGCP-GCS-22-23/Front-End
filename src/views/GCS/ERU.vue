<template>
    <b-container class="vehicle-container">
        <b-row class="vehicle-row">
            <!-- left column -->
            <b-col class="left-column" cols="6" style="padding: 0">
                <!-- <Map 
                  v-if="vehicleData && vehicleIcon && widgetData" :vehicleName="vehicleName"
                  :vehicleData="vehicleData" :vehicleIcon="vehicleIcon" :widgetData="widgetData"
                  :widgetTypeSelected="widgetTypeSelected" @moveMarker="setWidgetData" 
                /> -->
                <Map />
            </b-col>
            <!-- right column -->
            <b-col cols="6">
                <!-- top row of right-->
                <b-row>
                    <!-- left of right column -->
                    <b-col cols="8">
                        <b-row v-if="widgetTypeSelected != 'Geofence'">
                            <VehicleStatus 
                              :vehicleName="vehicleName" 
                              :vehicleIcon="vehicleIcon"
                              :vehicleData="vehicleData" 
                              :missionData="missionData"
                              :vehicleStages="missionStage"
                            />
                        </b-row>
                        <b-row>
                            <Widgets v-if="vehicleName && vehicleMissionData" :vehicleName="vehicleName"
                                :vehicleMissionData="vehicleMissionData" :widgetData="widgetData"
                                :vehicleData="vehicleData" :vehicleIcon="vehicleIcon"
                                @widgetTypeSelected="setWidgetSelected" @updateWidgetData="setWidgetData" />
                        </b-row>
                    </b-col>
                    <!-- right of right column -->
                    <b-col cols="4">
                        <b-card class="status-card" v-if="widgetTypeSelected != 'Geofence'">
                            <b-row>
                                <Status :vehicleData="vehicleData" />
                                <ErrorMessages :vehicleData="vehicleData" />
                                <!-- heading -->
                            </b-row>
                        </b-card>
                        <b-card v-if="widgetTypeSelected != 'Geofence'" class="heading-card">
                          <Heading :heading="yaw" />
                          <FlightIndicators v-if="widgetTypeSelected != 'Geofence'" :vehicleData="vehicleData" />
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<!-- importing key components from GCS -->
<script lang="ts">
import VehicleStatus from '@/components/MainPage/VehicleStatus.vue';
import FlightIndicators from '@/components/VehiclePage/FlightIndicators.vue';
import Heading from '@/components/VehiclePage/FlightIndicators/Heading.vue';
import ErrorMessages from '@/components/VehiclePage/StatusComponents/ErrorMessages.vue';
import Status from '@/components/VehiclePage/StatusComponents/Status.vue';
import Widgets from '@/components/VehiclePage/Widgets.vue';
import { getMissionData, getWidgetData, getVehicleData, getMissionStages } from '@/helpers/getData';
import type { VehicleData, MissionData, WidgetData, Icon, VehicleMission, VehicleDataGround, Stage, VehicleDataAir } from '@/types';
import { BContainer, BRow, BCol, BCard } from 'bootstrap-vue-3';
import { defineComponent } from 'vue';
import Map from "@/components/Maps/MainMap.vue";

// Giving class definitions for each component 
export default defineComponent({
    components: {
        Widgets,
        Map,
        Status,
        ErrorMessages,
        Heading,
        VehicleStatus,
        FlightIndicators
    },
    data() {
        //different return values for each widget
        return {
          missionStage: undefined as Stage[] | undefined,
          vehicleName: "ERU" as const,
          vehicleData: undefined as VehicleDataGround | VehicleDataAir | undefined,
          missionData: undefined as MissionData | undefined,
          widgetData: undefined as WidgetData | undefined,
          widgetTypeSelected: undefined as string | undefined,
          interval: undefined as NodeJS.Timer | undefined
        };
    },
    //Return values for Icon, Mision data,  vertical axis rotation
    computed: {
        // Returns Vehicle Icon
        vehicleIcon(): Icon | undefined {
            if (!this.vehicleMissionData) return undefined;
            return this.vehicleMissionData.icon;
        },
        // Returns Mission Data
        vehicleMissionData(): VehicleMission | undefined {
            if (!this.missionData) return undefined;
            return this.missionData[this.vehicleName];
        },
        yaw() {
            if (!this.vehicleData) return null;             // If vehicleData is null, return vehicleData for "yaw"
            return Math.round(this.vehicleData["yaw"]);
        },
    },
    //sets up the initialization for Mission Data, Widget Data, and intervals
    mounted() {
        this.initializeMissionData();
        this.initializeWidgetData();
        this.interval = setInterval(this.updateStatus, 1000);
    },
    //Initializes the missions data. Will return an error if data is invalid 
    methods: {
        updateStatus() {
          this.updateMissionERU(),
          this.updateVehicleData()
        },
        async initializeMissionData() {
          try {
            const response = await getMissionData("all");
            this.missionData = response as MissionData;
          } catch (error) {
            console.log(error);
          }
        },
        //Initializes the process for getting Widget Data
        async initializeWidgetData() {
            try {
                const response = await getWidgetData(this.vehicleName);
                this.widgetData = response;
            } catch (error) {
                console.log(error);
            }
        },
        //Provides updates to the data. Will wait for a response. Will either give an erorr if failure, otherwise it will set the response 
        async updateVehicleData() {
            try {
                const response = await getVehicleData("ERU");
                this.vehicleData = response;
            } catch (error) {
                console.log(error);
            }
        },
        async updateMissionERU() {
          try {
            const response = await getMissionStages("ERU");
            this.missionStage = response;
          } catch (error) {
            console.log(error);
          }
        },
        //Sets the data of the widget
        setWidgetData(widgetType: string, value: any) {
            if (!this.widgetData) return
            this.widgetData[widgetType] = value
        },
        //Will set the widget to be whichever one was selected
        setWidgetSelected(widgetTypeSelected: string) {
            this.widgetTypeSelected = widgetTypeSelected;
        },
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
});
</script>



<style scoped>
.vehicle-container {
    max-width: 100%;
    max-height: 100%;
}

.left-column {
    padding: 0;
    /* background-color: red; */
}

.right-column {
    padding: 0;
    /* background-color: purple; */
}

.right-column-row {
    padding-right: 10px;
}

.status-card {
    margin-top: 10px;
    height: 35vh;
}

.heading-card {
    margin-top: 10px;
    height: 20vh;
}
</style>
