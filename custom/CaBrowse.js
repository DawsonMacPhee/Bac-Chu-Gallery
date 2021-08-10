const objectCard = {
    template:
    /*html*/
    `
    <a class="objectCard" :href="cardLink">
        <div class="objectImage">
            <img class="objectCard-image" :src="objectimage">
        </div>
        <div class="objectInfo">
            <span class="objectCard-creator"> {{ objectcreator[0] }} </span>
            <span class="objectCard-title"><em> {{ objectname }} </em></span>
            <span class="objectCard-extraInfo">{{ objectdate }}</span>
            <span class="objectCard-extraInfo">{{ objectmedium }}</span>
            <span class="objectCard-extraInfo">{{ objectid }}</span>
        </div>
    </a>
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
        },
        refid: {
            type: String,
            required: true
        }
    },



    computed: {
        cardLink() {
            if (this.refid == "LOAD") {
                return "";
            } else {
                return 'View-Object.html?ref=' + this.refid;
            }
        }
    }
}

const app = Vue.createApp({
    data() {
        return {
            search: "",
            searchOption: "creator",
            date: "",
            dateSearch: "On",
            style: "",
            nationality: "",
            medium: "",
            allObjects: [],
            filteredObjects: [],
            textFilteredObjects: [],
            dateFilteredObjects: [],
            displayedObjects: [{"card": objectCard, "refid": "LOAD", "id": "Loading...", "title": "Loading...", "image": "/custom/loading.gif", "creator": ["Loading..."], "date": "Loading...", "medium": "Loading..."},{"card": objectCard, "refid": "LOAD", "id": "Loading...", "title": "Loading...", "image": "/custom/loading.gif", "creator": ["Loading..."], "date": "Loading...", "medium": "Loading..."},{"card": objectCard, "refid": "LOAD", "id": "Loading...", "title": "Loading...", "image": "/custom/loading.gif", "creator": ["Loading..."], "date": "Loading...", "medium": "Loading..."},{"card": objectCard, "refid": "LOAD", "id": "Loading...", "title": "Loading...", "image": "/custom/loading.gif", "creator": ["Loading..."], "date": "Loading...", "medium": "Loading..."},{"card": objectCard, "refid": "LOAD", "id": "Loading...", "title": "Loading...", "image": "/custom/loading.gif", "creator": ["Loading..."], "date": "Loading...", "medium": "Loading..."},{"card": objectCard, "refid": "LOAD", "id": "Loading...", "title": "Loading...", "image": "/custom/loading.gif", "creator": ["Loading..."], "date": "Loading...", "medium": "Loading..."},{"card": objectCard, "refid": "LOAD", "id": "Loading...", "title": "Loading...", "image": "/custom/loading.gif", "creator": ["Loading..."], "date": "Loading...", "medium": "Loading..."},{"card": objectCard, "refid": "LOAD", "id": "Loading...", "title": "Loading...", "image": "/custom/loading.gif", "creator": ["Loading..."], "date": "Loading...", "medium": "Loading..."},{"card": objectCard, "refid": "LOAD", "id": "Loading...", "title": "Loading...", "image": "/custom/loading.gif", "creator": ["Loading..."], "date": "Loading...", "medium": "Loading..."},{"card": objectCard, "refid": "LOAD", "id": "Loading...", "title": "Loading...", "image": "/custom/loading.gif", "creator": ["Loading..."], "date": "Loading...", "medium": "Loading..."},{"card": objectCard, "refid": "LOAD", "id": "Loading...", "title": "Loading...", "image": "/custom/loading.gif", "creator": ["Loading..."], "date": "Loading...", "medium": "Loading..."},{"card": objectCard, "refid": "LOAD", "id": "Loading...", "title": "Loading...", "image": "/custom/loading.gif", "creator": ["Loading..."], "date": "Loading...", "medium": "Loading..."}],
            filters: [],
            pageNum: 0,
            pageOptionOne: 1,
            pageOptionOneColor: "rgb(184, 194, 207)",
            pageOptionTwo: 2,
            pageOptionTwoColor: "rgb(108, 136, 174)",
            pageOptionThree: 3,
            pageOptionThreeColor: "rgb(108, 136, 174)",
            filterTitle: false,
        }
    },


    methods: {
        applyFilter(filterType, filterValue, update) {
            function filterCompare(value) {
                if (filterType == "style" && typeof value.style !== 'undefined' && value.style != null) {
                    if (value.style.toUpperCase().includes(filterValue.toUpperCase())) {
                        return true;
                    }
                } else if (filterType == "nationality" && Array.isArray(value.nationality)) {
                    for (var i = 0; i < value.nationality.length; i++) {
                        if (value.nationality[i].toUpperCase() == filterValue.toUpperCase()) {
                            return true;
                        }
                    }
                } else if (filterType == "medium" && typeof value.medium !== 'undefined' && value.medium != null) {
                    if (value.medium.toUpperCase().includes(filterValue.toUpperCase())) {
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
                this.date = "";
                this.style = "";
                this.nationality = "";
                this.medium = "";

                this.filters.push({
                    type: filterType,
                    value: filterValue,
                    bgColor: bgColor,
                    bdColor: bdColor
                });
                this.filterTitle = true;

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
            this.date = "";
            function filterCompare(value) {
                if (searchOption == "creator" && Array.isArray(value.creator)) {
                    for (var i = 0; i < value.creator.length; i++) {
                        if (value.creator[i].toUpperCase().includes(search.toUpperCase())) {
                            return true;
                        }
                    }
                } else if (searchOption == "title" && typeof value.title !== 'undefined' && value.title != null) {
                    if (value.title.toUpperCase().includes(search.toUpperCase())) {
                        return true;
                    }
                } else if (searchOption == "idNumber" && typeof value.id !== 'undefined' && value.id != null) {
                    if (value.id.toUpperCase().includes(search.toUpperCase())) {
                        return true;
                    }
                } else if (searchOption == "subjectTerm" && typeof value.subjectTerm !== 'undefined' && value.subjectTerm != null) {
                    if (value.subjectTerm.toUpperCase().includes(search.toUpperCase())) {
                        return true;
                    }
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
                this.filterTitle = true;
                this.search = "";
            }
        },
        applyDateFilter(date, dateSearch, update) {
            this.search = "";
            var dateNumber = parseInt(date);
            function filterCompare(value) {
                if (dateSearch == "On") {
                    var number = value.date.match(/(\d+)/);
                    if (number != null && dateNumber == number[0]) {
                        return true;
                    }
                } else if (dateSearch == "Before") {
                    var number = value.date.match(/(\d+)/);
                    if (number != null && dateNumber > number[0]) {
                        return true;
                    }
                } else if (dateSearch == "After") {
                    var number = value.date.match(/(\d+)/);
                    if (number != null && dateNumber < number[0]) {
                        return true;
                    }
                }
                return false;
            }
            this.dateFilteredObjects = this.filteredObjects.filter(filterCompare);

            if (update) {
                if (date == "") {
                    this.dateFilteredObjects = this.filteredObjects;
                }

                this.pageNum = 0;
                this.pageOptionOne = 1;
                this.pageOptionTwo = 2;
                this.pageOptionThree = 3;
                this.pageOptionOneColor = "rgb(184, 194, 207)";
                this.pageOptionTwoColor = "rgb(108, 136, 174)";

                this.displayedObjects = [];
                for (var i = this.pageNum * 12; (i < this.dateFilteredObjects.length) && (i < (this.pageNum * 12) + 12); i++) {
                    this.displayedObjects.push(this.dateFilteredObjects[i]);
                }
            }
        },
        confirmDateFilter(date, dateSearch, update) {
            if (date == "") {
                return;
            }
            this.filteredObjects = this.dateFilteredObjects;

            if (update) {
                this.filters.push({
                    type: dateSearch,
                    value: date,
                    bgColor: "rgb(255, 110, 194)",
                    bdColor: "rgb(171, 38, 115)"
                });
                this.filterTitle = true;
                this.date = "";
            }
        },
        backPage() {
            var objects;
            if (this.search == "") {
                objects = this.filteredObjects;
            } else {
                objects = this.textFilteredObjects;
            }

            if (this.date == "") {
                objects = this.filteredObjects;
            } else {
                objects = this.dateFilteredObjects;
            }

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
            for (var i = this.pageNum * 12; (i < objects.length) && (i < (this.pageNum * 12) + 12); i++) {
                this.displayedObjects.push(objects[i]);
            }
        }, 
        forwardPage() {
            var objects;
            if (this.search == "") {
                objects = this.filteredObjects;
            } else {
                objects = this.textFilteredObjects;
            }

            if (this.date == "") {
                objects = this.filteredObjects;
            } else {
                objects = this.dateFilteredObjects;
            }

            if (((this.pageNum + 1) * 12) >= (objects.length)) {
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
            for (var i = this.pageNum * 12; (i < objects.length) && (i < (this.pageNum * 12) + 12); i++) {
                this.displayedObjects.push(objects[i]);
            }
        },
        specificPage(newPageNum) {
            var objects;
            if (this.search == "") {
                objects = this.filteredObjects;
            } else {
                objects = this.textFilteredObjects;
            }

            if (this.date == "") {
                objects = this.filteredObjects;
            } else {
                objects = this.dateFilteredObjects;
            }

            if (((newPageNum - 1) * 12) >= (objects.length)) {
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
            for (var i = this.pageNum * 12; (i < objects.length) && (i < (this.pageNum * 12) + 12); i++) {
                this.displayedObjects.push(objects[i]);
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
                } else if (this.filters[i].type == "On") {
                    this.applyDateFilter(this.filters[i].value, "On", false);
                    this.confirmDateFilter(this.filters[i].value, "On", false);
                } else if (this.filters[i].type == "Before") {
                    this.applyDateFilter(this.filters[i].value, "Before", false);
                    this.confirmDateFilter(this.filters[i].value, "Before", false);
                } else if (this.filters[i].type == "After") {
                    this.applyDateFilter(this.filters[i].value, "After", false);
                    this.confirmDateFilter(this.filters[i].value, "After", false);
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

            if (this.filters.length == 0) {
                this.filterTitle = false;
            }
        },
        loadBrowse(responseText) {
            var response = JSON.parse(responseText);
            for(var i = 0; i < response.results.length; i++) {
                if (response.results[i]["idno"] == null || !response.results[i]["idno"].includes("data")) {
                    var image = response.results[i]["ca_object_representations.media.medium"];
                    if (image == null || image == "") {
                        image = "/custom/no_image.png";
                    }
                    this.allObjects.push({
                        "card": objectCard,
                        "id": response.results[i]["idno"],
                        "title": response.results[i]["display_label"], 
                        "image": image, 
                        "creator": response.results[i]["ca_entities.preferred_labels.displayname"],
                        "date": response.results[i]["ca_objects.displayCreationDate"],
                        "medium": response.results[i]["ca_objects.displayMaterialsTech"],
                        "nationality": response.results[i]["ca_entities.nationalityCreator"],
                        "style": response.results[i]["ca_objects.style"],
                        "subjectTerm": response.results[i]["ca_objects.subjectTerm"],
                        "refid": response.results[i].id
                    });
                }
            }

            this.displayedObjects = [];
            for (var i = this.pageNum * 12; (i < this.allObjects.length) && (i < (this.pageNum * 12) + 12); i++) {
                this.displayedObjects.push(this.allObjects[i]);
            }

            this.filteredObjects = this.allObjects;
        }
    },



    mounted: async function() {
        var _this = this;
        var data = JSON.stringify(
            {
                "criteria": {
                    "type_facet": [23]
                },
                "bundles": {
                    "ca_objects.displayCreationDate":true,
                    "ca_objects.displayMaterialsTech":true,
                    "ca_objects.style":true,
                    "ca_objects.subjectTerm":true,
                    "ca_object_representations.media.medium":{"returnURL":true},
                    "ca_entities.preferred_labels.displayname":{"returnAsArray":true},
                    "ca_entities.nationalityCreator":{"returnAsArray":true}
                }
            }
        );

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/browse/ca_objects?q=*&source=" + data, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);
        xhr.onload = function() {
            _this.loadBrowse(this.responseText);
        }
    }
});

app.mount("#ca-browse-app");