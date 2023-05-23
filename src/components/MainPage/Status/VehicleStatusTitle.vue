<template>
	<b-row class="justify-content-md-center vehicleName">
		<h2>{{ vehicleName }}</h2>
		<svg class="vehicleImg" v-if="path && fillColor" viewBox="0 0 100 100">
			<path :d="path" :fill="fillColor" />
		</svg>
	</b-row>
</template>

<script lang="ts">
export default {
	props: {
		vehicleName: String,										string property for naming the vehicle
		vehicleIcon: Object,										property for giving the vehicle an icon 
	},
	computed: {
		path() {
			if (!this.vehicleIcon) return null;						if no instance of a vehicle icon object return null
			return this.vehicleIcon.path;							else return the vehicles icon
		},
		fillColor() {
			if (!this.vehicleIcon) return null;						if no instance of a vehicle icon object return null
			return this.vehicleIcon.fillColor;						else return the vehicles icon color
		},
	},
};
</script>

<style scoped>
.vehicleName {
	padding: 10px 0px;	
	font-size: 10px;											create an area of empty around the vehicle name inside its bounding box of 10px on top and bottom 0px on left and right
}

.vehicleImg {
	width: 50px;													define size of vehicle icon to be 50px wide 
	height: 50px;													by 50px tall
	margin-top: -6px;												positioned 6px below the top of the screen 
	margin-left: 10px;												and 10px from the  left of the screen
	float: left;													left align the icon object
}
</style>