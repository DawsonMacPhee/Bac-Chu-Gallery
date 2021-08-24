window.addEventListener('load', function(e) {
    var pos1 = document.getElementsByClassName("carousel")[0].getBoundingClientRect();
    var pos2 = document.getElementsByClassName("carousel")[1].getBoundingClientRect();

    document.getElementsByClassName("leftArrow")[0].style.top = (pos1.top + window.scrollY + 210) + "px";
    document.getElementsByClassName("rightArrow")[0].style.top = (pos1.top + window.scrollY + 210) + "px";

    document.getElementsByClassName("leftArrow")[1].style.top = (pos2.top + window.scrollY + 290) + "px";
    document.getElementsByClassName("rightArrow")[1].style.top = (pos2.top + window.scrollY + 290) + "px";
    document.getElementsByClassName("leftArrow")[1].style.left = (pos2.left + window.scrollX + 30) + "px";
    document.getElementsByClassName("rightArrow")[1].style.right = (pos2.right + window.scrollX - pos2.width + 30) + "px";
});

window.addEventListener('resize', function(e) {
    var pos1 = document.getElementsByClassName("carousel")[0].getBoundingClientRect();
    var pos2 = document.getElementsByClassName("carousel")[1].getBoundingClientRect();

    document.getElementsByClassName("leftArrow")[0].style.top = (pos1.top + window.scrollY + 210) + "px";
    document.getElementsByClassName("rightArrow")[0].style.top = (pos1.top + window.scrollY + 210) + "px";

    document.getElementsByClassName("leftArrow")[1].style.top = (pos2.top + window.scrollY + 290) + "px";
    document.getElementsByClassName("rightArrow")[1].style.top = (pos2.top + window.scrollY + 290) + "px";
    document.getElementsByClassName("leftArrow")[1].style.left = (pos2.left + window.scrollX + 30) + "px";
    document.getElementsByClassName("rightArrow")[1].style.right = (pos2.right + window.scrollX - pos2.width + 30) + "px";
});

const app = Vue.createApp({
    data() {
        return {
            refid: 10,
            exhibit_idno: "",
            carosel_1_page: 0,
            carosel_1_images: ["images/ModernPandemicDisplay1.jpeg", "images/ReynoldsBuilding2.jpeg", "images/ReynoldsBuilding1.jpeg"],
            carosel_2_page: 0,
            carosel_2_images: ["images/ModernPandemicDisplay1.jpeg", "images/ReynoldsBuilding2.jpeg", "images/ReynoldsBuilding1.jpeg"],
            title: "",
            date: "",
            introduction: "",
            subtitle: "",
            writeUp: ""
        }
    },



    computed: {
        carousel_1() {
            return this.carosel_1_images[this.carosel_1_page] + "#" + new Date().getTime();
        },
        carousel_2() {
            return {"img":this.carosel_2_images[this.carosel_2_page] + "#" + new Date().getTime()};
        },
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
                        "ca_objects.dimensionsPrint":true,
                        "ca_objects.displayMaterialsTech": true,
                        "ca_objects.inscriptions":true,
                        "ca_object_representations.media.large":{"returnURL": true},
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
            for(var i = 0; i < response.results.length; i++) {
                if (response.results[i].idno == "data." + this.exhibit_idno) {
                    this.subtitle = response.results[i].display_label;
                    this.writeUp = response.results[i]["ca_objects.inscriptions"];
                }
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
            if ((this.carosel_1_page + 1) > (this.carosel_1_images.length - 1)) {
                this.carosel_1_page = 0;
            } else {
                this.carosel_1_page += 1;
            }

            if ((this.carosel_2_page + 1) > (this.carosel_2_images.length - 1)) {
                this.carosel_2_page = 0;
            } else {
                this.carosel_2_page += 1;
            }
        }, 8000);
    }
});

app.mount("#ca-exhibit-app");