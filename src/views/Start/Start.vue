<template>
  <div class="bg-container">
    <div class="header">
      <h1>Ground Control Station</h1>
    </div>
    <Missions />

    <b-button class="button" variant="success" @click="createNew">
      New Mission
    </b-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Missions from '../../components/Start/Missions.vue';

export default defineComponent({
  methods: {
    createNew() {
      this.$router.push('/form');
    },
    loadSaved() {
      // show list of missions
      // where the user can click/select the one to load
      this.$router.push('/missions');
    },
  },
  components: { Missions },
});
</script>

<style scoped>
.bg-container {
  width: 100vw;
  height: 100vh;
  text-align: center;
}

.button {
  /* position: absolute;
	bottom: 20px; */
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}

.header {
  background: #011949;
  width: 100%;
  padding: 20px 0px;
}

.header h1 {
  color: #ffffff;
}
</style>
