<!-- Map displaying the position of all vehicles -->
<template>
	<GMapMap class="gmap" :center="center" :zoom="zoom" :map-type-id="mapType" :tilt="tilt" :options="options">
		<!-- MAC -->
		<VehiclePositionMarker :vehicleData="macData" :vehicleIcon="macIcon" />
		<!-- ERU -->
		<VehiclePositionMarker :vehicleData="eruData" :vehicleIcon="eruIcon" />

		<!-- MEA -->
		<VehiclePositionMarker :vehicleData="meaData" :vehicleIcon="meaIcon" />
		<HikerMarker />
	</GMapMap>
</template>

<script lang="ts">
import {
	centerLng,
	centerLat,
	defaultLat,
	defaultLng,
} from "@/helpers/coordinates.js";
import VehiclePositionMarker from "@/components/Maps/MapComponents/VehiclePositionMarker.vue";
import { defineComponent } from "vue";
import type { Icon, VehicleData, VehicleDataAir, VehicleDataGround } from "@/types";

export default defineComponent({
	props: {
		macData: { required: true, type: Object as () => VehicleDataAir },
		eruData: { required: true, type: Object as () => VehicleDataGround },
		meaData: { required: true, type: Object as () => VehicleDataAir },
		macIcon: { required: true, type: Object as () => Icon },
		eruIcon: { required: true, type: Object as () => Icon },
		meaIcon: { required: true, type: Object as () => Icon },
	},
	components: {
		VehiclePositionMarker
	},
	// Map data
	data() {
		return {
			// Center the map
			center: { lat: centerLat, lng: centerLng },
			// Adjust zoom of the map
			zoom: 18,
			// Adjust tilt of the map
			tilt: 0,
			// Disable controls for the map
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
			// Define map type
			mapType: "satellite",
			macHover: false,
			eruHover: false,
			meaHover: false,
		};
	},
	computed: {
		macMarker() {
			// If missing MAC data, do not display marker
			if (!this.macData) return null;

			// Display the MAC marker
			return {
				id: "macMarker",
				position: {
					lat: this.macData.latestCoordinates.lat,
					lng: this.macData.latestCoordinates.lng,
				},
				icon: {
					path: this.macIcon.path,
					fillColor: this.macIcon.fillColor,
					fillOpacity: 1,
					strokeWeight: 0,
					rotation: this.macData.yaw,
					scale: 1,
					anchor: { x: 41.42, y: 46.713 },
				},
			};
		},
		eruMarker() {
			// If missing ERU data, do not display marker
			if (!this.eruData) return null;

			// Display the MEA marker
			return {
				id: "eruMarker",
				position: {
					lat: this.eruData.latestCoordinates.lat,
					lng: this.eruData.latestCoordinates.lng,
				},
				icon: {
					path: this.eruIcon.path,
					fillColor: this.eruIcon.fillColor,
					fillOpacity: 1,
					strokeWeight: 0,
					rotation: this.eruData.yaw,
					scale: 1,
					anchor: { x: 41.42, y: 46.713 },
				},
			};
		},
		meaMarker() {
			// If missing MEA data, do not display marker
			if (!this.meaData) return null;

			// Display the MEA marker
			return {
				id: "meaMarker",
				position: {
					lat: this.meaData.latestCoordinates.lat,
					lng: this.meaData.latestCoordinates.lng,
				},
				icon: {
					path: this.meaIcon.path,
					fillColor: this.meaIcon.fillColor,
					fillOpacity: 1,
					strokeWeight: 0,
					rotation: this.meaData.yaw,
					scale: 1,
					anchor: { x: 41.42, y: 46.713 },
				},
			};
		},
		// vehicleMarkers() {
		// 	if (!(this.macMarker && this.eruMarker && this.meaMarker))
		// 		return null;
		// 	return [this.macMarker, this.eruMarker, this.meaMarker];
		// },
	},
	methods: {},
});
</script>

<style scoped>
.gmap {
	/* sets the width of the map */
	width: 100vw;
	/* sets the height of the map */
	height: 100vh;
}
</style>
