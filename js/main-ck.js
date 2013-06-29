$(function() {
    var e = $("a.klapp-toggle"), t = $(".intro"), n = $(".to-top"), r = $("body,html"), i = $(".transition"), s = $(".trends-list-toggle"), o = $(".trends-list"), u = $(".scroll");
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
    Grid.init();
    s.on("click", function(e) {
        o.toggleClass("ausgeklappt");
        return !1;
    });
    e.on("click", function(n) {
        t.toggleClass("eingeklappt");
        e.toggleClass("hide");
        return !1;
    });
    $("#left-menu").sidr({
        name: "sidr-left",
        side: "left"
    });
    $("#right-menu").sidr({
        name: "sidr-right",
        side: "right"
    });
    $("#og-grid").mixitup();
    n.on("click", function(e) {
        r.animate({
            scrollTop: 0
        }, 400);
        return !1;
    });
    $.fn.leavePage = function() {
        this.click(function(e) {
            e.preventDefault();
            linkLocation = this.href;
            $("body").fadeOut(500, function() {
                window.location = linkLocation;
            });
        });
    };
    i.leavePage();
    u.click(function(e) {
        e.preventDefault();
        r.animate({
            scrollTop: $(this.hash).offset().top
        }, 500);
    });
});