<template>
	<b-container>
		<b-card class="flight-indicators-card">
			<!-- Pre-set up borders to hold information into one box -->
			<b-row>
				<b-col v-if="vehicleData?.vehicle != 'ERU'">
					<b-row class="justify-content-md-center">
						<!-- Nicely centers the Title and Icon-->
						<h5>Altitude: {{ altitude }} ft</h5>
						<!-- Text tempalte to show "ALtitude: (altitude) ft" -->
					</b-row>
					<b-row  class="justify-content-md-center">
						<Altimeter :altitude="altitude" class="dials" />
						<!-- Setting altitude variable in Altimiter dial-->
					</b-row>
				</b-col>
				<b-col>
					<b-row class="justify-content-md-center">
						<h5>Speed: {{ airspeed }} ft/s</h5>
					</b-row>
					<b-row class="justify-content-md-center">
						<Airspeed :airspeed="airspeed" class="dials" />
						<!-- Setting airspeed variable in Airspeed dial-->
					</b-row>
				</b-col>
				<b-col v-if="vehicleData?.vehicle != 'ERU'">
					<b-row  class="justify-content-md-center">
						<b-col>
							<h5>Pitch: {{ pitch }}</h5>
						</b-col>
						<b-col>
							<h5>Roll: {{ roll }}</h5>
						</b-col>
					</b-row>
					<b-row class="justify-content-md-center">
						<Attitude :pitch="pitch" :roll="roll" class="dials" />
						<!-- Setting pitch and role variable in Artificial Horizon -->
					</b-row>
				</b-col>
			</b-row>
		</b-card>
	</b-container>
</template>
<!-- Altitude: 0 ft		Airspeed: 0 ft/s		Pitch: 0 	Roll: 0		-->
<!-- (Altitude Dial)	(Airspeed Dial)			(Artificial Horizon)	-->

<script lang="ts">
import Altimeter from "@/components/VehiclePage/FlightIndicators/Altimeter.vue";
import Airspeed from "@/components/VehiclePage/FlightIndicators/Airspeed.vue";
import Attitude from "@/components/VehiclePage/FlightIndicators/Attitude.vue";
import { defineComponent } from 'vue';
import type { VehicleData, VehicleDataAir, VehicleDataGround } from "@/types";

export default defineComponent({
	props: {	//"Properties"
		vehicleData: Object as () => VehicleDataAir | VehicleDataGround,	// vehicleData object is "passed" to this vue, allowing this vue to extract data such as altitude, speed, pitch, roll, etc.
	},
	components: {	// Components that this vue wants to interact with, such as the Altimeter dial, Airspeed dial, etc.
		Altimeter,
		Airspeed,
		Attitude,
	},
	computed: { //Computed "getters" for altitude, airspeed, pitch, and roll
		// Rounding the vehicle data to 2 decimal places.
		altitude(): number {
      if (!this.vehicleData) return 0;
      if (this.vehicleData.vehicle != 'ERU') return Math.round(this.vehicleData.altitude * 100) / 100;
			return 0;
		},
		airspeed(): number {
			if (!this.vehicleData) return 0;
			return Math.round(this.vehicleData.speed * 100) / 100;
		},
		pitch(): number {
			if (!this.vehicleData) return 0;
			if (this.vehicleData.vehicle != 'ERU') return Math.round(this.vehicleData.pitch);
      return 0;
		},
		roll(): number {
			if (!this.vehicleData) return 0;
			if (this.vehicleData.vehicle != 'ERU') return Math.round(this.vehicleData.roll);
      return 0;
		},
	},
});
</script>

<!-- Applies to elements of current component only. Does not apply to entire document.-->
<style scoped>
.flight-indicators-card {
	width: 100%;
	height: 31vh;
	margin-top: 10px;
	padding: 0;
}

.dials {
	margin-top: -15px;
}

h5 {
	background: #343a40;
	margin: 0;
	padding: 3px 10px;
	color: #ffffff;
	border-radius: 3px;
	border: 1px solid rgb(121, 112, 99);
}
</style>