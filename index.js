
//import Vue from 'vue';
//import Vuelidate from 'vuelidate';
Vue.use(window.vuelidate.default)
//Vue.use(Vuelidate);
Vue.config.devtools = true;

//Validators
const requiredCheck = (val) => {
  return !!val;
}
const maxLength20 = (val) => {
  if(!val) return true;
  return (val.length <= 20 && val.length > 1);
}
const textCheck = (val) => {
  if(!val) return true;
  return /^[a-zA-Z]+$|^[а-яА-ЯёЁ]+$/.test(val);
}
const birthdateCheck = (val) => {
  if(!val) return true;
  const res = val.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if(!res) return false;
  const birthdateObj = new Date(parseInt(res[3]), parseInt(res[2]-1), parseInt(res[1]));
  if(birthdateObj > new Date()) return false;
  return (birthdateObj.toLocaleString().split(',')[0] == val);
}
const phoneCheck = (val) => {
  if(!val) return true;
  return /^7\s\d{3}\s\d{7}$/.test(val);
}

Vue.component('my-form', {
  data() {
    return {
      form: {
        name: '',
        surname: '',
        patronymic: '',
        birthdate: '',
        phone: '',
      }
    }
  },
  validations: {
    form: {
      surname: {
        requiredCheck,
        maxLength20,
        textCheck
      },
      name: {
        requiredCheck,
        maxLength20,
        textCheck
      },
      patronymic: {
        maxLength20,
        textCheck
      },
      birthdate: {
        requiredCheck,
        birthdateCheck
      },
      phone: {
        requiredCheck,
        phoneCheck
      },
    }
  },
  methods: {
    submit() {
      this.$v.form.$touch();
      if(this.$v.form.$error) return;
      alert("Form submitted");
    }
  },
  template:`
    <form @submit.prevent="submit">
      <div class = "form__attributes">
        <div class = "form__item">
          <label>
            <span>Фамилия*:</span>
            <input v-model.trim="$v.form.surname.$model">
          </label>
          <div v-if="$v.form.surname.$error && $v.form.surname.$dirty">
            <span class="error" v-if="!$v.form.surname.maxLength20">Фамилия не должно содержать более 20 символов и менее 2</span>
            <span class="error" v-else-if="!$v.form.surname.requiredCheck">Поле обязательно для заполнения</span>
            <span class="error" v-else-if="!$v.form.surname.textCheck">Фамилия должна состоять из латиницы или кириллицы</span>
          </div>
        </div>
        <div class = "form__item">
          <label>
            <span>Имя*:</span>
            <input v-model.trim="$v.form.name.$model">
          </label>
          <div v-if="$v.form.name.$error && $v.form.name.$dirty">
            <span class="error" v-if="!$v.form.name.maxLength20">Имя не должно содержать более 20 символов и менее 2</span>
            <span class="error" v-else-if="!$v.form.name.requiredCheck">Поле обязательно для заполнения</span>
            <span class="error" v-else-if="!$v.form.name.textCheck">Имя должно состоять из латиницы или кириллицы</span>
          </div>
        </div>
        <div class = "form__item">
          <label>
            <span>Отчество:</span>
            <input v-model="$v.form.patronymic.$model">
          </label>
          <div v-if="$v.form.patronymic.$error && $v.form.patronymic.$dirty">
            <span class="error" v-if="!$v.form.patronymic.maxLength20">Отчество не должно содержать более 20 символов и менее 2</span>
            <span class="error" v-else-if="!$v.form.patronymic.textCheck">Отчество должно состоять из латиницы или кириллицы</span>
          </div>
        </div>
        <div class = "form__item">
          <label>
            <span>Дата рождения*:</span>
            <input v-model="$v.form.birthdate.$model">
          </label>
          <div v-if="$v.form.birthdate.$error && $v.form.birthdate.$dirty">
            <span class="error" v-if="!$v.form.birthdate.requiredCheck">Поле обязательно для заполнения</span>
            <span class="error" v-else-if="!$v.form.birthdate.birthdateCheck">Введите корректную дату рождения в формате "ДД.ММ.ГГ"</span>
          </div>
        </div>
        <div class = "form__item">
          <label>
            <span>Номер телефона*:</span>
            <input v-model="$v.form.phone.$model">
          </label>
          <div v-if="$v.form.phone.$error && $v.form.phone.$dirty">
            <span class="error" v-if="!$v.form.phone.requiredCheck">Поле обязательно для заполнения</span>
            <span class="error" v-else-if="!$v.form.phone.phoneCheck">Введите корректный номер в формате "7 --- -------"</span>
          </div>
        </div>
      </div>
      <button type="submit">Отослать</button>
    </form>
  `,
})

var app = new Vue({
  el: '#app',
})

