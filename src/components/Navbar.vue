<!-- Navbar at the top of the screen -->
<template>
  <div>
    <b-navbar id="nav" toggleable="lg" type="dark">
      <!-- Display NGCP logo -->
      <!-- <b-img
        style="width: 75px; padding-left: 15px"
        src="@/assets/ngcp.png"
      ></b-img> -->
      <!-- <div class="nav-title">Ground Control Station</div> -->
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-nav class="ml-auto">
        <b-collapse id="nav-collapse" is-nav>
          <!-- Display the links to other pages -->
          <b-navbar-nav id="main-navbar">
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
  height: 8vh;
  /* height: 103px; */
} /* set the background color and size */

.nav-item-text {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300;
  font-size: 25px;
  line-height: 39px;
  /* identical to box height */

  text-align: center;

  color: #ffffff !important;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

#main-navbar li {
  padding: 5px 20px;
  color: rgb(226, 226, 226);
  font-size: 25pt;
  font-weight: 200;
}
/* space the links apart and set the text's color and size */

#main-navbar a {
  background-color: #bdc3cb !important;

  text-decoration: none !important;
}

/* change color to blue when on that page  */
#nav a:hover {
  color: rgb(144, 165, 209);
} /* change color to grey when hovering the link */
</style>
