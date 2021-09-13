const app = Vue.createApp({
    
    data(){
      return{
        catFact:null,
        dogImageURL:null
      }
    },

    computed:{
        randomImg(){
            getDogImage();
            return this.dogImageURL;
        }
    },

    methods:{
        getCatFact(){
            axios.get('https://catfact.ninja/fact')
            .then(response => {
              console.log(response.data.fact)
              this.catFact = response.data.fact
            })
        },

        getDogImage(){
            axios.get('https://dog.ceo/api/breeds/image/random')
            .then(response => {
              this.dogImageURL = response.data.message
            })
        }


    }


});

app.mount('#api-call');