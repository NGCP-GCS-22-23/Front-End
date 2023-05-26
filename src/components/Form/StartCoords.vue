<template>
	<div>
	  <b-col>
		<b-row>
		  <h4 class="text-left font-weight-bold">Start Coordinates</h4>
		</b-row>
		<b-row>
		  <div class="b-form-group" v-for="(input, k) in inputs" :key="k">
			<!-- Input Text field -->
			<b-input-group>
			  <b-form-input type="text" class="form-control" v-model="input.startLong" placeholder="Enter Longitude"
				width="10px"></b-form-input>
  
			  <b-form-input type="text" class="form-control" v-model="input.startLat" placeholder="Enter Latitude"
				width="10px"></b-form-input>
  
              <b-form-input type="text" class="form-control" v-model="input.startAlt" placeholder="Enter Altitude"
				width="10px"></b-form-input>
			</b-input-group>
		  </div>
		</b-row>
	  </b-col>
	</div>
  </template>
  
  <script lang="ts">
  export default {
	data() {
	  return {
		inputs: [
		  {
			startLong: "",
            startLat: "",
            startAlt: "", 
		  },
		],
	  };
	},
  
	methods: {
	  add(index: number) {
		this.inputs.push({ startLong: "", startLat: "", startAlt: "" });
	  },
	  remove(index: number) {
		this.inputs.splice(index, 1);
	  },
	},
  };
  </script>
  
  <style scoped>
  .btns {
  
	margin-left: 10px;
  }
  </style>