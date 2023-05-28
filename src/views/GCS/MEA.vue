<template>
    <b-container class="vehicle-container">
        <b-row class="vehicle-row">
            <!-- left column -->
            <b-col class="left-column" cols="6  ">
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
                                :vehicleStages="missionStages" 
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
        return {
            vehicleName: "MEA",
            vehicleData: null,
            missionData: null,
            missionStages: null,
            widgetData: null,
            widgetTypeSelected: null,
        };
    },
    computed: {
        vehicleIcon() {                                     // If vehicleMissionData is null, return icon
            if (!this.vehicleMissionData) return null;
            return this.vehicleMissionData.icon;
        },
        vehicleMissionData() {                              // If missionData is null, return missionData for MEA in the missionData array
            if (!this.missionData) return null;
            return this.missionData[this.vehicleName];
        },
        yaw() {
            if (!this.vehicleData) return null;             // If vehicleData is null, return vehicleData for "yaw"
            return Math.round(this.vehicleData["yaw"]);
        },
    },
    mounted() {
        this.initializeMissionData();
        this.initializeWidgetData();
        this.interval = setInterval(this.updateStatus, 1000);      // Update the vehicledata every 1000 seconds
    },
    methods: {
        updateStatus() {
            this.updateVehicleData();
            this.updateMissionMEA();
        },
        async initializeMissionData() {
            try {
                const response = await getMissionData("all");       //Retrieves all missionData
                this.missionData = response;
            } catch (error) {
                console.log(error);
            }
        },
        async initializeWidgetData() {
            try {
                const response = await getWidgetData(this.vehicleName);     //Retrieves WidgetData for the MEA
                this.widgetData = response;
            } catch (error) {
                console.log(error);
            }
        },
        async updateVehicleData() {
            try {
                const response = await getVehicleData("MEA");           // Gets the vehicleData for the MEA
                this.vehicleData = response;
            } catch (error) {
                console.log(error);
            }
        },
        async updateMissionMEA() {
            try {
                this.missionStages = await getMissionStages("MEA");
            } catch (error) {
                console.log(error);
            }
        },
        setWidgetData(widgetType, value) {
            this.$set(this.widgetData, widgetType, value);      // Sets the widgetData in the widgetType with the passed value
        },
        setWidgetSelected(widgetTypeSelected) {
            this.widgetTypeSelected = widgetTypeSelected;       // Sets the widget with the passed in widgetTypeSelected
        },
    },
    beforeDestroy() {
        clearInterval(this.interval);       
    },
};
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

