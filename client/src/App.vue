<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import EmployeeMaintenanceVue from './views/EmployeeMaintenance.vue'
import DepartmentMaintenanceVue from './views/DepartmentMaintenance.vue'
import EmpDataVue from './views/EmpData.vue'
import EmpVue from './views/Emp.vue'
import axios from "axios";
</script>

<template>
  
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/emp">Employee Management</router-link> |
      <router-link to="/dept">Department Management</router-link> | 
      <router-link to="/Emp">Emp table1</router-link>
      <router-link to="/EmpData">Emp table</router-link>
</div>
    <router-view />
    <!-- <h1> Select between Employee Maintenance and Department Maintenance</h1> -->
  </div>
  <!-- <div class="content">{{ todos }}</div> -->
 
</template>
<script>
export default {
  name: "App",
 
  data: () => ({
    todos: null,
    list: undefined,
  }),
  config: {
    header: {
      App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU",
    },
  },

  created() {
    axios
      .get("http://127.0.0.1:3333/Emp/display", {
        header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
      .then((result) => {
        this.todos = result.data;
      });
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
