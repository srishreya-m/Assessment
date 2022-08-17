 <template>
  <div>
    <div>
      <h2>Create New Employee:</h2>
      <form>
        <div class="form-group">
          <label for="id">Id</label>
          <input type="number" class="form-control" placeholder="Enter the Id " v-model="id"/>
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" class="form-control" id="name" placeholder="Your name" v-model="name"/>
        </div>
        <div class="form-group">
            <label for="dob">Date of Birth</label>
            <input type="date" class="form-control" id="dob" placeholder="Enter your date of birth" v-model="dob"/>
          </div>
          <div class="form-group">
            <label for="doj">Date of Joining</label>
            <input type="date" class="form-control" id="doj" placeholder="Enter your date of joining" v-model="doj"/>
          </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="email"/>
        </div>
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="number" class="form-control" placeholder="Enter your Phone Number " v-model="phone"/>
        </div>
        <div class="form-group">
          <label for="departmentID">Department Id</label>
          <input type="number" class="form-control" placeholder="Enter the Dept Id " v-model="departmentID"/>
        </div>
        <div class="form-group">
          <button v-on:click="submitForm(name, dob, doj, email, phone, departmentID)">
            Submit
          </button>
          <button v-on:click="update(id, name, dob, doj, email, phone, departmentID)">
            Update
          </button>
          <button v-on:click="deleteform(id, name)">Delete</button>
        </div>
      </form>
    </div>
    <div>
        <h2>Employee Details</h2>
        <div>
        <div>
          <label>Filter by :</label
          ><select v-model="column">
            <option :value="null">No Column Filter</option>
            <option v-for="col in cols" :key="col">{{ col }}</option>
          </select>
          <input type="text1" v-model="search" placeholder="Search" />
        </div>
        <table border="1px">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>DOB</td>
              <td>DOJ</td>
              <td>Email</td>
              <td>Phone Number</td>
              <td>Date Created At</td>
              <td>Date Updated At</td> 
              <td>Department ID</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td v-for="col in cols" :key="col">{{ row[col] }}</td>
            </tr>
          </tbody>
        </table>
        <h2>Department Details</h2>
      <table border="1px">
        <tr>
          <td>Department ID</td>
          <td>Department Name</td>
        </tr>
        <tr v-for="item in todos1" v-bind:key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </table>
      </div>
    </div>
    <!-- id: number  name : string
dob : Date  doj : Date
email : string  phone : number
departmentID: number createdAt: DateTime 
updatedAt: DateTime  -->
  </div>
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
      forms: {
        id: "",
        name: "",
        dob: "",
        doj: "",
        email: "",
        phone: "",
        departmentID: "",
      },
      todos: null,
      todos1: null,
      list: undefined,
      ID: "",
      search: null,
      column: null,
      items: [],
    };
  },
  beforeMount() {
    axios
      .get("http://127.0.0.1:3333/Emp/display", {
        header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
      .then((result) => {
        this.items = result.data;
        this.todos = result.data;
      });
    this.items = Array.from(Array(11), (x, i) => {
      return {    
        id: this.id,
        name: this.name,
        dob: this.dob,
        doj: this.doj,
        email: this.email,
        phone: this.phone,
        departmentID: this.departmentID,
      };
    });
    this.forms = {
      id: this.forms.id,
      name: this.forms.name,
       dob: this.forms.dob,
        doj: this.forms.doj,
        email: this.forms.email,
        phone: this.forms.phone,
        departmentID: this.forms.departmentID,
    };
    axios
      .get("http://127.0.0.1:3333/Dept/display", {
        header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
      .then((result) => {
        this.todos1 = result.data;
      });
  },
  computed: {
    cols() {
      return this.items.length >= 1 ? Object.keys(this.items[0]) : [];
    },
    rows() {
      if (!this.items.length) {
        return [];
      }
      return this.items.filter((item) => {
        let props =
          this.search && this.column
            ? [item[this.column]]
            : Object.values(item);
        return props.some(
          (prop) =>
            !this.search ||
            (typeof prop === "string"
              ? prop.includes(this.search)
              : prop.toString(10).includes(this.search))
        );
      });
    },
  },
  methods: {
    created() {
      axios
        .get("http://127.0.0.1:3333/Emp/display", {
          header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
        })
        .then((result) => {
          this.todos = result.data;
        });
      axios
        .get("http://127.0.0.1:3333/Dept/display", {
          header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
        })
        .then((result) => {
          this.todos1 = result.data;
        });
    },
    submitForm(name, dob, doj, email, phone, departmentID) {
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
        .post("http://127.0.0.1:3333/Emp/create", {
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
    },
    deleteform(id, name) {
    //   console.log("In");
    //   console.log(id);
      //const idm = id;
      //console.log(id);
      const data = {
        id : this.id,
        name: this.name
      };
      console.log(data);
      axios
        .delete("http://127.0.0.1:3333/Emp/create", {
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

      //alert("Deleted Successfuly");
    },
    update(id,name , dob, doj, email, phone, departmentID) {
      const data = {
         id: this.id,
        name: this.name,
        dob: this.dob,
        doj: this.doj,
        email: this.email,
        phone: this.phone,
        departmentID: this.departmentID,
      };
      axios
        .put("http://127.0.0.1:3333/Emp/update", {
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
<!-- <div>
      <h2>Employee Details Table</h2>
      <table border="1px">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone Number</td>
            <td>Department ID</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in todos" v-bind:key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone_no }}</td>
            <td>{{ item.dept_id }}</td>
            <td><button v-on:click="deleteform(item.id)">Delete</button></td>
          </tr>
        </tbody>
      </table>
      <h2>Department Details</h2>
      <table border="1px">
        <tr>
          <td>Department ID</td>
          <td>Department Name</td>
        </tr>
        <tr v-for="item in todos1" v-bind:key="item.id">
          <td>{{ item.dept_id }}</td>
          <td>{{ item.dept_name }}</td>
        </tr>
      </table>
    </div> -->