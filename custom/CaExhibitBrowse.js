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
                if (response.results[i]["idno"].includes("exhibition") && !response.results[i]["idno"].includes("display")) {
                    if (response.results[i]["ca_collections.status"] == "0") {
                        this.currentEx.push({
                            "title": response.results[i]["display_label"],
                            "desc": response.results[i]["ca_collections.description"].substring(0, response.results[i]["ca_collections.description"].length - 1),
                            "curator": response.results[i]["ca_collections.nonpreferred_labels"][1],
                            "date": response.results[i]["ca_collections.nonpreferred_labels"][0],
                            "img": "/custom/loading.gif",
                            "idno": response.results[i].idno,
                            "refid": response.results[i].id
                        });
                    } else if (response.results[i]["ca_collections.status"] == "4") {
                        this.pastEx.push({
                            "title": response.results[i]["display_label"],
                            "desc": response.results[i]["ca_collections.description"].substring(0, response.results[i]["ca_collections.description"].length - 1),
                            "curator": response.results[i]["ca_collections.nonpreferred_labels"][1],
                            "date": response.results[i]["ca_collections.nonpreferred_labels"][0],
                            "img": "/custom/loading.gif",
                            "idno": response.results[i].idno,
                            "refid": response.results[i].id
                        });
                    }
                }
            }

            var _this = this;
            var data = JSON.stringify(
                {
                    "bundles": {
                        "ca_object_representations.media.original":{"returnURL":true}
                    }
                }
            );
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/find/ca_objects?q=ca_objects.idno:data%2Eexhibition&source=" + data);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(null);
            xhr.onload = function() {
                _this.loadThumbnails(this.responseText);
            }
        },
        loadThumbnails(responseText) {
            var response = JSON.parse(responseText);
            for(var i = 0; i < response.results.length; i++) {
                if (!response.results[i]["idno"].includes("display")) {
                    var past = this.pastEx.find(x => response.results[i].idno == "data." + x.idno);
                    var current = this.currentEx.find(x => response.results[i].idno == "data." + x.idno);
                    if (past != null) {
                    past.img = response.results[i]["ca_object_representations.media.original"];
                    } else if (current != null) {
                        current.img = response.results[i]["ca_object_representations.media.original"];
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

app.component('exhibit-card', {
    template:
    /*html*/
    `
    <a class="ca-card-container" :href="cardLink">
        <div class="ca-card">
            <div class="ca-img-container">
                <img :title="extitle" class="ca-img" :src="eximg"/>
            </div>
            <div class="ca-info">
                <span class="ca-card-title"><em>{{ extitle }}</em></span>
                <span class="ca-card-date">{{ exdate }}</span>
                <span class="ca-card-curator">{{ excurator }}</span>
                <span>{{ exintro }}</span>
            </div>
        </div>
    </a>
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
        eximg: {
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
    },



    computed: {
        cardLink() {
            if (this.refid == "LOAD") {
                return "";
            } else {
                return 'Exhibition.html?ref=' + this.refid;
            }
        }
    }
});

app.mount("#ca-exhibit-browse-app");