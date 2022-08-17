 <template>
  <div>
    <h2>Department Details</h2>
    <table border="1px">
      <tr>
        <td>Department ID</td>
        <td>Department Name</td>
        <td>Delete</td>
      </tr>
      <tr v-for="item in todos1" v-bind:key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
         <td><button v-on:click="deleteform(items.id)">Delete</button></td>
      </tr>
    </table>
    <h2>Create New Department</h2>
    <form>
      <div class="form-group">
        <label for="id">Dept Id: </label>
        <input
          type="number"
          class="form-control"
          id="id"
          placeholder="Enter the Dept Id "
          v-model="id"
        />
      </div>
      <div class="form-group">
        <label for="name">Dept Name: </label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Dept Name"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <button
          v-on:click="submitForm(id, name)" class="btn btn-primary" > Submit </button>
        <button v-on:click="update(id, name)">Update</button>
        <button v-on:click="deleteform(id)">Delete</button>
      </div>
    </form>
    <div>
      <h2>Department Employee Details</h2>
      <div >
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
              <td>Department Name</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.id">
              <td v-for="col in cols" :key="col">{{ row[col] }}</td>
             </tr>
          </tbody>
        </table>
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
export default {
  el: "#app",
  name: "PostFormAxios",
  name: "table1",
  data() {
    return {
      forms: {
        id: "",
        name: "",
      },
      forms: [],
      id: "",
      name: "",
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
    axios
      .get("http://127.0.0.1:3333/Dept/display", {
        header: { App_KEY: "YHT4NXeirHDUsIGcBkqEv0MOVO7bZvMU" },
      })
      .then((result) => {
        this.todos1 = result.data;
      });
    this.forms = {
      id: this.forms.id,
      name: this.forms.name,
    };
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
    submitForm(id, name) {
      console.log("here");
      const data = {
        id: this.id,
        name: this.name,
      };
      axios
        .post("http://127.0.0.1:3333/Dept/create", {
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
    deleteform(id) {
      console.log("here");
      console.log(id);
      const idm = id;
      console.log(idm);
      const data = {
        id: idm,
      };
      axios
        .delete("http://127.0.0.1:3333/Dept/delete", {
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
    update(id, name) {
      console.log("here");
      const data = {
       id: this.id,
        name: this.name,
      };
      axios
        .put("http://127.0.0.1:3333/Dept/update", {
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
