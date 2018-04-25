<template>
    <nav class="col-md-2 d-none d-md-block  sidebar">
    
        <div class="image-container">
            <img src="http://via.placeholder.com/100x100" alt="">
            <h6>{{ this.$store.state.user.firstname+ this.$store.state.user.lastname}}</h6>
    
        </div>
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
               

                <router-link  class="nav-link" to="/fund-transfer-approver">
                   <span data-feather="file"> <users-icon></users-icon> </span>
                  Fund Approvers
                </router-link>
              </li>
                   <li class="nav-item">
                       <router-link to="/mmda" class="nav-link">
                           <span data-feather="file"><triangle-icon></triangle-icon></span>
                  Mmda
                       </router-link>
              
              </li>
                   <li class="nav-item">
              <router-link to="/mda" class="nav-link">
              <span data-feather="file"><triangle-icon></triangle-icon></span>
              Mda
              </router-link>

              </li>
               <li class="nav-item">
              <router-link to="/roles" class="nav-link">
              <span data-feather="file"><user-check-icon></user-check-icon></span>
              Roles
              </router-link>

              </li>

               <button class="btn btn-primary log-out-button btn-sm" @click="logOut">log out</button>
            </ul>

        
   
          </div>
    </nav>
</template>

<script>
import { LogOutIcon } from 'vue-feather-icons'
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
    import { TriangleIcon } from 'vue-feather-icons'
    import { GridIcon } from 'vue-feather-icons'
import { GlobeIcon } from 'vue-feather-icons'
import { UserCheckIcon } from 'vue-feather-icons'
import localForage from '../../localForage'
    
    export default {
        components: {
            LogOutIcon,
          UserCheckIcon,
            ActivityIcon,
            UsersIcon,
            BarChartIcon,
            HomeIcon,
            LayersIcon,
            GridIcon,
            GlobeIcon,
            TriangleIcon
    
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
