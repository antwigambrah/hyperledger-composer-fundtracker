<template>
    <div>
        <div class="container-fluid">
            <div class="row"> 
                <side-bar></side-bar>
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                    <div class="row">
                        <div class="col-md-10 offset-md-1">
                                    
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
                        <router-link to="/projects">
                            <arrow-left-icon></arrow-left-icon> back 
                        </router-link>
    
                        <div class="btn-toolbar mb-2 mb-md-0">
    
                        </div>
                    </div>

                            <div class="card project-card">
                                <div class="card-header">
                                    {{headerText}}
                                </div>
                                <div class="card-body">
              <create-form></create-form>
              
    
    
                                </div>
                            </div>
                        </div>
                    </div>
    
                </main>
            </div>
        </div>
    
    </div>
</template>
<script>
/*eslint-disable*/
    import Navbar from '../../layout/nav-bar';
    import CreateForm from '../../assets/projects/create-form';

    import {
        ArrowLeftIcon
    } from 'vue-feather-icons'
    import {
        ArrowRightIcon
    } from 'vue-feather-icons'
    import {
        ActivityIcon
    } from 'vue-feather-icons'
    import SideBar from '../../layout/side-bar'
    import {
        PlusSquareIcon
    } from 'vue-feather-icons'
    export default {
        components: {
            'nav-bar': Navbar,
           'create-form':  CreateForm,
            ActivityIcon,
            PlusSquareIcon,
            SideBar,
            ArrowLeftIcon,
            ArrowRightIcon
        },
        data() {
    
            return {
                currentView: 'create-form'
    
            }
        },
        methods: {
            changeView() {
                this.currentView = 'expense-form'
               this.$store.state.project.name=this.$refs.view.project.name
                this.$store.state.project.mmda = this.$refs.view.project.mmda
                this.$store.state.project.fundsource = this.$refs.view.project.fundsource
                this.$store.state.project.program = this.$refs.view.project.program
                this.$store.state.project.objective = this.$refs.view.project.objective
                this.$store.state.project.allocation = this.$refs.view.project.allocation
                

                
            }
        },
        computed: {
            headerText() {
                if (this.currentView == "create-form") {
                    return "New Project"
                }
                return "Add Project Expenses"
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search-row {
        margin-bottom: 20px;
    }
    
    .project-card {
        .card-header {
            padding: 10px;
        }
        .card-body {
            padding: 10px;
        }
    }
</style>
