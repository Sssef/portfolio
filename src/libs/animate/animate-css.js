//Animate CSS + WayPoints javaScript Plugin
//Example: $(".element").animated("zoomInUp, "zoomOutDown");
(function($) {
	$.fn.animated = function(inEffect, outEffect) {
		$(this).each(function() {
			var ths = $(this);
			ths.css("opacity", "0").addClass("animated").waypoint(function(dir) {
				if (dir === "down") {
					ths.addClass(inEffect).removeClass(outEffect).css("opacity", "1");
				} else {
					ths.addClass(outEffect).removeClass(inEffect).css("opacity", "1")
				};
			}, {
				offset: "80%"
			});

		});
	};
})(jQuery);
