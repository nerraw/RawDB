Vue.prototype.$http = axios
var app = new Vue({
    el: '#app',
    data: {
        cards: [{
            cardName: 'TestName'
        }, ]
    },
    methods: {
        head: function() {
            app.$http.get("/head/5").then(function(res) {
                app.cards = res.data;
            })
        }
    }
});

app.head();