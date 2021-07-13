var xhr = new XMLHttpRequest();
xhr.open("GET", "https://public:public@bachinski-chu.uoguelph.ca/admin/service.php/auth/login", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(null);
xhr.onload = function(e) {
    console.log(this.responseText);
}

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://bachinski-chu.uoguelph.ca/admin/service.php/browse/ca_objects?authToken=24df46fdc42916e3da3dbdba494c7958d0f3d8cbf24248d72d9ef74fe15fdb3d", true);
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
}