Vue.prototype.$http = axios
var app = new Vue({
    el: '#app',
    data: {
        cards: [{
            cardName: '',
            cardText: '',
            _id: ''
        }, ]
    },
    methods: {
        head: function() {
            app.$http.get("/head/20").then(function(res) {
                app.cards = res.data;
            })
        },

        trimstr: function(str) {

            if (str.length > 93) {
                var ret
                ret = str.substring(0, 90);
                ret = ret.substring(0, ret.lastIndexOf(" ")) + "..."
                return ret
            }

            return str
        }
    }
});

app.head();