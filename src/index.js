Vue.use(window.vuelidate.default)

Vue.config.devtools = true;

//Validators
const requiredCheck = (val) => {
  if (Array.isArray(val)) {
    return (val.length > 0) ? true : false;
  }
  return !!val;
}
const maxLength15 = (val) => {
  if(!val) return true;
  return (val.length <= 15);
}
const maxLength20 = (val) => {
  if(!val) return true;
  return (val.length <= 20 && val.length > 1);
}
const textCheck = (val) => {
  if(!val) return true;
  return /^[a-zA-Z]+$|^[а-яА-ЯёЁ]+$/.test(val);
}
const dateCheck = (val) => {
  if(!val) return true;
  const res = val.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if(!res) return false;
  const birthdateObj = new Date(parseInt(res[3]), parseInt(res[2]-1), parseInt(res[1]));
  if(birthdateObj > new Date()) return false;
  return (birthdateObj.toLocaleString().split(',')[0] == val);
}
const phoneCheck = (val) => {
  if(!val) return true;
  return /^7\d{10}$/.test(val);
}
const houseCheck = (val) => {
  if(!val) return true;
  return (/^\d+/.test(val));
}

var app = new Vue({
  el: '#app',
  data: {
    form: {
      name: '',
      surname: '',
      patronymic: '',
      birthdate: '',
      phone: '',
      sex: '',
      group: [],
      doctor: '',
      dontSendSMS: false,
      postcode: '',
      country: '',
      region: '',
      city: '',
      street: '',
      house: '',
      document: '',
      docSeries: '',
      docNumber: '',
      docIssuedBy: '',
      docDateOfIssue: '',
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
        dateCheck
      },
      phone: {
        requiredCheck,
        phoneCheck
      },
      group: {
        requiredCheck
      },
      postcode: {
        maxLength20
      },
      country: {
        textCheck,
        maxLength20
      },
      region: {
        textCheck,
        maxLength20
      },
      city: {
        requiredCheck,
        textCheck,
        maxLength20
      },
      street: {
        textCheck,
        maxLength20
      },
      house: {
        houseCheck,
        maxLength15
      },
      document: {
        requiredCheck,
      },
      docSeries: {
        maxLength20
      },
      docNumber: {
        maxLength20
      },
      docIssuedBy: {
        textCheck,
        maxLength20
      },
      docDateOfIssue: {
        requiredCheck,
        dateCheck
      },
    }
  },
  methods: {
    submit() {
      this.$v.form.$touch();
      if(this.$v.form.$error) return;
      alert("Новый клиент создан");
    }
  },
})


