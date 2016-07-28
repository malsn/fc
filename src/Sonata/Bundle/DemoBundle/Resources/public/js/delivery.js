function Delivery() {

    ymaps.ready(init);

    function init () {

        var form_addr = $('#search_addr');
        var addr_field = form_addr.find('#addr_query');




        var deliveryMap = new ymaps.Map("delivery_map", {
            center: [59.96, 30.36],
            zoom: 14,
        },
        {
            'geoObjectDraggable': false
        });

        ymaps.geoXml.load("http://gidrosnab.ru/googlemaps/foodcity315.kml")
           .then(function (res) {

                deliveryMap.geoObjects.add(res.geoObjects); // Добавление геообъектов на карту

                var polys = [];

                res.geoObjects.each(function (obj) {

                    //obj.options.setParent(deliveryMap.options);
                    // obj.setMap(deliveryMap); // этого метода тоже нет

                    if ( obj.properties.get('name') ) {
                        polys.push(obj); // запихиваем многоугольники в массив
                        }

                    if ( obj.properties.get('name') != 'Красная зона' ) {
                            //alert(obj.properties.get('description'));
                            obj.options.set('fill',0);
                            obj.events.add('mouseenter', function (e) {
                                //console.log('move');
                                obj.options.set('fill',1);
                            });
                            obj.events.add('mouseleave', function (e) {
                                //console.log('leave');
                                obj.options.set('fill',0);
                            });

                        }

                });

                $("#sonata_basket_address_address1").suggestions({
                    serviceUrl: "https://suggestions.dadata.ru/suggestions/api/4_1/rs",
                    token: "d12783ba3618826d3096e6ceecf7290c90f56092",
                    type: "ADDRESS",
                    count: 5,
                    /* Вызывается, когда пользователь выбирает одну из подсказок */
                    onSelect: function(suggestion) {
                        var place_geo_lat = $("#Item_place_geo_lat");
                        var place_geo_lon = $("#Item_place_geo_lon");

                        place_geo_lat.val(suggestion.data.geo_lat);
                        place_geo_lon.val(suggestion.data.geo_lon);
                        $("#sonata_basket_address_postcode").val(suggestion.data.postal_code);
                        $("#sonata_basket_address_city").val(suggestion.data.city);

                        var coords = [suggestion.data.geo_lat,suggestion.data.geo_lon];
                        console.log(coords);

                        polys.forEach(function (poly) { // перебираем многоугольники

                            if(poly.geometry.contains(coords)){ //если точка входит в многоугольник
                                //if ( $("#order_total_sum").val() >= 10000 && poly.properties.get('name') == "Красная зона")
                                if ( poly.properties.get('name') == "Красная зона")
                                { cost = 350; }
                                else {	cost = poly.properties.get("Snippet").replace(/\D/g, "");	}

                                console.log(coords);
                                console.log(cost);

                                myCollection.removeAll();
                                myCollection.add(new ymaps.Placemark(coords));
                                myCollection.each(function (obj) {
                                    obj.properties.set({
                                        iconContent: '<div>' + suggestion.value + '</div><div>Стоимость доставки ' + cost + ' рублей</div>'
                                    });
                                });
                            } // contains
                        }); // polys.forEach

                    }
                });

                deliveryMap.geoObjects.add(myCollection);

            }, function (error){   // Вызывается в случае неудачной загрузки YMapsML-файла
                   alert('Ошибка: ' + error);
            });

        myCollection = new ymaps.GeoObjectCollection({}, {preset: 'twirl#redStretchyIcon'});


        deliveryMap.controls.add('zoomControl');
        deliveryMap.controls.add('typeSelector');
    }
};