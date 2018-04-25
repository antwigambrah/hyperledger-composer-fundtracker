<template>
    <div class="container">
        <div class="col-4 offset-4">
            <div class="card">
                <div class="card-header">
                    Login
                </div>
                <div class="card-body">
                    <form class="form form-signin" @submit.prevent='login()' v-loading="loading">
                        <div class="form-group">
                            <input type="email" id="inputEmail" class="form-control form-control-sm" placeholder="member id" v-model="id" autocomplete="off">
                        </div>
                        <div class="form-group"> <input type="password" id="inputPassword" class="form-control form-control-sm" placeholder="password" v-model="password" autocomplete="off">
                        </div>
                        <button class="btn btn-sm btn-primary btn-block" type="submit">
                            {{loginStatus}}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
 /*eslint-disable*/
 import localForage from '../../localForage.js'
    export default {

        mounted() {
            console.log(this.$store.state.hello);

        },
        data() {
            return {
                id: "",
                password: "",
                loginStatus:"sign in",
                loading:false
            };
        },
        methods:{
        user(){
                  
             
                   axios.get('/user').then((user)=>{
                        console.log(user
                            )
                     })
        

                
              

                  // this.$store.state.user.firstname=user.data.firstname

                  // this.$store.state.user.lastname=user.data.lastname

                  // this.$store.state.user.role=user.data.role

                  
                  // this.$router.push('/fund-transfer-approver');
            },
            login(){
         var self=this;
              

           axios.post('/login',{  'id':this.id,  'password':this.password }).then((res)=>{

          localForage.setItem('access_token',res.data.token.token);
            localForage.setItem('refresh_token',res.data.token.refreshToken)
            localForage.setItem('role',res.data.user[0].role);
            this.loading=false
            console.log(res)

                if (res.data.user[0].role=="admin"){
                    
                   this.$router.push('/fund-transfer-approver');   

                }else if (res.data.user[0].mmda) {
                      this.$router.push({ name: 'mmdaview', params: { name: res.data.user[0].mmda.trim() }})

                }else{
                       this.$router.push('/dashboard');
                }
                 
           });

        

                            

        

  

            }
        }
    };
</script>

<style lang="scss" scoped>
    .card {
        margin-top: 100px;
    }
</style>
