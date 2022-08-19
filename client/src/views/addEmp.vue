<template>
  <div>
    <div>
      <h2>Create New Employee:</h2>
      <div>
<ul>
    <li>
        <label>EMPLOYEE NAME<span class="required">*</span></label>
        <input type="text" name="field3" class="field-long" v-model="name"/>
    </li>
    <li>
        <label>DATE OF BIRTH<span class="required">*</span></label>
        <input type="date" name="field3" class="field-long" v-model="dob"/>
    </li>
    <li>
        <label>DATE OF JOINING<span class="required">*</span></label>
        <input type="date" name="field3" class="field-long" v-model="doj"/>
    </li>
    <li>
        <label>EMAIL ID<span class="required">*</span></label>
        <input type="email" name="field3" class="field-long" v-model="email"/>
    </li>
    <li>
        <label>PHONE NUMBER<span class="required">*</span></label>
        <input type="text" name="field3" class="field-long" v-model="phone"/>
    </li>
    <li>
        <label>DEPARTMENT NAME</label>
        <select name="field4" class="field-select" v-model="departmentID">
        <option value="" disabled hidden>Select Department</option>
        <option v-for="dept in deptArray" v-bind:key="dept.name" v-bind:value="dept.id"> {{ dept.name }}</option>
        </select>
    </li>
    <li>
        <button class="btn" @click="insertData()">Submit</button>
    </li>
     <button class="btn btn-info add-new"> <router-link to="/emp">  Go Back </router-link></button>
      <button v-on:click="submitForm(name, dob, doj, email, phone, departmentID)">submit</button>
</ul>
<br>
<br>
</div>
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
{ return{
  instance :null,
  allDetails:[],
  id:"",
  name:"",
  dob:"",
  doj:"",
  email:"",
  phone:"",
 departmentID:"",
  searchText:"",
  deptArray:[],
  config: {
    header: {
      App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU",
    }}
  } 
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
        this.deptArray = result.data;
        //console.log(deptArray);
      });
  },
methods:{
  submitForm(name, dob, doj, email, phone, departmentID) {
      //  const dob1 = this.dob;
      //   const doj1 = this.doj;
      //   const finaldob = dateformat(dob1, "dS mmmm, yyyy");
      //   const finaldoj = dateformat(doj1, "dS mmmm, yyyy");
      const data = { 
        name: this.name,
         dob: this.dob,
        doj: this.doj,
        email: this.email,
        phone: this.phone,
        departmentID: this.departmentID,
      };
      console.log(data);
      axios
        .post("http://127.0.0.1:3333/Emp/store", {
          header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
          data,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          // error.response.status Check status code
        })
        .finally(() => {
          //Perform action in always
        });
         alert("Data Inserted Successfully")
                this.clearform()
    },
    async insertData()
    {
        const empDetails = { 
            name: this.name, 
            dob: this.dob,
            doj: this.doj,
            email: this.email,
            phone: this.phone,
            departmentID: this.departmentID}
        if( this.name != "" && this.dob != "" && this.doj!= "" && this.email !="" && this.phone!= "" && this.departmentID !="" )
        {   
            if(/^[6-9]\d{9}$/.test(this.phone))
          {
            if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/.test(this.email)) 
             {
                await axios.post("http://127.0.0.1:3333/Emp/insertEmp", {
          header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
          empDetails, })
                //this.instance.post('/insertEmp', empDetails ,this.config)
                alert("Data Inserted Successfully")
                this.clearform()
             }
             else
             {
                alert("Invalid Email Address")
             }
         }
         else
         {
           alert("Invalid Phone Number");
         }
         }
        else
        {
            alert("Please Enter all the Details")
        }
        }, 
clearform() {
      this.id = "";
      this.name = "";
      this.dob = "";
      this.doj="";
      this.email="";
      this.phone="";
      this.departmentID="";
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