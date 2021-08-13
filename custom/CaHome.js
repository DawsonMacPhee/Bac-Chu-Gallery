const app = Vue.createApp({
    data() {
        return {
            links: [],
            images: ["/custom/loading.gif", "/custom/loading.gif", "/custom/loading.gif", "/custom/loading.gif", "/custom/loading.gif", "/custom/loading.gif"],
            widths: ["800", "800", "800", "800", "800", "800"],
            heights: ["600", "600", "600", "600", "600", "600"],
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



    methods: {
        loadPreview(responseText) {
            var response = JSON.parse(responseText);

            for (var i = 0; i < 6; i++) {
                if (response.results[i]["ca_object_representations.media.large"] != null) {
                    var imageInfo = response.results[i]["ca_object_representations.media.large"].split("'");
                    this.images[i] = imageInfo[1];
                    this.widths[i] = imageInfo[3];
                    this.heights[i] = imageInfo[5];
                } else {
                    this.images[i] = "/custom/no_image.png";
                    this.widths[i] = "1150";
                    this.heights[i] = "647";
                }
                this.titles.push(response.results[i]["display_label"]);
                this.years.push(response.results[i]["ca_objects.displayCreationDate"]);
                this.mediums.push(response.results[i]["ca_objects.displayMaterialsTech"]);
                this.ids.push(response.results[i]["ca_objects.subjectTerm"]);
                this.links.push("https://bachinski-chu.uoguelph.ca/View-Object.html?ref=" + response.results[i]["ca_objects.inscriptions"]);

                var creatorStr = "";
                for (var y = 0; y < response.results[i]["ca_entities.preferred_labels.displayname"].length; y++) {
                    if (y == 0) {
                        creatorStr += response.results[i]["ca_entities.preferred_labels.displayname"][y];
                    } else {
                        creatorStr += ", " + response.results[i]["ca_entities.preferred_labels.displayname"][y];
                    }
                }
                this.creators.push(creatorStr);
            }
        }
    },



    mounted: async function() {
        var _this = this;
        var data = JSON.stringify(
            {
                "bundles": {
                    "ca_objects.displayCreationDate": true,
                    "ca_objects.displayMaterialsTech": true,
                    "ca_objects.subjectTerm":true,
                    "ca_objects.inscriptions":true,
                    "ca_entities.preferred_labels.displayname":{"returnAsArray":true},
                    "ca_object_representations.media.large":true
                }
            }
        );

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/find/ca_objects?q=ca_collections.collection_id:2&source=" + data, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);
        xhr.onload = function() {
            _this.loadPreview(this.responseText);
        }
    }
});

app.mount("#carousel_bed6");