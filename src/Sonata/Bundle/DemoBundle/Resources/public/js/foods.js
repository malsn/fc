/**
 * Created by sergey on 23.05.2016.
 */
$(document).ready(function(){

    $('.container.main').addClass('offset');

    var open_button = function($button){
        $button.on('click',function(event){

            $(this).add($(this).next()).toggleClass('active');

            if($("#open_shopping_cart").attr('otkr')==1) { $("#open_shopping_cart").attr('otkr',0); }
            else { $("#open_shopping_cart").attr('otkr',1, function(){

            }); }

            $(this).next().toggleClass('visible');

        });
    }

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

    var basket_order_to_modal = function($button){
        var $form = $("form[name='sonata_basket_address']");
        $.ajax({
            url: $button.attr('path-controller'),
            cache: false,
            type: $button.attr('method') || 'GET',
            data: $form.serialize(),
            beforeSend: function () {
            },
            success: function (response) {
                if (response !== false) {
                    var $alertModal = $('#alert_modal');
                    $alertModal
                        .find('div.modal-body')
                        .html(response);
                    $('.btn-basket-order').click(function(){
                        basket_order_to_modal($(this));
                    });
                    $alertModal.modal({show: true});
                    Delivery();
                }
            },
            error: function () {

            }
        });
    }


    var basket_add = function($button){
        var formId = 'form-add-basket-'+$button.attr('data-content');
        var $form = $("form[id='"+formId+"']");
        $.ajax({
            url: $button.attr('path-controller'),
            cache: false,
            type: $button.attr('method') || 'POST',
            data: $form.serialize(),
            beforeSend: function () {
            },
            success: function (response) {
                if (response !== false) {
                    $(".div-cart").html(response);
                    open_button($('.open_button'));
                    $('.btn-basket-delete').click(function(){
                        basket_delete($(this));
                    });
                    $("input.input-quantity").on('change',function(){
                        basket_update($(this));
                    })
                    $('.btn-basket-clean').click(function() {
                        basket_clean($(this));
                    });
                    $(".btn-basket-order").on('click',function(){
                        basket_order_to_modal($(this));
                    });
                }
            },
            error: function () {

            }
        });
    }

    var basket_delete = function($button){
        var $form = $("form[id='form_basket_update']");
        $(".checkbox-delete-"+$button.attr('data-content')).attr('checked',true);
        $.ajax({
            url: $button.attr('path-controller'),
            cache: false,
            type: $form.attr('method') || 'POST',
            data: $form.serialize(),
            beforeSend: function () {
            },
            success: function (response) {
                if (response !== false) {
                    $(".div-cart").html(response);
                    open_button($('.open_button'));
                    $('.btn-basket-delete').click(function(){
                        basket_delete($(this));
                    });
                    $("input.input-quantity").on('change',function(){
                        basket_update($(this));
                    })
                    $('.btn-basket-clean').click(function() {
                        basket_clean($(this));
                    });
                    $(".btn-basket-order").on('click',function(){
                        basket_order_to_modal($(this));
                    });
                }
            },
            error: function () {

            }
        });
    }

    var basket_update = function($sender){
        var $form = $("form[id='form_basket_update']");
        $.ajax({
            url: $sender.attr('path-controller'),
            cache: false,
            type: $form.attr('method') || 'POST',
            data: $form.serialize(),
            beforeSend: function () {
            },
            success: function (response) {
                if (response !== false) {
                    $("#totalPrice,#totalPrice2").html(response.totalPrice + '&nbsp;руб.');
                    $("#open_shopping_cart").attr('data-amount', response.countElements);
                    }
            },
            error: function () {

            }
        });
    }

    open_button($('.open_button'));

    $('.btn-ajax-to-modal').click(function(){
        ajax_to_modal($(this));
    });

    $('.btn-ajax-basket').click(function(){
        basket_add($(this));
    });

    $('.btn-basket-delete').click(function() {
        basket_delete($(this));
    });

    $("input.input-quantity").on('change',function(){
        basket_update($(this));
    });

    $(".btn-basket-order").on('click',function(){
        basket_order_to_modal($(this));
    });
});
