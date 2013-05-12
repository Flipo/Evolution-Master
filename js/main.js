$(function(){

  $(window).roughDraft({
	  author      : 'hipster',
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

	$("#filter-nav").tinyNav({
	  active: 'selected', // String: Set the "active" class
	  label: 'Jahr:' // String: Sets the <label> text for the <select> (if not set, no label will be added)
	});

	Grid.init();

});

