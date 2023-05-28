<template>
	<GmapMarker v-if="vehicleData && vehicleIcon" :position="vehicleMarker?.position" :clickable="true"
		@mouseover="hover = true" @mouseout="hover = false" :icon="vehicleMarker?.icon" :zIndex="500">
		<GmapInfoWindow v-if="hover" :opened="true">
			<div>
				<strong>Latitude:</strong>
				{{ vehicleMarker?.position.lat }}
				<br />
				<strong>Longitude:</strong>
				{{ vehicleMarker?.position.lng }}
			</div>
		</GmapInfoWindow>
	</GmapMarker>
</template>

<script lang="ts">import type { Icon, VehiclePositionMarker, VehicleData, VehicleDataAir, VehicleDataGround } from '@/types';

export default {
	props: {
		vehicleData: { required: true, type: Object as () => VehicleDataAir | VehicleDataGround },
		vehicleIcon: { required: true, type: Object as () => Icon },
	},
	computed: {
		vehicleMarker(): VehiclePositionMarker | undefined {
			if (!this.vehicleData || !this.vehicleIcon) return undefined;
			return {
				id: "vehicleMarker",
				position: {
					lat: this.vehicleData.latestCoordinates.lat,
					lng: this.vehicleData.latestCoordinates.lng,
				},
				icon: {
					path: this.vehicleIcon.path,
					fillColor: this.vehicleIcon.fillColor,
					fillOpacity: 1,
					strokeWeight: 0,
					rotation: this.vehicleData.yaw,
					scale: 1,
					anchor: { x: 41.42, y: 46.713 },
				},
			};
		},
	},
	data() {
		return {
			hover: false,
		}
	}
};
</script>

<style scoped>
.coorStyle {
	height: 7vh;
	margin-left: 2px;
}

.coord-container {
	margin-bottom: 10px;
	margin-left: 2px;
}

.c {
	background-color: white;
	color: rgb(160, 160, 160);
	position: absolute;
	bottom: 0px;
	right: 25%;
	left: 50%;
	margin-left: -150px;
}

button.gm-ui-hover-effect {
	visibility: hidden;
}

.gm-style-iw.gm-style-iw-c {
	font-size: 25px;
	font-weight: 400;
}
</style>