<template>
  <div class="bg-container">
    <div class="back">
      <b-button variant="dark" @click="goToStart"> Back </b-button>
    </div>
    <b-container>
      <b-row class="justify-content-md-center">
        <Name ref="Name" />
      </b-row>
    </b-container>

    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col md="4">
          <MissionForm ref="MACForm" :vehicleName="'MAC'" />
        </b-col>
        <b-col cols="4">
          <MissionForm ref="ERUForm" :vehicleName="'ERU'" />
        </b-col>
        <b-col cols="4">
          <MissionForm ref="MEAForm" :vehicleName="'MEA'" />
        </b-col>
      </b-row>
    </b-container>
    <b-button class="submit" variant="success" @click.prevent="submit()">
      Submit
    </b-button>
  </div>
</template>

<script>
import axios from 'axios';
import MissionForm from '@/components/Form/MissionForm.vue';
import Name from '@/components/Form/Name.vue';

export default {
  data() {
    return {
      formName: '',
    };
  },
  components: {
    MissionForm,
    Name,
  },
  props: {
    vehicleName: String,
  },
  methods: {
    goToGCS() {
      this.$router.push('/gcs/main');
    },
    goToStart() {
      this.$router.push('/');
    },
    submit() {
      let path = 'http://localhost:5000/send';
      let payload = {
        id: 'Create New Mission',
        data: {
          name: this.$refs.Name.missionName,
          MAC: {
            icon: 'https://github.com/NGCP-GCS-21-22/Front-End/blob/main/front-end/src/assets/MAC.png',
            StartCoords:
              this.$refs.MACForm.$refs.StartCoords.startLong,
            StartCoords:
              this.$refs.MACForm.$refs.StartCoords.startLat,
            StartCoords:
              this.$refs.MACForm.$refs.StartCoords.startAlt,
            //Stage: this.$refs.MACForm.$refs.Stages.id,
            //Stage: this.$refs.MACForm.$refs.Stages.stage,
            //Manualcontrol: this.$refs.MACForm.$refs.ManualControl.toggle,
            Searcharea: this.$refs.MACForm.$refs.SearchArea.long,
            Searcharea: this.$refs.MACForm.$refs.SearchArea.lat,
          },
          ERU: {
            icon: 'https://github.com/NGCP-GCS-21-22/Front-End/blob/main/front-end/src/assets/ERU.png',
            StartCoords:
              this.$refs.ERUForm.$refs.StartCoords.startLong,
            StartCoords:
              this.$refs.ERUForm.$refs.StartCoords.startLat,
            StartCoords:
              this.$refs.ERUForm.$refs.StartCoords.startAlt,
            //Stage: this.$refs.MACForm.$refs.Stages.id,
            //Stage: this.$refs.MACForm.$refs.Stages.stage,
            //Manualcontrol: this.$refs.MACForm.$refs.ManualControl.toggle,
            Searcharea: this.$refs.ERUForm.$refs.SearchArea.long,
            Searcharea: this.$refs.ERUForm.$refs.SearchArea.lat,
          },
          MEA: {
            icon: 'https://github.com/NGCP-GCS-21-22/Front-End/blob/main/front-end/src/assets/MEA.png',
            StartCoords:
              this.$refs.MEAForm.$refs.StartCoords.startLong,
            StartCoords:
              this.$refs.MEAForm.$refs.StartCoords.startLat,
            StartCoords:
              this.$refs.MEAForm.$refs.StartCoords.startAlt,
            //Stage: this.$refs.MACForm.$refs.Stages.id,
            //Stage: this.$refs.MACForm.$refs.Stages.stage,
            //Manualcontrol: this.$refs.MACForm.$refs.ManualControl.toggle,
            Searcharea: this.$refs.MEAForm.$refs.SearchArea.long,
            Searcharea: this.$refs.MEAForm.$refs.SearchArea.lat,
          },
        },
      };
      axios
        .post(path, payload)
        .then((response) => {
          console.log('New mission created.');
          this.$router.push('/gcs/main');
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(payload);
      this.$router.push('/gcs/main');
    },
  },
};
</script>

<style scoped>
.btn-circle.btn-sm {
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  font-size: 8px;
  text-align: center;
  margin-bottom: 10px;
}

.submit {
  text-align: center;
  margin-top: 20px;
  left: 50%;
}

.back {
  position: absolute;
  top: 20px;
  left: 20px;
}

.bg-container {
  width: 100vw;
  height: 100vh;
}
</style>
