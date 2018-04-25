<template>

<div>
    <div class="container-fluid">
      <div class="row">
      
           <side-bar></side-bar>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button class="btn btn-sm btn-outline-secondary">Share</button>
                <button class="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                <span data-feather="calendar"></span>
                This week
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>

</div>
</template>

<script>
import Navbar from '../layout/nav-bar'
import { ActivityIcon } from 'vue-feather-icons'
import SideBar from '../layout/side-bar'
export default {
  mounted(){

  },
components: {
'nav-bar': Navbar,
ActivityIcon,
SideBar
}
}
</script>

<style lang="scss" scoped>

</style>
