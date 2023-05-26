<template>
	<b-container>
		<b-card>
			<b-row class="justify-content-md-center">
				<h1 style="color: black">{{ vehicleName }}</h1>
			</b-row>

			<b-row>
				<!-- Mission Waypoint --> 
				<ImageURL ref="ImageURL" />
			</b-row>
			<b-row>
				<!-- Mission Waypoint 
				<MissionWaypoint ref="MissionWaypoint" /> -->
				<!-- Starting Coordinates -->
				<StartCoords ref="StartCoords" />
			</b-row>
			&nbsp;
			<b-row>
				<!-- Stages Form 
				<Stages ref="Stages" /> -->
				<b-row align="start">
					<!-- Search Area (toggle/checkbox) -->
					<SearchArea ref="SearchArea" />
				</b-row>
			</b-row>
			&nbsp;
			<b-row align="start">
				<!-- Manual Control (toggle/checkbox) 
				<ManualControl ref="ManualControl" :vehicleName="vehicleName + 'manual'" /> -->
			</b-row>
			
		</b-card>
		
	</b-container>
	
</template>

<script lang="ts">
import StartCoords from "@/components/Form/StartCoords.vue"
import MissionWaypoint from "@/components/Form/MissionWaypoint.vue";
import Stages from "@/components/Form/Stages.vue";
import ManualControl from "@/components/Form/ManualControl.vue";
import SearchArea from "@/components/Form/SearchArea.vue";
import ImageURL from "@/components/Form/ImageURL.vue";

export default {
	props: {
		vehicleName: String,
	},
	components: {
		StartCoords,
		MissionWaypoint,
		Stages,
		ManualControl,
		SearchArea,
		ImageURL,
	},
	data() {
		return {
			longitude: null,
			latitude: null,
		};
	},
};
</script>

<style scoped>

</style>