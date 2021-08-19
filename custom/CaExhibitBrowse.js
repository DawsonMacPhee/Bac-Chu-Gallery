const exCard = {
    template:
    /*html*/
    `
    <div class="ca-card-container">
        <div class="ca-card">
            <div class="ca-img-container">
                <img class="ca-img" src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"/>
            </div>
            <div class="ca-info">
                <span class="ca-card-title"><em>{{ extitle }}</em></span>
                <span class="ca-card-date">{{ exdate }}</span>
                <span class="ca-card-curator">{{ excurator }}</span>
                <span>{{ exintro }}</span>
            </div>
        </div>
    </div>
    `,



    props: {
        extitle: {
            type: String,
            required: true
        },
        exdate: {
            type: String,
            required: true
        },
        excurator: {
            type: String,
            required: true
        },
        exintro: {
            type: String,
            required: true
        },
        refid: {
            type: String,
            required: true
        }
    }
}

const app = Vue.createApp({
    data() {
        return {
            currentEx: [],
            pastEx: []
        }
    },



    methods: {
        loadBrowse(responseText) {
            var response = JSON.parse(responseText);
            for(var i = 0; i < response.results.length; i++) {
                if (response.results[i]["idno"].includes("exhibition")) {
                    if (response.results[i]["ca_collections.status"] == "0") {
                        this.currentEx.push({
                            "card": exCard,
                            "title": response.results[i]["display_label"],
                            "desc": response.results[i]["ca_collections.description"].substring(0, response.results[i]["ca_collections.description"].length - 1),
                            "curator": response.results[i]["ca_collections.nonpreferred_labels"][1],
                            "date": response.results[i]["ca_collections.nonpreferred_labels"][0],
                            "refid": response.results[i].id
                        });
                    } else if (response.results[i]["ca_collections.status"] == "4") {
                        this.pastEx.push({
                            "card": exCard,
                            "title": response.results[i]["display_label"],
                            "desc": response.results[i]["ca_collections.description"].substring(0, response.results[i]["ca_collections.description"].length - 1),
                            "curator": response.results[i]["ca_collections.nonpreferred_labels"][1],
                            "date": response.results[i]["ca_collections.nonpreferred_labels"][0],
                            "refid": response.results[i].id
                        });
                    }
                }
            }
        }
    },



    mounted: async function() {
        var _this = this;
        var data = JSON.stringify(
            {
                "criteria": {
                    "type_facet": [114]
                },
                "bundles": {
                    "ca_collections.description":true,
                    "ca_collections.status":{"returnAsText":true},
                    "ca_collections.nonpreferred_labels":{"returnAsArray":true}
                }
            }
        );

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/browse/ca_collections?q=*&source=" + data, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);
        xhr.onload = function() {
            _this.loadBrowse(this.responseText);
        }
    }
});

app.mount("#ca-exhibit-browse-app");