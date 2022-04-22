(function (root, factory) {
    /* CommonJS */
    if (typeof exports == "object") module.exports = factory();
    /* AMD module */
    else if (typeof define == "function" && define.amd) define(factory);

    /* 修改: 将 wwclassName 改为元素标识 */
    else root.videojs1 = factory();
}(this, function () {
    "use strict";

    /* 修改: 将 wwclassName 改为元素标识 */
    var wwclassName = /*INSBEGIN:WWCLSNAME*/
        "videojs1"
        /*INSEND:WWCLSNAME*/
        ;

    /* BEGIN: 加载依赖部分
    // 无依赖资源请使用本函数
    function loadDependence(fncallback) {
      if (typeof fncallback === "function") {
        fncallback();
      }
    }
    //*/
    // 有依赖资源使用本函数
    // 使用方式:
    //  - 将"插件名"设置为具体插件标识, 通常就是插件名称, 不可为中文. 如: swiper
    //  - 如libs中无该插件, 则申请添加该插件
    //  - 将"插件路径"设置为具体插件路径, 通常为js文件, 省略路径中, 开头的"/"和结尾的".js". 如: "/libs/qrcodejs/qrcode.js" 应写为 "libs/qrcodejs/qrcode"
    //  - require 函数第一个参数, 传入依赖资源数组. 通常为config中配置的`插件名`. 可能还包括css文件
    //   - css文件的格式, 以"css!"开头, 省略路径开头的"/"和路径结尾的".css". 如: "/libs/noty/lib/noty.css" 应写为 ""css!libs/noty/lib/noty""
    //  - require 函数第二个参数是个回调函数, 该函数可能会传入参数. 参数与前面数组位置对应. 如不清楚, 自行查阅 (requirejs)[http://requirejs.org/] 文档
    //*
    var loadDependence = function (fncallback) {
        // 本模板只支持一个依赖库，如果需要多个依赖库，需要改进。
        if (!window.wwload.videojs) {
            window.wwload.videojs = "wait";
            var language = $('[data-wwclass="videojs"]').attr("data-lang");
            var languagejs;
            if (language) {
                languagejs = "libs/video.js/dist/lang/" + language;
                // console.log(languagejs);
            } else {
                languagejs = "libs/video.js/dist/lang/zh-CN";
            }
            requirejs.config({
                paths: {
                    "videojs": "libs/video.js/dist/video.min",
                    'video-ads-js': "libs/videojs-extraplay/dist/videojs.ads.min", //dist/videojs.ads.min
                    "vjs-resolution-switcher": "libs/vjs-resolution-switcher/lib/videojs-resolution-switcher",
                    "video-hls-js": "libs/videojs-contrib-hls/dist/videojs-contrib-hls.min",
                    //设置倍速
                    "videojs-download-button": "libs/videojs-download-button/videojs-download-button.min",
                    "language": languagejs
                },
                "shim": {
                    "video-ads-js": {
                        deps: ["add-video-js-in-global-scope"],
                        exports: "ads"
                    },
                    "vjs-resolution-switcher": {
                        deps: ["videojs"],
                    },
                    "video-hls-js": {
                        deps: ["add-video-js-in-global-scope"],
                    },
                    "language": {
                        deps: ["add-video-js-in-global-scope"],
                    },
                    "videojs-download-button": {
                        deps: ["add-video-js-in-global-scope"],
                    }

                }
            });
            define("video.js", [], function () {
                return window.videojs;
            });
            define("add-video-js-in-global-scope", ["videojs"], function (videojs) {
                window.videojs = videojs;
            });
            require(["video-ads-js", "videojs-download-button", "video-hls-js", "vjs-resolution-switcher", "language", "css!libs/videojs-download-button/videojs-download-button", "css!libs/videojs-extraplay/dist/videojs.ads", "css!libs/video.js/dist/video-js", "css!libs/vjs-resolution-switcher/lib/videojs-resolution-switcher", "css!js/_wwplugins/videojs1/videojs1"], function (ads) {
                window.wwload.videojs = true;
                replace();
                fncallback();
            });
        } else if (window.wwload.videojs === "wait") {
            setTimeout(function () {
                loadDependence(fncallback);
            }, 100);
        } else {
            replace();
            fncallback();
        }

        function replace() {
            loadDependence = function (fncallback) {
                fncallback();
            };
        }
    };
    //*/
    // END: 加载依赖部分


    // BEGIN: 元素首次初始化处理
    var init = function () {
        // 重写初始化函数
        init = function () {
            return true;
        };
        $.wwclass.addEvtinHandler(wwclassName, evtInHandler);

        // 如有初始化动作, 请在下方添加
    };
    // END: 元素首次初始化处理/oceans.mp4

    //string转化为boolean
    function isTrue(data) {
        if (data == "false") {
            return false;
        }
        return !!data;
    }
    //去除数组中的空src项
    function getJsonItem(arrayData) {
        for (var item = 0; item < arrayData.length; item++) {
            // jsonItem.push(jsonData[item].name);
            if (arrayData[item].src === "") {
                arrayData.splice(item, 1);
                item = item - 1;
            }
        }
        return arrayData;
    }

    function getOptions($ele) {
        var config = {};
        try {
            config.element = $ele.find("video")[0];
            config.vsrc = $ele.attr("data--vsrc");
            config.autoplay = isTrue($ele.attr("data-autoplay"));
            config.loop = isTrue($ele.attr("data-loop"));
            // config.width = $ele.attr("data-width");
            // config.height = $ele.attr("data-height");
            // config.fluid = isTrue($ele.attr("data-fluid"));
            // config.yesheight= $ele.attr("data-yesheight");
            config.adssrc = $ele.attr("data-adssrc");
            var upsrc = $.wwclass.helper.getJSONprop($ele, "data-upsrc");
            if (upsrc && upsrc.length > 0) {
                config.upsrc = $.wwclass.helper.getJSONprop($ele, "data-upsrc");
            }
            config.yeshls = isTrue($ele.attr("data-yeshls"));
            // console.log("是否开启直播:"+ config.yeshls);
            config.preload = $ele.attr("data-preload");
            config.lang = $ele.attr("data-lang");
            config.adshref = $ele.attr("data-adshref");
            config.poster = $ele.attr("data--poster");
            config.currentTime = $ele.attr("data--historytime");
            config.exitfullscreen = $ele.attr("data--exitfullscreen");

            config.downloadButton = $ele.attr("data-downloadbutton");

            config.withCredentials = isTrue($ele.attr("data-withcredentials")) || true;
            config.muted = isTrue($ele.attr("data--muted"));
        } catch (e) {
            console.log(e);
        }
        return config;
    }

    function video_ads_init($ele, player) {
        var config = getOptions($ele);
        try {
            if (config.adssrc && config.adssrc !== "undefined") {
                // initialize the ad framework
                player.ads({
                    debug: true,
                    // stitchedAds:true
                });
                player.ads.contentSrc = config.adssrc;
                // request ads whenever there's new video content
                player.on('contentupdate', function () {
                    // fetch ad inventory asynchronously, then ...
                    player.trigger('adsready');
                });
                player.on('readyforpreroll', function () {
                    player.one('adstart', function () {
                        $.wwclass.helper.anijsTrigger($ele, "wwadstart");
                        player.controls(false);
                    });
                    player.ads.startLinearAdMode();
                    // play your linear ad content
                    player.src(config.adssrc);
                    $ele.find(".vjs-loading-spinner").removeClass("vjs-loading-spinner");
                    // when all your linear ads have finished… do not confuse this with `ended`
                    player.one('adended', function () {
                        player.ads.endLinearAdMode();
                        $.wwclass.helper.anijsTrigger($ele, "wwadsend");
                        player.controls(true);
                    });
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    function video_upsrc_init($ele, player) {
        var config = getOptions($ele);
        try {
            if (config.upsrc) {
                player.updateSrc(getJsonItem(config.upsrc));
                player.currentResolution(config.upsrc[0].label);
                player.on('resolutionchange', function () {
                    console.info('Source changed to %s', player.src());
                    $.wwclass.helper.anijsTrigger($ele, "wwresolutionchange");
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    function getSourceType($ele) {
        var config = getOptions($ele);
        var type, array = [];
        if (config.vsrc) {
            try {
                array = config.vsrc.split(".");
                var vsrc_type = array[array.length - 1];
                switch (vsrc_type.substring(0, 3)) {
                    case "mp4":
                        type = "video/mp4";
                        break;
                    case "web":
                        if (vsrc_type === "webm" || vsrc_type.substring(0, 4) === "webm") {
                            type = "video/webm";
                        }
                        break;
                    case "ogv":
                        type = "video/ogg";
                        break;
                    case "m3u":
                        if (vsrc_type === "m3u8" || vsrc_type.substring(0, 4) === "m3u8") {
                            type = "application/x-mpegURL";
                        }
                        break;
                    default:
                        console.log();
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            $.wwclass.helper.anijsTrigger($ele, "videoNoCompatible");
            console.log("无法找到此视频兼容的源");
        }
        return type;
    }

    function videojs_init($ele, options) {
        var config = getOptions($ele);
        var type = getSourceType($ele);
        if (!config.upsrc) {
            var html = '<source src="' + config.vsrc + '" type="' + type + '"/>';
            $ele.find("video").html(html);
        }
        var videoPlayer = videojs(config.element, options, function () {
            $.wwclass.helper.anijsTrigger($ele, "video.init");
            var player = this;
            // setTimeout(function() {
            video_ads_init($ele, player);
            video_upsrc_init($ele, player);

            // }, 100);
        });


        if (config.downloadButton == "true") {
            videoPlayer.downloadButton();
        }


        if (config.poster) {
            videoPlayer.poster(config.poster);
        }


        // if (config.currentTime) {
        //     alert(config.currentTime);
        //     videoPlayer.currentTime(config.currentTime);
        // }


        var setTimeFlag = 1; // 用于安卓监听timeupdate，currentTime只赋值一次
        var userAgent_m = navigator.userAgent;
        if (userAgent_m.indexOf("iPhone") > -1 || userAgent_m.indexOf("iOS") > -1) {
            // ios
            videoPlayer.on("canplay", function () {
                videoPlayer.currentTime(config.currentTime);
            });
        }
        else {
            videoPlayer.currentTime(config.currentTime);
        }


        if (config.exitfullscreen) {
            videoPlayer.exitFullscreen();
        }

        if (config.autoplay || config.adssrc) {
            videoPlayer.autoplay(true);
        }
        // if (config.preload) {
        //  videoPlayer.preload(true);
        // }
        if (config.loop) {
            videoPlayer.loop(true);
        }
        if (config.muted) {
            videoPlayer.muted(true);
        }
        if (config.adssrc) {
            $ele.on("click", "video", function () {
                setTimeout(function () {
                    if (videoPlayer.ads.state === "ad-playback") {
                        var adshref = $ele.attr("data-adshref");
                        window.open(adshref);
                    }
                }, 1000);
            });
        }
        $ele.data("videoPlayer", videoPlayer);
    }

    /*
     * @description 初始化每个元素
     * @param {jQuery object} $ele - 需要初始化的元素
     */
    function processElement($ele) {
        /* 如果本元素废弃, 请解开此处注释, 并完成代码
        console.error("扩展元素(" + $ele.attr("data--wwclass") + ")已废弃, 找对应产品更换为xxx实现本功能", $ele);
        //*/
        // 对 $ele 元素做对应处理
        setTimeout(function () {
            var config = {};

            config.setbtn = $ele.attr("data-setbtn");
            config.setupBtn = $ele.attr("data-setup");
            if (config.setbtn === "true") {
                config.setup = JSON.parse(config.setupBtn)

                var set_up = {
                    "playbackRates": config.setup
                };

                var setup = JSON.stringify(set_up);

                $ele.find('.vjs-default-skin').attr("data-setup", setup);
            }


            var nowPlay = true; //在规定时间内触发事件使用
            var config = getOptions($ele);
            var options;
            if (config.yeshls) {
                var option = {
                    hls: {
                        // type: 'application/x-mpegURL',
                        withCredentials: config.withCredentials,
                        overrideNative: true, //需要改为可设置项
                        enableLowInitialPlaylist: true //需要改为可设置项
                    }
                };
                options = {
                    controls: true,
                    flash: option,
                    html5: option,
                };
            } else if (config.upsrc) {
                options = {
                    controls: true,
                    language: config.lang,
                    plugins: {
                        videoJsResolutionSwitcher: {
                            default: 'low',
                            // dynamicLabel: true
                        }
                    }
                };
            } else {
                options = {
                    controls: true,
                    language: config.lang
                };
            }
            // console.log("options");
            // console.log(options);
            videojs_init($ele, options);
            var videoPlayer = $ele.data("videoPlayer");

            videoPlayer.on("pause", function () {
                // console.log("暂停");
                $.wwclass.helper.updateProp($ele, "data-x-state", "pause");
            });

            videoPlayer.on("error", function (e) {
                // console.log(videoPlayer.error().code);
                // console.log(videoPlayer.error().message);
                var errorCode = videoPlayer.error().code;
                var errorMessage = videoPlayer.error().message;
                $.wwclass.helper.updateProp($ele, "data-x-errorcode", errorCode);
                $.wwclass.helper.updateProp($ele, "data-x-errormessage", errorMessage);
            });

            videoPlayer.on("play", function () {
                $.wwclass.helper.updateProp($ele, "data-x-state", "play");
                $.wwclass.helper.anijsTrigger($ele, "videoplay");
                // console.log("播放");
            });

            videoPlayer.on('timeupdate', function () {
                // console.log('Current time => ' + this.currentTime());
                // console.log('Duration => ' + this.duration());
                var div = $ele.find(".vjs-remaining-time-display");
                var span = $ele.find(".vjs-remaining-time-display").find(".vjs-control-text");
                var obj = $ele.find(".vjs-remaining-time-display").clone();
                obj.find(".vjs-control-text").remove();
                var text = obj.text();
                var newtext = text.replace("-", "");
                div.empty();
                div.html(span);
                div.append(newtext);
                $.wwclass.helper.anijsTrigger($ele, "video.timeupdate");
                $.wwclass.helper.updateProp($ele, "data-x-currenttime", this.currentTime());
                $.wwclass.helper.updateProp($ele, "data-x-videotime", this.duration());
                var nowtime = Number($ele.attr("data-nowtime"));
                if (nowtime && this.currentTime() > nowtime && nowPlay) {
                    $.wwclass.helper.anijsTrigger($ele, "timeout");
                    nowPlay = false;
                }
            });
            videoPlayer.on("ended", function () {
                nowPlay = true;
                $.wwclass.helper.anijsTrigger($ele, "videoend");
            })
            videoPlayer.on("play", function () {
                var div = $ele.find(".vjs-remaining-time-display");
                var span = $ele.find(".vjs-remaining-time-display").find(".vjs-control-text");
                var obj = $ele.find(".vjs-remaining-time-display").clone();
                obj.find(".vjs-control-text").remove();
                var text = obj.text();
                var newtext = text.replace("-", "");
                div.empty();
                div.html(span);
                div.append(newtext);
            });
            videoPlayer.on("ready", function () {
                $.wwclass.helper.updateProp($ele, "data-x-inited", true);

            });

            // var i = 1;
            // var oldheight = $ele.find("video").css("height");
            // videoPlayer.on("fullscreenchange", function (e) {
            //     if ((i % 2) === 0) {
            //         $ele.find("video").css("height", oldheight);
            //         $.wwclass.helper.anijsTrigger($ele, "nofullscreenclick");
            //     } else {
            //         $ele.find("video").css("height", "100vh");
            //         $.wwclass.helper.anijsTrigger($ele, "fullscreenclick");
            //     }
            //     i++;
            // });

            var oldheight = $ele.find("video").css("height");
            videoPlayer.on("fullscreenchange", function () {
                var isFullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
                if (isFullScreen) {
                    //  进入全屏
                    //console.log('进入全屏')
                    $ele.find("video").css("height", "100vh");
                    $.wwclass.helper.anijsTrigger($ele, "fullscreenclick");
                } else {
                    //  退出全屏
                    //console.log('退出全屏')
                    $ele.find("video").css("height", oldheight);
                    $.wwclass.helper.anijsTrigger($ele, "nofullscreenclick");
                }

            });

        }, 300);




        //添加视频播放完触发的事件
        // var md = document.getElementsByTagName("video")[1];
        // console.log(md);
        // md.addEventListener("ended", function () {
        //     //alert("播放结束");
        //     $.wwclass.helper.anijsTrigger($ele, "videoended");
        // });

    }

    /*
     * @description 析构每个元素, 也就是该元素该删除时的处理代码
     * @param {jQuery object} $ele - 需要处理的元素
     */
    function finalizeElement($ele) {
        // 对 $ele 元素做对应处理
    }

    // BEGIN: 监听属性处理
    /*
     * @description 监听函数, 元素的控制属性(data--)改变时处理
     * @param {jQuery object} $ele - 控制属性改变的元素
     * @param {string} attribute - 控制属性的名称
     * @param {string} value - 控制属性改变为何值
     */
    var evtInHandler = function ($ele, attribute, value) {
        var videoPlayer = $ele.data("videoPlayer");
        if (videoPlayer) {
            switch (attribute) {
                case "data--vsrc":
                    // 处理动作
                    // console.log(videoPlayer.networkState());
                    if (videoPlayer.networkState() !== 0) {
                        // console.log(videoPlayer.networkState());
                        value = $ele.attr("data--vsrc");
                        var type = getSourceType($ele);
                        if (value !== undefined) {
                            if (value.indexOf("blob") != -1) {
                                $ele.find("video").empty();
                                $ele.find("video").attr("src", value);
                                // videoPlayer.src(value);
                                var html = '<source src="' + value + '"/>';
                                $ele.find("video").html(html);
                                videoPlayer.play();
                            } else if (type == "video/mp4" || type == "video/webm" || type == "video/ogv") {
                                // console.log( value );
                                videoPlayer.src(value);
                            } else if (type == "application/x-mpegURL") {
                                // console.log(value);
                                var withCredentials = $ele.attr("data-withcredentials");
                                videoPlayer.src({
                                    src: value,
                                    type: 'application/x-mpegURL',
                                    withCredentials: withCredentials //是否允许带服务器上的cookie。带上cookie cors会严格验证，不允许源标头设置为*
                                });
                            } else {
                                $.wwclass.helper.anijsTrigger($ele, "videofail");
                                console.log("目前视频播放器不支持您使用的视频源格式。");
                            }
                        }
                    } else {
                        console.log("断网");
                    }
                    break;
                case "data--poster":
                    if (value) {
                        videoPlayer.poster(value);
                    }
                    break;

                case "data--historytime":
                    if (value) {
                        videoPlayer.currentTime(value);
                    }
                    break;

                case "data--exitfullscreen":
                    if (value === "exitfullscreen") {
                        videoPlayer.exitFullscreen();
                    }
                    break;
                case "data--state":
                    if (value === "play") {
                        videoPlayer.play();
                    }
                    if (value === "pause") {
                        videoPlayer.pause();
                    }
                    // if (value==="stop") {
                    //
                    // }
                    break;
                case "data--muted":
                    if (value === "true") {
                        videoPlayer.muted(isTrue(value));
                    } else {
                        videoPlayer.muted(false);
                    }
                    break;
                case "finalize":
                    finalizeElement($ele);
                    break;
                default:
                    console.info("监听到 \"" + $ele.attr("data-wwclass") + "\" 元素的 \"" + attribute + "\" 属性值改变为 \"" + value + "\", 但是无对应处理动作.");
            }
        }
    };
    // END: 监听属性处理

    // 以下部分不需要修改
    if (!$.wwclass) {
        console.error("Can not use without wwclass.js");
        return false;
    }

    var ret = /*INSBEGIN:WWCLSHANDLER*/
        function (set) {
            if (set.length > 0) {
                loadDependence(function () {
                    init();
                    $(set).each(function (index, targetDom) {
                        processElement($(targetDom));
                    });
                });
            }
        }
        /*INSEND:WWCLSHANDLER*/
        ;

    return ret;

}));