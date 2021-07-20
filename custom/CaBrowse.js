const objectCard = {
    template:
    /*html*/
    `
    <div class="objectCard">
        <img class="objectCard-image" :src="objectimage">
        <h5> {{ objectname }} </h5>
        <h6> {{ objectcreator }} </h6>
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
            type: String,
            required: true
        }
    }
}

const app = Vue.createApp({
    data() {
        return {
            search: "",
            searchOption: 0,
            style: "",
            nationality: "",
            medium: "",
            objects: [{"card": objectCard, "name": "Test Object", "image": "https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png", "creator": "Dawson MacPhee"}, {"card": objectCard, "name": "Test Object", "image": "https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png", "creator": "Dawson MacPhee"}, {"card": objectCard, "name": "Test Object", "image": "https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png", "creator": "Dawson MacPhee"}, {"card": objectCard, "name": "Test Object", "image": "https://cdn.pixabay.com/photo/2014/06/03/19/38/road-sign-361514_960_720.png", "creator": "Dawson MacPhee"}]
        }
    },


    mounted: async function() {

    }
});

app.mount("#ca-browse-app");

/*var xhr = new XMLHttpRequest();
xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/auth/login", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(null);
xhr.onload = function(e) {
    console.log(this.responseText);
}

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/browse/ca_objects", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.stringify({
    "criteria": {
        "type_facet": [23]
    },
    "bundles": {
        "ca_object_representations.media.original" : { "returnURL" : true },
        "ca_entities.related.preferred_labels.displayname" : true
    }
}));
xhr.onload = function(e) {
    console.log(this.responseText);

    var response = JSON.parse(this.responseText);
    var table = "";
    response["results"].forEach(function(obj) {
        table += "<tr><td>" + obj["display_label"] + "</td></tr>";
    });

    $("#ca-browse-box").html(table);
}*/