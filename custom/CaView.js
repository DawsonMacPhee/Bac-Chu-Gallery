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
                    "ca_objects.preferred_labels":true,
                    "ca_objects.displayEdition":true,
                    "ca_entities.preferred_labels":{"returnAsArray":true},
                    "ca_objects.displayCreationDate": true,
                    "ca_objects.displayMaterialsTech": true,
                    "ca_objects.dimensionsPrint":true,
                    "ca_objects.provenance": true,
                    "ca_objects.rightsWork":true
                }
            }
        );

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/item/ca_objects/id/" + ref + "?q=*&source=" + data, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);

        var response = JSON.parse(xhr.responseText);

        this.title = response["ca_objects.preferred_labels.name"][0].name;
        this.edition = response["ca_objects.displayEdition"][0].displayEdition;
        this.artistList = response["ca_entities.preferred_labels.displayname"];
        this.date = response["ca_objects.displayCreationDate"][0].displayCreationDate;
        this.medium = response["ca_objects.displayMaterialsTech"][0].displayMaterialsTech;
        this.dimensions = response["ca_objects.dimensionsPrint"][0].dimensionsPrint;
        this.creditLine = response["ca_objects.provenance"][0].provenance;
        this.rights = response["ca_objects.rightsWork"][0].rightsWork;
    }
});

app.mount("#ca-view-app");