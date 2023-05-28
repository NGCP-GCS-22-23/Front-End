<template>
    <GmapMap class="gmap" :center="center" :zoom="zoom" :map-type-id="mapType" :tilt="tilt" :options="options">
        <VehiclePositionMarker :vehicleData="vehicleData" :vehicleIcon="vehicleIcon" />

        <MissionWaypointMarker :widgetData="widgetData" :widgetTypeSelected="widgetTypeSelected"
            @moveMarker="moveMarker" />

        <HomeCoordinatesMarker :widgetData="widgetData" :widgetTypeSelected="widgetTypeSelected"
            @moveMarker="moveMarker" />

        <SearchAreaComponents :widgetData="widgetData" :widgetTypeSelected="widgetTypeSelected"
            :vehicleName="vehicleName" @moveMarker="moveMarker" />

        <GeofenceComponents :widgetData="widgetData" :widgetTypeSelected="widgetTypeSelected"
            @moveMarker="moveMarker" />

        <HikerMarker />
    </GmapMap>
</template>

<script lang="ts">
import {
    centerLng,
    centerLat,
    defaultLat,
    defaultLng,
} from "@/helpers/coordinates.js";
import VehiclePositionMarker from "@/components/Maps/MapComponents/VehiclePositionMarker.vue";
import MissionWaypointMarker from "@/components/Maps/MapComponents/MissionWaypointMarker.vue";
import HomeCoordinatesMarker from "@/components/Maps/MapComponents/HomeCoordinatesMarker.vue";
import SearchAreaComponents from "@/components/Maps/MapComponents/SearchAreaComponents.vue";
import GeofenceComponents from "@/components/Maps/MapComponents/GeofenceComponents.vue";
import { defineComponent } from "vue";
import type { Icon, VehicleData, WidgetData } from "@/types";

export default defineComponent({
    props: {
        vehicleName: String,
        vehicleData: { required: true, type: Object as () => VehicleData },
        vehicleIcon: { required: true, type: Object as () => Icon },
        widgetData: { required: true, type: Object as () => WidgetData },
        widgetTypeSelected: String,
    },
    components: {
        VehiclePositionMarker,
        MissionWaypointMarker,
        HomeCoordinatesMarker,
        SearchAreaComponents,
        GeofenceComponents,
    },
    data() {
        return {
            // Map Data
            center: { lat: centerLat, lng: centerLng },
            zoom: 18,
            tilt: 0,
            options: {
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                scrollwheel: false,
                draggable: false,
                disableDoubleClickZoom: true,
            },
            mapType: "satellite",
            // Polygon Data
            // paths: [
            // 	{ id: 1, lat: 33.933729, lng: -117.6318437 }, // marker1
            // 	{ id: 2, lat: 33.93441, lng: -117.6318169 }, // marker2
            // 	{ id: 3, lat: 33.9344055, lng: -117.6306099 },
            // 	{ id: 4, lat: 33.9337468, lng: -117.6305616 },
            // ],
            paths: [],
            polyOptions: {
                strokeColor: "#39FF14",
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: "#39FF14",
                fillOpacity: 0.3,
            },
        };
    },
    methods: {
        moveMarker(widgetType: string, value: any) {
            this.$emit("moveMarker", widgetType, value);
        },
    },
});
</script>

<style scoped>
.gmap {
    width: 100vw;
    height: 92vh;
}
</style>
