var xhr = new XMLHttpRequest();
xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/browse/ca_objects", true);
xhr.send({
    "criteria": {
        "type_facet": [23]
    },
    "bundles": {
        "ca_object_representations.media.original" : { "returnURL" : true },
        "ca_entities.related.preferred_labels.displayname" : true
    }
});
xhr.onload = function(e) {
    var response = JSON.parse(this.responseText);
    var table = "";
    response["results"].forEach(function(obj) {
        table += "<tr><td>" + obj["display_label"] + "</td></tr>";
    });

    $("#ca-browse-box").html(table);
}