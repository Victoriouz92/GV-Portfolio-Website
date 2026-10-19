/* An old or not-yet-generated link to a work (/tvorba/<id>/) opens that work on the main page. */
var m = location.pathname.match(/\/tvorba\/([\w-]+)\/?$/);
if (m) location.replace("/#tvorba-" + m[1]);
