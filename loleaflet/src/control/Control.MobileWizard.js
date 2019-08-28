/* -*- js-indent-level: 8 -*- */
/*
 * L.Control.MobileWizard
 */

/* global $ */
L.Control.MobileWizard = L.Control.extend({

	_inMainMenu: true,
	_isActive: false,

	onAdd: function (map) {
		map.on('mobilewizard', this._onMobileWizard, this);
		map.on('closemobilewizard', this._hideWizard, this);

		this._setupBackButton();
	},

	_setupBackButton: function() {
		var that = this;
		var backButton = $('#mobile-wizard-back');
		backButton.click(function() {
			if (that._inMainMenu) {
				that._hideWizard();
			} else {
				$('.ui-content.mobile-wizard').hide('slide', { direction: 'right' }, 'fast', function() {
					$('.ui-header.mobile-wizard').show('slide', { direction: 'left' }, 'fast');
				});
				that._inMainMenu = true;
			}
		});
	},

	_showWizard: function() {
		$('#mobile-wizard').show();
	},

	_hideWizard: function() {
		$('#mobile-wizard').hide();
		$('#mobile-wizard-content').empty();
		this._isActive = false;
	},

	_hideKeyboard: function() {
		document.activeElement.blur();
	},

	_setTitle: function(title) {
		var right = $('#mobile-wizard-title');
		right.text(title);
	},

	_onMobileWizard: function(data) {
		if (!this._isActive) {
			this._isActive = true;

			this._showWizard();

			this._hideKeyboard();

			console.log(data);
		}
	}
});

L.control.mobileWizard = function (options) {
	return new L.Control.MobileWizard(options);
};