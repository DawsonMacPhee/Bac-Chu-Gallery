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



    mounted: async function() {
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