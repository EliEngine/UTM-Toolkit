// ELI TOOLKIT 0.1
// AUTHOR(S): Elien van Riet

(function(window){
	function eliToolkit(){
		var _eliToolkitObject = {};

		// Hier schrijven we alle methods!

		// Return alle URL params in 1 string 
		_eliToolkitObject.alleUTM = function() {
			var data = window.location.search.slice(1);
			return data;
		}

		// Return individuele URL params op basis van naam
		_eliToolkitObject.losseUTM = function(name) {
			name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
			return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}

		// Alles in 1 cookiebanner
		_eliToolkitObject.cookieBanner = function() {
			return "work in progress....";
		}

		// Maak per URL param een hidden field in het formulier
		_eliToolkitObject.maakHiddenFields = function(formID = "form") {
			var formObj = $("#"+formID);
			var utmRaw = location.search.substring(1);
			var utmObj = JSON.parse('{"' + utmRaw.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });

			$.each(utmObj, function(key, value) {
				if (!key.includes('utm')) { return; }
				$('<input>').attr({
						type: 'hidden',
						id: key,
						name: key,
						value: value,
				}).appendTo(formObj);
			});
		}

		// Vind alle CTA's en plak UTM codes in de href
		_eliToolkitObject.utmNaarAlleCTA = function(ctaID = "btn-cta") {
			var ctaBtnObj = $('*[id^="' + ctaID + '"]'); 
			ctaBtnObj.each(function() {
			    var url = $(this).attr('href');
			    $(this).attr('href', url + "?" + window.location.search.slice(1));
			});
		}

		// Lees het formulier, serialize de data en plak dit onder de submit button (brutefore submit method=GET)
		_eliToolkitObject.formDataNaarVolgendePagina = function(form = "form", url) {
			$("#"+form).find('input[type=submit]').click(function(e) {
				setTimeout(
					function() 
					{
						window.location.replace(url + "?" + $("#"+form).serialize());
					}, 2000);
			});
		}

		// Haal alle non-utm params uit de url en populate een form
		_eliToolkitObject.vulFormMetUrlParams = function(formID = "form") {
            var formObj = $("#"+formID);
            var paramsRaw = location.search.substring(1);
            var paramsObj = JSON.parse('{"' + paramsRaw.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });

            $.each(paramsObj, function(key, value) {
                if (key.includes('utm')) { return; }
                $("input[name='"+key+"']").val(value);
            });
        }
        
		return _eliToolkitObject;
	}

	if (typeof(window.eli) === 'undefined'){
		window.eli = eliToolkit();
	}
})(window);