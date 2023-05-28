<template>
  <b-container class="main-container">
    <b-row class="main-row">
      <!-- left column -->
      <b-col class="left-column" cols="8" style="padding: 0">
        <Map
          :macData="macData"
          :eruData="eruData"
          :meaData="meaData"
          :macIcon="macIcon"
          :eruIcon="eruIcon"
          :meaIcon="meaIcon"
        />
      </b-col>

      <!-- right column -->
      <b-col cols="4">
        <b-row>
          <b-col class="right-column" cols="12">
            <b-row>
              <!-- Sidebar Button -->
              <b-col
                :class="{
                  buttonRotate: !renderSidebar,
                  buttonTranslate: !renderSidebar,
                }"
                align-self="center"
                class="right-column"
                cols="1"
              >
                <b-button
                  @click="renderSidebar = !renderSidebar"
                  style=" padding: 0%;
                    background-color: transparent;
                    border: none;
                  "
                >
                  <b-img
                    @click="toggleSideBar"
                    style="margin: 300px 0px; width: 40px"
                    src="/assets/chevron.png"
                  ></b-img>
                </b-button>
              </b-col>

              <!-- Sidebar -->
              <Transition name="sideBar">
                <b-col fill-height v-show="renderSidebar">
                  <VehicleStatus
                    class="vehicle-status"
                    :vehicleName="'MAC'"
                    :vehicleIcon="macIcon"
                    :vehicleData="macData"
                    :missionData="missionData"
                    :vehicleStages="macMission"
                  />
                  <VehicleStatus
                    class="vehicle-status"
                    :vehicleName="'ERU'"
                    :vehicleIcon="eruIcon"
                    :vehicleData="eruData"
                    :missionData="missionData"
                    :vehicleStages="eruMission"
                  />
                  <VehicleStatus
                    class="vehicle-status"
                    :vehicleName="'MEA'"
                    :vehicleIcon="meaIcon"
                    :vehicleData="meaData"
                    :missionData="missionData"
                    :vehicleStages="meaMission"
                  />
                </b-col>
              </Transition>
              
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
  <b-col style="text-align: right; margin-top: -100px;">
    <b-row>
      <EmergencyStopAll />
    </b-row>
  </b-col>
</template>

<script>
// @ is the same as src
import VehicleStatus from "@/components/MainPage/VehicleStatus.vue";
import GeneralStage from "@/components/MainPage/GeneralStage.vue";
import Map from "@/components/Maps/MainMap.vue";
import EmergencyStopAll from "@/components/MainPage/EmergencyStopAll.vue";
import {
  getMissionData,
  getGeneralStage,
  getVehicleData, getMissionStages
} from "@/helpers/getData";

export default {
  props: {
    stage: String,
  },
  components: {
    VehicleStatus,
    GeneralStage,
    Map,
    EmergencyStopAll,
  },
  data() {
    return {
      macMission: null,
      eruMission: null,
      meaMission: null,
      macData: null,
      eruData: null,
      meaData: null,
      missionData: null,
      renderSidebar: true,
    };
  },
  computed: {
    macIcon() {
      if (!this.missionData) return null;
      return this.missionData.MAC.icon;
    },
    eruIcon() {
      if (!this.missionData) return null;
      return this.missionData.ERU.icon;
    },
    meaIcon() {
      if (!this.missionData) return null;
      return this.missionData.MEA.icon;
    },
  },
  mounted() {
    this.initializeMissionData();
    this.interval = setInterval(this.updateStatus, 1000);
  },
  methods: {
    updateStatus() {
      this.updateMAC();
      this.updateERU();
      this.updateMEA();
    },
    async initializeMissionData() {
      try {
        const response = await getMissionData("all");
        this.missionData = response;
      } catch (error) {
        console.log(error);
      }
    },
    async updateMAC() {
      try {
        this.macMission = await getMissionStages("MAC");
        this.macData = await getVehicleData("MAC");
      } catch (error) {
        console.log(error);
      }
    },
    async updateERU() {
      try {
        this.eruMission = await getMissionStages("ERU");
        this.eruData = await getVehicleData("ERU");
      } catch (error) {
        console.log(error);
      }
    },
    async updateMEA() {
      try {
        this.meaMission = await getMissionStages("MEA");
        this.meaData = await getVehicleData("MEA");
      } catch (error) {
        console.log(error);
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

  toggleSideBar() {
    this.renderSidebar = !this.renderSidebar;
  },
};
</script>

<style scoped>
body {
  overflow: hidden; /* Hide scrollbars */
}

.main-container {
  max-width: 100%;
  max-height: 100%;
  /* background-color: orange; */
}

.vehicle-status {
  margin-top: 10px;
}



.left-column {
  padding: 0;
  /* background-color: red; */
}

.right-column {
  padding: 0px;
  /* background-color: purple; */
}

/* Animation for sideBar */
.sideBar-enter-active,
.sideBar-leave-active {
  transition: all 0.5s;
}

/* Translation for Sidebar */
.sideBar-enter-from,
.sideBar-leave-to {
  transform: translateX(600px);
}

.buttonTranslate {
  transition: all 0.8s;
  transform: translateX(470px);
}

.buttonRotate {
  transform: rotate(180deg);
  transform: translateX(470px);
}
</style>
