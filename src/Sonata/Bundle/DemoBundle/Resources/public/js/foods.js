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

    var ajax_to_modal = function($button){
        $.ajax({
            url: $button.attr('path-controller'),
            cache: false,
            type: $button.attr('method') || 'POST',
            data: null ,
            beforeSend: function () {
            },
            success: function (response) {
                if (response !== false) {
                    var $alertModal = $('#alert_modal');
                    $alertModal
                        .find('div.modal-body')
                        .html(response);
                    $('.btn-ajax-to-modal').click(function(){
                        ajax_to_modal($(this));
                    });
                    $alertModal.modal({show: true});
                }
            },
            error: function () {

            }
        });
    }


    var ajax_basket = function($button){
        $.ajax({
            url: $button.attr('path-controller'),
            cache: false,
            type: $button.attr('method') || 'POST',
            data: null ,
            beforeSend: function () {
            },
            success: function (response) {
                if (response !== false) {
                    if (response.type == 'basket-del'){
                        $("#basket-element-"+response.element).remove();
                        $("#open_shopping_cart.countElements").attr("data-amount",response.countElements);
                        if (response.totalPrice != 0){
                            $("#totalPrice").html(response.totalPrice + '&nbsp;руб.');
                        } else {
                            $("#mesto_Tov").html('<div class="animated_item korzPust"><p class="title">Корзина пуста</p></div>');
                            $(".korzPoln.order-button").hide();
                        }
                    }
                    if (response.type == 'basket-add'){
                        $("#mesto_Tov").append('<div class="animated_item korzPust"><p class="title">Корзина пуста</p></div>');

                        $("#basket-element-"+response.element).remove();
                        $("#open_shopping_cart.countElements").attr("data-amount",response.countElements);
                        if (response.totalPrice != 0){
                            $("#totalPrice").html(response.totalPrice + '&nbsp;руб.');
                        } else {
                            $("#mesto_Tov").html('<div class="animated_item korzPust"><p class="title">Корзина пуста</p></div>');
                            $(".korzPoln.order-button").hide();
                        }
                    }
                }
            },
            error: function () {

            }
        });
    }

    $('.btn-ajax-to-modal').click(function(){
        ajax_to_modal($(this));
    });

    $('.btn-ajax-basket').click(function(){
        ajax_basket($(this));
    });

})
