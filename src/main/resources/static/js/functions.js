var numLabel = 1;
var labels = [];

function addRow() {
    var uuid = genUUID();
    $(".drag-container").append("<div class='drag-box w-100' id='" + uuid + "'>Label " + numLabel++ + "</div>");
    labels[uuid] = getJSON();
    updateDragonfly();
}

function generateOutput(classes, filters, skills) {
    var output = "";
    output += getHeader();
    output += getClasses(classes);
    output += getFilters(filters);
    // output += getSkills(skills);
    return output;
}

function getHeader() {
    var header = "-- Persistent Data\r\nlocal multiRefObjects = {\r\n\r\n} -- multiRefObjects\r\n";
    header += "local obj1 = {\r\n";

    return header;
}

function getClasses(classes) {
    var output = "\t[\"classes\"] = {\r\n";
    classes = classes.split("&");
    var map = [];

    for(var i = 0; i < 36; i++) {
        map[i] = false;
    }

    for(var j = 0; j < classes.length; j++) {
        var key = classes[j].replace("=on", "");
        map[key - 1] = true;
    }

    for(var k = 0; k < map.length; k++) {
        output += "\t\t[" + (k + 1) + "] = " + map[k] + ";\r\n";
    }

    output += "\t};\r\n";

    return output;
}

function getFilters(filters) {
    var output = "\t[\"filters\"] = {\r\n";
    filters = filters.split("&");

    for(var i = 0; i < filters.length; i++) {
        var val = decodeURIComponent(filters[i].substring(filters[i].indexOf("=") + 1));
        output += "\t\t[" + (i + 1) + "] = \"" + val + "\";\r\n";
    }

    output += "\t};\r\n";

    return output;
}

function getSkills(skills) {
    var output = "\t[\"skills\"] = {\r\n";
    skills = skills.split("&");
}

function genUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}