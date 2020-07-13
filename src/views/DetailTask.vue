<template>
    <div>
        <Loader class="loader" v-if="loading" />
        <div class="home-page" v-else>        
            <div class="page-title">
                <h3>{{this.record.title}}</h3>
            </div>
            <section>
                <div  class="chip"  v-for=" value in this.record.tags" :key="value.tag">
                    {{value.tag}}
                </div>
                <form @submit.prevent="submitHandler">
                    <label for="date">Дедлайн</label>
                    <input  id="date" type="text" class="datepicker" ref="datepicker">

                    <div class="input-field">
                        <textarea id="textarea1" class="materialize-textarea"
                            ref="textarea"
                            v-model.trim="$v.description.$model"
                            :class="{invalid: ($v.description.$dirty && !$v.description.minLength)  || ($v.description.$dirty && !$v.description.required)}"
                        > 
                        </textarea>
                        <label for="textarea1">Введите описание задачи</label>
                        <span class="helper-text right"
                        > 
                            Кол-во символов: {{description.length}} /{{$v.description.$params.maxLength.max}} 
                        </span>
                        <label for="textarea1">Введите описание задачи</label>
                        <span class="helper-text right"
                        > 
                        </span>
                        <p>
                            <label>
                                <input type="checkbox" class="filled-in" v-model="checked" :disabled="checkStatus"/>
                                <span>Завершить выполнение</span>
                            </label>
                        </p>
                        <button class="btn waves-effect waves-light left" type="submit" :disabled="checkStatus">
                            Обновить
                            <i class="material-icons right">send</i>
                        </button> 
                    </div>
                </form>
                <button class="btn waves-effect red right" type="button" @click.prevent="deleteRecord" >
                            Удалить 
                            <i class="material-icons right">send</i>
                </button>
            </section>
        </div>
    </div>
</template>

<script>
import {required, minLength, maxLength} from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
export default {
    metaInfo: {
      title: 'Описание задачи| Никита TM'
    },
    data: ()=>({
        loading: true,
        title: '',
        description: '',
        date: null,
        checked: false,
        disabled: false
    }),
    computed: {
    ...mapGetters(['record']),
        checkStatus(){
            if(this.record.status === 'complited'){
                this.checked = true
                return true
            } else {
                this.checked = false
            }
        }
    },
    validations: {
        description: {minLength: minLength(3), maxLength: maxLength(2048),required},
        checked: {cheked: v => v}
    },
    async mounted(){
        const id = this.$route.params.id
        await this.$store.dispatch('fetchRecordById', id)  
        this.description = this.record.description  
        setTimeout(()=>{
            this.date = M.Datepicker.init(this.$refs.datepicker, {
            format: 'dd.mm.yyyy',
            defaultDate: new Date(this.record.date),
            setDefaultDate: true
        }) 
        M.updateTextFields()
        M.textareaAutoResize(this.$refs.textarea)
            },0)
        this.loading = false
    },
    methods: {
        async submitHandler(){
            try {
                this.checked ? this.status = 'complited': this.status = 'active'
                if ((this.$v.checked.$invalid && this.$v.description.$invalid) || (!this.$v.checked.$invalid && this.$v.description.$invalid)){
                this.$v.$touch()
                return
                }
                const formData = {
                    description : this.description,
                    status: this.status,
                    id: this.$route.params.id,
                    date: this.date.date.toJSON(),
                }   
                await this.$store.dispatch('updateRecord', formData)
                this.$message('Запись успешно обновлена')
            } catch (error) {}
           
        },
        async deleteRecord(){
            try {
                const id = this.$route.params.id
                await this.$store.dispatch('deleteRecordById', id)
                this.$message('Запись успешно удалена')
                this.$router.push('/tasks') 
            } catch (error) {}
            
        }
    },
    destroyed(){
        if(this.date && this.date.destroy){
            this.date.destroy()
        }
        this.$store.commit('clearRecord')
    }
}
</script>