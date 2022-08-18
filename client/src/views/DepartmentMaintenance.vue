<template>
<html lang="en">
  <div class="container-xl" v-if="ishidden==true" v-on:click="ishidden==false" >
<div class="table-responsive">
<div class="table-wrapper">
<div class="table-title">
<div class="row"> <div>
   
    <h2>Department Details</h2>
    <div class="col-sm-4">
    <div class="search-box">
    <i class="material-icons">&#xE8B6;</i>
    <input type="text" id="search-item" class="form-control" placeholder="Search" v-on:keyup="searchResults()" v-model="searchText">
    </div>
    <br>
    <button class="btn btn-info add-new"><i class="fa fa-plus"></i> <router-link to="/addDept">  Add New Department </router-link></button>
    </div>
    <table border="1px" >
 <thead>
  <tr>
    <th>Department ID</th>
     <th>Department Name</th>
     <td>Options</td>
    </tr>
</thead>
    <tbody>
      <tr v-for="(user,i) in deptDetails" :key = "i">
     <td>{{user.id}}</td>
   <td>{{user.name}}</td>
    <td>
<button class="edit" title="Edit" data-toggle="tooltip" @click ="editButton(user)"> Edit </button>
<button class="delete" title="Delete" data-toggle="tooltip" @click ="deleteData(user.id)">Delete</button>
    </td>
    </tr>        
    </tbody>
    </table>
</div>
    </div>  
</div> </div></div></div>
  <!--  -->
  <div v-else v-on:click="ishidden == !ishidden">
<ul class="form-style-1">
    <h1> DEPARTMENT UPDATE </h1>
    <li>
        <label>DEPARTMENT NAME<span class="required">*</span></label>
        <input type="text" name="field3" class="field-long" v-model="name"/>
    </li>
    <li>
        <input type=button class="btn2" value="Update" @click="updateData()">
    </li>
</ul>
<br>
<br>
</div> 
</html>
</template>
<script>
import { createApp } from "vue";
import moment from 'moment';
const app = createApp({});
import axios from "axios";
import VueAxios from "vue-axios";
app.use(VueAxios, axios);
export default {
  el: "#app",
  name: "PostFormAxios",
  name: "table1",
  data() {
    return {
      forms: [],
       deptDetails: [],
      id: "",
      name: "",
      list: undefined,
      ID: "",
      search: null,
      column: null,
      items: [],
      instance :null,
  ishidden:true,
    };
  },
  beforeMount() {
    axios
    .get('http://127.0.0.1:3333/Dept/selectallDept', {
        header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
      .then((result) => {
        this.deptDetails = result.data;
      });
    
  },
  computed: {
    
  },
  methods: {
    searchResults() 
    {
         console.log(this.searchText)
         if (this.searchText.length == 0 || this.searchText == '') 
         {
            this.quotes = this.data;
         }
        this.quotes = this.data.filter(quote => quote.quote.includes(this.searchText));
    },
    
    async select()
    {
      const all = await axios.get('http://127.0.0.1:3333/Dept/selectallDept', {
        header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
      .then((result) => {
        this.deptDetails = result.data;
      });
    },

    async deleteData(deptid)
    {
      alert("Are you sure on Deletion")
      await axios.delete("http://127.0.0.1:3333/Dept/deleteRowDept", {
          header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
          data: { id: deptid },
        })
      alert("Successfully Deleted")
      this.select()
      //window.location.reload()
    },

    editButton(user)
    {
        this.id = user.id
        this.name = user.name
        this.ishidden = false
    },  

    async updateData()
  {
        const data = {
        id: this.id,
        name: this.name
       }
      await axios.put("http://127.0.0.1:3333/Dept/updateRowDept", {
          header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
          data,
        }) 
      //this.instance.patch('/updateRowDept', data, this.config)
      alert("Updated Successfully")
      this.clearform()
      this.select()
      this.ishidden = true
      
  },
  
  clearform() {
      this.id= "";
      this.name="";
    },
  },
 
  config: {
    Headers: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
  },
  mounted() {
    app.axios
      .get("http://127.0.0.1:3333/Emp/display", {
        Headers: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
      .then((response) => {
        this.list = response.data.data;
        console.warn(response.data.data);
      });
  },
};
</script>
<style>
input[type="text"] {
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: light grey;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
}
input[type="text"]:focus {
  width: 100%;
}
input[type="email"] {
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: light grey;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
}
input[type="email"]:focus {
  width: 100%;
}
input[type="number"] {
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: light grey;
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
}
input[type="number"]:focus {
  width: 100%;
}
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
v-table {
  border: 1px;
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