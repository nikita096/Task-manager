<template>
    <div>
        <Loader class="loader" v-if="loading"/>
        <div class="app-main-layout" v-else>
            <Navbar @onSidebar="onSidebar"/>
            <Sidebar v-model="open"/>
            <main class="app-content" :class="{full: !open}">
                <div class="app-page">
                <router-view/>
                </div>
            </main>
            <div class="fixed-action-btn">
                <router-link to="/" class="btn-floating btn-large blue " data-position="top" v-tooltip="'Add new task'">
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div> 
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import messages from '@/utils/messages'
export default {
    name: 'main-layout',
    data: ()=>({
        open: true,
        loading: true,
        hide: false,
    }),
    async mounted(){
        if(!Object.keys(this.$store.getters.info).length ){
            await this.$store.dispatch('fetchInfo')
        }
        if(document.body.clientWidth < 576){
            this.open = !this.open
        }
        this.loading = false
    },
    methods: {
        onSidebar(){
            this.open = !this.open
        }
    },
    computed:  {
        error(){
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError){
            this.$error(messages[fbError.code] || 'Что-то пошло не так')
        
        }
    },
    components:{
        Navbar, Sidebar
    }
}
</script>
