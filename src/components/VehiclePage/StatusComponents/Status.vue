<template>
	<b-container class="status-container">
		<!-- Status -->
		<!-- <b-row class="justify-content-md-center">
			<b-col>
				<b-row class="justify-content-md-center">
					<h3>Activity Status</h3>
				</b-row>
				<b-row class="status justify-content-md-center">
					{{ statusText }}
					<p class="StatusIcon">
						<b-icon icon="circle-fill" :variant="statusIconVariant" />
					</p>
				</b-row>
			</b-col>
		</b-row> -->

		<!-- Sensors -->
		<b-row class="justify-content-md-center">
			<b-col>
				<b-row class="justify-content-md-center">
					<h3>Sensor Status</h3>
				</b-row>
				<b-row class="status justify-content-md-center">
					<!-- {{ sensorsText }}
					<p class="SensorIcon">
						<b-icon icon="circle-fill" :variant="sensorsIconVariant"></b-icon>
					</p> -->
          <b-card class="bg-light text-center" style="font-weight: 600;"
            :class="sensorsText == 'Functional' ? 'border-success text-success' : 'border-danger text-danger' ">
            {{ sensorsText }}
          </b-card>
				</b-row>
			</b-col>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import type { VehicleData, VehicleDataAir, VehicleDataGround } from '@/types';
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		vehicleData: Object as () => VehicleDataAir | VehicleDataGround,
	},
	computed: {
		//status section
		// status(): number | null {
		// 	//If the vehicle's data stream Isn't null, it will return one of two statuses
		// 	//Either active or standby. If it's not sending a number it will give an empty status
		// 	if (!this.vehicleData) return null;
		// 	return this.vehicleData["status"];
		// },
		// statusText(): string {
		// 	if (!this.vehicleData) return "-----";
		// 	if (this.status == 0) return "Standby";
		// 	return "Active";
		// },
		// statusIconVariant(): string {
		// 	if (!this.vehicleData) return "";
		// 	if (this.status == 0) return "warning";
		// 	return "success";
		// },
		//sensor status section
		sensors(): boolean | null {
			//if there is data to stream, then the sensors are ok
			if (!this.vehicleData) return null;
			return this.vehicleData.sensorOk;
		},
		//Here's what reports the current status of the sensor
		sensorsText(): string {
			if (!this.vehicleData) return "-----";
			if (this.sensors) return "Functional";
			else if (!this.sensors) return "Malfunctioning";
			return "Malfunctioning";
		},
		sensorsIconVariant(): string {
			if (!this.vehicleData) "null";
			if (this.sensors) return "success";
			else if (!this.sensors) return "warning";
			return "warning";
		},
	},
});
</script>
<style scoped>
.StatusIcon .b-icon {
	margin-left: 10px;
}

.SensorIcon .b-icon {
	margin-left: 10px;
}

h3 {
	text-decoration: underline;
}
</style>
