<template>
    <b-container :class="
        widgetTypeSelected == 'Geofence'
            ? 'geofence-container'
            : 'widget-container'
    " v-if="widgetData && vehicleIcon && vehicleMissionData && vehicleData">
        <b-card :class="
            widgetTypeSelected == 'Geofence'
                ? 'geofence-card'
                : 'widget-card'
        ">
            <b-row v-for="group in widgetGroups" :key="group.buttonGroupId">
                <b-col v-for="widget in group.widgetGroup" :key="widget.name">
                    <b-button class="widget-button" variant="dark" v-if="!selected && widget.type != 'Placeholder'"
                        @click="selectWidget(widget.name, widget.type)">
                        <!-- not geofence -->
                        <h5 v-if="widget.type != 'Geofence'">
                            {{ widget.name }}
                            <b-img style="height: 50px" class="widget-icon" v-if="widget.icon" :src="`${widget.icon}`">
                            </b-img>
                        </h5>

                        <!-- geofence -->
                        <h5 v-else>
                            Geofence
                            <br />
                            <p class="compliant">
                                Compliant:
                                <b-icon icon="circle-fill" v-if="geofenceCompliant" variant="success"></b-icon>
                                <b-icon icon="circle-fill" v-if="!geofenceCompliant" variant="danger"></b-icon>
                            </p>
                        </h5>
                    </b-button>
                </b-col>
            </b-row>

            <div v-for="group in widgetGroups" :key="group.widgetGroupId">
                <div v-for="widget in group.widgetGroup" :key="widget.name">
                    <MissionWaypoint v-if="
                        widget.type == 'MissionWaypoint' &&
                        cardSelected == widget.name
                    " :name="widget.name" :missionWaypoint="missionWaypoint" :vehicleName="vehicleName"
                        @goBack="showWidgets" @updateWidgetData="updateWidgetData" />
                    <HomeCoordinates v-if="
                        widget.type == 'HomeCoordinates' &&
                        cardSelected == widget.name
                    " :name="widget.name" :homeCoordinates="homeCoordinates" :vehicleName="vehicleName"
                        @goBack="showWidgets" @updateWidgetData="updateWidgetData" />
                    <SearchArea v-if="
                        widget.type == 'SearchArea' &&
                        cardSelected == widget.name
                    " :name="widget.name" :searchArea="searchArea" @goBack="showWidgets"
                        @updateWidgetData="updateWidgetData" />
                    <Geofence v-if="
                        widget.type == 'Geofence' &&
                        cardSelected == widget.name
                    " :name="widget.name" :vehicleName="vehicleName" :vehicleIcon="vehicleIcon" :geofence="geofence"
                        :geofenceWorkspace="geofenceWorkspace" @goBack="showWidgets"
                        @updateWidgetData="updateWidgetData" />
                    <ManualControl v-if="
                        widget.type == 'ManualControl' &&
                        cardSelected == widget.name
                    " :name="widget.name" :vehicleName="vehicleName" :vehicleData="vehicleData"
                        @goBack="showWidgets" />
                </div>
            </div>
        </b-card>
    </b-container>
</template>

<script lang="ts">
import MissionWaypoint from "@/components/VehiclePage/Widgets/MissionWaypoint.vue";
import HomeCoordinates from "@/components/VehiclePage/Widgets/HomeCoordinates.vue";
import SearchArea from "@/components/VehiclePage/Widgets/SearchArea.vue";
import Geofence from "@/components/VehiclePage/Widgets/Geofence.vue";
import ManualControl from "@/components/VehiclePage/Widgets/ManualControl.vue";
import { defineComponent } from "vue";
import type { Coordinate, GeoFence, GeoFenceWorkspace, Icon, VehicleData, VehicleMission, Waypoint, WidgetData } from "@/types";

export default defineComponent({
    components: {
        MissionWaypoint,
        HomeCoordinates,
        SearchArea,
        Geofence,
        ManualControl,
    },
    props: {
        vehicleName: String,
        vehicleMissionData: Object as () => VehicleMission,
        widgetData: Object as () => WidgetData,
        vehicleData: Object as () => VehicleData,
        vehicleIcon: Object as () => Icon,
    },
    computed: {
        missionWaypoint(): Waypoint | undefined {
            return this.widgetData?.missionWaypoint;
        },
        homeCoordinates(): Coordinate[] | undefined {
            return this.widgetData?.homeCoordinates;
        },
        searchArea(): { lat: number, lng: number }[] | undefined {
            return this.widgetData?.searchArea?.map((coordinate) => {
                return {
                    lat: parseFloat(coordinate.lat),
                    lng: parseFloat(coordinate.lng),
                };
            });
        },
        geofence(): GeoFence | undefined {
            return this.widgetData?.geofence;
        },
        geofenceWorkspace(): GeoFenceWorkspace | undefined {
            return this.widgetData?.geofenceWorkspace;
        },
        geofenceCompliant(): string {
            if (!this.vehicleData) return "None";
            return this.vehicleData["geofence_compliant"];
        },
    },
    data() {
        return {
            selected: false as boolean,
            cardSelected: null,
            widgetTypeSelected: null,
            widgetGroups: [],
            //widgetIcon: null,
        };
    },
    mounted() {
        this.getWidgetGroups();
    },
    methods: {
        selectWidget(widgetName, widgetType) {
            this.selected = true;
            this.cardSelected = widgetName;
            this.widgetTypeSelected = widgetType;
            this.$emit("widgetTypeSelected", this.widgetTypeSelected);
        },
        showWidgets() {
            this.selected = false;
            this.cardSelected = null;
            this.widgetTypeSelected = null;
            this.$emit("widgetTypeSelected", this.widgetTypeSelected);
        },
        getWidgetGroups() {
            // Mission Waypoint and Home Coordinates
            let widgetGroup1 = {
                widgetGroup: [
                    {
                        type: "MissionWaypoint",
                        name: this.vehicleMissionData?.missionWaypoint,
                        icon: require("@/assets/map_icons/mission-waypoint.png"),
                    },
                    {
                        type: "HomeCoordinates",
                        name: "Home Coordinates",
                        icon: require("@/assets/map_icons/home.png"),
                    },
                ],
                buttonGroupId: "Button Group 1",
                widgetGroupId: "Widget Group 1",
            };

            // Geofence and
            // Search Area (optional) or Manual Control (optional)
            let widgetGroup = [];

            // Geofence
            widgetGroup.push({
                type: "Geofence",
                name: "Geofence",
                icon: null,
            });

            // Search Area
            if (this.vehicleMissionData.searchArea) {
                let widget = {
                    type: "SearchArea",
                    name: "Search Area",
                    icon: null,
                };
                widgetGroup.push(widget);
            }

            // Manual Control
            if (this.vehicleMissionData.manualControl) {
                let widget = {
                    type: "ManualControl",
                    name: "Manual Control",
                    icon: null,
                };
                widgetGroup.push(widget);
            }

            while (widgetGroup.length < 2) {
                let widgetPlaceholder = {
                    type: "Placeholder",
                    name: "Placeholder " + widgetGroup.length,
                    icon: null,
                };
                widgetGroup.push(widgetPlaceholder);
            }

            let widgetGroup2 = {
                widgetGroup: widgetGroup,
                buttonGroupId: "Button Group 2",
                widgetGroupId: "Widget Group 2",
            };

            this.widgetGroups.push(widgetGroup1, widgetGroup2);
        },
        updateWidgetData(widgetType, value) {
            this.$emit("updateWidgetData", widgetType, value);
        },
    },
});
</script>

<style scoped>
p {
    color: black;
}

.widget-container {
    margin-top: 10px;
}

.geofence-container {
    margin-top: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
}

.widget-card {
    overflow: auto;
    height: 33vh;
}

.geofence-card {
    overflow: auto;
    height: 89vh;
}

.widget-button {
    width: 100%;
    margin-bottom: 12px;
    height: 14vh;
}

.widget-icon {
    height: 4vh;
}

.invisible {
    visibility: hidden;
}

.compliant {
    color: #ffffff;
    font-size: 10pt;
}
</style>