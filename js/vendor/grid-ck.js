/*
* debouncedresize: special jQuery event that happens once after a window resize
*
* latest version and complete README available on Github:
* https://github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
*
* Copyright 2011 @louis_remi
* Licensed under the MIT license.
*/var $event = $.event, $special, resizeTimeout;

$special = $event.special.debouncedresize = {
    setup: function() {
        $(this).on("resize", $special.handler);
    },
    teardown: function() {
        $(this).off("resize", $special.handler);
    },
    handler: function(e, t) {
        var n = this, r = arguments, i = function() {
            e.type = "debouncedresize";
            $event.dispatch.apply(n, r);
        };
        resizeTimeout && clearTimeout(resizeTimeout);
        t ? i() : resizeTimeout = setTimeout(i, $special.threshold);
    },
    threshold: 250
};

var BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

$.fn.imagesLoaded = function(e) {
    function a() {
        var r = $(o), s = $(u);
        n && (u.length ? n.reject(i, r, s) : n.resolve(i));
        $.isFunction(e) && e.call(t, i, r, s);
    }
    function f(e, t) {
        if (e.src === BLANK || $.inArray(e, s) !== -1) return;
        s.push(e);
        t ? u.push(e) : o.push(e);
        $.data(e, "imagesLoaded", {
            isBroken: t,
            src: e.src
        });
        r && n.notifyWith($(e), [ t, i, $(o), $(u) ]);
        if (i.length === s.length) {
            setTimeout(a);
            i.unbind(".imagesLoaded");
        }
    }
    var t = this, n = $.isFunction($.Deferred) ? $.Deferred() : 0, r = $.isFunction(n.notify), i = t.find("img").add(t.filter("img")), s = [], o = [], u = [];
    $.isPlainObject(e) && $.each(e, function(t, r) {
        t === "callback" ? e = r : n && n[t](r);
    });
    i.length ? i.bind("load.imagesLoaded error.imagesLoaded", function(e) {
        f(e.target, e.type === "error");
    }).each(function(e, t) {
        var n = t.src, r = $.data(t, "imagesLoaded");
        if (r && r.src === n) {
            f(t, r.isBroken);
            return;
        }
        if (t.complete && t.naturalWidth !== undefined) {
            f(t, t.naturalWidth === 0 || t.naturalHeight === 0);
            return;
        }
        if (t.readyState || t.complete) {
            t.src = BLANK;
            t.src = n;
        }
    }) : a();
    return n ? n.promise(t) : t;
};

var Grid = function() {
    function p(t) {
        h = $.extend(!0, {}, h, t);
        e.imagesLoaded(function() {
            d(!0);
            m();
            v();
        });
    }
    function d(e) {
        t.each(function() {
            var t = $(this);
            t.data("offsetTop", t.offset().top);
            e && t.data("height", t.height());
        });
    }
    function v() {
        t.on("click", "span.og-close", function() {
            y();
            return !1;
        }).children("a").on("click", function(e) {
            var t = $(this).parent();
            n === t.index() ? y() : g(t);
            return !1;
        });
        o.on("debouncedresize", function() {
            i = 0;
            r = -1;
            d();
            m();
            var e = $.data(this, "preview");
            typeof e != "undefined" && y();
        });
    }
    function m() {
        u = {
            width: o.width(),
            height: o.height()
        };
    }
    function g(e) {
        var t = $.data(this, "preview"), n = e.data("offsetTop");
        i = 0;
        if (typeof t != "undefined") {
            if (r === n) {
                t.update(e);
                return !1;
            }
            n > r && (i = t.height);
            y();
        }
        r = n;
        t = $.data(this, "preview", new b(e));
        t.open();
    }
    function y() {
        n = -1;
        var e = $.data(this, "preview");
        e.close();
        $.removeData(this, "preview");
    }
    function b(e) {
        this.$item = e;
        this.expandedIdx = this.$item.index();
        this.create();
        this.update();
        $("a.comment-toggle").on("click", function(e) {
            $(".og-expanded").toggleClass("ausgeklappt");
            $(".og-expander").toggleClass("ausgeklappt");
            return !1;
        });
    }
    var e = $("#og-grid"), t = e.children("li"), n = -1, r = -1, i = 0, s = 10, o = $(window), u, a = $("html, body"), f = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        msTransition: "MSTransitionEnd",
        transition: "transitionend"
    }, l = f[Modernizr.prefixed("transition")], c = Modernizr.csstransitions, h = {
        minHeight: 530,
        speed: 350,
        easing: "ease"
    };
    b.prototype = {
        create: function() {
            this.$title = $("<h3></h3>");
            this.$description = $('<a href="#"></a>');
            this.$descripted = $('<div class="detail-item"><i class="icon-tag"></i></div>').append(this.$description);
            this.$year = $("<span></span>");
            this.$uploader = $('<a href="#"></a>');
            this.$uploaded = $('<div class="detail-item"><i class="icon-upload-alt"></i></div>').append(this.$uploader);
            this.$comments = $("<span></span>");
            this.$commented = $('<div class="detail-item"><i class="icon-comments"></i></div>').append(this.$comments);
            this.$likes = $("<span></span>");
            this.$liked = $('<div class="detail-item"><i class="icon-heart"></i></div>').append(this.$likes);
            this.$like = $('<button class="button like"><i class="icon-heart"></i>Gefällt mir</button>');
            this.$comment = $('<button class="button comment"><i class="icon-comments"></i>Kommentare</button>');
            this.$share = $('<button class="button share"><i class="icon-share"></i>Teilen</button>');
            this.$buttonbox = $('<div class="button-box"></div>').append(this.$like, this.$share);
            this.$commenttoggle = $('<a class="comment-toggle">Kommentare ausklappen</a>');
            this.$href = $('<a href="#" class="detail-title"></a>').append(this.$title, this.$year);
            this.$details = $('<div class="og-details"></div>').append(this.$href, this.$uploaded, this.$descripted, this.$commented, this.$liked, this.$buttonbox, this.$commenttoggle);
            this.$loading = $('<div class="og-loading"></div>');
            this.$fullimage = $('<div class="og-fullimg"></div>').append(this.$loading);
            this.$closePreview = $('<span class="og-close"></span>');
            this.$commentinner = $('<div class="comment-container"> <div class="comments-section"> <div class="comment-box"> <div class="avatar-box"> <img src="img/avatar/1.jpg"> </div> <div class="text-box"> <h4>Max Mustermann</h4> <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p> <p><b>vor 12 Stunden</b></p> </div> </div> <div class="comment-box"> <div class="avatar-box"> <img src="img/avatar/2.jpg"> </div> <div class="text-box"> <h4>Max Mustermann</h4> <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p> <p><b>vor 12 Stunden</b></p> </div> </div> <div class="comment-box"> <div class="avatar-box"> <img src="img/avatar/3.jpg"> </div> <div class="text-box"> <h4>Max Mustermann</h4> <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p> <p><b>vor 12 Stunden</b></p> </div> </div> <div class="comment-box"> <div class="avatar-box"> <img src="img/avatar/4.jpg"> </div> <div class="text-box"> <h4>Max Mustermann</h4> <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p> <p><b>vor 12 Stunden</b></p> </div> </div> <div class="comment-box"> <div class="avatar-box"> <img src="img/avatar/5.jpg"> </div> <div class="text-box"> <h4>Max Mustermann</h4> <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p> <p><b>vor 12 Stunden</b></p> </div> </div> <div class="comment-box"> <div class="avatar-box"> <img src="img/avatar/6.jpg"> </div> <div class="text-box"> <h4>Max Mustermann</h4> <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p> <p><b>vor 12 Stunden</b></p> </div> </div> <div class="comment-box"> <div class="avatar-box"> <img src="img/avatar/me.jpg"> </div> <div class="text-box"> <form> <textarea></textarea> <a href="#"><i class="icon-edit"></i>Absenden</a> </form> </div> </div> </div> <div class="likes-section"> <h4>Gefällt das</h4> <ul> <li><img src="img/avatar/1.jpg"></li> <li><img src="img/avatar/2.jpg"></li> <li><img src="img/avatar/7.jpg"></li> <li><img src="img/avatar/3.jpg"></li> <li><img src="img/avatar/6.jpg"></li> <li><img src="img/avatar/9.jpg"></li> <li><img src="img/avatar/8.jpg"></li> <li><img src="img/avatar/4.jpg"></li> <li><img src="img/avatar/10.jpg"></li> <li><img src="img/avatar/11.jpg"></li> </ul> </div> </div>');
            this.$previewInner = $('<div class="og-expander-inner"></div>').append(this.$closePreview, this.$fullimage, this.$details);
            this.$previewEl = $('<div class="og-expander"></div>').append(this.$previewInner, this.$commentinner);
            this.$item.append(this.getEl());
            c && this.setTransition();
        },
        update: function(e) {
            e && (this.$item = e);
            if (n !== -1) {
                var r = t.eq(n);
                r.removeClass("og-expanded");
                this.$item.addClass("og-expanded");
                this.positionPreview();
            }
            n = this.$item.index();
            var i = this.$item.children("a"), s = {
                href: i.attr("href"),
                largesrc: i.data("largesrc"),
                title: i.data("title"),
                description: i.data("description"),
                year: i.data("year"),
                uploader: i.data("uploader"),
                comments: i.data("comments"),
                likes: i.data("likes")
            };
            this.$title.html(s.title);
            this.$description.html(s.description);
            this.$year.html(s.year);
            this.$uploader.html(s.uploader);
            this.$comments.html(s.comments);
            this.$likes.html(s.likes);
            this.$href.attr("href", s.href);
            var o = this;
            typeof o.$largeImg != "undefined" && o.$largeImg.remove();
            if (o.$fullimage.is(":visible")) {
                this.$loading.show();
                $("<img/>").load(function() {
                    var e = $(this);
                    if (e.attr("src") === o.$item.children("a").data("largesrc")) {
                        o.$loading.hide();
                        o.$fullimage.find("img").remove();
                        o.$largeImg = e.fadeIn(350);
                        o.$fullimage.append(o.$largeImg);
                    }
                }).attr("src", s.largesrc);
            }
        },
        open: function() {
            setTimeout($.proxy(function() {
                this.setHeights();
                this.positionPreview();
            }, this), 25);
        },
        close: function() {
            var e = this, n = function() {
                c && $(this).off(l);
                e.$item.removeClass("og-expanded");
                e.$previewEl.remove();
            };
            setTimeout($.proxy(function() {
                typeof this.$largeImg != "undefined" && this.$largeImg.fadeOut("fast");
                this.$previewEl.css("height", 0);
                var e = t.eq(this.expandedIdx);
                e.css("height", e.data("height")).on(l, n);
                c || n.call();
            }, this), 25);
            return !1;
        },
        calcHeight: function() {
            var e = u.height - this.$item.data("height") - s, t = u.height;
            if (e < h.minHeight) {
                e = h.minHeight;
                t = h.minHeight + this.$item.data("height") + s;
            }
            this.height = e;
            this.itemHeight = t;
        },
        setHeights: function() {
            var e = this, t = function() {
                c && e.$item.off(l);
                e.$item.addClass("og-expanded");
            };
            this.calcHeight();
            this.$previewEl.css("height", this.height);
            this.$item.css("height", this.itemHeight).on(l, t);
            c || t.call();
        },
        positionPreview: function() {
            var e = this.$item.data("offsetTop"), t = this.$previewEl.offset().top - i, n = this.height + this.$item.data("height") + s <= u.height ? e : this.height < u.height ? t - (u.height - this.height) : t;
            a.animate({
                scrollTop: n
            }, h.speed);
        },
        setTransition: function() {
            this.$previewEl.css("transition", "height " + h.speed + "ms " + h.easing);
            this.$item.css("transition", "height " + h.speed + "ms " + h.easing);
        },
        getEl: function() {
            return this.$previewEl;
        }
    };
    return {
        init: p
    };
}();