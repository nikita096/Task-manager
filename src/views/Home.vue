<template>
    <div class="home-page">
        <div>
            <h3>Добавить задачу</h3>
        </div>
        <section>          
            <form @submit.prevent="submitHandler">
                <div class="input-field">
                <input
                    id="name"
                    type="text"
                    v-model.trim=" $v.title.$model"
                    :class="{invalid: ($v.title.$dirty && !$v.title.minLength) || ($v.title.$dirty && !$v.title.required)}"
                >
                <label for="name">Название</label>
                <span class="helper-text invalid"
                    v-if="$v.title.$dirty && !$v.title.minLength"
                >
                    Минимальное кол-во символов: {{$v.title.$params.minLength.min}} 
                </span>
                <span class="helper-text invalid"
                    v-if="$v.title.$dirty && !$v.title.required"
                >
                    Введите название
                </span>
                </div>
                <div class="chips" ref="chips"></div>
                <label for="date">Дедлайн</label>
                <input  id="date" type="text" class="datepicker" ref="datepicker">

                <div class="input-field">
                <textarea id="textarea1" class="materialize-textarea"
                    v-model.trim="$v.description.$model"
                    :class="{invalid: ($v.description.$dirty && !$v.description.minLength)  || ($v.description.$dirty && !$v.description.required)}"
                ></textarea>
                <label for="textarea1">Введите описание задачи</label>
                <span class="helper-text right"
                > 
                    Кол-во символов: {{description.length}} /{{$v.description.$params.maxLength.max}} 
                </span>
                <span class="helper-text invalid"
                    v-if="($v.description.$dirty && !$v.description.minLength)"
                >Минимальная величина :  {{$v.description.$params.minLength.min}} 
                </span>
                <span class="helper-text invalid"
                    v-if="($v.description.$dirty && !$v.description.maxLength)"
                >Максимальное кол-во символов:  {{$v.description.$params.maxLength.max}} 
                </span>
                <span class="helper-text invalid"
                    v-if="$v.description.$dirty && !$v.description.required"
                > Введите описание задачи
                </span>
                
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                Создать
                <i class="material-icons right">send</i>
                </button>
            </form>
        </section>
    </div>
</template>

<script>
import {email, required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
  name: 'Home',
  metaInfo: {
      title: 'Добавить задачу | Никита TM'
  },
  data: ()=>({
    title: '',
    description: '',
    chips: null,
    date: null,
    disabled: false
  }),
  validations: {
      title: {required, minLength:minLength(3)},
      description: {minLength: minLength(3), maxLength: maxLength(2048),required},
      chips: {required}
  },
  methods: {
     async submitHandler(){
            if (this.$v.$invalid){
                this.$v.$touch()
                return
            }
            const formData = {
            status: 'active',
            title: this.title,
            description: this.description,
            date: this.date.date.toJSON(),
            tags: this.chips.chipsData
            }
            
            await this.$store.dispatch('creatRecord', formData)
            this.$message('Запись успешно создана')
            this.$v.$reset()
            this.title = ''
            this.description = ''
            this.$router.push('/tasks')
        }
  },
  mounted(){
      this.chips = M.Chips.init(this.$refs.chips, {
          placeholder: 'Task tags',
          limit: 3
      });
          this.date = M.Datepicker.init(this.$refs.datepicker, {
          format: 'dd.mm.yyyy',
          defaultDate: new Date(),
          setDefaultDate: true
      })               
      
  },
  destroyed(){
        if(this.date && this.date.destroy){
            this.date.destroy()
        }
        if( this.chips && this.chips.destroy){
             this.chips.destroy()
        }
    }
}
</script>
