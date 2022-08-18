<template>
  <div>
    <h2>Department Details</h2>
        <h2>Create New Department</h2>
    <div>
<ul class="form-style-1">
    <li>
        <label>DEPARTMENT NAME<span class="required">*</span></label>
        <input type="text" name="field3" class="field-long" v-model="name"/>
    </li>
    <li>
        <button class="btn" @click="insertData()">Add Department</button>
    </li>
     <button class="btn btn-info add-new"> <router-link to="/dept">  Go Back </router-link></button>
</ul>
<br>
<br>
</div>
</div>
    
</template>
<script>
import { createApp } from "vue";
const app = createApp({});
import axios from "axios";
import VueAxios from "vue-axios";
app.use(VueAxios, axios);
export default ({
name : 'deptData',
data()
{ return{instance :null,
  allDetails:[],
  deptDetails: [],
 config: {
    header: {
      App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU",
    }
      }} 
      //http://127.0.0.1:3333/Emp/display
},
  beforeMount() {
     axios
    .get('http://127.0.0.1:3333/Emp/selectallEmp', {
        header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
      .then((result) => {
        this.allDetails = result.data;
      });
      axios
    .get('http://127.0.0.1:3333/Dept/selectallDept', {
        header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
      .then((result) => {
        this.deptDetails= result.data;
        //console.log(deptArray);
      });
  },
methods:{
  
    async viewData()
    {
        const result = await axios.get('http://127.0.0.1:3333/Dept/selectallDept', {
        header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
      .then((result) => {
        this.deptDetails = result.data;
      });
       
        console.log(result.data);
    }, 
    async insertData()
    {
       const deptDetails = { name: this.name}
        if( this.name !== "" )
            {
             await axios.post("http://127.0.0.1:3333/Dept/insertDept", {
          header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
          deptDetails, })
                //this.instance.post('/insertDept', deptDetails ,this.config)
                alert("Data Inserted Successfully")
                this.clearform()
            }
            else
            {
                alert("Please Enter all the Details")
            }
        },

clearform() {
    
     this.id =""
     this.name = "";
    },
  }
})
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