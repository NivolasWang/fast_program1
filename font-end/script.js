const app = new Vue({
  el: '#app',
  data: {
    name: '',
    phone: '',
    email: '',
    qq: '',
    address: '',
    temp: '',
    favorate: '',
    state: 1,
    list: []
  },
  computed: {
    available() {
      return this.name !== '' && this.phone !== '';
    }
  },
  created() {
    this.fetch_data()
  },
  methods: {
    async fetch_data() {
      try {
        const res = await axios.get('http://127.0.0.1:3000/get');
        console.log(res);
        this.list = res.data
      } catch (error) {
        console.error(error);
      }
    },

    async data_upload() {
      if (this.available) {
        try {
          const res = await axios.post('http://127.0.0.1:3000/post', {
            ID: '',
            favorate: this.favorate,
            name: this.name,
            phone: this.phone,
            email: this.email,
            qq: this.qq,
            address: this.address,
          })
        } catch (error) {
          console.error(error);
        }


        this.name = ''
        this.phone = ''
        this.email = ''
        this.qq = ''
        this.address = ''
        this.fetch_data()

      }
    },

    data_deletes(ID) {
      axios({
        url: 'http://127.0.0.1:3000/delete',
        method: 'delete',
        data: {
          ID
        }
      }).then(result => {
        console.log(result)
        this.fetch_data()
      }).catch(error => {
        console.log(error)
      })

    },

    data_patch(ID) {
      if (this.state === 1) {
        this.state = 0
      }
      axios({
        url: 'http://127.0.0.1:3000/find',
        method: 'get',
        params: { ID }
      }).then(result => {
        console.log(result.data[0])
        this.name = result.data[0].name
        this.phone = result.data[0].phone
        this.email = result.data[0].email
        this.qq = result.data[0].qq
        this.address = result.data[0].address
        this.temp = result.data[0].ID
        this.favorate = result.data[0].favorate
      }).catch(error => {
        console.log(error.message)
      })
    },
    async submit_patch() {
      let obj = {
        ID: this.temp,
        favorate: this.favorate,
        name: this.name,
        email: this.email,
        qq: this.qq,
        address: this.address,
        phone: this.phone
      }
      if (this.available) {
        try {
          await axios({
            url: 'http://127.0.0.1:3000/patch',
            method: 'post',
            data: obj
          });
          console.log('Data updated successfully');
          this.fetch_data();
        } catch (error) {
          console.error('Error updating data:', error);
        }
      }
      this.temp = '';
      this.favorate = '',
        this.name = '';
      this.phone = '';
      this.email = '';
      this.qq = '';
      this.address = '';
      this.state = 1;
    },
    data_favorate(ID) {
      axios({
        url: 'http://127.0.0.1:3000/favorate',
        method: 'post',
        data: {
          ID
        }
      }).then(result => {
        console.log(result)
        this.fetch_data()
      }).catch(error => {
        console.log(error)
      })
    },
    data_unfavorate(ID) {
      axios({
        url: 'http://127.0.0.1:3000/unfavorate',
        method: 'post',
        data: {
          ID
        }
      }).then(result => {
        console.log(result)
        this.fetch_data()
      }).catch(error => {
        console.log(error)
      })
    },
    async excel_download() {
      try {
        const res = await axios.get('http://127.0.0.1:3000/excel_download');

      } catch (error) {
        console.error(error);
      }
    },
    async excel_upload() {
      try {
        const res = await axios.get('http://127.0.0.1:3000/excel_upload');
      } catch (error) {
        console.error(error);
      }


      this.fetch_data()
    }

  },

})