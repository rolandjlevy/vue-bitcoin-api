new Vue({
  el: '#app',
  data: () => ({
    info: null,
    loading: true,
    errored: false,
    coindeskUrl: 'https://api.coindesk.com/v1/bpi/currentprice.json'
  }),
  filters: {
    currencydecimal (value) {
      return value.toFixed(2);
    }
  },
  methods: {
    getDate(time) {
      const date = new Date(time);
      const day = String(date.getDay()).padStart(2, '0');
      const month = String(date.getMonth()).padStart(2, '0');
      const year = date.getFullYear();
      return `Date: ${day}-${month}-${year}`;
    },
    getPriceIndex() {
      fetch(this.coindeskUrl)
      .then(res => res.json())
      .then(data => {
        this.info = data.bpi;
        this.date = this.getDate(data.time.updated);
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => this.loading = false);
    }
  },
  mounted () {
    this.getPriceIndex();
  }
});