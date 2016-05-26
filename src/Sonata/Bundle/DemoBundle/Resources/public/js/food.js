/*!
 * skyscript.ru
 */
function tolkoCif(input) {
	input.value = input.value.replace(/[^\d.]/g, '');
};
function tolkoWww(input) {
	input.value = input.value.replace(/http:\/\//g, '');
};
function tolkoLat(input) {
	input.value = input.value.replace(/[^(a-z)(0-9)-]/g, '');
};
/*function tolkoTel(i) { 
 i.value = i.value.replace(/[0-9]{10,10}/g, '');
 //i.value = i.value.replace(/[0-9-()+]{3,20}/g, '');
 };*/
function neZap(a) {
	if(!$(a).val()) { $(a).css('background-color','#e51015').effect('pulsate', function() {
		$(a).css('background-color','#fdeee4') }); return false; } else { return true; }
};


$(document).ready(function() {


	$('.kn_print').click(function(){

		var zak = $(this).attr('zak');
		open('print.php?z='+zak,'_blank',{ height:800,width:700 });

	});


	// $("a.ancLinks").click(function () {
	$("a[href*=#]").click(function () {
		elementClick = $(this).attr("href");
		elementClick = elementClick.replace(/#/g, '');
//  destination = $(elementClick).offset().top;
		destination = $('a[name='+elementClick+']').offset().top;

//  $("#obsh").animate({scrollTop: destination}, 1100 );
		$("html").animate({scrollTop: destination}, 1100 );
		return false;
	});


//закрыть окна
	$('.ui-widget-overlay').on('click',function(){

		if ( $('#pole_user_login').val() || $('#pole_user_email').val() || $('#pole_user_telnom').val()  ) {

			$(function() {
				$( "#mesto_vihod" ).dialog({
					resizable: false,
					modal: true,
					buttons: {
						"Продолжить оформление": function() {
							$( this ).dialog( "close" );
						},
						"Выйти": function() {
							$('#mesto_ofzakaz').html('').dialog("close");
							$( this ).dialog( "close" );
						}
					}
				});
			});


		} else { $('#mesto_ofzakaz').dialog("close"); }

		$('#oknovhod').dialog("close");
		$('#oknozab').dialog("close");
		$('#oknoreg').dialog("close");
		$('#oknoprav').dialog("close");
	});


	$('.ui-dialog-titlebar-close').on('mousedown',function(e){
		e.preventDefault();
		if ( $('#pole_user_login').val() || $('#pole_user_email').val() || $('#pole_user_telnom').val()  ) {

			$(function() {
				$( "#mesto_vihod" ).dialog({
					resizable: false,
					modal: true,
					buttons: {
						"Продолжить оформление": function() {
							$( this ).dialog( "close" );
						},
						"Выйти": function() {
							$('#mesto_ofzakaz').html('').dialog("close");
							$( this ).dialog( "close" );
						}
					}
				});
			});


		} else { $('#mesto_ofzakaz').dialog("close"); }


	});


//заказ
	$('.ofzakaz').on('click',function(){

		$('#mesto_ofzakaz').load("d.php?a=ofzakaz", function(){


			$('#mesto_ofzakaz').dialog({
				width: '90%',
				modal: true,
				resizable: false,
				title: 'Оформление заказа',
				/*		beforeClose: function() {


				 if ( $('#pole_user_login').val() || $('#pole_user_email').val() || $('#pole_user_telnom').val()  ) {
				 $(function() {
				 $( "#mesto_vihod" ).dialog({
				 resizable: false,
				 modal: true,
				 buttons: {
				 "Продолжить оформление": function() {
				 $( this ).dialog( "close" );
				 },
				 "Выйти": function() {
				 $('#mesto_ofzakaz').dialog("close");
				 $( this ).dialog( "close" );
				 }
				 }
				 });
				 });


				 }
				 }*/

			});
		});

	});



//вход в систему
	$('a[id*=vhod]').click(function(e){

		e.preventDefault();
		$('#oknozab').dialog("close");
		$('#oknoreg').dialog("close");
		$('#oknovhod').dialog({
			width: 360,
			modal: true,
			resizable: false,
			title: 'Вход в систему'
		});

	});
//отправить новый пароль
	$('a[id*=zabPar]').click(function(e){
		e.preventDefault();
		$('#oknovhod').dialog("close");
		$('#oknoreg').dialog("close");
		$('#oknozab').dialog({
			width: 360,
			modal: true,
			resizable: false,
			title: 'Восстановить пароль'
		});

	});
//регистрация
	$('a[id*=reg]').click(function(e){
		e.preventDefault();
		$('#oknovhod').dialog("close");
		$('#oknozab').dialog("close");
		$('#oknoreg').dialog({
			width: 360,
			modal: true,
			resizable: false,
			title: 'Регистрация'
		});

	});

// Отправка данных о входе на сервер
	$('#knVhod').click(function(e){
		var otprDan = {};
		e.preventDefault();
		otprDan.user_email = $('#poleEmail').val();
		otprDan.user_pass = $('#polePass').val();
		otprDan.z = $('#chek_zap').attr('checked');
		otprDan.a = 'login';
		$.post("d.php", otprDan, function(data){
				if(data)
				{
					data = $.parseJSON(data);
					var errors ='';
					$.each(data, function(i, val) {
						errors += val+'\n';
					});
					$('#oshEmail').html('<div class="or text14 al">' + errors + '</div>');
				}
				else
				{
					$('#oknovhod').dialog("close");
					open($('#knVhod').attr('ssilka'),'_parent');
				}
			}
		);
	});


// Отправить новый пароль
	$('#knZab').click(function(e){
		var otprDan = {};
		e.preventDefault();
		otprDan.user_email = $('#poleEmailZab').val();
		otprDan.a = 'zab';
		$.post("d.php", otprDan, function(data){
				if(data)
				{
					data = $.parseJSON(data);
					var errors ='';
					$.each(data, function(i, val) {
						errors += val+'\n';
					});
					$('#oshZab').html('<div class="or text14 al">' + errors + '</div>');
				}
				else
				{
					$('#oknozab').dialog("close");
					$('#oshEmail').html('<div class="ser textsred ok">Вам на почтовый ящик был отправлен новый пароль</div>');
					$('#oknovhod').dialog("open");
				}
			}
		);
	});

//кнопка прочитано
	$('#sog').click(function(){
		if ($('#sog').attr('checked'))
		{ $('#knReg').removeClass('ui-button-disabled').removeClass('ui-state-disabled').removeAttr('disabled').hover(function(){
			$(this).addClass('ui-state-hover');

			// Регистрация
			$('#knReg').on("click",function(e){
				e.preventDefault();
				var otprDan = {};
				otprDan.user_login = $('#poleNameReg').val();
				otprDan.user_email = $('#poleEmailReg').val();
				otprDan.user_tel = $('#poleTelReg').val();
				if($('#polechek_ras').is(":checked")) { otprDan.user_ras = 1; } else { otprDan.user_ras = 0; }
				otprDan.user_pass = $('#polePassReg').val();
				otprDan.user_pass2 = $('#polePass2Reg').val();
				otprDan.a = 'reg';
				$.post("d.php", otprDan, function(data){
					if(data)
					{
						data = $.parseJSON(data);
						var errors ='';
						$.each(data, function(i, val) {
							errors += val+'\n';
						});
						$('#oshReg').html('<div class="or text14 al">' + errors + '</div>');
					}
					else
					{
						$('#oknoreg').dialog("close");
						open($('#knVhod').attr('ssilka'),'_parent');
					}
				});
			});
		},function(){
			$(this).removeClass('ui-state-hover');
		});
		}
		else
		{ $('#knReg').addClass('ui-button-disabled').addClass('ui-state-disabled').attr('disabled','disabled'); }
	});

//правила пользования
	$('#kn_prav, #kn_prav2').click(function(){
		$('#oknoprav').load("d.php?a=prav", function(){
			$('#oknoprav').dialog({
				width: '80%',
				height: 500,
				modal: true,
				resizable: false,
				title: 'Правила пользования магазином'
			});
		});
	});

//тот свежесть
	$('#kn_ras').click(function(){
		$('#oknosvej').load("d.php?a=svej", function(){
			$('#oknosvej').dialog({
				width: 300,
				modal: true,
				resizable: false,
				title: 'Cервис ТОТАЛЬНАЯ СВЕЖЕСТЬ'
			});
		});
	});


//показ подмодулей
	$('img[id*=otpodmod]').click(function(){
		//alert('111');
		if($(this).attr('otkr')==0) {
			$('#podmod'+$(this).attr('mod')).removeClass(); $(this).attr({'otkr':1,'src':'pic/zakrpod.gif'});
			$.cookie('podmod'+$(this).attr('mod'),1, {
				expires: 365,
				path: "/"
//			domain: "jquery.com",
//			secure: true
			});
		}
		else {
			$('#podmod'+$(this).attr('mod')).addClass('nevid'); $(this).attr({'otkr':0,'src':'pic/zakr.gif'});
			$.cookie('podmod'+$(this).attr('mod'), null, {
				path: "/"
			});
		}
	});

//рецепты


	$('.rec_like').hover(function(){
		$(this).attr('src','pic/serc_kr.png');
	},function(){
		if($(this).attr('like') !=1 ) { $(this).attr('src','pic/serc_zel.png'); }
	});



	$('.rec_like').click(function(){

		var rec = $(this).attr('rec');

		if($(this).attr('like') !=1 ) {

			$('#likerec'+rec).load('d.php?a=reclike&r='+rec, function(){

				$.cookie('likerec'+rec,1, {	expires: 365, path: "/"	});

				$('#serc'+rec).attr('like','1').attr('src','pic/serc_kr.png').removeClass('curs').removeAttr('id');
			});
		}


//	$.post("d.php", { a:'reclike', r: rec, m: user_ras }, function(d){
//				//if (d) { alert('Невозможно изменить параметр'); } else {}
//		});	


	});







	$('#kn_vse_izd').toggle(function(){
		//var position = $('#parent').position();
		//var koor = $(this).offset();
//	alert(koor);
		//alert('<p>Offset: top='+Math.round(offset.top)+'; left='+Math.round(offset.left)+'</p>');
		//$('#pole_vse_izd').offset({top:(koor.top)-8, left:(koor.left)-8}).fadeIn('500');
		$('#pole_vse_izd').fadeIn('500');
		//$(".content").offset({top:30, left:100})

	},function(){

		$('#pole_vse_izd').fadeOut('500');

	});

//$('#kn_vse_izd_on').click(function(){
//	var koor = $(this).offset();
//	$('#pole_vse_izd').fadeOut('0').offset({top:(koor.top)-8, left:(koor.left)-8});
//	});	




// корзина
	msg = new Array();
	var korzina = '';
	var vsegoCena = 0;
	var vsegoTov = 0;
	if (!$.cookie("korzina")) {$.cookie("korzina", '', {path: "/"});}
	korzina = decodeURI($.cookie("korzina"));
	korzinaArray = korzina.split(",");// Находим все товары
	if (korzinaArray.length>3) { $('#mesto_Tov').css('overflow-y','scroll'); }
	for(var i=0; i<korzinaArray.length-1;i++) {
		tovId = korzinaArray[i].split(":"); // Находим id товара, цену и количество
		vsegoTov+=parseInt(tovId[1]);
		vsegoCena+=parseInt(tovId[1])*(tovId[2]);
	}
	if (vsegoCena > 0) {
		$('#ochKorz').show();
		$('#oformit').show();
		$('.korzPoln').removeClass('nevid').show();
		$('.korzPust').hide();
		$('#korzPustPic').hide();

	}
	if (!vsegoCena) {vsegoCena = 0;}
	$('#totalPrice, #totalPrice2').text(vsegoCena.toFixed(0));
	//$('#totalGoods').text(vsegoTov);
	$('#open_shopping_cart').attr('data-amount',vsegoTov);


	$('.dobKorz').on('click',function() {

		/*alert(top.frames.length);*/

		d = $(this).attr('id').split('-');
		var tov_dop = $('#pole_tov_dop'+d[0]).val();
		if (!tov_dop) { tov_dop=1; }
		dobKorz(d[0], d[1], tov_dop);
//   ssilka = $('#knVhod').attr('ssilka');
//   open(ssilka,'_parent');
		return false;
	});


	function dobKorz(p1, p2, p3){
		if (!p3 || p3==0) {p3=1;}
		msg.id = p1;
		msg.cena = p2;
		msg.kolich = parseInt(p3);
		var check = false;
		var cnt = false;
		var vsegoTov = 0;
		var vsegoCena = 0;
		var tovId = 0;
		var korzina = '';
		$('#ochKorz').show();
		$('#ochKorz',top.document).show();
		$('#oformit').show();
		$('#oformit',top.document).show();
		//$('#korzPustPic').hide();
		$('.korzPoln').removeClass('nevid').show();
		$('.korzPoln',top.document).removeClass('nevid').show();
		$('.korzPust').remove();
		$('.korzPust',top.document).remove();
		$('#kn_Korz').html('<a class="netlin zel ofzakaz curs">Корзина</a>');
		korzina = decodeURI($.cookie("korzina"));
		if (korzina=='null') {korzina = '';}
		korzinaArray = korzina.split(",");

		for(var i=0; i<korzinaArray.length-1;i++) {
			tovId = korzinaArray[i].split(":");
			if(tovId[0]==msg.id)	// ищем, не покупали ли мы этот товар ранее
			{
				check = true;
				cnt   = parseInt(tovId[1]);

				//var uzeest = $('#mestoKolTov' + tovId[0]).val();
				//alert(uzeest);
				var stalo = $('#mestoKolTov' + p1).val()*1+p3*1;
				$('#mestoKolTov' + p1).val(stalo);
				$('#mesto2KolTov' + p1).val(stalo);
				//$('#tovuzeest' + p1).html(stalo + ' в корзине');
				$('#tov2uzeest' + p1).html(stalo + ' в корзине');
				$('#tovuzeest' + p1,top.document).html(stalo + ' в корзине');
				$('#tovuzeestnabor' + p1).html(' <span id="tovuzeestnabor" class="zel text13">v</span>');

				korzina=korzina.replace(msg.id+':'+(cnt)+':'+msg.cena, msg.id+':'+(cnt+p3*1)+':'+msg.cena);
				$.cookie("korzina", korzina, {path: "/"});
				break;
			}
		}
		if(!check) {
			if (korzinaArray.length>3) { $('#mesto_Tov',top.document).css('overflow-y','scroll'); }
			$('#KorzPustTr',top.document).hide();
			//$('#tovuzeest' + p1).html(p3 + ' в корзине');
			$('#tov2uzeest' + p1).html(p3 + ' в корзине');
			$('#tovuzeest' + p1,top.document).html(p3 + ' в корзине');
			$('#tovuzeestnabor' + p1).html(' <span id="tovuzeestnabor" class="zel text13">v</span>');
			var tov_lat = $('#nazvTov'+p1).attr('tov_lat');
			var tov_nazv = $('#nazvTov'+p1).text();
			var tov_pic = $('#imgTov'+p1).attr('src');
			$('#mesto_Tov',top.document).css('margin-top','0px');

			tov_nazv = tov_nazv.substring(0,35); tov_nazv = tov_nazv +'...';

			$('#mesto_Tov2').prepend('<div id="strokTov' + p1 + '" class="animated_item"><div class="clearfix sc_product"><a href="catalog/view/' + tov_lat + '" class="product_thumb"><img src="' + tov_pic + '" alt="" width="60"></a><a class="product_name" href="catalog/view/' + tov_lat + '" style="line-height:1;">' + tov_nazv + '</a><p><img id="bolTov' + p1 + '" tov="' + p1 + '" src="pic/bol.png" alt="" width="13" height="11" style="cursor:pointer" /><input onkeyup="return tolkoCif(this);" onchange="return tolkoCif(this);" id="mestoKolTov' + p1 + '" tov="' + p1 + '" type="text" value="' + p3 + '" style="width:23px; height:18px; padding:1px; margin:0; text-align:center; color: #81b51f;" /><img id="menTov' + p1 + '" tov="' + p1 + '" src="pic/men.png" alt="" width="13" height="11" style="cursor:pointer" /> x ' + p2 + ' Р </p> <button id="udTov' + p1 + '" tov="' + p1 + '" class="close2"></button></div></div>');

			$('#mesto_Tov',top.document).prepend('<div id="strokTov' + p1 + '" class="animated_item"><div class="clearfix sc_product"><a href="catalog/view/' + tov_lat + '" class="product_thumb"><img src="' + tov_pic + '" alt="" width="60"></a><a class="product_name" href="catalog/view/' + tov_lat + '" style="line-height:1;">' + tov_nazv + '</a><p><img id="bolTov' + p1 + '" tov="' + p1 + '" src="pic/bol.png" alt="" width="13" height="11" style="cursor:pointer" /><input onkeyup="return tolkoCif(this);" onchange="return tolkoCif(this);" id="mestoKolTov' + p1 + '" tov="' + p1 + '" type="text" value="' + p3 + '" style="width:23px; height:18px; padding:1px; margin:0; text-align:center; color: #81b51f;" /><img id="menTov' + p1 + '" tov="' + p1 + '" src="pic/men.png" alt="" width="13" height="11" style="cursor:pointer" /> x ' + p2 + ' Р </p> <button id="udTov' + p1 + '" tov="' + p1 + '" class="close2"></button></div></div>');




//		$('#mesto_Tov').prepend('<tr id="strokTov"><td width="15" align="center" style="border-bottom:0.5px solid #dcf5aa; padding:3px;">		<img id="bolTov" tov="" src="pic/bol.png" alt="" width="13" height="11" style="cursor:pointer" /><input onkeyup="return tolkoCif(this);" onchange="return tolkoCif(this);" id="mestoKolTov" tov="" type="text" value="" style="width:23px; height:18px; padding:1px; margin:0; text-align:center; color: #81b51f;" /><img id="menTov" tov="" src="pic/men.png" alt="" width="13" height="11" style="cursor:pointer" /></td><td style="border-bottom:0.5px solid #dcf5aa; padding:3px;"><a class="text11 netlin ser" href="" style="line-height:1;"></a></td><td align="center" width="15" class="zel text11" style="border-bottom:0.5px solid #dcf5aa; padding:3px;"><img align="right" id="udTov" tov="" src="pic/del.png" alt="" width="10" style="cursor:pointer;" /><br /></td></tr>');
			korzina+= msg.id + ':' + msg.kolich + ':' + msg.cena + ',';
		}
		else{
			korzina = decodeURI($.cookie("korzina"));

		}

		korzinaArray = korzina.split(",");// Находим все товары
		for(var i=0; i<korzinaArray.length-1;i++) {
			tovId = korzinaArray[i].split(":"); // Находим id товара, цену и количество
			vsegoTov+=parseInt(tovId[1]);
			vsegoCena+=parseInt(tovId[1])*(tovId[2]);
		}

		//$('#totalGoods').text(vsegoTov);
		//$('#open_shopping_cart').attr('data-amount',vsegoTov);
		$('#open_shopping_cart',top.document).attr('data-amount',vsegoTov);
		//$('#totalPrice, #totalPrice2').text(vsegoCena.toFixed(0));
		$('#totalPrice, #totalPrice2',top.document).text(vsegoCena.toFixed(0));
		$.cookie("totalPrice", vsegoCena, {path: "/"});
		$.cookie("korzina", korzina, {path: "/"});

	}



	function redKolTov(p1, p2){
		if (!p2 || p2==0) {p2=1;}
		msg.id = p1;
		msg.red = p2;
		var cnt = false;
		var vsegoTov = 0;
		var vsegoCena = 0;
		var vsegoVes = 0;
		var tovId = 0;
		var korzina = '';
		korzina = decodeURI($.cookie("korzina"));
		korzinaArray = korzina.split(",");
		for(var i=0; i<korzinaArray.length-1;i++) {
			tovId = korzinaArray[i].split(":");
			if(tovId[0]==msg.id)	// какой товар меняем
			{
				var vsegoves = $('#vsegoves').text();
				cnt   = parseInt(tovId[1]);
				if(msg.red=='bol'){ $('#mestoKolTov'+msg.id).val(cnt+1); $('#mesto2KolTov'+msg.id).val(cnt+1); $('#tovuzeest' + msg.id).html((cnt+1) + ' в корзине');
					$('#tovuzeestnabor' + p1).html(' <span id="tovuzeestnabor" class="zel text13">v</span>');
					korzina=korzina.replace(msg.id+':'+(cnt)+':'+tovId[2], msg.id+':'+(cnt+1)+':'+tovId[2]);
					$('#strCena'+p1).text((cnt+1)*tovId[2]*1 + ' Р');
				}
				else if(msg.red=='men') {
					if (cnt>1){	$('#mestoKolTov'+msg.id).val(cnt-1); $('#mesto2KolTov'+msg.id).val(cnt-1); $('#tovuzeest' + msg.id).html((cnt-1) + ' в корзине');
						korzina=korzina.replace(msg.id+':'+(cnt)+':'+tovId[2], msg.id+':'+(cnt-1)+':'+tovId[2]);
						$('#strCena'+p1).text((cnt-1)*tovId[2]*1 + ' Р');
					}
				}
				else if(msg.red=='ud') {
					$('#strokTov'+msg.id).remove(); $('#strok2Tov'+msg.id).addClass('nevid'); $('#tovuzeest' + msg.id).html('<span class="bel">-</span>');
					$('#tovuzeestnabor' + p1).html('+');
					korzina=korzina.replace(msg.id+':'+(cnt)+':'+tovId[2]+',', '');
				}
				else { $('#mestoKolTov'+msg.id).val(msg.red); $('#mesto2KolTov'+msg.id).val(msg.red); $('#tovuzeest' + msg.id).html(p2 + ' в корзине');
					$('#strCena'+p1).text((msg.red)*tovId[2]*1 + ' Р');

					korzina=korzina.replace(msg.id+':'+(cnt)+':'+tovId[2], msg.id+':'+(msg.red)+':'+tovId[2]);
				}


				$.cookie("korzina", korzina, {path: "/"});
				break;
			}
		}
		if (!korzina) {
			$('#mesto_Tov').css('margin-top','0');
			$('#mesto_Tov').html('<div class="animated_item korzPust"><p class="title">Корзина пуста</p></div>');
			$('#mesto_Tov').css('overflow-y','hidden');
			$('#tblKorz').hide();
			$('#totalPrice, #totalPrice2').text('0');
			//$('#totalGoods').text('0');
			$('#open_shopping_cart').attr('data-amount','0');
			$('.korzPoln').hide();
			$('.korzPust').show();
			$('#oformit').hide();
			$('#korzPustPic').show();
			$('#kn_Korz').html('<span class="zel">Корзина</span>');
			$('#mesto_ofzakaz').html('').dialog("close");
			$.cookie("totalPrice", '', {path: "/"});
			$.cookie("korzina", '', {path: "/"});
		}
		korzinaArray = korzina.split(",");// Находим все товары
		for(var i=0; i<korzinaArray.length-1;i++) {
			tovId = korzinaArray[i].split(":"); // Находим id товара, количество и цену
			vsegoTov+=parseInt(tovId[1]);
			vsegoCena+=parseInt(tovId[1])*(tovId[2]);
			vsegoVes+=($('#vesTov'+tovId[0]).attr('ves')*1)*(tovId[1]);
		}
		//$('#totalGoods').text(vsegoTov);
		$('#open_shopping_cart').attr('data-amount',vsegoTov);
		$('#totalPrice, #totalPrice2').text(vsegoCena.toFixed(0));
		vsegoCena = vsegoCena.toFixed(0);
		$('#totalPriceKorz').text(vsegoCena);
		//alert($('#pole_user_gorod').text());
		//доставка
		if(vsegoCena<3000 && $('#pole_user_gorod').val()=='Москва') { $('#totalDostavka').text('500'); $('#dost_val').text('руб'); $('#totalItogo').text(vsegoCena*1+500); }
		else if(vsegoCena>=3000 && $('#pole_user_gorod').val()=='Москва') { $('#totalDostavka').text('бесплатно'); $('#totalItogo').text(vsegoCena); $('#dost_val').text(''); }
		else { $('#totalDostavka').text('cтоимость будет согласована с Вами оператором магазина'); $('#totalItogo').text(vsegoCena); $('#dost_val').text('');  }

		if(vsegoVes>999) { $('#vsegovesv').text(vsegoVes/1000 + ' кг.'); } else { $('#vsegovesv').text(vsegoVes + ' г.'); }

		$.cookie("totalPrice", vsegoCena, {path: "/"});
		$.cookie("korzina", korzina, {path: "/"});

	}







	$('#ochKorz').on('click',function() {
		$(this).hide();
		$('#totalPrice, #totalPrice2').text('0');
		//$('#totalGoods').text('0');
		$('#open_shopping_cart').attr('data-amount','0');
		$('.korzPoln').hide();
		$('.korzPust').show();
		$('#oformit').hide();
		$('#korzPustPic').show();
		$('#tblKorz').hide();
		$('.tovuzeest').html('<span class="bel">-</span>');
		$('.tovuzeestnabor').html('+');
		$('#mesto_Tov').css('margin-top','0');
		$('#mesto_Tov').html('<div class="animated_item korzPust"><p class="title">Корзина пуста</p></div>');
		$('#kn_Korz').html('<span class="zel">Корзина</span>');
		$('#mesto_Tov').css('overflow-y','hidden');
		$.cookie("totalPrice", '', {path: "/"});
		$.cookie("korzina", '', {path: "/"});
//	ssilka = $('#knVhod').attr('ssilka');
// 	open(ssilka,'_parent');
		return false;
	});


	$('[id*=menTov]').on('click',function(){
		redKolTov($(this).attr('tov'), 'men');
//	ssilka = $('#knVhod').attr('ssilka');
// 	open(ssilka,'_parent');
		return false;

	});

	$('[id*=bolTov]').on('click',function(){
		redKolTov($(this).attr('tov'), 'bol');
//	ssilka = $('#knVhod').attr('ssilka');
//	open(ssilka,'_parent');

		return false;

	});

	$('input[id*=mestoKolTov],input[id*=mesto2KolTov]').on('keyup',function(){
		redKolTov($(this).attr('tov'), $(this).val());
//	ssilka = $('#knVhod').attr('ssilka');
//	open(ssilka,'_parent');
		return false;

	});

	$('img[id*=udTov],button[id*=udTov]').on('click',function(){
		redKolTov($(this).attr('tov'), 'ud');
//	ssilka = $('#knVhod').attr('ssilka');
//	open(ssilka,'_parent');
		return false;

	});

//добавить набор в корзину

	$('.dobnabor').click(function() {

		var nabor = $(this).attr('nabor').split(',');
		for (var i=0; i<nabor.length-1; i++)
		{
			var d = nabor[i].split('-');
			dobKorz(d[0], d[1], 1);
		}
//   var tov_dop = $('#pole_tov_dop'+d[0]).val();
//   if (!tov_dop) { tov_dop=1; }
//   ssilka = $('#knVhod').attr('ssilka');
//   open(ssilka,'_parent');
		return false;
	});

//добавить рецепт в корзину
	$('.dobKorzVse').click(function() {

		$.each($('.dobnabor'), function(i, val) {
			//tov = izd+'i'+$(this).attr('izd')+',';
			var nujno = $(this).attr('nujno');
			var d = $(this).attr('id').split('-');
			dobKorz(d[0], d[1], nujno);
		});


		/*	for (var i=0; i<nabor.length-1; i++)
		 {
		 var d = nabor[i].split('-');

		 }*/

	});

//кнопка сдача
	/*$('#ch_zdach').click(function(){
	 if($('#ch_zdach').is(":checked")) { $('#mesto_zdach').fadeIn('500'); } else { $('#mesto_zdach').fadeOut('500'); $('#pole_zak_zdach').val(''); }


	 }); */

//Город 
	$('#pole_user_gorod').on('keyup',function(){
		redKolTov();
	});


// Отправка заказа
	$('#knZak').on('click',function(e){

		var otprDan = {};
		e.preventDefault();

		otprDan.user_reg = $('#pole_reg_user').text();
		otprDan.user_login = $('#pole_user_login').val();
		if($('#pole_user_login').val()) { user_login = $('#pole_user_login').val() } else { user_login =''; }
		otprDan.user_tel = $('#pole_user_telcod').val()+$('#pole_user_telnom').val();
		if(otprDan.user_tel) { user_tel = otprDan.user_tel; } else { user_tel =''; }
		otprDan.user_fax = $('#pole_user_fax').val();
		otprDan.user_email = $('#pole_user_email').val();
		otprDan.user_gorod = $('#pole_user_gorod').val();
		otprDan.user_obl = $('#pole_user_obl').val();

		otprDan.user_dom = $('#pole_user_dom').val();
		otprDan.user_korp = $('#pole_user_korp').val();
		otprDan.user_ofis = $('#pole_user_ofis').val();
		otprDan.user_pod = $('#pole_user_pod').val();
		otprDan.user_etaj = $('#pole_user_etaj').val();
		otprDan.user_kod = $('#pole_user_kod').val();


		otprDan.zak_prim = $('#pole_zak_prim').val();
		otprDan.zak_zdach = $('#pole_zak_zdach').val();
		otprDan.zak_dost = $('#totalDostavka').text();


		/*if($('#sel_zak_dostvrem').val()!=0) { zak_dostvrem = ' к ' + $('#sel_zak_dostvrem').val() + ' ч '; } else { zak_dostvrem =''; }*/
		otprDan.zak_dostdat = $('#pole_zak_dostdata').val();

		if($('#pole_chek_ras').is(":checked")) { otprDan.user_ras = 1; } else { otprDan.user_ras = 0; }

		otprDan.a = 'ofzak';

		$.post("d.php", otprDan, function(data){
				if(data)
				{
					data = $.parseJSON(data);
					var errors ='';
					$.each(data, function(i, val) {
						errors += val+'\n';
						// alert(i);
					});
					$('#oshZak').html('<div class="or text14 al">' + errors + '</div>');
				}
				else
				{
					$('#oknovhod').dialog("close");

					$('#totalPrice, #totalPrice2').text('0');
					//$('#totalGoods').text('0');
					$('#open_shopping_cart').attr('data-amount','0');
					$('.korzPoln').hide();
					$('.korzPust').show();
					$('#oformit').hide();
					$('#korzPustPic').show();
					$('#tblKorz').hide();
					$('.tovuzeest').html('<span class="bel">-</span>');
					$('.tovuzeestnabor').html('+');
					$('#mesto_Tov').css('margin-top','0');
					$('#mesto_Tov').html('<div class="animated_item korzPust"><p class="title">Корзина пуста</p></div>');
					$('#mesto_Tov').css('overflow-y','hidden');


					$('#mesto_ofzakaz').load("d.php?a=otprzakaz", { u:user_login,t:user_tel }, function(){


					});



					/*			   $('#mesto_ofzakaz').html('<div class="text24" style=margin:20px 0 20px 0;>Спасибо, '+ user_login +'</div><div style=margin:0px 0 20px 40px;>Ваш заказ принят, в скором времени мы свяжемся с Вами по телефону <strong>'+ user_tel +'</strong></div>');*/



					// alert('Ваш заказ успешно отправлен.');
					//open('home','_parent');
					//open('skycat.php?mod=lich','_parent');
				}

			}
		);

	});


//поиск
	$('#kn_poisk').click(function(e){
		if(!$('#pole_poisk').val()) { $('#pole_poisk').css('background-color','#f9c39d').effect('pulsate', function() {
			$('#pole_poisk').css('background-color','#ffffff') }); return false; } else { $('#form_poisk').submit(); }
	});






////////////////////////////////////////////////////////////
///////////   администрирование ////////////////////////////

//изменение кол-ва товаров
	$('.kn_smen_kolvo').click(function(){
		var vsegozak = 0;
		var tov = $(this).attr('tov');
		var idtov = $(this).attr('idtov');
		var novkolvo = $('#pole_smen_kolvo'+tov).val();
		var cena = $(this).attr('cena');
		var zak = $(this).attr('zak');
		var bilo = $(this).attr('bilo');

		$.post('d.php', { a:'smenkolvo', r: bilo, t: idtov, s: cena, z: zak, n: novkolvo  }, function(d){
			if (d) { alert('Изменение количества не доступно'); } else {

				$('#pole_cenatov'+tov).text(parseInt(novkolvo*cena));

				$.each($('.tovkzak'+zak), function(i, val) {
					vsegozak= vsegozak+($(this).text()*1);
				});

				$('#totalPriceKorz'+zak).text(parseInt(vsegozak));
//		$('#pole_zakaz'+zak).text(vsegozak);
				$('#pole_smen_kolvo'+tov).css('background-color','#f9c39d');

			}
		});




	});


//изменение статуса заказа
	$('select[id*=selZak]').change(function(e){
		var otprDan = {};
		e.preventDefault();
		var zak = $(this).attr('zak');
		otprDan.zak_id = $(this).attr('zak');
		otprDan.zak_stat = $(this).val();
		otprDan.a = 'smstat';
		$.post("d.php", otprDan);
		vrem=new Date();
		vremDate=vrem.getDate();
		if (vremDate<10) { vremDate='0'+vremDate; }
		vremMonth=vrem.getMonth();
		vremMonth+=1;
		if (vremMonth<10) { vremMonth='0'+vremMonth; }
		vremYear=vrem.getFullYear();
		//if
		$('#vremStatRed'+$(this).attr('zak')).text(vremDate+'.'+vremMonth+'.'+vremYear);

		if ($(this).val()==6) { $('.pole_zakaz'+zak).attr('disabled','disabled'); }

	});

//Доп инфо пользователей
	$('a[id*=dopInfo]').click(function(e){
		e.preventDefault();
		$('div[id*=dopInfoUser]').hide();
		$('#dopInfoUser'+$(this).attr('user')).show();
	});

//отправить письмо пользователю 1
	/*$('a[id*=otprPismoUser]').click(function(e) {
	 e.preventDefault();
	 var id = '#'+ $(this).attr('hre');
	 var maskHeight = $(document).height();
	 var maskWidth = $(window).width();
	 $('#mask').css({'width':maskWidth,'height':maskHeight});
	 $('#mask').fadeIn(1000);
	 var winH = $(window).height();
	 var winW = $(window).width();
	 $('#poleLoginUser').text($(this).attr('title'));
	 $('#poleEmailUser').val($(this).text());
	 $(id).css('top', winH/2-$(id).height()/2);
	 $(id).css('left', winW/2-$(id).width()/2);
	 $(id).fadeIn(1000);
	 });*/

//отправить письмо пользователю 2
	$('a[id*=otprPismoUser]').click(function(e) {
		e.preventDefault();
		var id = $(this).attr('hre');
		$('#poleLoginUser').text($(this).attr('title'));
		$('#poleEmailUser').val($(this).text());
		$(id).dialog({
			width: 380,
			modal: true,
			resizable: false,
			title: 'Отправить письмо пользователю'
		});
	});

//редактировать статус
	$('#knStatRed').click(function(e) {
		e.preventDefault();
		var id = $(this).attr('hre');
		$('#poleStatNazv').val($('#poleStat :selected').text());
		$('#poleStatId').val($('#poleStat').val());
		$(id).dialog({
			width: 340,
			modal: true,
			resizable: false,
			title: 'Редактировать статус'
		});
	});


//удалить статус
	$('#poleStat').change(function(){
		$('#poleUdStat').val($('#poleStat').val());
	});













	$('#kn_modRed').toggle(function(){

		$('#mesto_modRed').slideDown('500');

	},function(){

		$('#mesto_modRed').slideUp('500');

	});

	function rusVlat(per)
	{
		var rusChars = new Array('а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ч','ц','ш','щ','э','ю','\я','ы','ъ','ь', ' ','А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ч','Ц','Ш','Щ','Э','Ю','\Я',',','.','«','»','"','/','\\','№','#','`','\'','%');
		var transChars = new Array('a','b','v','g','d','e','jo','zh','z','i','j','k','l','m','n','o','p','r','s','t','u','f','h','ch','c','sh','csh','e','ju','ja','y','', '', '-','a','b','v','g','d','e','jo','zh','z','i','j','k','l','m','n','o','p','r','s','t','u','f','h','ch','c','sh','csh','e','ju','ja','','','','','','','','','','','','');

		var from = "";

		from = per;
		//from = from.toLowerCase();
		var to = "";
		var len = from.length;
		var character, isRus;
		for(var i=0; i < len; i++)
		{
			character = from.charAt(i,1);
			isRus = false;
			for(var j=0; j < rusChars.length; j++)
			{
				if(character == rusChars[j])
				{
					isRus = true;
					break;
				}
			}
			to += (isRus) ? transChars[j] : character;
		}
		return to;
	}

	$('#pole_mod_nazv').keyup(function(){
		var fio = $(this).val();
		$('#pole_mod_lat').val(rusVlat(fio));
	});

	$('#pole_news_nazv').keyup(function(){
		var fio = $(this).val();
		$('#pole_news_lat').val(rusVlat(fio));
	});

	$('#pole_cat_name').keyup(function(){
		var fio = $(this).val();
		$('#pole_cat_lat').val(rusVlat(fio));
	});

	$('#pole_tov_nazv').keyup(function(){
		var fio = $(this).val();
		$('#pole_tov_lat').val(rusVlat(fio));
	});

	//добавление/редактирование модуля
	$('#kn_mod').click(function(e){
		$('#pole_mod_nazv, #pole_mod_lat').css('background-color','#ffffff');


		if(!$('#pole_mod_nazv').val()) { $('#pole_mod_nazv').css('background-color','#f49ac1').effect('pulsate', function() {
			$('#pole_mod_nazv').css('background-color','#fde9f1') }); return false; }
		if($("input").is("#pole_mod_lat") && !$('#pole_mod_lat').val()) { $('#pole_mod_lat').css('background-color','#f49ac1').effect('pulsate', function() {
			$('#pole_mod_lat').css('background-color','#fde9f1') }); return false; }

		$('#form_mod').submit();
	});


	$('#kn_kakurl').click(function(){
		$(this).slideUp('500');
		$('#pole_kakurl').slideDown('500');
		$('#pole_kaktext').slideUp('500');
	});

	$('#kn_kaktext').click(function(){

		$('#kn_kakurl').slideDown('500');
		$('#pole_kakurl').slideUp('500');
		$('#pole_kaktext').slideDown('500');
		$('#pole_mod_kakurl').val('');


	});




	//добавление/редактирование новости
	$('#kn_dodnov').click(function(e){
		e.preventDefault();
		$('#pole_news_nazv, #pole_news_lat').css('background-color','#ffffff');
		if (neZap('#pole_news_nazv') && neZap('#pole_news_lat')) { $('#form_nov').submit(); }

		/*	if(!$('#pole_news_nazv').val()) { $('#pole_news_nazv').css('background-color','#f49ac1').effect('pulsate', function() {
		 $('#pole_news_nazv').css('background-color','#fde9f1') }); return false; }
		 if(!$('#pole_news_lat').val()) { $('#pole_news_lat').css('background-color','#f49ac1').effect('pulsate', function() {
		 $('#pole_news_lat').css('background-color','#fde9f1') }); return false; }	*/

//	var zap_text = tinyMCE.get('pole_zap_text').getContent();
//	if(!zap_text) { $('#pusto_text').effect('pulsate', function() {
//        $('#pusto_text').hide(200); }); return false; }


	});


	//ответ на вопрос
	$('.redvop').click(function(){
		var vopr=$(this).attr('vopr');
		$(this).hide();
		$('#vop'+vopr).hide();
		$('#redvopr'+vopr).show();

	});

	//баннеры просмотр
	$('.nazvban').click(function(){
		var kod = $(this).attr('kod');
		var shir = $(this).attr('shir');
		if (shir!=0) { shir = (shir*1)+30; } else { shir = 1000; }
		$('#mesto_ban_kod').html($('#kodban'+kod).html());
		$('#mesto_ban_kod').dialog({
			width: shir,
			modal: true,
			resizable: false,
			title: $(this).text()

		});

	});

	//добавить баннер
	$('#kn_dob_ban').toggle(function(){
		$('#mesto_dob_ban').slideDown('500');
	},function(){
		$('#mesto_dob_ban').slideUp('500');
	});

	$('#kn_dob_banx').click(function(){
		$('#mesto_ban_text').slideDown('500');
		$('#mesto_ban_file').slideUp('500');
		$('#pole_ban_a').val('dobbanx');
		$('#kn_zagr_ban').attr('id','kn_zagr_banx')
	});
	$('#kn_dob_bano').click(function(){
		$('#mesto_ban_text').slideUp('500');
		$('#mesto_ban_file').slideDown('500');
		$('#pole_ban_a').val('dobban');
		$('#kn_zagr_ban').attr('id','kn_zagr_ban')
	});

	$('#kn_zagr_ban').on('click',function(e){
		e.preventDefault();
		$('#pole_ban_nazv, #pole_ban_url').css('background-color','#ffffff');

		if (neZap('#pole_ban_nazv') && neZap('#pole_ban_url') && neZap('#pole_ban_file')) { $('#form_dob_ban').submit(); }

	});
	$('#kn_zagr_banx').on('click',function(e){
		e.preventDefault();
		$('#pole_ban_nazv,#pole_ban_kodx').css('background-color','#ffffff');
		if (neZap('#pole_ban_nazv') && neZap('#pole_ban_kodx')) { $('#form_dob_ban').submit(); }

	});
	$('.ogrkol').click(function(){
		$('#pole_ban_red').val($(this).attr('prmax'));
		$('#pole_ban_reda').val('redprmax');
		$('#pole_ban_id').val($(this).attr('ban_id'));
		$('#mesto_ban_red').dialog({
			width: 340,
			modal: true,
			resizable: false,
			title: 'Ограничить количество показов'
		});

	});

	$('select[id*=pole_ban_mesto]').change(function(){
		var ban_id = $(this).attr('ban_id');
		var ban_mesto = $(this).val();
		$.post("d.php", { a:'banmesto', u: ban_id, c: ban_mesto }, function(d){
			if (d) { alert('Баннер не может быть установлен'); } else {}
		});
	});


	jQuery(function($){
		$.datepicker.regional['ru'] = {
			closeText: 'Закрыть',
			prevText: '&#x3c;Пред',
			nextText: 'След&#x3e;',
			currentText: 'Сегодня',
			monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
				'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
			monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
				'Июл','Авг','Сен','Окт','Ноя','Дек'],
			dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
			dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
			dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
			weekHeader: 'Нед',
			dateFormat: 'dd.mm.yy',
			firstDay: 1,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ''};
		$.datepicker.setDefaults($.datepicker.regional['ru']);
	});


}); //завершение