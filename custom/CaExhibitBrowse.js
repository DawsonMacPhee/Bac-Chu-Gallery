var response = {
    "ok": true,
    "results": [
        {
            "collection_id": "2",
            "id": "2",
            "idno": "data_1",
            "display_label": "WEBSITE_HOME",
            "ca_collections.description": ";",
            "ca_collections.status": "4",
            "ca_collections.nonpreferred_labels": {}
        },
        {
            "collection_id": "3",
            "id": "3",
            "idno": "exhibition_1",
            "display_label": "Käthe Kollwitz: Her Life and Art",
            "ca_collections.description": "The art of Käthe Kollwitz (1867–1945) reveals a lifetime of self-examination. Over a career spanning more than five decades, Kollwitz developed powerful and emotional imagery based on her own experiences, her interactions with working-class women in...;",
            "ca_collections.status": "4",
            "ca_collections.nonpreferred_labels": [
                "2021",
                "Carolyn Hickey (MA.AHVC)"
            ]
        },
        {
            "collection_id": "4",
            "id": "4",
            "idno": "exhibition_2",
            "display_label": "Niagara: A Space of Wonder",
            "ca_collections.description": "The image of Niagara Falls, which serves as our cover art and has inspired many aspects of this exhibition—from the notion of encountering a scene of wonder, and the cascading and reflective surfaces of waterfalls (and their metaphoric potential), to...;",
            "ca_collections.status": "4",
            "ca_collections.nonpreferred_labels": [
                "2018",
                "Christina Smylitopoulos"
            ]
        },
        {
            "collection_id": "5",
            "id": "5",
            "idno": "exhibition_3",
            "display_label": "New Acquisitions Exhibition",
            "ca_collections.description": "New acquisitions of the Bachinski/Chu Print Study Collection, from her Exploring Eden series, these works are part of the artist’s exploration of science’s attempt to “change the genetic heritage of the natural world.” This display honours the artist...;",
            "ca_collections.status": "0",
            "ca_collections.nonpreferred_labels": [
                "2021",
                "New Acquisitions"
            ]
        },
        {
            "collection_id": "6",
            "id": "6",
            "idno": "exhibition_4",
            "display_label": "Engaging with 19th-Century Etching - Francisco Goya",
            "ca_collections.description": "This is one of a series of eighteen prints that comprised the last major suite Goya etched and known by the titles Los Proverbios (The Proverbs) and Los Disparates (The Follies). The Spanish painter and printmaker combined etching and engraving with...;",
            "ca_collections.status": "4",
            "ca_collections.nonpreferred_labels": [
                "2018",
                "Christina Smylitopoulos"
            ]
        },
        {
            "collection_id": "7",
            "id": "7",
            "idno": "exhibition_5",
            "display_label": "Viewing the Past: Giambattista's Vedute",
            "ca_collections.description": "The Venetian-born engraver and architect Giambattista Piranesi was dissatisfied with the production of prints after the classical monuments of Rome intended for antiquarians, who in this period were being lampooned for being overly interested in the...;",
            "ca_collections.status": "4",
            "ca_collections.nonpreferred_labels": [
                "2018",
                "Christina Smylitopoulos"
            ]
        },
        {
            "collection_id": "8",
            "id": "8",
            "idno": "exhibition_6",
            "display_label": "Like Wretched Fruit: Callot's Reaction to the Thirty Years War",
            "ca_collections.description": "Finally these infamous and abandoned thieves, hanging from this tree like wretched fruit, show that crime (horrible and black species) is itself the instrument of shame and vengeance, and that it is the fate of corrupt men to experience the justice of...;",
            "ca_collections.status": "4",
            "ca_collections.nonpreferred_labels": [
                "2018",
                "Christina Smylitopoulos"
            ]
        },
        {
            "collection_id": "9",
            "id": "9",
            "idno": "exhibition_7",
            "display_label": "Bury Them Deep: Goya, The Line, Violence and the Disasters of War",
            "ca_collections.description": "Artists such as Rembrandt (1606– 1669) and Claude Lorrain (1600–1682) used the medium of engraving as a preparatory method and as an exercise, experimenting with formal qualities and honing their skills, which they applied to the practice of painting...;",
            "ca_collections.status": "4",
            "ca_collections.nonpreferred_labels": [
                "2018",
                "Christina Smylitopoulos"
            ]
        },
        {
            "collection_id": "10",
            "id": "10",
            "idno": "exhibition_8",
            "display_label": "Interplay",
            "ca_collections.description": "Drawn from the Bachinski/Chu Print Study Collection, these works emphasize crucial links between humankind, technology, and empathy. The School of Fine Art and Music is keen to complicate traditional thinking around communication and the “interplay,”...;",
            "ca_collections.status": "0",
            "ca_collections.nonpreferred_labels": [
                "2021",
                "Emily Reimer (Studio Art) and Tristan Parfect (Art History)"
            ]
        }
    ]
}

const exCard = {
    template:
    /*html*/
    `
    <div class="ca-card-container">
        <div class="ca-card">
            <div class="ca-img-container">
                <img class="ca-img" src="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"/>
            </div>
            <div class="ca-info">
                <span class="ca-card-title"><em>{{ extitle }}</em></span>
                <span class="ca-card-date">{{ exdate }}</span>
                <span class="ca-card-curator">{{ excurator }}</span>
                <span>{{ exintro }}</span>
            </div>
        </div>
    </div>
    `,



    props: {
        extitle: {
            type: String,
            required: true
        },
        exdate: {
            type: String,
            required: true
        },
        excurator: {
            type: String,
            required: true
        },
        exintro: {
            type: String,
            required: true
        },
        refid: {
            type: String,
            required: true
        }
    }
}

const app = Vue.createApp({
    data() {
        return {
            currentEx: [],
            pastEx: []
        }
    },



    methods: {
        loadBrowse(responseText) {
            //var response = JSON.parse(responseText);
            for(var i = 0; i < response.results.length; i++) {
                if (response.results[i]["idno"].includes("exhibition")) {
                    if (response.results[i]["ca_collections.status"] == "0") {
                        this.currentEx.push({
                            "card": exCard,
                            "title": response.results[i]["display_label"],
                            "desc": response.results[i]["ca_collections.description"].substring(0, response.results[i]["ca_collections.description"].length - 1),
                            "curator": response.results[i]["ca_collections.nonpreferred_labels"][1],
                            "date": response.results[i]["ca_collections.nonpreferred_labels"][0],
                            "refid": response.results[i].id
                        });
                    } else if (response.results[i]["ca_collections.status"] == "4") {
                        this.pastEx.push({
                            "card": exCard,
                            "title": response.results[i]["display_label"],
                            "desc": response.results[i]["ca_collections.description"].substring(0, response.results[i]["ca_collections.description"].length - 1),
                            "curator": response.results[i]["ca_collections.nonpreferred_labels"][1],
                            "date": response.results[i]["ca_collections.nonpreferred_labels"][0],
                            "refid": response.results[i].id
                        });
                    }
                }
            }

            console.log(this.currentEx);
            console.log(this.pastEx);
        }
    },



    mounted: async function() {
        /*var _this = this;
        var data = JSON.stringify(
            {
                "criteria": {
                    "type_facet": [114]
                },
                "bundles": {
                    "ca_collections.description":true,
                    "ca_collections.status":{"returnAsText":true},
                    "ca_collections.nonpreferred_labels":{"returnAsArray":true}
                }
            }
        );

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/browse/ca_collections?q=*&source=" + data, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(null);
        xhr.onload = function() {
            _this.loadBrowse(this.responseText);
        }*/

        this.loadBrowse("TEST");
    }
});

app.mount("#ca-exhibit-browse-app");