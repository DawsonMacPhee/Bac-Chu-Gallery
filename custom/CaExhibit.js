const app = Vue.createApp({
    data() {
        return {
            refid: 10,
            exhibit_idno: "",
            carousel_1_page: 0,
            carousel_1_images: ["/custom/loading.gif"],
            carousel_2_page: 0,
            carousel_2_info: [{"img":"/custom/loading.gif", "title": "Loading...", "creator": "Loading...", "date": "Loading...", "medium": "Loading...", "idno": "Loading...", "dimensions": "Loading...", "desc": "Loading..."}],
            title: "",
            date: "",
            introduction: "",
            subtitle: "",
            writeUp: "",
            trans_1: false,
            trans_2: false
        }
    },



    computed: {
        carousel_1() {
            return this.carousel_1_images[this.carousel_1_page];
        },
        carousel_2() {
            return this.carousel_2_info[this.carousel_2_page];
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
                        "ca_objects.dimensionsPrint": true,
                        "ca_objects.displayMaterialsTech": true,
                        "ca_objects.inscriptions": {"returnAsArray":true},
                        "ca_object_representations.media.large":{"returnURL": true},
                        "ca_object_representations.media.original":{"returnURL": true},
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
            var descriptions;
            for(var i = 0; i < response.results.length; i++) {
                if (response.results[i].idno != null && response.results[i].idno == "data." + this.exhibit_idno) {
                    this.subtitle = response.results[i].display_label;
                    descriptions = response.results[i]["ca_objects.inscriptions"];
                    this.writeUp = descriptions[0];
                } else if (response.results[i].idno != null && response.results[i].idno.includes("data." + this.exhibit_idno + ".display_")) {
                    this.carousel_1_images.push(response.results[i]["ca_object_representations.media.original"]);
                } else {
                    var img = response.results[i]["ca_object_representations.media.large"];
                    if (img == null || img == "") {
                        img = "/custom/no_image.png";
                    }
                    this.carousel_2_info.push({
                        "img": img,
                        "title": response.results[i]["display_label"],
                        "creator": response.results[i]["ca_entities.preferred_labels.displayname"][0],
                        "date": response.results[i]["ca_objects.displayCreationDate"],
                        "medium": response.results[i]["ca_objects.displayMaterialsTech"],
                        "idno": response.results[i]["idno"],
                        "dimensions": response.results[i]["ca_objects.dimensionsPrint"],
                        "desc": ""
                    });
                }
            }

            for (var i = 0; i < descriptions.length; i++) {
                const temp = descriptions[i].split("<");
                for (var y = 0; y < this.carousel_2_info.length; y++) {
                    if (this.carousel_2_info[y].idno == temp[0]) {
                        let startInd = this.carousel_2_info[y].desc.indexOf("<");
                        this.carousel_2_info[y].desc = this.carousel_2_info[y].desc.substring(startInd);
                        break;
                    }
                }
            }

            this.carousel_1_images.shift();
            this.carousel_2_info.shift();
        },
        nextWork_1() {
            if (!this.trans_1) {
                this.trans_1 = true;

                if ((this.carousel_1_page + 1) > (this.carousel_1_images.length - 1)) {
                    this.carousel_1_page = 0;
                } else {
                    this.carousel_1_page += 1;
                }

                setTimeout(function () {
                    this.trans_1 = false;
                }, 2000);
            }
        }, 
        nextWork_2() {
            if (!this.trans_2) {
                this.trans_2 = true;

                if ((this.carousel_2_page + 1) > (this.carousel_2_info.length - 1)) {
                    this.carousel_2_page = 0;
                } else {
                    this.carousel_2_page += 1;
                }

                setTimeout(function () {
                    this.trans_2 =false;
                }, 2000);
            }
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
            this.nextWork_1();
            this.nextWork_2();
        }, 8000);
    }
});

app.mount("#ca-exhibit-app");