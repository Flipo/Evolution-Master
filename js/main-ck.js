$(function() {
    $(window).roughDraft({
        author: "hipster",
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
});