ymaps.ready(function () {
	var stachkaMap = new ymaps.Map('map', {
			center: [56.1439, 47.248887],
			zoom: 6,
			controls: [],
			behaviors: ['default', 'scrollZoom']
		}),

		StachkaBalloonLayout = ymaps.templateLayoutFactory.createClass(
			'<div class="baloon-layout top">' +
			'<div class="popover-inner">' +
			'<div class="arrow"></div>' +
			'$[[options.contentLayout]]' +
			'</div>' +
			'</div>', {

			build: function () {
				this.constructor.superclass.build.call(this);

				this._$element = $('.baloon-layout', this.getParentElement());

				this.applyElementOffset();

				this._$element.find('.close')
					.on('click', $.proxy(this.onCloseClick, this));
			},

			clear: function () {
				this._$element.find('.close')
					.off('click');

				this.constructor.superclass.clear.call(this);
			},

			applyElementOffset: function () {
				this._$element.css({
					left: -(this._$element[0].offsetWidth / 2),
					top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
				});
			},

			onCloseClick: function (e) {
				e.preventDefault();

				this.events.fire('userclose');
			},

			getShape: function () {
				if(!this._isElement(this._$element)) {
					return MyBalloonLayout.superclass.getShape.call(this);
				}

				var position = this._$element.position();

				return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
					[position.left, position.top], [
						position.left + this._$element[0].offsetWidth,
						position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
					]
				]));
			},

			_isElement: function (element) {
				return element && element[0] && element.find('.arrow')[0];
			}
		}),

		StachkaBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
			'<div class="popover-content"><h1>Регистрация на Стачку 2014 открыта!</h1>' +
			'<div><b>11-12 апреля</b>, Ульяновск, Ленинский Мемориал</div></div>'
		),

		ryazanPlacemark = window.myPlacemark = new ymaps.Placemark([54.629148, 39.735243], {}, {
			iconLayout: 'default#image',
			iconImageHref: 'images/pin1.png',
			iconImageSize: [47, 40],
			iconImageOffset: [-37, -40],
			balloonShadow: false,
			balloonLayout: StachkaBalloonLayout,
			balloonContentLayout: StachkaBalloonContentLayout,
			balloonPanelMaxMapArea: 0,
			hideIconOnBalloonOpen: false,
			balloonOffset: [0, -75]
		}),
		saranskPlacemark = window.myPlacemark = new ymaps.Placemark([54.180925, 45.184792], {}, {
			iconLayout: 'default#image',
			iconImageHref: 'images/pin2.png',
			iconImageSize: [46, 32],
			iconImageOffset: [-38, -32],
			balloonShadow: false,
			balloonLayout: StachkaBalloonLayout,
			balloonContentLayout: StachkaBalloonContentLayout,
			balloonPanelMaxMapArea: 0,
			hideIconOnBalloonOpen: false,
			balloonOffset: [0, -75]
		}),
		ulyanovskPlacemark = window.myPlacemark = new ymaps.Placemark([54.317002, 48.402243], {}, {
			iconLayout: 'default#image',
			iconImageHref: 'images/pin3.png',
			iconImageSize: [57, 49],
			iconImageOffset: [-38, -49],
			balloonShadow: false,
			balloonLayout: StachkaBalloonLayout,
			balloonContentLayout: StachkaBalloonContentLayout,
			balloonPanelMaxMapArea: 0,
			hideIconOnBalloonOpen: false,
			balloonOffset: [0, -75]
		}),
		ufaPlacemark = window.myPlacemark = new ymaps.Placemark([54.734768, 55.957838], {}, {
			iconLayout: 'default#image',
			iconImageHref: 'images/pin4.png',
			iconImageSize: [49, 55],
			iconImageOffset: [-28, -55],
			balloonShadow: false,
			balloonLayout: StachkaBalloonLayout,
			balloonContentLayout: StachkaBalloonContentLayout,
			balloonPanelMaxMapArea: 0,
			hideIconOnBalloonOpen: false,
			balloonOffset: [0, -75]
		});

	stachkaMap.geoObjects
		.add(ryazanPlacemark)
		.add(saranskPlacemark)
		.add(ulyanovskPlacemark)
		.add(ufaPlacemark);
});