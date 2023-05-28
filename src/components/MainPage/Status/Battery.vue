<template>
  <b-card class="battery text-white" style="font-weight: 600;" :class="batteryPct > 66 ? 'bg-success' : 
    (batteryPct > 33 ? 'bg-warning' : 'bg-danger')" no-body>
    <span>
      {{ batteryPct }}%
    </span>
  </b-card>
</template>

<script lang="ts">
export default {
    data() {
        return {};
    },
    props: {
        batteryPct: { required: true, type: Number },                                               // declare a property called batteryPct that is a number 
    },
    computed: {
        batteryIcon() {
            if (!this.batteryPct) return "battery";                       // check if battery dead return string warning "battery" 

            if (this.batteryPct < 33) return "battery";                   // check if battery low return string warning "battery"
            else if (this.batteryPct < 66) return "battery-half";         // if battery percent is ~half return string "battery half"
            else return "battery-full";                                   // if battery percent is > 66% return "battery full"
        },
        batteryStyle() {
            if (this.batteryPct == -1) return "`color: grey`"             // if battery dead icon color is grey
            if (this.batteryPct < 33) return `color: red`;                // if battery is low (< 33%) icon color is red
            else if (this.batteryPct < 66) return `color: yellow`;        // if battery is ~half (33% < percent < 66%) icon color is yellow
            else return `color: green`;                                   // if battery is > than 66% battery color is green
        },
    },
};
</script>

<style scoped>

/** creates 10px of blank space on top and bottom inside battery icon and 0px space on left/right*/
.battery {
    margin-top: 10px;
    margin-bottom: 10px;
}

.batteryPercent {
    /** set the horizontal alignment of the bat % #*/
    font-size: 11pt;
    /**font size of battery % # */
}
</style>