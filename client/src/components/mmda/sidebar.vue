<template>
    <nav class="col-md-2 d-none d-md-block  sidebar">
    
        <div class="image-container">
            <img src="http://via.placeholder.com/100x100" alt="">
            <h6>Antwi Gambrah</h6>
            <h6>MMDA : {{this.$route.params.name }}</h6>
    
        </div>
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                 <router-link  class='nav-link' :to="{ name: 'mmdaview', params: { name: this.$route.params.name }}">
                   <span> <home-icon></home-icon></span>  
                  Dashboard <span class="sr-only">(current)</span>
                 </router-link>
              </li>
              <li class="nav-item">
                <router-link class='nav-link' :to="{ name: 'mmdaprojects', params: { name: this.$route.params.name }}">
                    <span data-feather="file"><layers-icon></layers-icon></span>
                 Projects
                </router-link>
              </li>
           <li class="nav-item">
                <router-link class='nav-link' :to="{ name: 'mmdatransactions', params: { name: this.$route.params.name }}">
                    <span data-feather="file"> <grid-icon></grid-icon></span>
                 Transactions
                </router-link>
              </li>

              <li class="nav-item">
                <router-link class='nav-link' :to="{ name: 'mmdafundreceipients', params: { name: this.$route.params.name }}">
                   <span data-feather="file-text"><users-icon></users-icon></span>
                  Receipients
                </router-link>
               
              </li>

                 <button class="btn btn-primary log-out-button btn-sm" @click="logOut">Log out></button>
            </ul>

         

                  
      
          </div>
    </nav>
</template>

<script>
/*eslint-disable*/
import {
ActivityIcon
} from 'vue-feather-icons'
import {
        UsersIcon
    } from 'vue-feather-icons'
    import {
        BarChartIcon
    } from 'vue-feather-icons'
    import {
        HomeIcon
    } from 'vue-feather-icons'
    import { LayersIcon } from 'vue-feather-icons'
    import { GridIcon } from 'vue-feather-icons'
import { GlobeIcon } from 'vue-feather-icons'
import { LogOutIcon } from 'vue-feather-icons'
import localForage from '../../localForage'
    
    export default {
        components: {
            LogOutIcon,
            ActivityIcon,
            UsersIcon,
            BarChartIcon,
            HomeIcon,
            LayersIcon,
            GridIcon,
            GlobeIcon
    
        },
        methods:{
            logOut(){
                localForage.clearStorage()
                 this.$router.push('/login')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .image-container {
        text-align: center;
        margin-top: 10px;
        img {
            border-radius: 50%;
        }
        h6 {
            margin-top: 10px;
        }
    }
</style>
