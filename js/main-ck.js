$(function() {
    var e = $("a.klapp-toggle"), t = $(".intro"), n = $(".to-top"), r = $(".menu-toggle"), i = $("body,html"), s = $(".transition"), o = $(".trends-list-toggle"), u = $(".trends-list"), a = $(".scroll"), f = $("section.head");
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
    o.on("click", function(e) {
        u.toggleClass("ausgeklappt");
        return !1;
    });
    e.on("click", function(n) {
        t.toggleClass("eingeklappt");
        e.toggleClass("hide");
        return !1;
    });
    r.on("click", function(e) {
        f.toggleClass("ausgeklappt");
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
        i.animate({
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
    s.leavePage();
    a.click(function(e) {
        e.preventDefault();
        i.animate({
            scrollTop: $(this.hash).offset().top
        }, 500);
    });
});