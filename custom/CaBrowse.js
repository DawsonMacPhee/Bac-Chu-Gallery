var response = {
    "ok": true,
    "results": [
        {
            "object_id": "3",
            "id": "3",
            "idno": "UG1974.034",
            "display_label": "Schlachtfeld (Battlefield) No. 6 in the Peasant's War Series",
            "ca_objects.displayCreationDate": "1907",
            "ca_objects.displayMaterialsTech": "Etching",
            "ca_object_representations.media.original": "https://bachinski-chu.uoguelph.ca/admin/media/collectiveaccess/images/0/2321_ca_object_representations_media_32_original.jpg",
            "ca_entities.related.preferred_labels.displayname": [
                "Käthe Kollwitz"
            ],
            "ca_entities.related.nationalityCreator": [
                "German"
            ]
        },
        {
            "object_id": "4",
            "id": "4",
            "idno": "UG1974.041",
            "display_label": "Pflugzieher und Weib",
            "ca_objects.displayCreationDate": "1902",
            "ca_objects.displayMaterialsTech": "Lithograph",
            "ca_object_representations.media.original": "https://bachinski-chu.uoguelph.ca/admin/media/collectiveaccess/images/0/45973_ca_object_representations_media_11_original.jpg",
            "ca_entities.related.preferred_labels.displayname": [
                "Käthe Kollwitz"
            ],
            "ca_entities.related.nationalityCreator": [
                "German"
            ]
        },
        {
            "object_id": "5",
            "id": "5",
            "idno": "UG1987.028",
            "display_label": "Self-Portrait",
            "ca_objects.displayCreationDate": "1912",
            "ca_objects.displayMaterialsTech": "etching",
            "ca_object_representations.media.original": "https://bachinski-chu.uoguelph.ca/admin/media/collectiveaccess/images/0/2382_ca_object_representations_media_13_original.jpg",
            "ca_entities.related.preferred_labels.displayname": [
                "Käthe Kollwitz"
            ],
            "ca_entities.related.nationalityCreator": [
                "German"
            ]
        },
        {
            "object_id": "6",
            "id": "6",
            "idno": "UG1971.004",
            "display_label": "Mucius Scaevola",
            "ca_objects.displayCreationDate": "1535",
            "ca_objects.displayMaterialsTech": "Engraving",
            "ca_object_representations.media.original": "https://bachinski-chu.uoguelph.ca/admin/media/collectiveaccess/images/0/45328_ca_object_representations_media_14_original.jpg",
            "ca_entities.related.preferred_labels.displayname": [
                "Georg Pencz"
            ],
            "ca_entities.related.nationalityCreator": [
                "German"
            ]
        },
        {
            "object_id": "6711",
            "id": "6711",
            "idno": "TEMP.445",
            "display_label": "Solar Anatomy",
            "ca_objects.displayCreationDate": "",
            "ca_objects.displayMaterialsTech": "Digital Print",
            "ca_object_representations.media.original": null,
            "ca_entities.related.preferred_labels.displayname": [
                "Jean Maddison"
            ],
            "ca_entities.related.nationalityCreator": [
                "English",
                "Canadian"
            ]
        },
        {
            "object_id": "6712",
            "id": "6712",
            "idno": "TEMP.444",
            "display_label": "The Blind Watchmaker",
            "ca_objects.displayCreationDate": "",
            "ca_objects.displayMaterialsTech": "Digital Print",
            "ca_object_representations.media.original": null,
            "ca_entities.related.preferred_labels.displayname": [
                "Jean Maddison"
            ],
            "ca_entities.related.nationalityCreator": [
                "English",
                "Canadian"
            ]
        },
        {
            "object_id": "6713",
            "id": "6713",
            "display_label": "The most surprising CATARACT of NIAGARA in Canada",
            "ca_objects.displayCreationDate": "1779",
            "ca_objects.displayMaterialsTech": "Hand-coloured engraving",
            "ca_object_representations.media.original": null,
            "ca_entities.related.preferred_labels.displayname": [
                "After Robert Hancock"
            ],
            "ca_entities.related.nationalityCreator": [
                "British"
            ]
        },
        {
            "object_id": "6714",
            "id": "6714",
            "idno": "BC2017.172",
            "display_label": "Untitled ",
            "ca_objects.displayCreationDate": "Undated",
            "ca_objects.displayMaterialsTech": "Glossy print",
            "ca_object_representations.media.original": null,
            "ca_entities.related.preferred_labels.displayname": [
                "Stephen Patterson"
            ],
            "ca_entities.related.nationalityCreator": [
                "Canadian"
            ]
        },
        {
            "object_id": "6715",
            "id": "6715",
            "idno": "BC2017.430",
            "display_label": "Trees #1",
            "ca_objects.displayCreationDate": "2003",
            "ca_objects.displayMaterialsTech": "Serigraph",
            "ca_object_representations.media.original": null,
            "ca_entities.related.preferred_labels.displayname": [
                "Lorne Wagman"
            ],
            "ca_entities.related.nationalityCreator": [
                "Canadian"
            ]
        },
        {
            "object_id": "6716",
            "id": "6716",
            "idno": "BC2017.100",
            "display_label": "Dragon Boats",
            "ca_objects.displayCreationDate": "2003",
            "ca_objects.displayMaterialsTech": "Digital photograph (glicee) ",
            "ca_object_representations.media.original": null,
            "ca_entities.related.preferred_labels.displayname": [
                "Stephen Patterson"
            ],
            "ca_entities.related.nationalityCreator": [
                "Canadian"
            ]
        },
        {
            "object_id": "6717",
            "id": "6717",
            "idno": "UG1989.019.003",
            "display_label": "Cape Warrender; Lancaster Sound / Arctic Suite",
            "ca_objects.displayCreationDate": "1989",
            "ca_objects.displayMaterialsTech": "Serigraph",
            "ca_object_representations.media.original": null,
            "ca_entities.related.preferred_labels.displayname": [
                "Toni Onley"
            ],
            "ca_entities.related.nationalityCreator": [
                "Manx",
                "Canadian"
            ]
        }
    ]
};

const objectCard = {
    template:
    /*html*/
    `
    <div class="objectCard">
        <div class="objectImage">
            <img class="objectCard-image" :src="objectimage">
        </div>
        <div class="objectInfo">
            <span class="objectCard-creator"> {{ objectcreator[0] }} </span>
            <span class="objectCard-title"><em> {{ objectname }} <em></span>
            <span class="objectCard-extraInfo">{{ objectdate }}</span>
            <span class="objectCard-extraInfo">{{ objectmedium }}</span>
            <span class="objectCard-extraInfo">{{ objectid }}</span>
        </div>
    </div>
    `,

    
    props: {
        objectname: {
            type: String,
            required: true
        },
        objectimage: {
            type: String,
            required: true
        },
        objectcreator: {
            type: Array,
            required: true
        },
        creatornationality: {
            type: Array,
            required: true
        },
        objectdate: {
            type: String,
            required: true
        },
        objectmedium: {
            type: String,
            required: true
        },
        objectid: {
            type: String,
            required: true
        }
    }
}

const app = Vue.createApp({
    data() {
        return {
            search: "",
            searchOption: "creator",
            style: "",
            nationality: "",
            medium: "",
            allObjects: [],
            filteredObjects: [],
            textFilteredObjects: [],
            displayedObjects: [],
            filters: [],
            pageNum: 0,
            pageOptionOne: 1,
            pageOptionOneColor: "rgb(184, 194, 207)",
            pageOptionTwo: 2,
            pageOptionTwoColor: "rgb(108, 136, 174)",
            pageOptionThree: 3,
            pageOptionThreeColor: "rgb(108, 136, 174)"
        }
    },


    methods: {
        applyFilter(filterType, filterValue, update) {
            function filterCompare(value) {
                if (filterType == "style") {
                    //TODO
                } else if (filterType == "nationality" && Array.isArray(value.nationality)) {
                    for (var i = 0; i < value.nationality.length; i++) {
                        if (value.nationality[i].toUpperCase() == filterValue.toUpperCase()) {
                            return true;
                        }
                    }
                } else if (filterType == "medium") {
                    if (value.medium.toUpperCase() == filterValue.toUpperCase()) {
                        return true;
                    }
                }
                return false;
            }
            this.filteredObjects = this.filteredObjects.filter(filterCompare);

            if (update) {
                var bgColor;
                var bdColor;
                if (filterType == "style") {
                    bgColor = "rgb(255, 138, 138)";
                    bdColor = "rgb(176, 65, 65)";
                } else if (filterType == "nationality") {
                    bgColor = "rgb(112, 215, 255)";
                    bdColor = "rgb(40, 123, 156)";
                } else if (filterType == "medium") {
                    bgColor = "rgb(205, 135, 255)";
                    bdColor = "rgb(104, 31, 156)";
                }

                this.search = "";
                this.style = "";
                this.nationality = "";
                this.medium = "";

                this.filters.push({
                    type: filterType,
                    value: filterValue,
                    bgColor: bgColor,
                    bdColor: bdColor
                });

                this.pageNum = 0;
                this.pageOptionOne = 1;
                this.pageOptionTwo = 2;
                this.pageOptionThree = 3;
                this.pageOptionOneColor = "rgb(184, 194, 207)";
                this.pageOptionTwoColor = "rgb(108, 136, 174)";

                this.displayedObjects = [];
                for (var i = this.pageNum * 12; (i < this.filteredObjects.length) && (i < (this.pageNum * 12) + 12); i++) {
                    this.displayedObjects.push(this.filteredObjects[i]);
                }
            }
        },
        applyTextFilter(search, searchOption, update) {
            function filterCompare(value) {
                if (searchOption == "creator") {
                    for (var i = 0; i < value.creator.length; i++) {
                        if (value.creator[i].toUpperCase().includes(search.toUpperCase())) {
                            return true;
                        }
                    }
                } else if (searchOption == "title") {
                    if (value.title.toUpperCase().includes(search.toUpperCase())) {
                        return true;
                    }
                } else if (searchOption == "idNumber" && typeof value.id !== 'undefined') {
                    if (value.id.toUpperCase().includes(search.toUpperCase())) {
                        return true;
                    }
                } else if (searchOption == "subjectTerm") {
                    //TODO
                }
                return false;
            }
            this.textFilteredObjects = this.filteredObjects.filter(filterCompare);

            if (update) {
                if (search == "") {
                    this.textFilteredObjects = this.filteredObjects;
                }

                this.pageNum = 0;
                this.pageOptionOne = 1;
                this.pageOptionTwo = 2;
                this.pageOptionThree = 3;
                this.pageOptionOneColor = "rgb(184, 194, 207)";
                this.pageOptionTwoColor = "rgb(108, 136, 174)";

                this.displayedObjects = [];
                for (var i = this.pageNum * 12; (i < this.textFilteredObjects.length) && (i < (this.pageNum * 12) + 12); i++) {
                    this.displayedObjects.push(this.textFilteredObjects[i]);
                }
            }
        },
        confirmTextFilter(search, searchOption, update) {
            if (search == "") {
                return;
            }
            this.filteredObjects = this.textFilteredObjects;

            if (update) {
                var bgColor;
                var bdColor;
                if (searchOption == "creator") {
                    bgColor = "rgb(102, 217, 138)";
                    bdColor = "rgb(28, 128, 59)";
                } else if (searchOption == "title") {
                    bgColor = "rgb(69, 131, 255)";
                    bdColor = "rgb(0, 51, 153)";
                } else if (searchOption == "idNumber") {
                    bgColor = "rgb(255, 174, 69)";
                    bdColor = "rgb(166, 95, 3)";
                } else if (searchOption == "subjectTerm") {
                    bgColor = "rgb(245, 223, 83)";
                    bdColor = "rgb(171, 148, 3)";
                }

                this.filters.push({
                    type: searchOption,
                    value: search,
                    bgColor: bgColor,
                    bdColor: bdColor
                });
                this.search = "";
            }
        },
        backPage() {
            if (this.pageNum == 0) {
                return;
            } else if (this.pageNum == 1) {
                this.pageOptionOneColor = "rgb(184, 194, 207)";
                this.pageOptionTwoColor = "rgb(108, 136, 174)";
            } else {
                this.pageOptionOne -= 1;
                this.pageOptionTwo -= 1;
                this.pageOptionThree -= 1;
            }

            this.pageNum -= 1;
            this.displayedObjects = [];
            for (var i = this.pageNum * 12; (i < this.filteredObjects.length) && (i < (this.pageNum * 12) + 12); i++) {
                this.displayedObjects.push(this.filteredObjects[i]);
            }
        }, 
        forwardPage() {
            if (((this.pageNum + 1) * 12) >= (this.filteredObjects.length)) {
                return;
            } else if (this.pageNum == 0) {
                this.pageOptionOneColor = "rgb(108, 136, 174)";
                this.pageOptionTwoColor = "rgb(184, 194, 207)";
            } else {
                this.pageOptionOne += 1;
                this.pageOptionTwo += 1;
                this.pageOptionThree += 1;
            }

            this.pageNum += 1;
            this.displayedObjects = [];
            for (var i = this.pageNum * 12; (i < this.filteredObjects.length) && (i < (this.pageNum * 12) + 12); i++) {
                this.displayedObjects.push(this.filteredObjects[i]);
            }
        },
        specificPage(newPageNum) {
            if (((newPageNum - 1) * 12) >= (this.filteredObjects.length)) {
                return;
            } else if (newPageNum == 1) {
                this.pageOptionOneColor = "rgb(184, 194, 207)";
                this.pageOptionTwoColor = "rgb(108, 136, 174)";
            } else {
                this.pageOptionOneColor = "rgb(108, 136, 174)";
                this.pageOptionTwoColor = "rgb(184, 194, 207)";

                this.pageOptionOne = newPageNum - 1;
                this.pageOptionTwo = newPageNum;
                this.pageOptionThree = newPageNum + 1;
            }

            this.pageNum = newPageNum - 1;
            this.displayedObjects = [];
            for (var i = this.pageNum * 12; (i < this.filteredObjects.length) && (i < (this.pageNum * 12) + 12); i++) {
                this.displayedObjects.push(this.filteredObjects[i]);
            }
        },
        removeFilter(index) {
            this.filteredObjects = this.allObjects;

            this.filters.splice(index, 1);
            for(var i = 0; i < this.filters.length; i++) {
                if (this.filters[i].type == "style") {
                    this.applyFilter("style", this.filters[i].value, false);
                } else if (this.filters[i].type == "nationality") {
                    this.applyFilter("nationality", this.filters[i].value, false);
                } else if (this.filters[i].type == "medium") {
                    this.applyFilter("medium", this.filters[i].value, false);
                } else if (this.filters[i].type == "creator") {
                    this.applyTextFilter(this.filters[i].value, "creator", false);
                    this.confirmTextFilter(this.filters[i].value, "creator", false);
                } else if (this.filters[i].type == "title") {
                    this.applyTextFilter(this.filters[i].value, "title", false);
                    this.confirmTextFilter(this.filters[i].value, "title", false);
                } else if (this.filters[i].type == "idNumber") {
                    this.applyTextFilter(this.filters[i].value, "idNumber", false);
                    this.confirmTextFilter(this.filters[i].value, "idNumber", false);
                } else if (this.filters[i].type == "subjectTerm") {
                    this.applyTextFilter(this.filters[i].value, "subjectTerm", false);
                    this.confirmTextFilter(this.filters[i].value, "subjectTerm", false);
                }
            }

            this.pageNum = 0;
            this.pageOptionOne = 1;
            this.pageOptionTwo = 2;
            this.pageOptionThree = 3;
            this.pageOptionOneColor = "rgb(184, 194, 207)";
            this.pageOptionTwoColor = "rgb(108, 136, 174)";

            this.displayedObjects = [];
            for (var i = this.pageNum * 12; (i < this.filteredObjects.length) && (i < (this.pageNum * 12) + 12); i++) {
                this.displayedObjects.push(this.filteredObjects[i]);
            }
        }
    },


    mounted: async function() {
        /*var data = JSON.stringify(
            {
                "criteria": {
                    "type_facet": [23]
                },
                "bundles": {
                    "ca_objects.displayCreationDate": true,
                    "ca_objects.displayMaterialsTech": true,
                    "ca_object_representations.media.original": { "returnURL" : true },
                    "ca_entities.related.preferred_labels.displayname": {"returnAsArray" : true },
                    "ca_entities.related.nationalityCreator": {"returnAsArray" : true }
                }
            }
        );

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/browse/ca_objects?q=*&source=" + data, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);

        var response = JSON.parse(xhr.responseText);*/
        for(var i = 0; i < response.results.length; i++) {
            var image = response.results[i]["ca_object_representations.media.original"];
            if (image == null) {
                image = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png";
            }
            this.allObjects.push({
                "card": objectCard,
                "id": response.results[i]["idno"],
                "title": response.results[i]["display_label"], 
                "image": image, 
                "creator": response.results[i]["ca_entities.related.preferred_labels.displayname"],
                "date": response.results[i]["ca_objects.displayCreationDate"],
                "medium": response.results[i]["ca_objects.displayMaterialsTech"],
                "nationality": response.results[i]["ca_entities.related.nationalityCreator"]
            });
        }

        for (var i = this.pageNum * 12; (i < this.allObjects.length) && (i < (this.pageNum * 12) + 12); i++) {
            this.displayedObjects.push(this.allObjects[i]);
        }

        this.filteredObjects = this.allObjects;
    }
});

app.mount("#ca-browse-app");