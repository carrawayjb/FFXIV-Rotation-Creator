<!DOCTYPE html>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="security" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>FFXIV Rotation Creator</title>
    <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico"/>
    <link rel="stylesheet" href="/webjars/bootstrap/4.1.3/css/bootstrap.css" />
    <link rel="stylesheet" href="/css/style.css" />

    <script src="/js/jquery-3.3.1.min.js"></script>
    <script src="/webjars/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="/js/jquery-sortable.js"></script>
    <script src="/js/functions.js"></script>

    <script>
        $(document).ready(function (){
            $("form :input").change(function() {
                saveFields();
            });

            $("input").on("keypress", function(e) {
               if(e.keyCode === 13) {
                   saveFields();
                   return false;
               }
            });

            $("ul.label-container").css("height", ($(window).height() * 0.93));
        });
    </script>

</head>
<body>
    <!-- Data Lists for Actions and Statuses -->
    <datalist id="action_list">
        <c:forEach items="${actions}" var="map">
            <c:forEach items="${map}" var="entry">
                <option value="${entry.key}">${entry.value}</option>
            </c:forEach>
        </c:forEach>
    </datalist>
    <datalist id="status_list">
        <c:forEach items="${statuses}" var="map">
            <c:forEach items="${map}" var="entry">
                <option value="${entry.key}">${entry.value}</option>
            </c:forEach>
        </c:forEach>
    </datalist>

    <input type="hidden" id="uuid">
    <div class="container-fluid d-flex p-0">
        <div class="row w-100 no-gutters">
            <div class="col-2 no-gutters">
                <div class="row no-gutters">
                    <input type="button" class="add-delete" id="prepend-row" onclick="addRow('top')" value="Prepend Row" />
                    <input type="button" class="add-delete" id="append-row" onclick="addRow('btm')" value="Append Row" />
                    <input type="button" class="add-delete" id="delete-row" onclick="deleteRow()" value="Delete Row" />
                </div>
                <div class="row no-gutters">
                    <ul class="label-container w-100">
                    </ul>
                </div>
            </div>
            <div class="col-2 no-gutters">
                <div class="row no-gutters">
                    <form id="label" class="mx-auto mt-4">
                        <h5 class="w-100 mb-0">Label Name</h5>
                        <input type="text" class="fields" id="fld-alias" name="label" data-lpignore="true" placeholder="Barrage + Empyreal Arrow"/>
                    </form>
                </div>
                <div class="row no-gutters">
                    <form id="classes" class="d-flex flex-wrap mx-auto mt-4">
                        <h5 class="w-100 mb-0">Classes</h5>
                        <c:forEach items="${classes}" var="map">
                            <c:forEach items="${map}" var="entry">
                                <div class="p-2"><input type="checkbox" class="classes" id="fld-${entry.key}" data-value="${entry.key}"/> ${entry.value}</div>
                            </c:forEach>
                        </c:forEach>
                    </form>
                </div>
                <div class="row no-gutters">
                    <form id="filters" class="mx-auto mt-4">
                        <h5 class="w-100">Filters</h5>
                        <input type="text" class="filters" id="fld-filterone" name="filterone" data-lpignore="true" placeholder="1st Filter"/>
                        <input type="text" class="filters" id="fld-filtertwo" name="filtertwo" data-lpignore="true" placeholder="2nd Filter"/>
                        <input type="text" class="filters" id="fld-filterthree" name="filterthree" data-lpignore="true" placeholder="3rd Filter"/>
                        <input type="text" class="filters" id="fld-filterfour" name="filterfour" data-lpignore="true" placeholder="4th Filter"/>
                        <input type="text" class="filters" id="fld-filterfive" name="filterfive" data-lpignore="true" placeholder="5th Filter"/>
                    </form>
                </div>

            </div>
            <div class="col-5 no-gutters">
                <div class="row no-gutters">
                    Stuff here
                </div>
            </div>
            <div class="col-3 no-gutters p-3">
                <div class="row no-gutters">
                    <h5 class="w-100 mb-0">Output</h5>
                    <form id="output" class="w-100 mt-2">
                        <textarea class="w-100" rows="25" placeholder="Output generates here as you work"></textarea>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="row w-100 stats no-gutters">
        <div class="col-12 bg-dark text-light p-1 d-flex justify-content-around">
            <span><a style="color: inherit" href="/">Final Fantasy XIV Rotation Creator</a></span>
            <span>All information compiled from the <a style="color: inherit" href="https://github.com/viion/ffxiv-datamining">ffxiv-datamining</a> Github</span>
            <span><fmt:formatNumber type="number" value="${fn:length(actions)}"/> actions loaded.</span>
            <span><fmt:formatNumber type="number" value="${fn:length(statuses)}"/> statuses loaded.</span>
            <span><fmt:formatNumber type="number" value="${fn:length(classes)}"/> classes loaded.</span>
        </div>
    </div>

    <div class="alert alert-success" id="success-alert">
    </div>
</body>
</html>
