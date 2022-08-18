import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')


  
app.config.productionTip = false
app.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});
  
new app({
  render: h => h(App),
}).$mount('#app')