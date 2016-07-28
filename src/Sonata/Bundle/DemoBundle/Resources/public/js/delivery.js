function Delivery() {

    ymaps.ready(init);

    function init () {

        var form_addr = $('#search_addr');
        var addr_field = form_addr.find('#addr_query');

        var deliveryMap = new ymaps.Map("delivery_map", {
            center: [59.96, 30.36],
            zoom: 8,
        },
        {
            'geoObjectDraggable': false
        });


        myCollection = new ymaps.GeoObjectCollection({}, {preset: 'twirl#redStretchyIcon'});


        deliveryMap.controls.add('zoomControl');
        deliveryMap.controls.add('typeSelector');
    }
};