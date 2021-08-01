var response = {
    "ok": true,
    "total": 1,
    "results": [
        {
            "object_id": "3",
            "id": "3",
            "idno": "UG1974.034",
            "display_label": "Schlachtfeld (Battlefield) No. 6 in the Peasant's War Series",
            "ca_object_representations.media.original": "https://bachinski-chu.uoguelph.ca/admin/media/collectiveaccess/images/0/14440_ca_object_representations_media_32_original.jpg",
            "ca_objects.displayEdition": "Not Editioned",
            "ca_entities.preferred_labels.displayname": [
                "Käthe Kollwitz"
            ],
            "ca_objects.displayCreationDate": "1907",
            "ca_objects.displayMaterialsTech": "Etching",
            "ca_objects.dimensionsPrint": "n/a; 15.75 x 20.75 in",
            "ca_objects.provenance": "Ferdinand Roten Galleries, Baltimore; Gift of the Fine Art Printmaking Students in 1974 (Nasby 1980, 204).",
            "ca_objects.rightsWork": "Out of Copyright"
        }
    ]
}

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
                    output += this.artistList[i];
                } else {
                    output += ", " + this.artistList[i];
                }
            }
            return output;
        }
    },



    mounted: async function() {
        var ref = window.location.search.substring(window.location.search.indexOf('ref=') + 4);

        /*var data = JSON.stringify(
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

        var response = JSON.parse(xhr.responseText);*/

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
    }
});

app.mount("#ca-view-app");