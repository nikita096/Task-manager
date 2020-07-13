<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else>
        <div class="page-title pad-2">
            <h3>Профиль</h3>
        </div>
        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <input
                    id="description"
                    type="text"
                    v-model.trim="name"
                    :class="{invalid: $v.name.$dirty && !$v.name.required}"
                >
                <label for="description">Имя</label>
                <span 
                    v-if="$v.name.$dirty && !$v.name.required"
                    class="helper-text invalid"
                >
                    Введите Имя
                </span>
            </div>
            <button class="btn waves-effect waves-light" type="submit">
                Обновить
            <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {required} from 'vuelidate/lib/validators'
export default {
  data: ()=>({
    name: '',
    loading: true
  }),
  metaInfo: {
    title: 'Профиль | Никита TM'
  },
  mounted(){
    this.name = this.info.name
    setTimeout(() => {
      M.updateTextFields()
    }, 0);
    this.loading = false
  },
  computed: {
    ...mapGetters(['info'])
  },
  validations: {
    name: {required},
  },
  methods: {
    ...mapActions(['updateInfo']),
   async submitHandler(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name
        })
        this.$message('Профиль успешно обновлен')
      } catch (error) {}
    }
  }
}
</script>