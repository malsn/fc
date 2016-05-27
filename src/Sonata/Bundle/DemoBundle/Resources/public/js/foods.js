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
                    $('.finish-resetting-button').click(function(){
                        finish_resetting();
                    });
                    $('.pre-register-phone-button').click(function(){
                        pre_register_phone();
                    });
                    $("#PreRegister_phone").mask("+7(999) 999-99-99");
                    $alertModal.modal({show: true});
                }
            },
            error: function () {

            }
        });
    }

    $('.btn-ajax-to-modal').click(function(){
        ajax_to_modal($(this));
    });

})
