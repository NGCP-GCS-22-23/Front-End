<!-- Navbar at the top of the screen -->
<template>
  <div>
    <b-navbar id="nav" toggleable="lg" type="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Display the links to other pages -->
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
          <!-- <b-nav-item :active="$route.name == 'Form'">
              <b-link to="/form">Form</b-link>
            </b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped>
#nav {
  background-color: #011949;
  padding: 8px;
  width: 50%;
  height: 59px;
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

:deep(.nav-fill .nav-item .nav-link, .nav-justified .nav-item .nav-link) {
  cursor: default;
}

ul {
  margin: 10px 9px 10px -20px;
}
</style>
