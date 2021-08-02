const app = Vue.createApp({
    data() {
        return {
            title: "Loading...",
            image: "/custom/loading.gif",
            idno: "Loading...",
            edition: "Loading...",
            artistList: ["Loading..."],
            date: "Loading...",
            medium: "Loading...",
            dimensions: "Loading...",
            creditLine: "Loading...",
            rights: "Loading..."
        }
    },



    computed: {
        artists() {
            if (this.artistList == null || !Array.isArray(this.artistList)) {
                return "N/A";
            }

            var output = "";
            for (var i=0; i < this.artistList.length; i++) {
                if (i == 0) {
                    output += this.artistList[i];
                } else {
                    output += ", " + this.artistList[i];
                }
            }
            return output;
        }
    },



    methods: {
        loadView(responseText) {
            var response = JSON.parse(responseText);

            this.title = response.results[0]["display_label"];
            this.image = response.results[0]["ca_object_representations.media.original"];
            this.idno = response.results[0]["idno"];
            this.edition = response.results[0]["ca_objects.displayEdition"];
            this.artistList = response.results[0]["ca_entities.preferred_labels.displayname"];
            this.date = response.results[0]["ca_objects.displayCreationDate"];
            this.medium = response.results[0]["ca_objects.displayMaterialsTech"];
            this.dimensions = response.results[0]["ca_objects.dimensionsPrint"];
            this.creditLine = response.results[0]["ca_objects.provenance"];
            this.rights = response.results[0]["ca_objects.rightsWork"];

            if (this.title == null || this.title == "") {
                this.title = "N/A";
            }
            if (this.image == null || this.image == "") {
                this.image = "/custom/no_image.png";
            }
            if (this.idno == null || this.idno == "") {
                this.idno = "N/A";
            }
            if (this.edition == null || this.edition == "") {
                this.edition = "N/A";
            }
            if (this.date == null || this.date == "") {
                this.date = "N/A";
            }
            if (this.medium == null || this.medium == "") {
                this.medium = "N/A";
            }
            if (this.dimensions == null || this.dimensions == "") {
                this.dimensions = "N/A";
            }
            if (this.creditLine == null || this.creditLine == "") {
                this.creditLine = "N/A";
            }
            if (this.rights == null || this.rights == "") {
                this.rights = "N/A";
            }
        }
    },



    mounted: async function() {
        var ref = window.location.search.substring(window.location.search.indexOf('ref=') + 4);
        var _this = this;
        var data = JSON.stringify(
            {
                "bundles": {
                    "ca_object_representations.media.original":{"returnURL":true},
                    "ca_objects.displayEdition":true,
                    "ca_entities.preferred_labels.displayname":{"returnAsArray":true},
                    "ca_objects.displayCreationDate": true,
                    "ca_objects.displayMaterialsTech": true,
                    "ca_objects.dimensionsPrint":true,
                    "ca_objects.provenance": true,
                    "ca_objects.rightsWork":true
                }
            }
        );

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/find/ca_objects?q=ca_objects.object_id:" + ref + "&source=" + data, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);
        xhr.onload = function() {
            _this.loadView(this.responseText);
        }
    }
});

app.mount("#ca-view-app");