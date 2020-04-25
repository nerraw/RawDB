Vue.prototype.$http = axios

function baseName(str) {
    var base = new String(str).substring(str.lastIndexOf('/') + 1);
    return base;
}

var app = new Vue({
    el: '#app',
    data: {
        cardData: {
            imageURL: '',
            cardName: '',
            fortitude: '',
            damage: '',
            subtype: '',
            multi: 'None',
            stun: '0',
            brand: 'None',
            cardText: '',
            flavorText: '',
            superstar: 'None',
            gridCardTypes: '',
            gridMisc: '',
            gridAlignment: '',
            _id: '',
            ok: true,
        }
    },

    methods: {
        init: function() {
            var id = baseName(window.location.pathname)
            app.$http.get('/carddata/' + id).then(function(response) {
                app.cardData = response.data;
            })
        },
        slashed: function(prop) {
            if (prop == undefined) {
                return ""
            }
            var ret
            if (typeof(prop) === 'string') {
                ret = prop;
            } else {
                ret = prop[0]
                for (var i = 1; i < prop.length; i++) {
                    ret = ret + " / " + prop[i]
                }
            }
            return ret
        }
    }
})

app.init();