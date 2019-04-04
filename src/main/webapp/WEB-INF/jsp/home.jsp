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
    <script src="/js/dragonfly.js"></script>
    <script src="/js/functions.js"></script>

    <script>
        $(document).ready(function (){
            $("form :input").change(function() {
                $("#output textarea").val(generateOutput($("#classes").serialize(), $("#filters").serialize()));
            });
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

    <div class="container-fluid d-flex p-0">
        <div class="row w-100 no-gutters">
            <div class="col-2 no-gutters">
                <div class="row no-gutters">
                    <input type="button" id="append-row" onclick="addRow()" value="Add Row" />
                </div>
                <div class="row no-gutters">
                    <div class="drag-container w-100">
                    </div>
                </div>
            </div>
            <div class="col-2 no-gutters">
                <div class="row no-gutters">
                    <form id="label" class="mx-auto mt-4">
                        <h5 class="w-100 mb-0">Label</h5>
                        <input type="text" name="label" data-lpignore="true" placeholder="Barrage + Empyreal Arrow"/>
                    </form>
                </div>
                <div class="row no-gutters">
                    <form id="classes" class="d-flex flex-wrap mx-auto mt-4">
                        <h5 class="w-100 mb-0">Classes</h5>
                        <c:forEach items="${classes}" var="map">
                            <c:forEach items="${map}" var="entry">
                                <div class="p-2"><input type="checkbox" name="${entry.key}"/> ${entry.value}</div>
                            </c:forEach>
                        </c:forEach>
                    </form>
                </div>
                <div class="row no-gutters">
                    <form id="filters" class="mx-auto mt-4">
                        <h5 class="w-100">Filters</h5>
                        <input type="text" name="filter-1" data-lpignore="true" placeholder="1st Filter"/>
                        <input type="text" name="filter-2" data-lpignore="true" placeholder="2nd Filter"/>
                        <input type="text" name="filter-3" data-lpignore="true" placeholder="3rd Filter"/>
                        <input type="text" name="filter-4" data-lpignore="true" placeholder="4th Filter"/>
                        <input type="text" name="filter-5" data-lpignore="true" placeholder="5th Filter"/>
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




</body>
</html>
