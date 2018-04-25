<template>
    <div>
        <div class="row">
            <div class="mr-auto"><input class="form-control form-control-sm" type="text" placeholder="search">
            </div>
            <div class="col-auto">           
          <button class="btn btn-light btn-sm" @click="modalShow = !modalShow"> 
               <user-plus-icon></user-plus-icon> 
               member</button>
                          <b-modal v-model="modalShow">
                                <div slot="modal-header">
                                    Create
                                </div>
                                <slot name="form">
                                </slot>
                                <div slot="modal-footer" class="w-100">          
                                <slot name="form-buttons"></slot>
                                </div>
                            </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        PlusSquareIcon
    } from 'vue-feather-icons'
    import { UserPlusIcon } from 'vue-feather-icons'

    export default {
        components: {
            PlusSquareIcon,
            UserPlusIcon
        },
        data(){
            return {
                  modalShow: false
                         }
        }
    }
</script>

<style lang="scss" scoped>
</style>
