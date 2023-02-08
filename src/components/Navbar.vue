<!-- Navbar at the top of the screen -->
<template>
  <div>
    <b-navbar id="nav" toggleable="lg" type="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-nav class="ml-auto">
        <b-collapse id="nav-collapse" is-nav>
          <!-- Display the links to other pages -->
          <b-navbar-nav>
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
              <b-link to="/gcs/mea">
                <span class="nav-item-text">MEA</span>
              </b-link>
            </b-nav-item>
            <!-- <b-nav-item :active="$route.name == 'Form'">
              <b-link to="/form">Form</b-link>
            </b-nav-item> -->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar-nav>
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
  width: 55%;
  /* width: 650px; */
  height: 8vh;
}

.nav-item-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 39px;

  text-align: center;

  color: #ffffff !important;
  padding: 8px 20px;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.nav-item-text:hover {
  background: #595866;
}

/deep/ a {
  text-decoration: none !important;
}

li {
  padding: 0px 10px;
  margin: 15px 9px 10px 9px;
  color: rgb(226, 226, 226);
  font-weight: 200;
}
</style>
