const app = Vue.createApp({
    data() {
        return {
            links: [],
            images: [],
            widths: [],
            heights: [],
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
        var data = JSON.stringify(
            {
                "bundles": {
                    "ca_objects.displayCreationDate": true,
                    "ca_objects.displayMaterialsTech": true,
                    "ca_entities.preferred_labels.displayname":{"returnAsArray":true},
                    "ca_object_representations.media.large":true
                }
            }
        );

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/find/ca_objects?q=ca_collections.collection_id:2&source=" + data, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);

        var response = JSON.parse(xhr.responseText);

        for (var i = 0; i < 6; i++) {
            if (response.results[i]["ca_object_representations.media.large"] != null) {
                var imageInfo = response.results[i]["ca_object_representations.media.large"].split("'");
                this.images.push(imageInfo[1]);
                this.widths.push(imageInfo[3]);
                this.heights.push(imageInfo[5]);
            } else {
                this.images.push("/custom/no_image.png");
                this.widths.push("1150");
                this.heights.push("647");
            }
            this.titles.push(response.results[i]["display_label"]);
            this.years.push(response.results[i]["ca_objects.displayCreationDate"]);
            this.mediums.push(response.results[i]["ca_objects.displayMaterialsTech"]);
            this.ids.push(response.results[i]["idno"]);
            this.links.push("https://bachinski-chu.uoguelph.ca/View-Object.html?ref=" + response.results[i]["id"]);

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
});

app.mount("#carousel_bed6");