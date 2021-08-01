const app = Vue.createApp({
    data() {
        return {
            title: "",
            image: "",
            idno: "",
            edition: "",
            artistList: [],
            date: "",
            medium: "",
            dimensions: "",
            creditLine: "",
            rights: ""
        }
    },



    computed: {
        artists() {
            var output = "";
            for (var i=0; i < this.artistList.length; i++) {
                if (i == 0) {
                    output += this.artistList[i].displayname;
                } else {
                    output += ", " + this.artistList[i].displayname;
                }
            }
            return output;
        }
    },



    mounted: async function() {
        var ref = window.location.search.substring(window.location.search.indexOf('ref=') + 4);

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
        xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/find/ca_objects?q=ca_objects.object_id:" + ref + "&source=" + data, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);

        var response = JSON.parse(xhr.responseText);

        this.title = response.results[0]["display_label"];
        this.image = response.results[0]["ca_object_representations.media.original"];
        this.idno = response.results[0]["idno"];
        this.edition = response.results[0]["ca_objects.displayEdition"];
        this.artistList = response.results[0]["ca_entities.preferred_labels.displayname"];
        this.date = response.results[0]["ca_objects.displayCreationDate"];
        this.medium = rresponse.results[0]["ca_objects.displayMaterialsTech"];
        this.dimensions = response.results[0]["ca_objects.dimensionsPrint"];
        this.creditLine = response.results[0]["ca_objects.provenance"];
        this.rights = response.results[0]["ca_objects.rightsWork"];
    }
});

app.mount("#ca-view-app");