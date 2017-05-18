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
				navigationPosition: 'right',
				scrollingSpeed: 500,
				easingcss3: 'cubic-bezier(0.77, 0, 0.175, 1)',
				sectionSelector: '.landing-elem',
				responsiveWidth: 740,
				keyboardScrolling: true,
				fitToSection: true,
				fitToSectionDelay: 500,
				afterRender: function(){
					elemN = conf.landEl.filter('.active')
					elNIndex = elemN.index();
					ChangeHeader(elNIndex);
					UpFirst(elemN);
					if(isMobile() == false){
						setHide = TweenLite.set(trg, {
							directionalRotation: { 
								rotationX: "-90_cw"
							},
	            y: 40 
	          });
					}

				},
				onLeave: function(index, nextIndex, direction){
					if(isMobile() == false){
						setHide = TweenLite.set(trg, {
							// opacity: 0,
							directionalRotation: { 
								rotationX: "90_cw"
							},
							y: 40,
							delay: .4
						});
					}
					elemC = conf.landEl.eq(index - 1);
					elemN = conf.landEl.eq(nextIndex - 1);
					ChangeHeader(nextIndex - 1);
					UpFirst(elemN);

				}
			});
			conf.body.css('height','100$')
		}
	}LandingFullPage();
	function UpFirst(elemNext, elemCurr){
		if(isMobile() == false){
			var trgUp = elemNext.find('.animate-up');
			var trgUp2 = elemNext.find('.animate-up2');
			var trgbg = elemNext.find('.animate-bg');
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
		}
	}
	function ChangeHeader(index){
		if(index === 0){
			conf.header.removeClass(conf.hidden).removeClass(conf.blk).removeClass(conf.white);
		}else{
			var elem = conf.landEl.eq(index).find('.wrapper');
			if(elem.hasClass(conf.blk)){
				conf.header.addClass(conf.blk).removeClass(conf.white);
			}else if(elem.hasClass(conf.white) || elem.hasClass(conf.gray)){
				conf.header.addClass(conf.white).removeClass(conf.blk);	
			}else{
				return false
			}
		}
		if(index > 0){
			conf.header.addClass(conf.hidden);
		}
		

	}

//end of document.ready
});
//end of document.ready
var slideArrr = '<button type="button" class="carousel-next"><svg class="icon icon-drop"><use xlink:href="#slider-arrow" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>';
var slideArrl = '<button type="button" class="carousel-prev"><svg class="icon icon-drop"><use xlink:href="#slider-arrow" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></button>';

function slidesCount(elem) {
	var container = elem.parent().find('.slider-counter'),
		curSlideCont = container.find('.slider-curr'),
		totatSlideCont = container.find('.slider-total'),
		pages;

	elem.on('init reInit breakpoint beforeChange', function(event, slick, currentSlide, nextSlide) {
		var slidesShown = parseInt(slick.slickGetOption('slidesToShow')),
			slidesScroll = parseInt(slick.slickGetOption('slidesToScroll')),
			slidesNext = parseInt(nextSlide),
			totalSlides = parseInt(slick.slideCount),
			totalPages = Math.ceil(totalSlides / slidesShown),
			curPage = event.type == 'init' || event.type == 'reInit' || event.type == 'breakpoint' ? 0 : parseInt(slidesNext / slidesScroll);
		totatSlideCont.text(slidesShown == 1 ? totalSlides : totalPages)
		curSlideCont.text(curPage + 1)
	});
}

jQuery.fn.toggleText = function() {
	var altText = this.data("alt-text"),
		target = this.find('span');
	if (altText) {
		this.data("alt-text", target.text());
		target.text(altText);
	}
};


function initCustomSelectList() {
	var _conf = {
			initClass: 'cs-active',
			f: {}
		},
		_items = $('.js-select-custom');
	$.each(_items, function() {
		var _select = $(this),
			_button = _select.find('button'),
			placeholder = _button.data('placeholder'),
			_list = _select.find('.select-list');
		_select.on('reinit', function() {
			var _active = _list.find('input:checked');
			if ($(this).hasClass('depends-on')) {
				var item = $(this).closest('.input-item');
				if (_active.length) {
					var next = item.nextAll('.input-item').find('.depends-on');
					next.removeClass('disabled').find('input').prop('checked', false);
					next.trigger('reinit');
				} else {
					var next = item.nextAll('.input-item').find('.depends-on');
					next.addClass('disabled').find('input').prop('checked', false);
					next.trigger('reinit');
				}
			}
			if (_active.length) {
				if ($(this).hasClass('price-total')) {
					_button.children('.btn-text').addClass('active').html(_active.siblings('.elem-price').html()).parent().addClass('is-checked')
				} else {
					_button.children('.btn-text').addClass('active').text('' + _active.siblings('span').text() + '').parent().addClass('is-checked')
				}
			} else {
				_button.children('.btn-text').removeClass('active').text(_button.data('placeholder')).parent().removeClass('is-checked');
			}
			CheckForSelect($(this).parents('form'));
		});
		_button.off('click').on('click', function() {
			_button.parent().toggleClass('active').siblings().removeClass('active');
			return (false);
		});
		_select.off('click').on('click', 'label', function() {
			var _label = $(this),
				_input = _label.find('input');
			_input.prop('checked', true);
			_select.trigger('reinit');
			_button.parent().removeClass('active');
		});
		_select.trigger('reinit');
		_select.addClass(_conf.initClass);
		 $(document).on('mouseup', function (e){
			if (!_select.is(e.target)
				&& _select.has(e.target).length === 0) {
				_select.removeClass('active');
			}
		});
	});
}


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
				onValidate: function($form) {
					CheckForSelect(form_this);
				}
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
			_cont = _popup.find('.modal-container:not(.response)')
		_response = _popup.find('.response');

		_this.c.header.removeClass(_this.conf.header_class);
		_popup.removeClass(_this.conf.active_class);
		_this.c.body.removeClass(_this.conf.body_class).removeAttr('style');
		$(window).scrollTop(_res);
		setTimeout(function() {
			_cont.removeAttr('style');
			_response.css('display', 'none');
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
	if (form.closest('.modal-container').length) {
		var cont = form.closest('.modal-container'),
			resp = cont.next('.response');
		if (resp.length) {
			cont.fadeOut("slow", function() {
				resp.fadeIn("slow");
			});
		}
	}
}
function isMobile()
{
   return (/Android|webOS|iPhone|iPod|BlackBerry|Windows Phone|iemobile/i.test(navigator.userAgent) );
}