$(function() {

	function heightDetect() {
		$(".header__main").css("height", $(window).height());
	};
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	});

	$('.s_portfolio li').click(function() {
		$('.s_portfolio li').removeClass('active');
		$(this).addClass('active');
	});

	$('.portfolio_items-container').mixItUp();

	$('.popup').magnificPopup({
		type: 'image',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		removalDelay: 500,
		mainClass: 'mfp-fade'
	});

	$(".portfolio_item").magnificPopup({
		delegate: 'a',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		mainClass: 'my-mfp-zoom-in',
		removalDelay: 300,
		type: "inline"
	});

	$(".portfolio_item").each(function(i) {
		$(this).find("a").attr("href", "#work_" + i);
		$(this).find(".portfolio_item-descr").attr("id", "work_" + i);
	});

	$(".section_title").animated("fadeInUp", "fadeOutDown");

	$('.work .resume_item').animated("fadeInLeft", "fadeOutDown");
	$('.studies .resume_item').animated("fadeInRight", "fadeOutDown");
	$('.skills').animated("fadeInRight", "fadeOutDown");
	$('.foto').animated('fadeIn', 'fadeOutDown');
	$('.content').animated("fadeInLeft", "fadeOutDown");


	$(".hamburger").click(function() {
		$(".hamburger").toggleClass("is-active");
	});

	$(".navigations ul a").click(function() {
		$(".navigations").fadeOut(600);
		$(".hamburger").toggleClass("is-active");
		$(".name_wrapper").css("opacity", "1");
	});

	$("input, select, textarea").jqBootstrapValidation();

	$(".hamburger").click(function() {
		if ($(".navigations").is(":visible")) {
			$(".name_wrapper").css("opacity", "1");
			$(".navigations").fadeOut(600);
			$(".navigations li a").removeClass("fadeInUp animated");
		} else {
			$(".name_wrapper").css("opacity", ".1");
			$(".navigations").fadeIn(500);
			$(".navigations li a").addClass("fadeInUp animated");
		};
	});

	$(".navigations ul a").mPageScroll2id();

});

$(window).on('load', function() {
	$('.preloader').delay(400).fadeOut('slow');

	$(".name_wrapper h1").animated("fadeInDown", "fadeOutUp");
	$(".name_wrapper p").animated("fadeInUp", "fadeOutDown");
});
