$(function(){
  var klapp = $("a.klapp-toggle");
  var intro = $(".intro");
  var scrollTop = $(".to-top");
  var menu = $(".menu-toggle");
  var body = $('body,html');
  var transition = $('.transition');
  var trends = $('.trends-list-toggle');
  var trendselect = $('.trends-list');
  var scroll = $(".scroll");
  var head = $("section.head");

  $(window).roughDraft({
	  author      : 'bacon',
	  illustrator : 'placehold',
	  paintColor  : ['d8d8d8'],
	  customIpsum : false,
	  timeout: 5000,
	  customIpsumPath: '/roughdraft.thesaurus.json',
	  calendar: {
	    dayNumber        : 'j',
	    dayNumberZeros   : 'd',
	    dayText          : 'l',
	    dayTextThree     : 'D',
	    monthNumber      : 'n',
	    monthNumberZeros : 'm',
	    monthText        : 'F',
	    monthTextThree   : 'M',
	    yearNumber       : 'Y',
	    yearNumberTwo    : 'y'
	  }
	});

	Grid.init();

	trends.on("click", function(e){
	  trendselect.toggleClass('ausgeklappt');
	  return false;
	});

	klapp.on("click", function(e){
	  intro.toggleClass('eingeklappt');
	  klapp.toggleClass('hide');
	  return false;
	});

	menu.on("click", function(e){
	  head.toggleClass('ausgeklappt');
	  return false;
	});

	 $('#left-menu').sidr({
		 name: 'sidr-left',
		 side: 'left' // By default
	});

	$('#right-menu').sidr({
		name: 'sidr-right',
		side: 'right'
	});

	$('#og-grid').mixitup();

	scrollTop.on("click", function(e){
	  body.animate({ scrollTop: 0 }, 400);
	  return false;
	});


	/*
	* Function to animate leaving a page
	*/
	$.fn.leavePage = function() {

		this.click(function(event){

			// Don't go to the next page yet.
			event.preventDefault();
			linkLocation = this.href;

			// Fade out this page first.
			$('body').fadeOut(500, function(){

				// Then go to the next page.
				window.location = linkLocation;
			});
		});
	};

	/*
	* Call the leavePage function upon link clicks with the "transition" class
	*/
	transition.leavePage();
	scroll.click(function(event){ // When a link with the .scroll class is clicked
            event.preventDefault(); // Prevent the default action from occurring
            body.animate({scrollTop:$(this.hash).offset().top}, 500); // Animate the scroll to this link's href value
        });




});

