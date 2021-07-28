const objectCard = {
    template:
    /*html*/
    `
    <div class="objectCard">
        <img class="objectCard-image" :src="objectimage">
        <h5 class="objectCard-title"> {{ objectname }} </h5>
        <h6 class="objectCard-creator"> {{ objectcreator[0] }} </h6>
        <span class="objectCard-extraInfo">{{ extraInfo }}</span>
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
        }
    },


    computed: {
        extraInfo() {
            var out = "(";
            var first = true;

            if (typeof this.creatornationality !== 'undefined' && Array.isArray(this.creatornationality)) {
                for (var i = 0; i < this.creatornationality.length; i++) {
                    if (first && this.creatornationality[i] != "") {
                        out += this.creatornationality[i];
                        first = false;
                    } else if (this.creatornationality[i] != "") {
                        out += ", " + this.creatornationality[i];
                    }
                }
            }

            if (typeof this.objectdate !== 'undefined' && this.objectdate != "") {
                if (first) {
                    out += this.objectdate;
                    first = false;
                } else {
                    out += ", " + this.objectdate;
                }
            }

            return out + ")";
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
            pageOptionOneColor: "rgba(76, 111, 158, 0.8)",
            pageOptionTwo: 2,
            pageOptionTwoColor: "rgb(166, 93, 89)",
            pageOptionThree: 3,
            pageOptionThreeColor: "rgb(166, 93, 89)"
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
                this.pageOptionOneColor = "rgba(76, 111, 158, 0.8)";
                this.pageOptionTwoColor = "rgb(166, 93, 89)";

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
                this.pageOptionOneColor = "rgba(76, 111, 158, 0.8)";
                this.pageOptionTwoColor = "rgb(166, 93, 89)";

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
                this.pageOptionOneColor = "rgba(76, 111, 158, 0.8)";
                this.pageOptionTwoColor = "rgb(166, 93, 89)";
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
                this.pageOptionOneColor = "rgb(166, 93, 89)";
                this.pageOptionTwoColor = "rgba(76, 111, 158, 0.8)";
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
                this.pageOptionOneColor = "rgba(76, 111, 158, 0.8)";
                this.pageOptionTwoColor = "rgb(166, 93, 89)";
            } else {
                this.pageOptionOneColor = "rgb(166, 93, 89)";
                this.pageOptionTwoColor = "rgba(76, 111, 158, 0.8)";

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
            this.pageOptionOneColor = "rgba(76, 111, 158, 0.8)";
            this.pageOptionTwoColor = "rgb(166, 93, 89)";

            this.displayedObjects = [];
            for (var i = this.pageNum * 12; (i < this.filteredObjects.length) && (i < (this.pageNum * 12) + 12); i++) {
                this.displayedObjects.push(this.filteredObjects[i]);
            }
        }
    },


    mounted: async function() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/browse/ca_objects", true);
        xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.send(JSON.stringify(
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
        ));

        xhr.onload = function(e) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            console.log(response);
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

            for (var i = this.pageNum * 12; i < (this.pageNum * 12) + 12; i++) {
                this.displayedObjects.push(this.allObjects[i]);
            }

            this.filteredObjects = this.allObjects;
        }
    }
});

app.mount("#ca-browse-app");