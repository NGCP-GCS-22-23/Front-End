<template>
    <b-container class="vehicle-container">
        <b-row class="vehicle-row">
            <!-- left column -->
            <b-col class="left-column" cols="6  ">
                <!-- <Map v-if="vehicleData && vehicleIcon" :vehicleName="vehicleName" :vehicleData="vehicleData"
                    :vehicleIcon="vehicleIcon" :widgetData="widgetData" :widgetTypeSelected="widgetTypeSelected"
                    @moveMarker="setWidgetData" /> -->
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
                        </b-card>
                    </b-col>
                </b-row>
                <!-- bottom row of right -->
                <b-row>
                    <FlightIndicators v-if="widgetTypeSelected != 'Geofence'" :vehicleData="vehicleData" />
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
// bring in functions from other files to be used with the MAC to display all necessary info for the vehicle
import VehicleStatus from "@/components/MainPage/VehicleStatus.vue";
import Widgets from "@/components/VehiclePage/Widgets.vue";
import Map from "@/components/Maps/MainMap.vue";
import {
    getMissionData,
    getVehicleData,
    getWidgetData,
    getMissionStages
} from "@/helpers/getData";
import FlightIndicators from "@/components/VehiclePage/FlightIndicators.vue";
import Status from "@/components/VehiclePage/StatusComponents/Status.vue";
import ErrorMessages from "@/components/VehiclePage/StatusComponents/ErrorMessages.vue";
import Heading from "@/components/VehiclePage/FlightIndicators/Heading.vue";

export default {
    // export single value present by default in script for components for reusability
    components: {
        Widgets,
        Map,
        VehicleStatus,
        FlightIndicators,
        Status,
        ErrorMessages,
        Heading,
    },
    data() {
        // set name and initial values of vehicle info
        return {
            vehicleName: "MAC",
            vehicleData: null,
            missionData: null,
            missionStage: null,
            widgetData: null,
            widgetTypeSelected: null,
        };
    },
    computed: {
        vehicleIcon() {
            // updates position of vehicle on map
            if (!this.vehicleMissionData) return null;
            return this.vehicleMissionData.icon;
        },
        vehicleMissionData() {
            // coordinates of vehicle MAC in list of vehicles
            if (!this.missionData) return null;
            return this.missionData[this.vehicleName];
        },
        yaw() {
            // direction of MAC nose on horizontal plane (yaw)
            if (!this.vehicleData) return null;
            return Math.round(this.vehicleData["yaw"]);
        },
    },
    mounted() {
        // calls to methods to initialize MAC info and update data at 1Hz (once every 1s or every 1000ms)
        this.initializeMissionData();
        this.initializeWidgetData();
        this.interval = setInterval(this.updateStatus, 1000);
    },
    methods: {
        updateStatus() {
          this.updateMissionMAC(),
          this.updateVehicleData()
        },
        async initializeMissionData() {
            // asynchronous method attempts to initialize mission data while program continues to be responsive to other tasks
            try {
                const response = await getMissionData("all");
                this.missionData = response;
            } catch (error) {
                console.log(error);
            }
        },
        async initializeWidgetData() {
            // asynchronous method attempts to initialize widget data while program continues to be responsive to other tasks
            try {
                const response = await getWidgetData(this.vehicleName);
                this.widgetData = response;
            } catch (error) {
                console.log(error);
            }
        },
        async updateVehicleData() {
            // asynchronous method attempts to update vehicle data while program continues to be responsive to other task
            try {
                const response = await getVehicleData("MAC");
                this.vehicleData = response;
            } catch (error) {
                console.log(error);
            }
        },
        async updateMissionMAC() {
          try {
            const response = await getMissionStages("MAC");
            this.missionStage = response;
          } catch (error) {
            console.log(error);
          }
        },

        // initialize widget data
        setWidgetData(widgetType, value) {
            this.$set(this.widgetData, widgetType, value);
        },
        // selecting widget to update data
        setWidgetSelected(widgetTypeSelected) {
            this.widgetTypeSelected = widgetTypeSelected;
        },
    },
    beforeDestroy() {
        // resets the interval timer for updating MAC info
        clearInterval(this.interval);
    },
};
</script>

<style scoped>
.vehicle-container {
    max-width: 100%;
    max-height: 100%;
}
/* padding adds space between info inside coulumns and the edge of the column */
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

/* margins add space outside the columns to prevent overlap and improve asthetics */
.status-card {
    margin-top: 10px;
    height: 35vh;
}

.heading-card {
    margin-top: 10px;
    height: 20vh;
}
</style>
