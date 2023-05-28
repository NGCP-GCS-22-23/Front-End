<template>
	<b-card class="mode bg-light" style="font-weight: 600;" 
    :class="mode == 'Manual' ? 'border-danger text-danger' : 'border-success text-success'" no-body>
		<span>
			{{ mode }}
			<b-icon :icon="mode == 'Autonomous' ? 'cpu-fill' : 'controller'"></b-icon>
		</span>
	</b-card>
</template>

<script lang="ts">
export default {
	props: {
		mode: String,
	},
};
</script>

<style scoped>
.mode {
	margin-top: 10px;
	width: 100%;
	margin-left: 10px;
}
</style>