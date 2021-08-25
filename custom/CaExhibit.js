const app = Vue.createApp({
    data() {
        return {
            refid: 10,
            exhibit_idno: "",
            carosel_1_page: 0,
            carosel_1_images: ["/custom/loading.gif"],
            carosel_2_page: 0,
            carosel_2_info: [{"img":"/custom/loading.gif", "title": "Loading...", "creator": "Loading...", "date": "Loading...", "medium": "Loading...", "idno": "Loading...", "dimensions": "Loading..."}],
            title: "",
            date: "",
            introduction: "",
            subtitle: "",
            writeUp: ""
        }
    },



    computed: {
        carousel_1() {
            return this.carosel_1_images[this.carosel_1_page] + "#" + new Date().getTime();
        },
        carousel_2() {
            //this.carosel_2_info[this.carosel_2_page]["img"] = this.carosel_2_info[this.carosel_2_page]["img"] + "#" + new Date().getTime();
            return this.carosel_2_info[this.carosel_2_page];
        }
    },



    methods: {
        loadInfo(responseText) {
            var response = JSON.parse(responseText);
            this.title = response.results[0].display_label;
            this.date = response.results[0]["ca_collections.nonpreferred_labels"][0];
            this.introduction = response.results[0]["ca_collections.description"].substring(0, response.results[0]["ca_collections.description"].length - 1);
            this.exhibit_idno = response.results[0].idno;

            var _this = this;
            var data = JSON.stringify(
                {
                    "bundles": {
                        "ca_objects.displayCreationDate": true,
                        "ca_objects.dimensionsPrint":true,
                        "ca_objects.displayMaterialsTech": true,
                        "ca_objects.inscriptions":true,
                        "ca_object_representations.media.large":{"returnURL": true},
                        "ca_entities.preferred_labels.displayname":{"returnAsArray":true}
                    }
                }
            );
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/find/ca_objects?q=ca_collections.collection_id:" + this.refid + "&source=" + data, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(null);
            xhr.onload = function() {
                _this.loadWorks(this.responseText);
            }
        },
        loadWorks(responseText) {
            var response = JSON.parse(responseText);
            this.carosel_2_info = [];
            for(var i = 0; i < response.results.length; i++) {
                if (response.results[i].idno == "data." + this.exhibit_idno) {
                    this.subtitle = response.results[i].display_label;
                    this.writeUp = response.results[i]["ca_objects.inscriptions"];
                } else {
                    this.carosel_2_info.push({
                        "img": response.results[i]["ca_object_representations.media.large"],
                        "title": response.results[i]["display_label"],
                        "creator": response.results[i]["ca_entities.preferred_labels.displayname"][0],
                        "date": response.results[i]["ca_objects.displayCreationDate"],
                        "medium": response.results[i]["ca_objects.displayMaterialsTech"],
                        "idno": response.results[i]["idno"],
                        "dimensions": response.results[i]["ca_objects.dimensionsPrint"]
                    });
                }
            }

            this.carosel_2_info.shift();
        }
    },



    mounted: async function() {
        this.refid = window.location.search.substring(window.location.search.indexOf('ref=') + 4);

        var _this = this;
        var data = JSON.stringify(
            {
                "bundles": {
                    "ca_collections.description":true, 
                    "ca_collections.nonpreferred_labels":{"returnAsArray":true}
                }
            }
        );
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/find/ca_collections?q=ca_collections.id:" + this.refid + "&source=" + data, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);
        xhr.onload = function() {
            _this.loadInfo(this.responseText);
        }

        window.setInterval(() => {
            if ((this.carosel_1_page + 1) > (this.carosel_1_images.length - 1)) {
                this.carosel_1_page = 0;
            } else {
                this.carosel_1_page += 1;
            }

            if ((this.carosel_2_page + 1) > (this.carosel_2_info.length - 1)) {
                this.carosel_2_page = 0;
            } else {
                this.carosel_2_page += 1;
            }
        }, 8000);
    }
});

app.mount("#ca-exhibit-app");