$(function(){
  var klapp = $("a.klapp-toggle");
  var intro = $(".intro");

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

	klapp.on("click", function(e){
	  intro.toggleClass('eingeklappt');
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


});

