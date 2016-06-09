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
        var $form = $("form[id='form_add_basket']");
        $.ajax({
            url: $button.attr('path-controller'),
            cache: false,
            type: $button.attr('method') || 'POST',
            data: $form.serialize(),
            beforeSend: function () {
            },
            success: function (response) {
                if (response !== false) {
                    if (response.type == 'basket-del'){
                        $("#basket-element-"+response.element).remove();
                        $("#open_shopping_cart.countElements").attr("data-amount",response.countElements);
                        if (response.totalPrice == 0){
                            $("#mesto_Tov").append('<div class="animated_item korzPust"><p class="title">Корзина пуста</p></div>');
                            $(".korzPoln.order-button").hide();
                        }
                        $("#totalPrice,#totalPrice2").html(response.totalPrice + '&nbsp;руб.');
                    }
                    if (response.type == 'basket-add'){
                        alert(1);

                        $("#open_shopping_cart.countElements").attr("data-amount",response.countElements);

                        if ( $("#basket-element-"+response.element) ){
                            alert(2);
                            $basketElement = $("#basket-element-"+response.element);
                        } else {
                            alert(3);
                            $basketElement = $("div.basket-element-prototype").clone().appendTo("#mesto_Tov");
                            $basketElement.attr('id','basket-element-'+response.element);
                            $basketElementImage = $basketElement.find('img.prototype-image');
                            $basketElementImage.attr('src',response.image);
                            $basketElementA = $basketElement.find('a.product-name');
                            $basketElementA.html(response.name);
                            $basketElementPrice = $basketElement.find('span.priceTov');
                            $basketElementPrice.html(response.price);
                            $basketElementDel = $basketElement.find('button.close2');
                            $basketElementDel.attr('path-controller',response.element.delUrl);
                        }
                        $basketElementQuantity = $basketElement.find('input.mestoKolTov');
                        $basketElementQuantity.val(response.quantity);
                        $("#totalPrice,#totalPrice2").html(response.totalPrice + '&nbsp;руб.');
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
