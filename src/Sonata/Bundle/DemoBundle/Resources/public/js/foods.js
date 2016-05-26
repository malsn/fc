/**
 * Created by sergey on 23.05.2016.
 */
$(document).ready(function(){

    $('.container.main').addClass('offset');

    $('.open_button').on('click',function(event){

        $(this).add($(this).next()).toggleClass('active');

        if($("#open_shopping_cart").attr('otkr')==1) { $("#open_shopping_cart").attr('otkr',0); }
        else { $("#open_shopping_cart").attr('otkr',1, function(){

        }); }

        $(this).next().toggleClass('visible');

    });

})
