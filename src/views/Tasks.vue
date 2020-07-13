<template>
    <div>
        <div class="page-title pad-1 ">
            <h3>Список задач </h3>
        </div>              
        <Loader v-if="loading"/>
        <p class="center" v-else-if="!records.length">Записи отсутствуют.</p>
        <section v-else> 
            <div class="select-width ">
                <label for="filter">Status filter</label>   
                <select id="filter" class="browser-default input-field " ref="select" v-model="filter">
                    <option value="all"  selected>All tasks</option>
                    <option value="active" >Active</option>
                    <option value="complited">Complited</option>
                    <option value="outdated">Outdated</option>
                </select>
            </div>
            <div v-if="displayTasks">
            <TasksTable :records="displayTasks"/>
            <Paginate
                v-model="page"
                :page-count="pageCount"
                :click-handler="pageChangeHandler"
                :prev-text="'Назад'"
                :next-text="'Вперед'"
                :container-class="'pagination'"
                :page-class="'waves-effect'"
            />  
            </div>
            <p class="center" v-else>Записи отсутствуют.</p>
        </section>
    </div>
</template>
<script>
import TasksTable from '@/components/TasksTable'
import paginationMixin from '@/mixins/pagination_mixin'
export default {
    name:'tasks',
    metaInfo: {
      title: 'Просмотр задач | Никита TM'
    },
    mixins: [paginationMixin],
    data: ()=>({
        loading: true,
        records: [],
        date: new Date(),
        filter: 'all',
    }),
    async mounted(){
        const records = await this.$store.dispatch('fetchRecords')
        this.setupRecords(records)
        setTimeout(() => {
            M.FormSelect.init(this.$refs.select)
            M.updateTextFields()
        }, 0);
        this.loading= false           

    },
    computed: {
        displayTasks(){
            const filterRecords = this.records.filter( t => {
                if(this.filter === 'all'){return true}
                return t.UpdateStatus === this.filter
            })
            if(!filterRecords.length){return false}
            this.setupPagination(filterRecords)
            return this.items
        }
    },
    methods:{
        setupRecords(records){
            this.records = records.map(record =>{
                return {
                    ...record,
                    statusClass: record.status === 'complited' ? 'green' : (record.status === 'active') && (new Date(record.date) > this.date)? 'yellow' : 'red',
                    statusText:  record.status === 'complited' ? 'complited' : ((new Date(record.date) > this.date) && (record.status === 'active')) ? 'active' : 'outdated',
                    UpdateStatus: record.status === 'complited' ? 'complited' : (record.status === 'active') && (new Date(record.date) > this.date)? 'active' : 'outdated',
                    
                }
            })

        }
    },
    components: {
        TasksTable
    }
}
</script>
