var fields = [];
var filters = getFiltersJSON();
var classes = getClassesJSON();

function addRow() {
    var uuid = genUUID();
    $(".label-container").append("<li class='labels w-100' id='" + uuid + "' onclick='setUUID(this)'>New Label</li>");
    $("#uuid").val(uuid);
    $("ul.label-container").sortable();

    fields[uuid] = getJSON();
    setUUID($("#" + uuid));
    loadFields();
    saveFields();
}

function setUUID(li) {
    var uuid = $(li).attr("id");
    $("#uuid").val(uuid);

    $("li.labels").each(function() {
       $(this).removeClass("active");
    });

    $("#" + uuid).addClass("active");

    loadFields();
}

function saveFields() {
    var uuid = $("#uuid").val();
    var fieldsJSON = $.parseJSON(fields[uuid]);
    var filtersJSON = $.parseJSON(filters);
    var classesJSON = $.parseJSON(classes);

    if($("#fld-alias").val() === "") {
        $("fld-alias").val("Can not be empty.");
    }

    $("input.fields").each(function () {
       if($(this).attr("id").indexOf("fld-") >= 0) {
           var fieldId = $(this).attr("id");
           var field = fieldId.substring(4);
           var value;

           if($(this).is(":checkbox") && $(this).is(":checked")) {
               value = $("#" + fieldId).attr("data-value");
           } else {
               value = $("#" + fieldId).val();
           }

           fieldsJSON[field] = value;
       }
    });

    $("input.filters").each(function () {
        if($(this).attr("id").indexOf("fld-") >= 0) {
            var fieldId = $(this).attr("id");
            var field = fieldId.substring(4);
            var value;

            value = $("#" + fieldId).val();

            filtersJSON[field] = value;
        }
    });

    $("input.classes").each(function () {
        if($(this).attr("id").indexOf("fld-") >= 0) {
            var fieldId = $(this).attr("id");
            var field = fieldId.substring(4);
            var value;

            if($(this).is(":checkbox") && $(this).is(":checked")) {
                value = $("#" + fieldId).attr("data-value");
            } else {
                value = $("#" + fieldId).val();
            }

            classesJSON[field] = value;
        }
    });

    fields[uuid] = JSON.stringify(fieldsJSON);
    filters = JSON.stringify(filtersJSON);
    classes = JSON.stringify(classesJSON);

    $("#success-alert").fadeIn(250);
    setTimeout(function() {
        $("#success-alert").fadeOut(250);
    }, 1200);

    loadFields();
}

function loadFields() {
    var uuid = $("#uuid").val();
    var fieldsJSON = $.parseJSON(fields[uuid]);
    var filtersJSON = $.parseJSON(filters);
    var classesJSON = $.parseJSON(classes);

    if(fieldsJSON.alias === "") {
        fieldsJSON.alias = $("#" + uuid).text();
    }

    $("#" + uuid).html(fieldsJSON.alias);

    $.each(fieldsJSON, function(index, element) {
       $("#fld-" + index).val(element);
    });

    $.each(filtersJSON, function(index, element) {
        $("#fld-" + index).val(element);
    });

    $.each(classesJSON, function(index, element) {
        $("#fld-" + index).val(element);
    });
}


function generateOutput() {
    var output = "";
    output += getHeader();
    /*output += getClasses();
    output += getFilters();*/
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

function getFiltersJSON() {
    return "{\n" +
        "  \"filterone\": \"\",\n" +
        "  \"filtertwo\": \"\",\n" +
        "  \"filterthree\": \"\",\n" +
        "  \"filterfour\": \"\",\n" +
        "  \"filterfive\": \"\"\n" +
        "}";
}

function getClassesJSON() {
    return "{\n" +
        "  \"19\": \"\",\n" +
        "  \"20\": \"\",\n" +
        "  \"21\": \"\",\n" +
        "  \"22\": \"\",\n" +
        "  \"23\": \"\",\n" +
        "  \"24\": \"\",\n" +
        "  \"25\": \"\",\n" +
        "  \"26\": \"\",\n" +
        "  \"27\": \"\",\n" +
        "  \"28\": \"\",\n" +
        "  \"29\": \"\",\n" +
        "  \"30\": \"\",\n" +
        "  \"31\": \"\",\n" +
        "  \"32\": \"\",\n" +
        "  \"33\": \"\",\n" +
        "  \"34\": \"\",\n" +
        "  \"35\": \"\",\n" +
        "  \"36\": \"\"\n" +
        "}";
}

function getJSON() {
    return "{\n" +
        "  \"alias\": \"\",\n" +
        "  \"chainend\": \"\",\n" +
        "  \"chainname\": \"\",\n" +
        "  \"chainstart\": \"\",\n" +
        "  \"charge\": \"\",\n" +
        "  \"collraritygt\": \"\",\n" +
        "  \"collraritylt\": \"\",\n" +
        "  \"collrarityltpct\": \"\",\n" +
        "  \"collweareq\": \"\",\n" +
        "  \"collweargt\": \"\",\n" +
        "  \"collwearlt\": \"\",\n" +
        "  \"collwearltpct\": \"\",\n" +
        "  \"combat\": \"\",\n" +
        "  \"comboskill\": \"\",\n" +
        "  \"condition\": \"\",\n" +
        "  \"consecutiveuseonly\": \"\",\n" +
        "  \"controlmax\": \"\",\n" +
        "  \"controlmin\": \"\",\n" +
        "  \"cpbuff\": \"\",\n" +
        "  \"cpmax\": \"\",\n" +
        "  \"cpmin\": \"\",\n" +
        "  \"cpnbuff\": \"\",\n" +
        "  \"craftmax\": \"\",\n" +
        "  \"craftmin\": \"\",\n" +
        "  \"czonestackmin\": \"\",\n" +
        "  \"dobuff\": \"\",\n" +
        "  \"doprev\": \"\",\n" +
        "  \"durabmax\": \"\",\n" +
        "  \"durabmin\": \"\",\n" +
        "  \"enmityaoe\": \"\",\n" +
        "  \"filterfive\": \"\",\n" +
        "  \"filterfour\": \"\",\n" +
        "  \"filterone\": \"\",\n" +
        "  \"filterthree\": \"\",\n" +
        "  \"filtertwo\": \"\",\n" +
        "  \"frontalconeaoe\": \"\",\n" +
        "  \"gatheraddsbuff\": \"\",\n" +
        "  \"gatheraddsmark\": \"\",\n" +
        "  \"gatherattempts\": \"\",\n" +
        "  \"gatherattemptsmax\": \"\",\n" +
        "  \"gathermax\": \"\",\n" +
        "  \"gatherrequiresmark\": \"\",\n" +
        "  \"gauge1eq\": \"\",\n" +
        "  \"gauge1gt\": \"\",\n" +
        "  \"gauge1lt\": \"\",\n" +
        "  \"gauge1or\": \"\",\n" +
        "  \"gauge2eq\": \"\",\n" +
        "  \"gauge2gt\": \"\",\n" +
        "  \"gauge2lt\": \"\",\n" +
        "  \"gauge2or\": \"\",\n" +
        "  \"gauge3eq\": \"\",\n" +
        "  \"gauge3gt\": \"\",\n" +
        "  \"gauge3lt\": \"\",\n" +
        "  \"gauge3or\": \"\",\n" +
        "  \"gauge4eq\": \"\",\n" +
        "  \"gauge4gt\": \"\",\n" +
        "  \"gauge4lt\": \"\",\n" +
        "  \"gauge4or\": \"\",\n" +
        "  \"gcd\": \"\",\n" +
        "  \"gcdtime\": \"\",\n" +
        "  \"gcdtimelt\": \"\",\n" +
        "  \"gpbuff\": \"\",\n" +
        "  \"gpmax\": \"\",\n" +
        "  \"gpmin\": \"\",\n" +
        "  \"gpnbuff\": \"\",\n" +
        "  \"gpstart\": \"\",\n" +
        "  \"gsecspassed\": \"\",\n" +
        "  \"gsstackmin\": \"\",\n" +
        "  \"hasitem\": \"\",\n" +
        "  \"hprio1\": \"\",\n" +
        "  \"hprio2\": \"\",\n" +
        "  \"hprio3\": \"\",\n" +
        "  \"hprio4\": \"\",\n" +
        "  \"hpriohp\": \"\",\n" +
        "  \"htsucceed\": \"\",\n" +
        "  \"ignoremoving\": \"\",\n" +
        "  \"ingen2stackmin\": \"\",\n" +
        "  \"ingenstackmin\": \"\",\n" +
        "  \"innostackmin\": \"\",\n" +
        "  \"iqstack\": \"\",\n" +
        "  \"iqstackmax\": \"\",\n" +
        "  \"isconcealed\": \"\",\n" +
        "  \"isephemeral\": \"\",\n" +
        "  \"isitem\": \"\",\n" +
        "  \"islegendary\": \"\",\n" +
        "  \"isunspoiled\": \"\",\n" +
        "  \"itemchancemax\": \"\",\n" +
        "  \"itemhqchancemin\": \"\",\n" +
        "  \"lastcast\": \"\",\n" +
        "  \"lastcastunique\": \"\",\n" +
        "  \"levelmax\": \"\",\n" +
        "  \"levelmin\": \"\",\n" +
        "  \"m10actioncomplete\": \"\",\n" +
        "  \"m10actionid\": \"\",\n" +
        "  \"m10actionmsg\": \"\",\n" +
        "  \"m10actiontarget\": \"\",\n" +
        "  \"m10actiontype\": \"\",\n" +
        "  \"m10actionwait\": \"\",\n" +
        "  \"m11actioncomplete\": \"\",\n" +
        "  \"m11actionid\": \"\",\n" +
        "  \"m11actionmsg\": \"\",\n" +
        "  \"m11actiontarget\": \"\",\n" +
        "  \"m11actiontype\": \"\",\n" +
        "  \"m11actionwait\": \"\",\n" +
        "  \"m12actioncomplete\": \"\",\n" +
        "  \"m12actionid\": \"\",\n" +
        "  \"m12actionmsg\": \"\",\n" +
        "  \"m12actiontarget\": \"\",\n" +
        "  \"m12actiontype\": \"\",\n" +
        "  \"m12actionwait\": \"\",\n" +
        "  \"m13actioncomplete\": \"\",\n" +
        "  \"m13actionid\": \"\",\n" +
        "  \"m13actionmsg\": \"\",\n" +
        "  \"m13actiontarget\": \"\",\n" +
        "  \"m13actiontype\": \"\",\n" +
        "  \"m13actionwait\": \"\",\n" +
        "  \"m14actioncomplete\": \"\",\n" +
        "  \"m14actionid\": \"\",\n" +
        "  \"m14actionmsg\": \"\",\n" +
        "  \"m14actiontarget\": \"\",\n" +
        "  \"m14actiontype\": \"\",\n" +
        "  \"m14actionwait\": \"\",\n" +
        "  \"m15actioncomplete\": \"\",\n" +
        "  \"m15actionid\": \"\",\n" +
        "  \"m15actionmsg\": \"\",\n" +
        "  \"m15actiontarget\": \"\",\n" +
        "  \"m15actiontype\": \"\",\n" +
        "  \"m15actionwait\": \"\",\n" +
        "  \"m16actioncomplete\": \"\",\n" +
        "  \"m16actionid\": \"\",\n" +
        "  \"m16actionmsg\": \"\",\n" +
        "  \"m16actiontarget\": \"\",\n" +
        "  \"m16actiontype\": \"\",\n" +
        "  \"m16actionwait\": \"\",\n" +
        "  \"m17actioncomplete\": \"\",\n" +
        "  \"m17actionid\": \"\",\n" +
        "  \"m17actionmsg\": \"\",\n" +
        "  \"m17actiontarget\": \"\",\n" +
        "  \"m17actiontype\": \"\",\n" +
        "  \"m17actionwait\": \"\",\n" +
        "  \"m18actioncomplete\": \"\",\n" +
        "  \"m18actionid\": \"\",\n" +
        "  \"m18actionmsg\": \"\",\n" +
        "  \"m18actiontarget\": \"\",\n" +
        "  \"m18actiontype\": \"\",\n" +
        "  \"m18actionwait\": \"\",\n" +
        "  \"m19actioncomplete\": \"\",\n" +
        "  \"m19actionid\": \"\",\n" +
        "  \"m19actionmsg\": \"\",\n" +
        "  \"m19actiontarget\": \"\",\n" +
        "  \"m19actiontype\": \"\",\n" +
        "  \"m19actionwait\": \"\",\n" +
        "  \"m1actioncomplete\": \"\",\n" +
        "  \"m1actionid\": \"\",\n" +
        "  \"m1actionmsg\": \"\",\n" +
        "  \"m1actiontarget\": \"\",\n" +
        "  \"m1actiontype\": \"\",\n" +
        "  \"m1actionwait\": \"\",\n" +
        "  \"m20actioncomplete\": \"\",\n" +
        "  \"m20actionid\": \"\",\n" +
        "  \"m20actionmsg\": \"\",\n" +
        "  \"m20actiontarget\": \"\",\n" +
        "  \"m20actiontype\": \"\",\n" +
        "  \"m20actionwait\": \"\",\n" +
        "  \"m2actioncomplete\": \"\",\n" +
        "  \"m2actionid\": \"\",\n" +
        "  \"m2actionmsg\": \"\",\n" +
        "  \"m2actiontarget\": \"\",\n" +
        "  \"m2actiontype\": \"\",\n" +
        "  \"m2actionwait\": \"\",\n" +
        "  \"m3actioncomplete\": \"\",\n" +
        "  \"m3actionid\": \"\",\n" +
        "  \"m3actionmsg\": \"\",\n" +
        "  \"m3actiontarget\": \"\",\n" +
        "  \"m3actiontype\": \"\",\n" +
        "  \"m3actionwait\": \"\",\n" +
        "  \"m4actioncomplete\": \"\",\n" +
        "  \"m4actionid\": \"\",\n" +
        "  \"m4actionmsg\": \"\",\n" +
        "  \"m4actiontarget\": \"\",\n" +
        "  \"m4actiontype\": \"\",\n" +
        "  \"m4actionwait\": \"\",\n" +
        "  \"m5actioncomplete\": \"\",\n" +
        "  \"m5actionid\": \"\",\n" +
        "  \"m5actionmsg\": \"\",\n" +
        "  \"m5actiontarget\": \"\",\n" +
        "  \"m5actiontype\": \"\",\n" +
        "  \"m5actionwait\": \"\",\n" +
        "  \"m6actioncomplete\": \"\",\n" +
        "  \"m6actionid\": \"\",\n" +
        "  \"m6actionmsg\": \"\",\n" +
        "  \"m6actiontarget\": \"\",\n" +
        "  \"m6actiontype\": \"\",\n" +
        "  \"m6actionwait\": \"\",\n" +
        "  \"m7actioncomplete\": \"\",\n" +
        "  \"m7actionid\": \"\",\n" +
        "  \"m7actionmsg\": \"\",\n" +
        "  \"m7actiontarget\": \"\",\n" +
        "  \"m7actiontype\": \"\",\n" +
        "  \"m7actionwait\": \"\",\n" +
        "  \"m8actioncomplete\": \"\",\n" +
        "  \"m8actionid\": \"\",\n" +
        "  \"m8actionmsg\": \"\",\n" +
        "  \"m8actiontarget\": \"\",\n" +
        "  \"m8actiontype\": \"\",\n" +
        "  \"m8actionwait\": \"\",\n" +
        "  \"m9actioncomplete\": \"\",\n" +
        "  \"m9actionid\": \"\",\n" +
        "  \"m9actionmsg\": \"\",\n" +
        "  \"m9actiontarget\": \"\",\n" +
        "  \"m9actiontype\": \"\",\n" +
        "  \"m9actionwait\": \"\",\n" +
        "  \"makersstackmin\": \"\",\n" +
        "  \"manipmax\": \"\",\n" +
        "  \"manipstackmin\": \"\",\n" +
        "  \"maxRange\": \"\",\n" +
        "  \"maxdurabmax\": \"\",\n" +
        "  \"maxdurabmin\": \"\",\n" +
        "  \"maxgatherattempts\": \"\",\n" +
        "  \"maxgatherattemptsmin\": \"\",\n" +
        "  \"maxprogrmax\": \"\",\n" +
        "  \"maxprogrmin\": \"\",\n" +
        "  \"minRange\": \"\",\n" +
        "  \"name\": \"\",\n" +
        "  \"ncurrentaction\": \"\",\n" +
        "  \"npc\": \"\",\n" +
        "  \"npcskill\": \"\",\n" +
        "  \"npgskill\": \"\",\n" +
        "  \"npskill\": \"\",\n" +
        "  \"onlyparty\": \"\",\n" +
        "  \"onlysolo\": \"\",\n" +
        "  \"partysizelt\": \"\",\n" +
        "  \"pbuff\": \"\",\n" +
        "  \"pbuffdura\": \"\",\n" +
        "  \"pcskill\": \"\",\n" +
        "  \"petbuff\": \"\",\n" +
        "  \"petbuffdura\": \"\",\n" +
        "  \"petnbuff\": \"\",\n" +
        "  \"petnbuffdura\": \"\",\n" +
        "  \"pgskill\": \"\",\n" +
        "  \"pgtrg\": \"\",\n" +
        "  \"phpb\": \"\",\n" +
        "  \"phpl\": \"\",\n" +
        "  \"playerlevelmax\": \"\",\n" +
        "  \"playerlevelmin\": \"\",\n" +
        "  \"pmppb\": \"\",\n" +
        "  \"pmppl\": \"\",\n" +
        "  \"pmpprgt\": \"\",\n" +
        "  \"pmpprlt\": \"\",\n" +
        "  \"pmprgt\": \"\",\n" +
        "  \"pmprlt\": \"\",\n" +
        "  \"pmprsgt\": \"\",\n" +
        "  \"pmprslt\": \"\",\n" +
        "  \"pnbuff\": \"\",\n" +
        "  \"pnbuffdura\": \"\",\n" +
        "  \"ppos\": \"\",\n" +
        "  \"ppowb\": \"\",\n" +
        "  \"ppowl\": \"\",\n" +
        "  \"prio\": \"\",\n" +
        "  \"progrmax\": \"\",\n" +
        "  \"progrmin\": \"\",\n" +
        "  \"pskill\": \"\",\n" +
        "  \"pskillg\": \"\",\n" +
        "  \"ptbuff\": \"\",\n" +
        "  \"ptcount\": \"\",\n" +
        "  \"pthpb\": \"\",\n" +
        "  \"pthpl\": \"\",\n" +
        "  \"ptkbuff\": \"\",\n" +
        "  \"ptmpb\": \"\",\n" +
        "  \"ptmpl\": \"\",\n" +
        "  \"ptnbuff\": \"\",\n" +
        "  \"ptpb\": \"\",\n" +
        "  \"ptpl\": \"\",\n" +
        "  \"ptrg\": \"\",\n" +
        "  \"pttpb\": \"\",\n" +
        "  \"pttpl\": \"\",\n" +
        "  \"punderattack\": \"\",\n" +
        "  \"punderattackmelee\": \"\",\n" +
        "  \"pvepvp\": \"\",\n" +
        "  \"qualitymax\": \"\",\n" +
        "  \"qualitymaxper\": \"\",\n" +
        "  \"qualitymin\": \"\",\n" +
        "  \"qualityminper\": \"\",\n" +
        "  \"removebuff\": \"\",\n" +
        "  \"secspassed\": \"\",\n" +
        "  \"secspassedu\": \"\",\n" +
        "  \"sh12stackmin\": \"\",\n" +
        "  \"sh2stackmin\": \"\",\n" +
        "  \"shstackmin\": \"\",\n" +
        "  \"singleuse\": \"\",\n" +
        "  \"singleuseonly\": \"\",\n" +
        "  \"skncdtimemax\": \"\",\n" +
        "  \"skncdtimemin\": \"\",\n" +
        "  \"sknoffcd\": \"\",\n" +
        "  \"sknready\": \"\",\n" +
        "  \"skoffcd\": \"\",\n" +
        "  \"skready\": \"\",\n" +
        "  \"sktype\": \"\",\n" +
        "  \"stepmax\": \"\",\n" +
        "  \"stepmin\": \"\",\n" +
        "  \"stype\": \"\",\n" +
        "  \"tacount\": \"\",\n" +
        "  \"tahpl\": \"\",\n" +
        "  \"tankedonlyaoe\": \"\",\n" +
        "  \"tarange\": \"\",\n" +
        "  \"tbuff\": \"\",\n" +
        "  \"tbuffdura\": \"\",\n" +
        "  \"tbuffowner\": \"\",\n" +
        "  \"tcastids\": \"\",\n" +
        "  \"tcastonme\": \"\",\n" +
        "  \"tcasttime\": \"\",\n" +
        "  \"tcontids\": \"\",\n" +
        "  \"tecenter\": \"\",\n" +
        "  \"tecount\": \"\",\n" +
        "  \"tecount2\": \"\",\n" +
        "  \"tehpavggt\": \"\",\n" +
        "  \"televel\": \"\",\n" +
        "  \"terange\": \"\",\n" +
        "  \"thpadv\": \"\",\n" +
        "  \"thpb\": \"\",\n" +
        "  \"thpcb\": \"\",\n" +
        "  \"thpcl\": \"\",\n" +
        "  \"thpl\": \"\",\n" +
        "  \"tmpl\": \"\",\n" +
        "  \"tnbuff\": \"\",\n" +
        "  \"tnbuffdura\": \"\",\n" +
        "  \"tnbuffowner\": \"\",\n" +
        "  \"tncontids\": \"\",\n" +
        "  \"totmax\": \"\",\n" +
        "  \"totmin\": \"\",\n" +
        "  \"trg\": \"\",\n" +
        "  \"trgself\": \"\",\n" +
        "  \"trgtype\": \"\",\n" +
        "  \"ttpl\": \"\",\n" +
        "  \"type\": \"\",\n" +
        "  \"used\": \"\",\n" +
        "  \"whstack\": \"\",\n" +
        "  \"whstackmin\": \"\",\n" +
        "  \"wn2stackmin\": \"\",\n" +
        "  \"wnstackmin\": \"\"\n" +
        "}";
}