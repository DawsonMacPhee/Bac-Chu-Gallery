const app = Vue.createApp({
    data() {
        return {
            links: [],
            images: [],
            titles: [],
            creators: [],
            years: [],
            mediums: [],
            ids: []
        }
    },



    computed: {
        alts() {
            var alts = [];
            for (var i = 0; i < 6; i++) {
                alts.push(this.creators[i] + ", " + this.titles[i] + ", " + this.years[i]);
            }

            return alts;
        }
    },



    mounted: async function() {
        /*var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/item/ca_collections/id/2", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);

        var response = JSON.parse(xhr.responseText);

        for (var i = 0; i < 6; i++) {
            
        }*/
    }
});

app.mount("#carousel_bed6");