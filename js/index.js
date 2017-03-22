function stopDrop() {
    var lastY;//最后一次y坐标点
     $(document.body).on('touchstart',function(event) {
        lastY = event.touches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
    });
     $(document.body).on('touchmove',  function(event) {
        var y = event.touches[0].clientY;
        var st = $(this).scrollTop(); //滚动条高度  
        if (y >= lastY && st <= 10) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
            lastY = y;
            event.preventDefault();
        }
        if(y>=st){
            lastY = st;
            event.preventDefault();
        }
        lastY = y;
    });
}
stopDrop();
var $progress = document.getElementById('loadingNum'),
    $run = document.getElementById("run"),
    $width = document.getElementById("progress").offsetWidth,
    unlockPage = document.getElementById("unlockPage"),
    loader = new PxLoader(); 

var imageArr = ["img/加载背景.jpg","img/fallpng.png","img/跌入雪碧图.png","img/1.png","img/04.png","img/07.png","img/09.png","img/10.png","img/11.png","img/back.png","img/close.png","img/icon1.png","img/maodian.png","img/redbg.png","img/right.png","img/爱丽丝2.png","img/安徒生2.png","img/白皇后背景.png","img/冰箱.png","img/博物馆2.png","img/草莓.png","img/宠物.png","img/厨具.png","img/跌入仙境.png","img/封面.png","img/封面背景2.jpg","img/古才子.jpg","img/果酱.png","img/户外运动.png","img/帽子背景.png","img/帽子茶会.png","img/美妆.png","img/男装.png","img/裙子.png","img/奢侈品.png","img/收音机.png","img/完.png","img/完背景.png","img/鞋子.png","img/药水瓶.png","img/钟表.png","img/未标题-1.png"];

    for(var i=0; i < imageArr.length; i++) { 
        var pxImage = new PxLoaderImage(imageArr[i]); 
        pxImage.imageNumber = i + 1; 
        loader.add(pxImage); 
    } 
    loader.addProgressListener(function(e) { 

        $progress && ($progress.innerHTML = Math.round(100*e.completedCount/e.totalCount) + "%");

        $run.style.width = (e.completedCount/e.totalCount)*$width + "px";

        if(e.completedCount === e.totalCount) return complete()
    }); 
    function next(el, fn) {
        el.className += ' scaleOut';
        setTimeout(function(){
            el.style.display = "none";
            unlockPage.className += ' active';
            el.parentNode.removeChild(el);
            fn && fn()
        }, 400)
    }
    function complete() {
        var $loader = document.getElementById('aliLoading');
        next($loader, function() {
        })
    }

    loader.start(); 
var alice = {
        idx : 0,
        init : function(){
            this.unlock();
            this.chase();
            this.goodsToggle();
            this.slideHole();
            this.showAll();
            this.thisnigth();
        },
        showAll : function(){
            var btn = $("#showAll"),
                all = $(".ali_mask"),
                close = $(".ali_mask .close");

            btn.on("tap",function(e){
                e.preventDefault();
                all.animate({
                    "top" : 0
                },500,"ease-in");
                $(".J_anchor").hide();
            })
            close.on("click",function(e){
                e.preventDefault();
                all.animate({
                    "top" : "-100%"
                },500,"ease-in");
                $(".J_anchor").show();
            })
        },
        goodsToggle : function(){
            this.toggleGoods($(".J_fal_gds"),$(".J_fal .goods_item"));
            this.toggleGoods($(".J_rqn_gds"),$(".J_rqn .goods_item"));
            this.toggleGoods($(".J_wqn_gds"),$(".J_wqn .goods_item"));
            this.toggleGoods($(".J_hat_gds"),$(".J_hat .goods_item"));
        },
        toggleGoods : function(domEle,goods){
            domEle.on("tap",function(e){
                e.preventDefault();

                var _this = $(this),
                    idx = domEle.index(_this);

                domEle.find(".bln").removeClass("active");
                $(_this.find(".bln")).addClass("active");
                goods.removeClass("active");
                $(goods[idx]).addClass("active");
            })
        },
        unlock : function(){
            var unlockaWrap = $(".J_unlock"),
                mask = $(".masks",unlockaWrap),
                btn = $(".btn",unlockaWrap),
                _width = mask.width() - 2*parseFloat(btn.css("left")) - parseFloat(btn.width()),
                // hammer = new Hammer(document.getElementById("unlockBtn")),
                hammer = new Hammer(document.getElementById("unlockwrap")),
                mask = $(".J_keyMask"),
                maskWidth = mask.width(),
                percent = maskWidth,
                matte = $("#unlockPage .matte");

            hammer.on("pan",function(e){
                var moveX = e.deltaX;
                if(moveX > 0 && moveX <= _width){
                    percent = maskWidth - moveX;
                    matte.css({"opacity":(moveX/_width)*0.8})
                    btn.css({
                        "transform":"translateX("+moveX+"px)",
                        "-webkit-transform":"translateX("+moveX+"px)"
                    });
                    mask.css({"width":percent+"px"});
                }
            })
            hammer.on("panend",function(e){
                var moveX = e.deltaX;
                if(moveX >= 0){
                    if(moveX < _width/2){
                        moveX = 0;
                        percent = maskWidth;
                        matte.css({"opacity":0})
                    }else if(moveX >= _width/2 ){
                        moveX = _width;
                        percent = maskWidth - _width;
                        matte.css({"opacity":0.8});
                        unlockaWrap.animate({"opacity":0},800);
                        $(".J_chase .ali_chs_ct").animate({"opacity":1},800);
                        setTimeout(function(){
                            unlockaWrap.hide();
                            unlockaWrap.remove();
                        },700)
                    }
                }else{
                    moveX = 0;
                    percent = maskWidth;
                }
                btn.animate({
                    "transform":"translateX("+moveX+"px)",
                    "-webkit-transform":"translateX("+moveX+"px)"
                },100);
                mask.animate({"width":percent+"px"},100);
                $(".J_chase .container").animate({"opacity":1},500);
            })
        },
        chase : function(){
            var chase = $(".J_chase"),
                btn = $(".btn",chase),
                _this = this;
            
             btn.click(function(e){
                e.preventDefault();

                $(".J_chase .container").addClass("active");
                setTimeout(function(){
                    chase.hide();
                    $(".J_hole").css("opacity",1);
                    _this.moveHole(0);
                    $(".J_anchor").show();
                    chase.remove();
                },900)
             })           
        },
        getMoveX : function(){
            var holeCol = $(".ali_hl .wrap"),
                anchor = $(".J_anchor span"),
                boxW = holeCol.width(),
                moveX = ($(window).width() - boxW)/2,
                moveX2 = boxW + parseFloat(holeCol.css("margin-right")),
                widArr = [moveX];

            for(var i = 1 ; i < holeCol.length;i++){
                widArr.push(-(moveX2*i-moveX));
            }
            return widArr;
        },
        slideHole : function(){
            var box = $(".ali_hl_ct"),
                boxItem = $(".ali_hl_col"),
                _this = this,
                wrap = $(".ali_hl .wrap"),
                reg = /\(-?\d+.?\d+/g,
                xArr = _this.getMoveX(),
                hammerTime = new Hammer(document.getElementById("hole"));

            // hammerTime.on("swipeleft",function(ev){
            //     if(ev.deltaX < 0 && _this.idx < boxItem.length - 1){
            //         _this.idx++;
            //         _this.moveHole(_this.idx);
            //     }
            // })
            // hammerTime.on("swiperight",function(ev){
            //     if(ev.deltaX > 0 && _this.idx > 0){
            //         _this.idx--;
            //         _this.moveHole(_this.idx);
            //     }
            // })

            // document.addEventListener('touchstart', function (ev) {
            //     ev.preventDefault();
            //     return false;
            // }); 
            hammerTime.on("pan",function(ev){
                var moveX = ev.deltaX,
                    originX = xArr[_this.idx],
                    _x = moveX + originX;

                if((_this.idx > 0 && moveX > 0 && Math.abs(moveX) < wrap.width()) || (_this.idx < wrap.length - 1 && moveX < 0 && Math.abs(moveX) < wrap.width())){

                    wrap.css({
                        "transform" : "translateX(" + _x +"px) translateY(-50%)",
                        "-webkit-transform" : "translateX(" + _x +"px) translateY(-50%)"
                    })
                }
            })
            hammerTime.on("panend",function(ev){
                var moveX = ev.deltaX;
                if(moveX > 0){
                    if(_this.idx > 0){
                        _this.idx--;
                        _this.moveHole(_this.idx);
                    }
                }else if(moveX < 0){
                    if(_this.idx < boxItem.length - 1){
                        _this.idx++;
                        _this.moveHole(_this.idx);
                    }
                }
            })
        },
        moveHole : function(i){
            var widArr = this.getMoveX(),
                anchor = $(".J_anchor span"),
                box = $(".ali_hl .wrap");

            box.animate({
                "transform" : "translateX("+widArr[i]+"px) translateY(-50%)",
                "-webkit-transform" : "translateX("+widArr[i]+"px) translateY(-50%)"
            },200,"linear");
            box.addClass("hide");
            $(box[i]).addClass("active").removeClass("hide");
            setTimeout(function(){
                $(box[i]).find(".back").css("display","none");
            },500)
            setTimeout(function(){
                $(box[i]).find(".grey").css("display","none");
            },700)
            anchor.removeClass("active");
            $(anchor[i]).addClass("active");
        },
        thisnigth : function(){
            var btn = $(".thisnigth"),
                _this = this;
            btn.on("tap",function(e){
                e.preventDefault();
                _this.moveHole(0);
                _this.idx = 0;
                $(".ali_mask").animate({
                    "top" : "-100%"
                },500,"ease-in");
                $(".J_anchor").show();
            })
        }
    }
alice.init();

    /**
     * 埋点上报函数
     * 相关参数根据埋点文档指定
     * @param  {[type]} event_id    [埋点id]
     * @param  {[type]} event_param [埋点参数]
     * @param  {[type]} level       [埋点等级]
     */
    /**
     * 埋点上报函数
     * 相关参数根据埋点文档指定
     * @param  {[type]} event_id    [埋点id]
     * @param  {[type]} event_param [埋点参数]
     * @param  {[type]} level       [埋点等级]
     */
    try {
        var mping = new MPing();        //构造上报实例
        var pv = new MPing.inputs.PV();   //构造pv 请求
        mping.send(pv);                //上报pv
    } catch (e) {
    }
    var reportData = function(event_id, event_param, level) {
        try {
            var id = event_id || '';
            var click = new MPing.inputs.Click(id);
            if (event_param) {
                click.event_param = event_param;
            }
            if (level) {
                click.event_level = level;
            }
            click.updateEventSeries();
            var mping = new MPing();
            mping.send(click);
        } catch (e) {
        }
    };
    var go = (function(){
        return navigator.userAgent.indexOf('jdapp') != -1 ? function(url){
            url = url.replace(/^(?=\/\/)/,location.protocol); //目前仅支持绝对路径以及“//”开头的路径
            setTimeout(function(){
                location.href = "openApp.jdMobile://virtual?params={\"category\":\"jump\",\"des\":\"getCoupon\",\"action\":\"to\",\"url\":\"" + encodeURIComponent(url) + "\",\"landPageId\":\"mtun\"}";
            },100);
        } : function(url){
            location.href = url;
        }
    })();
    $('#unlockBtn').on('touchend',function(e) {

        reportData("MNight_Enter");
    });
    $('#unlockBtn').on('click',function(e) {

        reportData("MNight_Enter");
    });
    $('.J_chase .btn').on('click',function(e) {

        reportData("MNight_Start");
    });
    $('.haier').on('click',function(e) {
        reportData("MNight_Brand","0","3");
        setTimeout(function() {
            go('//sale.jd.com/m/act/Kio1zPx2WegnvaZI.html')
        }, 80);
    });
    $('.meide').on('click',function(e) {

        reportData("MNight_Brand","1","3");
        setTimeout(function() {
            go('//sale.jd.com/m/act/j0rUGDM32Pm.html');
        }, 80);
    });
    $('.radio .goto').on('click',function(e) {
        reportData("MNight_First","1","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/kPfGacPuhYxpTjQvAYBbyByCryS/index.html');
        }, 80);
    });
    $('.J_fal .rad').on('click',function(e) {
        reportData("MNight_FirstID",1);
    });
    $('.icebox .goto').on('click',function(e) {
        reportData("MNight_First","2","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/2jzFEyHqmLdfyvbjvb4VFwZLRMfh/index.html');
        }, 80);
    });
    $('.J_fal .ref').on('click',function(e) {
        reportData("MNight_FirstID",2);
    });
    $('.break .goto').on('click',function(e) {
        reportData("MNight_First","3","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/47yEQaU7AX7Nd6nGSxvFyBaiFUg9/index.html');
        }, 80);
    });
    $('.J_fal .brk').on('click',function(e) {
        reportData("MNight_FirstID",3);
    });
    $('.outside .goto').on('click',function(e) {
        reportData("MNight_Sec","1","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/25K2Kvwv79MKwjy31WHxaSPa81MY/index.html');
        }, 80);
    });
    $('.J_rqn .hd').on('click',function(e) {
        reportData("MNight_SecID",1);
    });
    $('.shoe .goto').on('click',function(e) {
        reportData("MNight_Sec","2","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/2utXxEL7DzQeXnR4Nwy8qh4doDh5/index.html');
        }, 80);
    });
    $('.J_rqn .l').on('click',function(e) {
        reportData("MNight_SecID",2);
    });
    $('.bag .goto').on('click',function(e) {
        reportData("MNight_Sec","3","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/Uo2EKvLLLRjs2qgBqKZPVfDy3Xw/index.html');
        }, 80);
    });
    $('.J_rqn .beg a').on('click',function(e) {
        reportData("MNight_SecID",3);
    });
    $('.pet .goto').on('click',function(e) {
        reportData("MNight_Sec","4","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/2uufq3EqPe2sWWqezjKnTrZ21gNV/index.html');
        }, 80);
    });
    $('.J_rqn .cat').on('click',function(e) {
        reportData("MNight_SecID",4);
    });
    $('.kouhong .goto').on('click',function(e) {
        reportData("MNight_Third","1","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/2v5CRmSpifvTWGexoLLuDYHMZxeq/index.html');
        }, 80);
    });
    $('.J_wqn .bot').on('click',function(e) {
        reportData("MNight_ThirdID",1);
    });
    $('.make .goto').on('click',function(e) {
        reportData("MNight_Third","2","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/hKBeLqjLE63at5mfaxp83YqYUcP/index.html');
        }, 80);
    });
    $('.J_wqn .hand').on('click',function(e) {
        reportData("MNight_ThirdID",2);
    });
    $('.skirt .goto').on('click',function(e) {
        reportData("MNight_Third","3","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/2ePvWwLufZDXLdwePNWcCYVXZsuU/index.html');
        }, 80);
    });
    $('.J_wqn .sk').on('click',function(e) {
        reportData("MNight_ThirdID",3);
    });
    $('.cloth .goto').on('click',function(e) {
        reportData("MNight_Four","1","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/2ePvWwLufZDXLdwePNWcCYVXZsuU/index.html');
        }, 80);
    });
    $('.J_hat .man .bd').on('click',function(e) {
        reportData("MNight_FourID",1);
    });
    $('.caomei .goto').on('click',function(e) {
        reportData("MNight_Four","2","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/3BzMNXmKCfE3P4M9BrB55hJa9fKu/index.html');
        }, 80);
    });
    $('.J_hat .strb').on('click',function(e) {
        reportData("MNight_FourID",2);
    });
    $('.clock .goto').on('click',function(e) {
        reportData("MNight_Four","3","3");
        setTimeout(function() {
            go('//h5.m.jd.com/active/345ezHaNPC8EYrNZJYTXLodLqVE1/index.html');
        }, 80);
    });
    $('.J_hat .rab .lh').on('click',function(e) {
        reportData("MNight_FourID",3);
    });
    $('.gomain').on('click',function(e) {
        reportData("MNight_Main");
        setTimeout(function() {
            go('//h5.m.jd.com/active/QFPaaNjxK3MZqLLeVNh7EN5UmRw/index.html')
        }, 80);
    });
    $('#showAll').on('click',function(e) {
        reportData("MNight_All");
    });
    $('.museum').on('click',function(e) {
        reportData("MNight_Night","0","3");
        setTimeout(function() {
            go('//h5.m.jd.com/dev/2RE9GZ35RayccaSe9mqQMEyN5AJu/index.html');
        }, 80);
    });
    $('.andersen').on('click',function(e) {
        reportData("MNight_Night","1","3");
        setTimeout(function() {
            go('//h5.m.jd.com/dev/3XLzQieEm5sHT97e7pRDZU3o6WMK/index.html');
        }, 80);
    });
    $('.thisnigth').on('click',function(e) {
        reportData("MNight_Night","2");
    });

    
    /** 分享内容配置 **/
    //微信分享到微信
    var setWxShare = function(data) {
        document.addEventListener("WeixinJSBridgeReady", wxShare, false);

        function wxShare() {
            var shareOption = {
                img_url: "https://h5.m.jd.com/dev/44Rr6xHtwPdmyvRf4bRRAVfCNwRj/pages/34753/img/%E5%88%86%E4%BA%AB%E5%9B%BE%E7%89%87.jpg",
                img_width: "240",
                img_height: "240",
                link: 'https://h5.m.jd.com/dev/44Rr6xHtwPdmyvRf4bRRAVfCNwRj/index.html',
                desc: "瓦特！爱丽丝仙境又开启了！快喊上伙伴们一起去尬福利～",
                title: "梦幻世界限时开启（内含福利）"
            };
            WeixinJSBridge.on("menu:share:appmessage", function(b) {
                WeixinJSBridge.invoke("sendAppMessage", shareOption, function(g) {})
            });
            WeixinJSBridge.on("menu:share:timeline", function(b) {
                WeixinJSBridge.invoke("shareTimeline", shareOption, function(g) {})
            })
        }
    };
    //app分享
    try {
        window.jdShare && jdShare.setShareInfo({
            title: '梦幻世界限时开启（内含福利）',
            content: '瓦特！爱丽丝仙境又开启了！快喊上伙伴们一起去尬福利～',
            url: 'https://h5.m.jd.com/dev/44Rr6xHtwPdmyvRf4bRRAVfCNwRj/index.html',
            img: 'https://h5.m.jd.com/dev/44Rr6xHtwPdmyvRf4bRRAVfCNwRj/pages/34753/img/%E5%88%86%E4%BA%AB%E5%9B%BE%E7%89%87.jpg',
            channel: 'Wxfriends,Wxmoments,Sinaweibo,QQfriends,QQzone',
            callback: null  // 不要依赖回调，不要在回调中加入业务逻辑，不要在回调中处理耗时的操作
        });
        setWxShare();
    } catch (e) {
        if (e.name === "JdShareException") {
            alert(e.toString());
        } else {
            alert(e.message)
        }
    }