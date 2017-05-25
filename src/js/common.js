$(window).on('load', function() {
	openOnLoad();
});
document.addEventListener("DOMContentLoaded", function() {
var conf = {
	body: $('body'),
	header: $('.page__header'),
	html: $('html'),
	landEl: $('.landing-elem'),
	blk: 'blk',
	white: 'white',
	gray: 'gray',
	hidden: 'is-hidden'
};
	(function() {
		var mainHeader = document.querySelector('.cd-auto-hide-header');

		$(window).on('scroll', function() {
			requestAnimationFrame(autoHideHeader);
		});

		function autoHideHeader() {
			var currentTop = $(document).scrollTop();
			checkSimpleNavigation(currentTop);
		}

		function checkSimpleNavigation(currentTop) {
			if (currentTop <= 20) {
				mainHeader.classList.remove('is-hidden');
			} else {
				mainHeader.classList.add('is-hidden');
			}
		}
	})();

	function Menu() {
		var trigger = $('.js-menu'),
			target = $('.header-menu-wrap'),
			header = $('.page__header'),
			body = $('body'),
			OpenClass = 'active',
			OpenClass2 = 'menu-open';
		trigger.add(target).on('click', function() {

			if (!trigger.hasClass('anim')) {
				trigger.addClass('anim');
				scrollbody(OpenClass2);
				body.add(header).toggleClass(OpenClass2);
				target.toggleClass(OpenClass);
				if(trigger.hasClass(OpenClass)){
					setTimeout(function(){
						trigger.removeClass(OpenClass);
					},400);
				}else{
					trigger.addClass(OpenClass);
				}
				setTimeout(function() {
					trigger.removeClass('anim')
				}, 500);
			}

		})
		$('.header-menu-inner').click(function(e) {
			e.stopPropagation();
		});
	}
	Menu();

	function scrollbody(classcheck) {
		var body = $('body');
		if (!body.hasClass(classcheck)) {
			var _h = body.scrollTop();
			if (_h === 0) {
				_h = $('html').scrollTop();
			}
			body.css('top', -_h)
		} else {
			var _h = parseInt(body.css('top')),
				_res = Math.abs(_h);
			body.css('top', '')
			setTimeout(function() {
				$(window).add(body).scrollTop(_res);
			}, 10)
		}
	}

	$(".js-scroll-to").on('click', function(e) {
		e.preventDefault();
		var elementClick = $(this).data("href");
		var target = $('body').find('[data-id="' + elementClick + '"]');
		$(".aside-stick").trigger("sticky_kit:recalc");
		if (target.length) {
			var destination = $(target).offset().top,
				pad = window.matchMedia('(max-width: 991px)').matches ? 70 : 90;
			$("html, body:not(:animated), .out:not(:animated)").animate({
				scrollTop: destination - pad
			}, 500);
			setTimeout(function() {
				window.location.hash = elementClick;
			}, 400)
		}
	});

	popUpsInit();
	validateForms();

	function LandingFullPage(){
		var elem = $('.landing-wrapper');
		if(elem.length){
			var trg = conf.landEl.find('.animate-up');
			var trg2 = conf.landEl.find('.animate-up2');
			var trg2 = conf.landEl.find('.animate-bg');
			
			var elemN , elNIndex, elemC,setHide;
			elem.fullpage({
				navigation: true,
				navigationPosition: 'right',
				scrollingSpeed: 500,
				easingcss3: 'cubic-bezier(0.77, 0, 0.175, 1)',
				sectionSelector: '.landing-elem',
				responsiveWidth: 740,
				keyboardScrolling: true,
				verticalCentered: false,
				afterRender: function(){
					elemN = conf.landEl.filter('.active')
					elNIndex = elemN.index();
					ChangeHeader(elNIndex);
					UpFirst(elemN);
				},
				afterResize: function(){
					elemN = conf.landEl.filter('.active')
					elNIndex = elemN.index();
					ChangeHeader(elNIndex);
				},
				onLeave: function(index, nextIndex, direction){
					elemC = conf.landEl.eq(index - 1);
					elemN = conf.landEl.eq(nextIndex - 1);
					ChangeHeader(nextIndex - 1);
					UpFirst(elemN);
				}
			});
			conf.body.css('height','100$')
		}
	}LandingFullPage();
	function ScrollHead(){
		if(!conf.html.hasClass('fp-enabled')){
			var container = $('.page-head-inner');
			var windowHeight = $(window).innerHeight();
			var scrollArea = windowHeight;
			var square1 = container.find('.animate-up');
			var square2 = container.closest('.wrapper').find('.page-cover');
			var b = square1.height();
			var range = parseInt($('.page-head').innerHeight() / 2);
			var coef1 =  window.matchMedia("(max-width: 768px)").matches ? 0.5 : 0.2;
			var coef2 =  window.matchMedia("(max-width: 768px)").matches ? 0.3 : 0.1;
			$(window).on('resize',function(){
				setTimeout(function(){
					windowHeight = $(window).innerHeight();
					scrollArea = windowHeight;
					b = square1.height();
					range = parseInt($('.page-head').innerHeight() / 2);
					coef1 =  window.matchMedia("(max-width: 768px)").matches ? 0.5 : 0.2;
					coef2 =  window.matchMedia("(max-width: 768px)").matches ? 0.3 : 0.1;
					Movehead(scrollArea,square1,b,range);

				});
			});
			$(window).on('scroll', function() {
				Movehead(scrollArea,square1,b,range);
			});

			function Movehead(area,elem,elemh,range){
			  var scrollTop = window.pageYOffset || window.scrollTop;
			  var scrollPercent = scrollTop/area || 0;
			  var offset = elem.offset().top;
				offset = offset + elemh / 2;
				var calc = 1 - (scrollTop - offset + range) / range;
				if(scrollTop < windowHeight * 1.5){
					TweenLite.set(square1, {
						y: scrollPercent*window.innerWidth*coef1,
					});
					TweenLite.set(square2, {
						y: scrollPercent*window.innerWidth*coef2,
					});	
				}
				if(scrollTop === undefined){
					setTimeout(function(){
						TweenLite.set(square1, {
							y: 0,
						});
						TweenLite.set(square2, {
							y: 0,
						});		
					},1);
				}

				square1.css({ 'opacity': calc });
				console.log(calc,range)
				if ( calc > '1' ) {
					square1.css({ 'opacity': 1 });
				} else if ( calc < '0' || calc == NaN ) {
					square1.css({ 'opacity': 0 });
				}
			}
		}
		
	}ScrollHead();
	function UpFirst(elemNext, elemCurr){
		if(isMobile() == false){
			var trgUp = elemNext.find('.animate-up');
			var trgUp2 = elemNext.find('.animate-up2');
			var trgbg = elemNext.find('.animate-bg');
			TweenLite.set(trgUp, {
				directionalRotation: { 
					rotationX: "90_cw"
				},
				y: 40,
			});
			TweenLite.set(trgUp2, {		
				directionalRotation: { 
					rotationX: "90_cw"
				},
				y: 40,
			});
			TweenLite.from(trgbg, .2,{
					y: -80,
					scale: 1.1,
					transformOrigin: "50% 50%",
					delay: .3
			});
			TweenLite.to(trgUp, .5 ,{
				ease: Expo.easeOut,
				directionalRotation: {
					rotationX: "0_cw"
				},
				y: 0,  
				transformOrigin:"50% 50% -100%",
				opacity: 1,
				delay: .5
			});
			TweenLite.to(trgUp2, .5 ,{
				ease: Expo.easeOut,
				directionalRotation: {
					rotationX: "0_cw"
				},
				y: 0,  
				transformOrigin:"50% 50% -100%",
				opacity: 1,
				delay: .6
			});
		}
	}
	function ChangeHeader(index){
		if(index === 0){
			conf.header.add('#fp-nav').removeClass(conf.hidden).removeClass(conf.blk).removeClass(conf.white);
		}else{
			var elem = conf.landEl.eq(index).find('.wrapper');
			if(elem.hasClass(conf.blk)){
				conf.header.add('#fp-nav').addClass(conf.blk).removeClass(conf.white);
			}else if(elem.hasClass(conf.white) || elem.hasClass(conf.gray)){
				conf.header.add('#fp-nav').addClass(conf.white).removeClass(conf.blk);	
			}else{
				return false
			}
		}
		if(index > 0){
			conf.header.addClass(conf.hidden);
		}
	}
	function stars(){
		var parent = $('.js-stars'),
			items = parent.find('.star-item'),
			target = parent.find('.rev-hidden');

		items.click(function(e) {
			$(this).closest('.input-wrapper').removeClass('has-error').addClass('has-success');
			e.preventDefault();
			num = parseInt($(this).data("num"));
			i = 1;
			for (i = 1; i <= num; i++) {
				$("#rev-star-" + i).addClass('active');
			}
			for (i = num + 1; i <= 5; i++) {
				$("#rev-star-" + i).removeClass('active');
			}
			target.val(num);

			return false;
		});
	}stars();
	function datepick(){
		var dtepick = $(".datepicker");
		dtepick.each(function(){
			var _ = $(this),
				form = _.closest('.bronvo-form'),
				frmTo = form.find('.datepicker[name=dto]')
			_.datepicker({
				inline: true,
				dateFormat: "dd/mm/yy",
				minDate: 0,
				firstDay: 1,
				dayNames: ["Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье", "Понедельник"],
				dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
				dayNamesShort: ["Пон", "Втр", "Срд", "Чет", "Пят", "Суб", "Вск"],
				monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
				onSelect: function( selectedDate ) {
					if ($(this).attr('name') == 'dfrom') {
						var dt = $(this).datepicker('getDate');
						if (dt) {
							dt.setDate(dt.getDate() + 1);
							frmTo.datepicker( "setDate", dt );
							frmTo.datepicker( "option", "minDate", dt );
						}
					}
				}
			});
		});
		function make_url_params(elem) {
			var form = elem.closest('.bronvo-form'),
				lcode = form.find('input[name=lcode]').val(),
				dfrom = form.find('input[name=dfrom]').val(),
				dfto = form.find('input[name=dto]').val();

			var url_params = 'lcode=' +lcode+ 
							 '&dfrom='+dfrom+ 
							 '&dto='+dfto;
						 
				url_params += '&lang='+'ru';
			
			
			return url_params;
		}
		
		$('.bronvo-form button[type=submit]').click(function(e){
			var wb_url = '';
			window.open('https://wubook.net/wbkd/wbk/?'+ make_url_params($(this)), 'wubook', 'width=840, height=840, scrollbars=yes, toolbar=yes, location=1, resizable=1');
			return false;
		});
	}datepick()
	Slider();
//end of document.ready
});
//end of document.ready
function Slider(){
	var trg = $('.js-slider');
	if(trg.length){
		var arr = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="449 348 621.6 465.6" enable-background="new 449 348 621.6 465.6" xml:space="preserve"><g><defs><path id="SVarrow_1_" d="M813.5,564.3c0.2,1.5,0.6,3,2.6,5l8.7,8.8l1.2,1.2c0.5,0.5,0.3,0.2,0.4,0.4l0.5,0.4c0.3,0.3,0.6,0.6,0.7,0.9c0,0.1,0.1,0.3,0.2,0.4c-0.2,0.3,0.1,0.4,1.4,1c0.3,0.1-0.1,0.8-0.4,0.8c-1.7-0.1-2.2-0.2-2.3,0.1l0,0.1l-0.3,0.5c-0.2,0.4-0.4,0.7-0.5,1.1c-0.3,0.8-0.4,1.7-0.5,2.6c-2.7,2.1-4.6,6.9-8.3,6.5c-0.8-0.1-3.8,2.1-4.9,3.4c-3.8,4.8-6.8,10.1-12.6,13.4c-1.2,4.6-5.2,6-8.6,8.5c-5.8,4.3-11.4,9.1-14.7,15.5c-0.6,1.1-2.3,3.1-3.3,3.5c-2.7,1.3-4.9,3.5-7.3,5.8l-18.9,18.6c-1,0.9-2.5,2.5-2.5,3c-0.2,4.3-4.2,6.3-7.7,8.8c-1.3,1-3.1,2.6-3.7,3.7c-2.1,3.8-5.1,5.9-8.4,8.4c-2,1.5-3.9,3.8-5.5,5.9c-3,3.9-4,8.8-10.1,11c-0.7,0.3-2.6,2.6-3.4,4c-2.9,5.2-9.7,9-11.8,14.5c-0.1,0.3-1.3,1.1-2,1.6c-7.2,4.5-12,11.4-16.7,17.6c-3.3,4.4-6.3,8.7-10.9,11.8c-3.9,2.6-3.8,5.8-5.9,7.8c-2.4,2.4-6,3.2-8.6,6.7c-0.8,1-1.3,2.1-1.9,3.1c-0.9,1.8-1.8,3.5-2.7,5.3c-4.3,8.7-6.5,16.3-4.9,22c0.5,1.9,2.5,1.7,5.4-0.7c16-13.1,30.9-27.8,45.8-42.5c2.2-2.1,3.5-4.1,3.7-6.1c0.1-1.3,0.5-2.7,2.5-2.9c2.5-0.2,4.8-2.3,7.2-4.7l10.5-11.2l38.4-40.5c18.6-19.5,38.6-37.6,56.9-57.5c4.6-4.9,8.5-9.4,10.3-15c4.2-0.1,7.6-2.9,11.5-7l10.2-10.6l17.6-17.9l-18.2-18l-17.7-17.8c-1.6-1.6-3.6-3.5-5.2-4.2c-1.8-0.8-3.2-0.4-4.9-0.5c-2-7.2-3.3-9.9-7.8-12.9c-5.4-3.5-9.8-6.9-12.8-12.6c-0.5-0.9-1.7-2.2-2.7-3c-10.7-8.8-19.1-20-29.5-29.3c-11.7-10.5-22.6-22.1-34-33.1c-2.6-2.5-5.5-4.8-8.2-7c-4.4-3.5-4.4-3.4-3.9-7.7l-0.2-0.6c-4.2-4.4-4.2-4.4-7.7-4l0.1,1.1c-0.1-0.2-0.2-0.4-0.2-0.6c0-0.2,0.1-0.3,0.2-0.5l0.8-4.6l0,0.1c-5.1-4.4-10.3-8.7-12.4-14.5c-0.3-0.9-1.5-2.4-2.4-3.1c-4.4-3.6-8.4-8.6-13.5-10.5c-1.6-0.6-3.9-3.3-5.9-5l-0.3-0.1c-3.3-1.8-3.6-5.6-5.8-6.8c-5-2.8-8.1-6.7-11.1-11.1c-0.6-0.9-2.2-2.3-2.9-2.6c-3.7-1.3-6-3.7-8.1-7.5c-0.9-1.6-3-2.7-3.6-2.1c-2.1,2.3-4.7,4.2-2.4,10c1.2,3.1,1.5,5.8,2.6,8.8c1.9,5.4,4.3,10.9,9.5,16.8c2.1,2.4,4.4,5.2,5.5,7.5c3.5,7.3,10.1,14.3,14.6,21.4c1.5,2.3,3.2,4.1,5.6,5.5c2.7,1.5,9.6,7.8,12,10.6c0.6,0.7,1.3,1.3,2,2l1-0.9l-0.1,0l-0.9,0.9c0,1.4,0.4,3.9,2.5,4.3c4.2,0.9,8.3,6.3,12.4,7.6c0.8,0.3,3.6,3.6,3.9,4.7c1.3,5.4,5.7,9.3,10.6,12.2c4.3,2.6,7.8,4.8,9.8,9.6c0.3,0.8,1.7,2,2.7,3c7.8,7.8,15.4,15.8,23.8,22.9c1.3,1.1,2.6,2.7,3.5,4c4.9,6.9,11.4,12,17.5,17.4c1.9,1.7,4.7,2.3,6.3,4c1.8,1.9,2.6,4.5,4.1,6.8c0.9,1.4,2.4,2.9,3.8,4C799,552,805.8,559.2,813.5,564.3L813.5,564.3z M684.4,749.2c0.1-0.2,1-0.5,1.6-0.8c-0.1,0.3-0.1,0.6-0.3,0.9l-4.2,5l0.1,0.7l-0.1-0.7C682.5,752.5,683.4,750.8,684.4,749.2z M655.5,384.2c0.6,0,1.4,0.3,2.1,0.5c0.1,0.5,0.3,1.3,0.1,1.5c-0.2,0.2-1-0.2-1.5-0.3C655.9,385.3,655.3,384.2,655.5,384.2z M680.1,748l0.6,0.1c-0.4,0.3-0.8,0.6-1.4,1C679.7,748.6,679.9,748.3,680.1,748z M831.3,605.9l0.4-0.7l0.4,0.1L831.3,605.9z M670,770.5l0,0.6l-0.6,0.1L670,770.5z"/></defs><clipPath id="SVarrow_2_"><use xlink:href="#SVarrow_1_"  overflow="visible"/></clipPath><g clip-path="url(#SVarrow_2_)"><defs><rect id="SVarrow_3_" x="624.6" y="348" width="253.5" height="465.6"/></defs><clipPath id="SVarrow_4_"><use xlink:href="#SVarrow_3_"  overflow="visible"/></clipPath><g clip-path="url(#SVarrow_4_)"><image overflow="visible" width="2590" height="1940" xlink:href="../img/gold.jpg"  transform="matrix(0.24 0 0 0.24 449 347.9571)"></image></g></g></g></svg>';
		trg.each(function(){
			var _ = $(this);
			_.flickity({
				imagesLoaded: true,
				percentPosition: true,
				cellSelector: '.slider-element',
				accessibility: true,
				pageDots: false,
				setGallerySize: false
			});
			var imgs = _.find('.slider-element .slider-element-inner');
			// get transform property
			var docStyle = document.documentElement.style;
			var transformProp = typeof docStyle.transform == 'string' ?
			  'transform' : 'WebkitTransform';
			// get Flickity instance
			var flkty = _.data('flickity');

			_.on( 'scroll.flickity', function() {
			  flkty.slides.forEach( function( slide, i ) {
				var img = imgs[i];
				var x = ( slide.target + flkty.x ) * -1/3;
				TweenLite.set(img, {
					x: x,
				});
				// img.style[ transformProp ] = 'translateX(' + x  + 'px)';
			  });
			});
			var btns = _.find('.flickity-prev-next-button');
			btns.find('svg').remove();
			btns.append(arr);

		});
	}
}
jQuery.fn.toggleText = function() {
	var altText = this.data("alt-text"),
		target = this.find('span');
	if (altText) {
		this.data("alt-text", target.text());
		target.text(altText);
	}
};




function validateForms() {
	var form_form = $('.js-validate');
	if (form_form.length) {
		form_form.each(function() {
			var form_this = $(this);
			var parent = form_this.parent();
			$.validate({
				form: form_this,
				modules: 'logic',
				borderColorOnError: true,
				scrollToTopOnError: false,
				onSuccess: function($form) {
					formResponse(form_this);
				},
			});
		});
	}
}

function popUpsInit() {
	var _this = this;
	_this.b = {
		open: $('.js-popup-button')
	};
	_this.c = {
		popup: $('.js-popup-container'),
		body: $('body'),
		header: $('.page__header'),
	};
	_this.f = {};
	_this.conf = {
		body_class: 'modal_open',
		active_class: 'active',
		close_selector: '.closePopup',
		initial_class: 'popup-initialed',
		header_class: 'is-hidden'
	};
	var _h;
	_this.f.initModalActions = function(_popup) {
		/**
		 * Close buttons.
		 */
		$(_popup).on('click', '.modal-container', function(e) {
			if (!$(_this.conf.close_selector).is(e.target)) {
				e.stopPropagation();
			}
		});
		_popup.find(_this.conf.close_selector).add(_popup).off('click.popup').on('click.popup', function() {
			_this.f.closePopup(_popup);
		});
	};
	_this.f.closePopup = function(_popup) {
		var _res = Math.abs(_h),
			_cont = _popup.find('.modal-container-content:not(.response)')
		_response = _popup.find('.response');
			console.log(conf.html,conf.body)
		if($('html').hasClass('fp-enabled')){
			$('body').hasClass('fp-viewing-0') ? _this.c.header.removeClass(_this.conf.header_class) : false;
		}else{
			_this.c.header.removeClass(_this.conf.header_class);
		}
		
		_popup.removeClass(_this.conf.active_class);
		_this.c.body.removeClass(_this.conf.body_class).removeAttr('style');
		$(window).scrollTop(_res);
		setTimeout(function() {
			_cont.removeAttr('style');
			_response.removeClass('visible');
		}, 500);
	};
	_this.f.openPopup = function(_popup) {
		_h = _this.c.body.scrollTop();
		if (_h === 0) {
			_h = $('html').scrollTop();
		}
		
		setTimeout(function() {
			_popup.addClass(_this.conf.active_class);
			_this.c.body.addClass(_this.conf.body_class).css('top', -_h);
		}, 10);
		setTimeout(function() {
			_this.c.header.addClass(_this.conf.header_class);
		}, 50)
		
	};
	/**
	 * Initial.
	 */
	$.each(_this.c.popup.not('.' + _this.conf.initial_class), function() {
		var _popup = $(this);
		_this.f.initModalActions(_popup);
		_popup.off('reinit').on('reinit', function() {
			_this.f.initModalActions(_popup);
		});
		_popup.addClass(_this.conf.initial_class);
	});
	_this.b.open.off('click.popup').on('click.popup', function(e) {
		e.preventDefault();
		var _b = $(this),
			_popup = _this.c.popup.filter('[data-modal="' + _b.data('modal') + '"]');
		_this.f.openPopup(_popup);
		return false;
	});
}

function openOnLoad() {
	var scrollItem = window.location.hash,
		target = $("[data-id='" + scrollItem + "']");
	window.scrollTo(0, 0);
	if (target.length) {
		setTimeout(function() {
			var destination = target.offset().top;


			$("html,body:not(:animated)").animate({
				scrollTop: destination - 60
			}, 500);
			target.hasClass('js-tab-trigger') ? target.trigger('click') : false;
		}, 100);
	}
}

function formResponse(form) {
	if (form.closest('.modal-container-content').length) {
		var cont = form.closest('.modal-container-content'),
			resp = cont.next('.response');
		if (resp.length) {
			cont.fadeOut("slow", function() {
				resp.addClass("visible");
			});
		}
	}
}
function isMobile()
{
   return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent) );
}