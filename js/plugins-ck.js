/**
 * jQuery RoughDraft.js 0.1.3 
 * Copyright Nick Dreckshage, licensed GPL & MIT
 * https://github.com/ndreckshage/roughdraft.js  
 */(function(e, t, n, r) {
    e.RedPen = function(e) {
        this._create(e);
        this._init();
    };
    e.RedPen.settings = {
        author: "bacon",
        illustrator: "placehold",
        categories: [],
        paintColor: [],
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
        },
        ajaxType: "GET"
    };
    e.RedPen.scopeVar = {
        dataTag: "data-",
        paragraphType: "p",
        sentenceType: "s",
        wordType: "w",
        currencyType: "$",
        inputSplit: "/",
        rangeSplit: "-"
    };
    e.RedPen.prototype = {
        _create: function(t) {
            var n = e("[data-draft-repeat]");
            this.options = e.extend(!0, {}, e.RedPen.settings, t);
            this.scopeVar = e.RedPen.scopeVar;
            e.extend(e.expr[":"], {
                parentsFirst: function(t, n, r) {
                    return e(t).parents(r[3]).length < 1;
                }
            });
            n.length && this.scanner(n);
        },
        _init: function() {
            var t = e("[data-draft-text]"), n = e("[data-draft-image]"), r = e("[data-draft-date]"), i = e("[data-draft-number]"), s = e("[data-draft-user]");
            t.length && this.bookClub();
            n.length && this.doodler(n);
            r.length && this.scheduler(r);
            i.length && this.lottery(i);
            s.length && this.socialNetwork(s);
        },
        scanner: function(t) {
            var n, r, i = "draft-repeat", s, o = 0;
            r = t.filter(":parentsFirst([data-draft-repeat])");
            while (r.length > 0) {
                n = e(r[0]);
                s = n.data(i);
                n.removeAttr(this.scopeVar.dataTag + i);
                for (var u = 0; u < s - 1; u++) n.clone(!0, !0).insertAfter(n);
                t = e("[data-draft-repeat]");
                r = t.filter(":parentsFirst([data-draft-repeat])");
                if (o >= 1e3) {
                    console.log("There was an infinite loop error. Please check the loop if you are editing it, or report the error here -- https://github.com/ndreckshage/roughdraft.js/issues/new");
                    break;
                }
                o++;
            }
        },
        bookClub: function() {
            var e = this.options, t = new Array, n = "json", r;
            switch (e.author) {
              case "lorem":
                r = "http://www.randomtext.me/api/lorem/p-20/40-50";
                t = [ "_fixJSON", "_fixParagraphs" ];
                break;
              case "bacon":
                r = "https://baconipsum.com/api/?type=all-meat&paras=20&start-with-lorem=1";
                n = "jsonp";
                t = [ "_fixParagraphs" ];
                break;
              case "hipster":
                r = "http://hipsterjesus.com/api?paras=20&type=hipster-centric&html=false";
                t = [ "_fixJSON", "_fixParagraphs" ];
                break;
              default:
                r = "https://baconipsum.com/api/?type=all-meat&paras=20&start-with-lorem=1";
                n = "jsonp";
                t = [ "_fixParagraphs" ];
            }
            e.customIpsum === !0 ? this._bookStore() : r && n && t ? this._library(r, n, t) : console.log('Please ensure that you have specified a correct remote (JSONP) / local (thesaurus.roughdraft.json) library, and have correctly set the "customIpsum" option.');
        },
        doodler: function(t) {
            var n, r = "draft-image", i, s, o, u;
            for (var a = 0; a < t.length; a++) {
                n = e(t[a]);
                i = n.data(r);
                if (typeof i == "string") {
                    i = i.split("/");
                    s = parseInt(i[0]);
                    o = parseInt(i[1]);
                    if (isNaN(s) || isNaN(o)) {
                        s = !1;
                        o = !1;
                    }
                    if (s && o) {
                        u = this._photoAlbum(s, o);
                        n.attr("src", u).attr("width", s).attr("height", o).removeAttr(this.scopeVar.dataTag + r);
                    } else console.log("Please ensure that you specify Width/Height in the format 250/300 for 250px wide by 300px tall");
                }
            }
        },
        scheduler: function(t) {
            var n, r = "draft-date", i, s, o = new String;
            for (var u = 0; u < t.length; u++) {
                n = e(t[u]);
                i = n.data(r);
                if (typeof i == "string") {
                    i = i.split("/");
                    dateDataLength = i.length;
                    o = "";
                    for (var a = 0; a < i.length; a++) {
                        o += this._datePicker(i[a]);
                        a != i.length - 1 ? o += " " : "";
                    }
                    n.removeAttr(this.scopeVar.dataTag + r);
                    n.text(o);
                }
            }
        },
        lottery: function(t) {
            var n, r = "draft-number", i, s = new String, o, u, a;
            for (var f = 0; f < t.length; f++) {
                n = e(t[f]);
                i = n.data(r);
                i = this._parseNumberFormat(i);
                s = "";
                i.isCurrency && (s += "$");
                o = this._randomizer(i.digitMin, i.digitMax);
                u = this._rangeFinder(o);
                a = this._rangeFinder(i.decimalNumber);
                s += this._randomizer(u.min, u.max);
                i.decimalNumber && (s += "." + this._randomizer(a.min, a.max));
                n.removeAttr(this.scopeVar.dataTag + r);
                n.text(s);
            }
        },
        socialNetwork: function(t) {
            var n = this, r = this.options;
            e.ajax({
                url: "http://www.roughdraftjs.com/api/?number=25",
                dataType: "jsonp",
                type: r.ajaxType,
                timeout: r.timeout,
                success: function(e) {
                    n._johnDoe(e, t);
                },
                error: function() {
                    console.log("There was an error reaching the JSONP API. Please reload as API is hosted in cloud (PAAS). If issue is persistent, please report on Github");
                }
            });
        },
        _library: function(t, n, r) {
            var i = this, s = this.options;
            e.ajax({
                url: t,
                dataType: n,
                type: s.ajaxType,
                timeout: s.timeout,
                success: function(e) {
                    r.length > 0 ? i._deweyDecimal(e, r) : i._speedReader(e);
                },
                error: function() {
                    console.log("There was an error reaching the lorem ipsum JSON API. Please confirm the link, or try a different service if they are down.");
                }
            });
        },
        _bookStore: function() {
            var t = this.options, n = this;
            e.ajax({
                url: t.customIpsumPath,
                dataType: "json",
                async: !1,
                type: t.ajaxType,
                success: function(e) {
                    e[t.author] ? n._speedReader(e[t.author]) : console.log("Please ensure the requested author is in your custom library and is spelled + formatted correctly.");
                },
                error: function() {
                    console.log("The ajax requested could not be completed. Ensure the relative path to your custom library is accurate.");
                }
            });
        },
        _deweyDecimal: function(e, t) {
            var n = t.splice(0, 1)[0];
            n == "_fixJSON" ? this._fixJSON(e, t) : n == "_fixParagraphs" && this._fixParagraphs(e, t);
        },
        _fixJSON: function(e, t) {
            var n = this.options, r = !1, i;
            switch (n.author) {
              case "lorem":
                e = e.text_out;
                r = !0;
                break;
              case "hipster":
                e = e.text;
              default:
            }
            e = JSON.stringify(e);
            e = this._replaceWith(e, "\\r", "<BREAK>");
            e = this._replaceWith(e, "\\n", "<BREAK>");
            if (r) {
                e = this._replaceWith(e, "<p>", "");
                e = this._replaceWith(e, "</p>", "");
            }
            e = JSON.parse(e);
            e = e.split("<BREAK>");
            e = this._removeEmptyIndexes(e);
            t.length > 0 ? this._deweyDecimal(e, t) : this._speedReader(e);
        },
        _fixParagraphs: function(t, n) {
            var r = this, i = new Array, s, o;
            for (var u = 0; u < t.length; u++) {
                o = t[u];
                o = this._replaceWith(o, "...", "<ELLIPSES>");
                o = o.split(".");
                o = this._removeEmptyIndexes(o);
                s = new Array;
                e.each(o, function(e, t) {
                    t = r._replaceWith(t, "<ELLIPSES>", "...");
                    t += ".";
                    t = t.replace(/(^\s+|\s+$)/g, "");
                    s.push(t);
                });
                i.push(s);
            }
            t = i;
            n.length > 0 ? this._deweyDecimal(t, n) : this._speedReader(t);
        },
        _speedReader: function(t) {
            var n, r = e("[data-draft-text]"), i = "draft-text", s = this.scopeVar, o, u, a;
            for (var f = 0; f < r.length; f++) {
                n = e(r[f]);
                o = n.data(i);
                if (typeof o == "string") {
                    o = o.split("/");
                    u = parseInt(o[0]);
                    a = o[1].toLowerCase();
                    if (isNaN(u) || typeof a != "string") {
                        u = !1;
                        a = !1;
                    }
                    if (u && a) {
                        n.removeAttr(s.dataTag + i);
                        this._inceptionLevelOne(n, t, u, a);
                    } else console.log("Please ensure that you specify Paragraph/Sentence/Word in the format 3/S, for 3 sentences");
                }
            }
        },
        _inceptionLevelOne: function(e, t, n, r) {
            var s = t.length, o = new Array, u = new Array, a = new String, f = this.scopeVar, l, c, h;
            if (r == f.paragraphType) {
                while (n > 0) {
                    l = this._randomizer(s);
                    c = t[l];
                    n > 1 ? a = "<br/><br/>" : a = "";
                    c = c.join(" ") + a;
                    u = u.concat(c);
                    n--;
                }
                u = u.join("");
                e.html(u);
            } else {
                for (i = 0; i < s; i++) {
                    c = t[i];
                    o = o.concat(c);
                }
                this._inceptionLevelTwo(e, o, n, r);
            }
        },
        _inceptionLevelTwo: function(e, t, n, r) {
            var i = this.scopeVar, s = t.length, o = this._randomizer(s);
            if (r == i.sentenceType) {
                var u;
                u = this._inceptionLevelTwoKick(n, t, o);
                e.text(u);
            } else if (r = i.wordType) {
                var a = t[o].split(" "), f = 0, l;
                l = this._inceptionLevelTwoKick(n, a, f);
                e.text(l);
            }
        },
        _inceptionLevelTwoKick: function(e, t, n) {
            var r = e, i = t.length, s = new String, o = new String;
            while (e > 0) {
                if (e != r) {
                    n++;
                    n >= i && (n = 0);
                }
                s = t[n];
                e < i && (s += " ");
                o += s;
                e--;
            }
            return o;
        },
        _photoAlbum: function(e, t) {
            var n = !1, r = this.options.illustrator, i = "placehold", s = "placekitten", o = "placedog", u = "baconmockup", a = "lorempixel", f, l, c;
            switch (r) {
              case i:
                break;
              case s:
                break;
              case o:
                break;
              case u:
                break;
              case a:
                break;
              default:
                r = i;
            }
            f = this._waterColor(r);
            l = this._category(r);
            if (r == s) c = "http://placekitten.com/" + f + e + "/" + t; else if (r == o) c = "http://placedog.com/" + f + e + "/" + t; else if (r == u) c = "http://baconmockup.com/" + e + "/" + t; else if (r == a) {
                c = "http://lorempixel.com/" + f + e + "/" + t;
                c += l ? "/" + l : "";
            } else c = "http://placehold.it/" + e + "x" + t + f;
            return c;
        },
        _waterColor: function(e) {
            var t = this.options, n = new Array, r = "placekitten", i = "placedog", s = "lorempixel", o;
            e == r || e == i || e == s ? n = [ !1, "g" ] : n = t.paintColor.length ? t.paintColor : [ "453f35", "e7cead", "b5ab94", "eba434", "64886c", "b15c3a", "b1956c" ];
            o = n.length;
            o = this._randomizer(o);
            o = n[o];
            o ? e == r || e == i || e == s ? o += "/" : o = "/" + o + "/fff" : o = "";
            return o;
        },
        _category: function(e) {
            var t = this.options, n = t.categories, r = "random", i = "lorempixel", s = "";
            if (n.length < 1 || n === "random") switch (e) {
              case i:
                n = [ "abstract", "animals", "business", "cats", "city", "food", "nightlife", "fashion", "people", "nature", "sports", "technics", "transport" ];
                break;
              default:
            }
            if (n.length > 0) {
                s = this._randomizer(n.length);
                s = n[s];
            }
            return s;
        },
        _datePicker: function(e) {
            var t = this.options.calendar, n = new Date, r = !1;
            if (e.split("-").length > 1) {
                e = e.split("-");
                e[1].toLowerCase() == "r" && (r = !0);
                e = e[0];
            }
            if (e == t.dayNumberZeros || e == t.dayTextThree || e == t.dayNumber || e == t.dayText) if (e == t.dayTextThree || e == t.dayText || e == t.dayTextThree) {
                n = n.getDay();
                r === !0 && (n = this._randomizer(7));
                switch (n) {
                  case 0:
                    n = "Sunday";
                    break;
                  case 1:
                    n = "Monday";
                    break;
                  case 2:
                    n = "Tuesday";
                    break;
                  case 3:
                    n = "Wednesday";
                    break;
                  case 4:
                    n = "Thursday";
                    break;
                  case 5:
                    n = "Friday";
                    break;
                  case 6:
                    n = "Saturday";
                    break;
                  default:
                }
                e == t.dayTextThree && (n = n.substr(0, 3));
            } else {
                n = n.getDate();
                r === !0 && (n = this._randomizer(28) + 1);
                e == t.dayNumberZeros && n < 10 && (n = "0" + n.toString());
            } else if (e == t.monthNumberZeros || e == t.monthTextThree || e == t.monthText || e == t.monthNumber) {
                n = n.getMonth();
                r === !0 && (n = this._randomizer(12));
                if (e == t.monthText || e == t.monthTextThree) {
                    switch (n) {
                      case 0:
                        n = "January";
                        break;
                      case 1:
                        n = "February";
                        break;
                      case 2:
                        n = "March";
                        break;
                      case 3:
                        n = "April";
                        break;
                      case 4:
                        n = "May";
                        break;
                      case 5:
                        n = "June";
                        break;
                      case 6:
                        n = "July";
                        break;
                      case 7:
                        n = "August";
                        break;
                      case 8:
                        n = "September";
                        break;
                      case 9:
                        n = "October";
                        break;
                      case 10:
                        n = "November";
                        break;
                      case 11:
                        n = "December";
                        break;
                      default:
                    }
                    e == t.monthTextThree && (n = n.substr(0, 3));
                } else e == t.monthNumberZeros ? n = "0" + (n + 1).toString() : n += 1;
            } else {
                n = n.getFullYear();
                if (r === !0) {
                    n = this._randomizer(25);
                    n < 10 ? n = "0" + n.toString() : n = n.toString();
                    n = "20" + n;
                }
                e == t.yearNumberTwo && (n = n.toString().substr(2, 3));
            }
            return n;
        },
        _parseNumberFormat: function(e) {
            var t = this.scopeVar, n, r, i = new Object;
            e = e.toString();
            if (typeof e == "string") {
                n = e.split(t.inputSplit);
                i = {
                    isCurrency: n[0] === t.currencyType,
                    digitMin: 1,
                    digitMax: 1,
                    decimalNumber: 0
                };
                i.isCurrency && (n = n.slice(1, 3));
                r = n[0].split(t.rangeSplit);
                i.digitMin = +r[0] > 0 ? +r[0] : 1;
                i.digitMax = +r[1] || i.digitMin;
                i.decimalNumber = n[1] ? +n[1] : 0;
            }
            e = i;
            return e;
        },
        _johnDoe: function(t, n) {
            var r, i = "draft-user", s, o = this.scopeVar, u, a, f;
            s = t.length;
            for (var l = 0; l < n.length; l++) {
                r = e(n[l]);
                userRequest = r.data(i);
                record = t[this._randomizer(s)];
                if (typeof userRequest == "string") {
                    switch (userRequest) {
                      case "full":
                        f = record.user.first + " " + record.user.last;
                        break;
                      case "first":
                        f = record.user.first;
                        break;
                      case "last":
                        f = record.user.last;
                        break;
                      case "email":
                        f = record.user.email;
                        break;
                      case "username":
                        f = record.user.username;
                        break;
                      case "twitter":
                        f = "@" + record.user.username.split(".")[0];
                        break;
                      case "phone":
                        f = record.user.phone;
                        break;
                      case "address":
                        f = record.place.address;
                        break;
                      case "city":
                        f = record.place.city;
                        break;
                      case "state":
                        f = record.place.state;
                        break;
                      case "zip":
                        f = record.place.zip;
                        break;
                      case "country":
                        f = record.place.country;
                        break;
                      default:
                        f = "";
                    }
                    r.removeAttr(o.dataTag + i);
                    r.html(f);
                }
            }
        },
        _randomizer: function(e, t) {
            var n;
            t ? n = Math.random() * (t + 1 - e) + e : n = Math.random() * e;
            return Math.floor(n);
        },
        _rangeFinder: function(e) {
            var t = 1, n = 1, r, i, s = new Object;
            r = Math.pow(10, e - 1);
            i = Math.pow(10, e) - 1;
            t *= r;
            n *= i;
            s = {
                min: t,
                max: n
            };
            return s;
        },
        _removeEmptyIndexes: function(t) {
            return e.grep(t, function(e) {
                return e;
            });
        },
        _replaceWith: function(e, t, n) {
            var r = e.indexOf(t);
            while (typeof r == "number" && r > 0) {
                e = e.replace(t, n);
                r = e.indexOf(t);
            }
            return e;
        }
    };
    e.fn.roughDraft = function(t) {
        return this.each(function() {
            e.data(this, "roughdraft", new e.RedPen(t, this));
        });
    };
})(jQuery, window, document);