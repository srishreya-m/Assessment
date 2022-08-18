 <script setup>
import dateformat from "dateformat";
</script>
 <template>
 <html lang="en">
 <div class="container-xl" v-if="ishidden==true" v-on:click="ishidden==false" >
<div>
<div class="table-responsive">
<div class="table-wrapper">
<div class="table-title">
<div class="row">
<div class="col-sm-8"><h2><b>EMPLOYEE DETAILS</b></h2></div>
  <div class="col-sm-4">
  <div class="search-box">
   <input type="text" id="search-item" class="form-control" placeholder="Search&hellip;" v-on:keyup="searchResults()" v-model="searchText">
   </div>
   <br>
  <button class="btn btn-info add-new"> <router-link to="/addEmp">  Add New Employee!! </router-link></button>
  <label></label>
 </div>
  </div>
  </div>
   <table border="1px">
    <thead>
    <tr>
     <th>Employee ID</th>
      <th>Employee Name</th>
      <th>Date Of Birth</th>
        <th>Date of Joining</th>
        <th>Email Id</th>
        <th>Phone Number</th>
        <th>Department Id</th>
        </tr>
 </thead>
 <tbody>
     <tr v-for="(user,i) in allDetails" :key = "i">
    <td>{{user.id}}</td>
    <td>{{user.name}}</td>
    <!-- <td>{{user.dob | formatDate}}</td>
    <td>{{user.doj | formatDate}}</td> -->
    <td>{{user.dob }}</td>
    <td>{{user.doj }}</td>
    <td>{{user.email}}</td>
     <td>{{user.phone}}</td>
     <td>{{user.departmentID}}</td>
   <td>
<button class="edit" title="Edit" data-toggle="tooltip" @click ="editButton(user)"> Edit </button>
<button class="delete" title="Delete" data-toggle="tooltip" @click ="deleteData(user.id)">Delete</button>
     </td>
     </tr>    
     </tbody>
     </table>
    </div>
    </div>  
    </div>
</div> 
 <div v-else v-on:click="ishidden == !ishidden">
<ul class="form-style-1">
    <h1> EMPLOYEE UPDATE </h1>
    <li>
        <label>EMPLOYEE ID<span class="required">*</span></label>
        <input type="number" name="field3" class="field-long" v-model="id"/>
    </li>
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
        <input type="text" name="field3" class="field-long" v-model="email"/>
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
const app = createApp({});
import axios from "axios";
import VueAxios from "vue-axios";
app.use(VueAxios, axios);
export default {
  name: "PostFormAxios",
  name: "table1",
  data() {
    return {
  list: undefined,
    ID: "",
   search: null,
 items: [],
  instance :null,
  allDetails: [],
  quotes:[],
  data:[],
  id:"",
  name:"",
  dob:"",
  doj:"",
  email:"",
  phone:"",
 departmentID:"",
  searchText:"",
  deptArray:[],
  ishidden:true,
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
      axios .get('http://127.0.0.1:3333/Dept/selectallDept', {
        header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
      .then((result) => {
        this.deptArray= result.data;
        //console.log(deptArray);
      });
  
  },
 
  methods: {
//     datefilter(date){
//     Vue.filter('formatDate', function(value) {
//   if (value) {
//     return moment(String(value)).format('MM/DD/YYYY hh:mm')
//   }
// })
//     },
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
        const all = await axios.get('http://127.0.0.1:3333/Emp/selectallEmp', {
        header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
      .then((result) => {
        this.allDetails = result.data;
      });
        //this.instance.get('/selectallEmp', this.config)
        //this.allDetails = all.data
    },
    async deleteData(staffid)
    {
      alert("Are you sure on Deletion")
      await axios.delete("http://127.0.0.1:3333/Emp/deleteRowEmp", {
          header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
          data: { id: staffid },
        })
      //this.instance.delete('/deleteRowEmp', {  }, this.config)
      alert("Successfully")
      this.select()
    },
    editButton(user)
    {
        this.id = user.id
        this.name = user.name
        this.dob = user.dob
        this.doj = user.doj
        this.email = user.email
        this.phone = user.phone
        this.departmentID = user.departmentID
        this.ishidden = false
    },  
    async filterval(){
    const tableDetails = await axios.get('http://127.0.0.1:3333/Emp/selectallEmp', {
        header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
    if(this.value == null)
    {
        this.allDetails =  tableDetails.data
    }
    else if(this.value == 0)
    {
        this.allDetails = tableDetails.data.reverse()
    }
    else
    {
        this.allDetails = tableDetails.data.filter(el =>
        {
             return  el.department_id == this.value;
        })
    }
},
    async updateData()
  {
       const data = {
        id : this.id,
        name: this.name,
        dob: this.dob,
        doj: this.doj,
        email: this.email,
        phone: this.phone,
        departmentID: this.departmentID
       }
      await axios.put("http://127.0.0.1:3333/Emp/updateRowEmp", {
          header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
          data,
        })
        this.ishidden = false
      //this.instance.patch('/updateRowEmp', data, this.config)
      alert("Updated Successfully")
      this.clearform()
      this.select()  
  },
  clearform() {
        this.id = ""
        this.name = ""
        this.dob = ""
        this.doj = ""
        this.email = ""
        this.phone = ""
        this.department_id = ""
    },
  },
};
</script>
<style>
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
