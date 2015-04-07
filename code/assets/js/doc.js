/**
 * Created by sonny on 4/7/15.
 */

$(function(){
    $("#navigator").load("nav.html", function (){
        $("li[data-menu='"+$('meta[name="nav"]').attr('content')+"']").addClass('active').delay(5000);
    });
    $("#doc-footer").load("footer.html");

});

$(document).ready(function(){
    $("a[data-rel^='prettyPhoto']").prettyPhoto({
        social_tools: false,
        hook: 'data-rel'
    });
});


