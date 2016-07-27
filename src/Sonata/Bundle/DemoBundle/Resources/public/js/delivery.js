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
        ymaps.geoXml.load("kml315.kml")
           .then(function (res) {

                deliveryMap.geoObjects.add(res.geoObjects); // ���������� ����������� �� �����

                var polys = [];

                res.geoObjects.each(function (obj) {

                    //obj.options.setParent(deliveryMap.options);
                    // obj.setMap(deliveryMap); // ����� ������ ���� ���

                    if ( obj.properties.get('name') ) {
                        polys.push(obj); // ���������� �������������� � ������
                        }

                    if ( obj.properties.get('name') != '������� ����' ) {
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

                var place_geo_lat = $("#Item_place_geo_lat");
                var place_geo_lon = $("#Item_place_geo_lon");
                var coords = [place_geo_lat,place_geo_lon];

                place_geo_lat.on('change', function(e){

                    polys.forEach(function (poly) { // ���������� ��������������

                        if(poly.geometry.contains(coords)){ //���� ����� ������ � �������������
                            //if ( $("#order_total_sum").val() >= 10000 && poly.properties.get('name') == "������� ����")
                            if ( poly.properties.get('name') == "������� ����")
                            { cost = 350; }
                            else {	cost = poly.properties.get("Snippet").replace(/\D/g, "");	}

                            console.log(coords);
                            console.log(cost);

                            myCollection.add(new ymaps.Placemark(coords));
                            myCollection.each(function (obj) {
                                obj.properties.set({
                                    iconContent: '<div>��������� �������� ' + cost + ' ������</div>'
                                });
                            });
                        } // contains
                    }); // polys.forEach

                });

                deliveryMap.geoObjects.add(myCollection);

            }, function (error){   // ���������� � ������ ��������� �������� YMapsML-�����
                   alert('������: ' + error);
            });

        myCollection = new ymaps.GeoObjectCollection({}, {preset: 'twirl#redStretchyIcon'});


        deliveryMap.controls.add('zoomControl');
        deliveryMap.controls.add('typeSelector');
    }
};