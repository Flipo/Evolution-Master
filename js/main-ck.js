$(function() {
    var e = $("a.klapp-toggle"), t = $(".intro");
    $(window).roughDraft({
        author: "bacon",
        illustrator: "placehold",
        paintColor: [ "d8d8d8" ],
        customIpsum: !1,
        timeout: 5e3,
        customIpsumPath: "/roughdraft.thesaurus.json",
        calendar: {
            dayNumber: "j",
            dayNumberZeros: "d",
            dayText: "l",
            dayTextThree: "D",
            monthNumber: "n",
            monthNumberZeros: "m",
            monthText: "F",
            monthTextThree: "M",
            yearNumber: "Y",
            yearNumberTwo: "y"
        }
    });
    $("#filter-nav").tinyNav({
        active: "selected"
    });
    Grid.init();
    e.on("click", function(e) {
        t.toggleClass("eingeklappt");
        return !1;
    });
});