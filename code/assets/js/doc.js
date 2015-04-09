/**
 * Created by sonny on 4/7/15.
 */

$(function(){
    var ex_url      = $('meta[name="ex_url"]').attr('content');
    var nav_url     = (ex_url!=undefined)?ex_url + 'nav.html' : 'nav.html';
    var footer_url  = (ex_url!=undefined)?ex_url + 'footer.html' : 'footer.html';
    var regex = /^\#/g;

    $("#navigator").load(nav_url, function (){
        $("li[data-menu='"+$('meta[name="nav"]').attr('content')+"']").addClass('active').delay(5000);
        if (ex_url!=undefined) {
            $('#mainnav a').each(function(){
                if ($(this).attr('href') != '' && !$(this).attr('href').match(regex)) {
                    $(this).attr('href',ex_url + $(this).attr('href'));
                }
            });
        }
    });
    $("#doc-footer").load(footer_url);



});

$(document).ready(function(){
    $("a[data-rel^='prettyPhoto']").prettyPhoto({
        social_tools: false,
        hook: 'data-rel'
    });

    $('#navaffix').affix({
        offset: {
            top: 270,
            bottom: function () {
                return (this.bottom = $('.footer').outerHeight(true))
            }
        }
    });
});




