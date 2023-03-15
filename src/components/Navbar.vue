<template>
  <div
    class="custom-div"
    @mouseleave="show = false"
    @mouseenter="show = true"
  ></div>
  <!-- If there is no fixed="top" in <b-navbar> there will be a white space where navbar should be-->
  <!-- Also add v-show="showNavbar" in <b-navbar> if wanting to work with disappearing navbar-->
  <b-navbar
    id="nav"
    toggleable="lg"
    type="dark"
    fixed="top"
    @mouseleave="show = false"
    @mouseenter="show = true"
    :class="{ show: show }"
  >
    <b-navbar-toggle
      target="nav-collapse"
      class="navbar-dark"
    ></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav fill class="w-100">
        <b-nav-item :active="$route.name == 'Main'">
          <b-link to="/gcs/main">
            <span class="nav-item-text">Main</span>
          </b-link>
        </b-nav-item>
        <b-nav-item :active="$route.name == 'MAC'">
          <b-link to="/gcs/mac">
            <span class="nav-item-text">MAC</span>
          </b-link>
        </b-nav-item>
        <b-nav-item :active="$route.name == 'ERU'">
          <b-link to="/gcs/eru">
            <span class="nav-item-text">ERU</span>
          </b-link>
        </b-nav-item>
        <b-nav-item :active="$route.name == 'MEA'">
          <b-link to="/gcs/mea" class="change-background">
            <span class="nav-item-text">MEA</span>
          </b-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      show: true,
    };
  },
});
</script>

<style scoped>
.custom-div {
  width: 50%;
  background-color: transparent !important;
  height: 200px;
  top: 0;
  position: absolute;
  z-index: 5;
}

:deep(.nav-fill .nav-item .nav-link) {
  background-color: #011949;
  cursor: default;
}

#nav {
  background-color: #011949;
  padding: 8px;
  width: 50%;
  height: 59px;
  z-index: 5;
  position: absolute;
  transition: all 0.2s ease;
  transform: translateY(-100%);
}

.show {
  transform: translateY(0) !important;
}

.nav-item-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 39px;
  color: #ffffff !important;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  text-align: center;

  padding: 9px 30px;
}

.nav-item-text:hover {
  background: #595866;
}

a.router-link-active > .nav-item-text {
  background: #595866 !important;
}

:deep(a) {
  text-decoration: none !important;
}

.navbar-collapse {
  z-index: 1 !important;
}
</style>
