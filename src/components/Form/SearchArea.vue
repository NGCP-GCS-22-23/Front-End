<template>
	<div>
	  <b-col>
		<b-row>
		  <h4 class="text-left font-weight-bold">Search Area</h4>
		</b-row>
		<b-row>
		  <div class="b-form-group" v-for="(input, k) in inputs" :key="k">
			<!-- Input Text field -->
			<b-input-group>
			  <b-form-input type="text" class="form-control" v-model="input.long" placeholder="Enter Point Longitude"
				width="10px"></b-form-input>
  
			  <b-form-input type="text" class="form-control" v-model="input.lat" placeholder="Enter Point Latitude"
				width="10px"></b-form-input>
  
			  <b-input-group-append class="btns">
				<!-- Remove button -->
  
				<b-button @click="remove(k)" v-show="k || (!k && inputs.length > 1)" variant="light" size="sm"
				  class="mb-2 float-right">
				  <b-icon icon="dash-circle" variant="danger" font-scale="1" aria-label="Delete"></b-icon>
				</b-button>
  
				<!-- Add button -->
				<b-button @click="add(k)" v-show="k == inputs.length - 1" b-modal="k == inputs.length-1" variant="light"
				  size="sm" class="mb-2 float-right">
				  <b-icon icon="plus-circle" variant="success" font-scale="1" aria-label="Add"></b-icon>
				</b-button>
			  </b-input-group-append>
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
			long: "",
			lat: "",
		  },
		],
	  };
	},
  
	methods: {
	  add(index: number) {
		this.inputs.push({ long: "", lat: "" });
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