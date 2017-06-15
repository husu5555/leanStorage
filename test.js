var APP_ID = 'lOLo0PbqcTu3Ug1GAnJJqIT8-gzGzoHsz';
var APP_KEY = '65f9CBuA12Pz67m0vofgCz4b';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

// /*旅行照片*/
// var ImgObject = AV.Object.extend('ImgObject');
// var imgObject = new ImgObject();
// imgObject.set("url", "http://ww3.sinaimg.cn/bmiddle/596b0666gw1ed70eavm5tg20bq06m7wi.gif");
// imgObject.set("title", "旅行照");
// imgObject.set("name", "Satomi_Ishihara.gif");
// imgObject.save().then(function(object) {});

// /*博客文章*/
// var ArticleObject = AV.Object.extend('ArticleObject');
// var articleObject = new ArticleObject();
// articleObject.set("url", "www.baidu.com");
// articleObject.set("title", "文章标题");
// articleObject.set("author", "匿名");
// articleObject.set("introduce", "文章简介");
// articleObject.save().then(function(object) {

// });

/*查询图片*/
var queryImg = new AV.Query('ImgObject');
queryImg.exists('url');
queryImg.find().then(function(results) {
    $.each(results, function(index, domEle) {
        if (index < 6) {
            $("<img src=''/>").attr("src", domEle.get("url")).appendTo("#hobbiesImgs");
        } else {
            return;
        }
    });
    // 换一批图片
    $(".content__hobbies--change").on("click", function() {
        var str;
        for (var i = 0; i < 6; i++) {
            var resultIndex = parseInt(Math.random() * (results.length));
            var src = results[resultIndex].get("url");
            $("img").eq(i).attr("src", src);
        }
    });
}, function(error) {});

/*查询文章*/
var queryArticle = new AV.Query('ArticleObject');
queryArticle.exists('title');
queryArticle.find().then(function(results) {
    $.each(results, function(index, domEle) {
        if (index < 10) {
            var title = domEle.get("title");
            var author = domEle.get("author");
            var introduce = domEle.get("introduce");
            var url = domEle.get("url");
            var str = '<div class="article-box"><div class="text-left article-box__title"><a href=' + url + '>' + title + '</a></div>';
            str += '<div class="text-left">' + introduce + '</div></div>';
            $(str).appendTo("#blogsArticle");
        } else {
            return;
        }
    });
}, function(error) {});
/*点击导航*/
$(".header__ul").on("click", function(ev) {　
    var ev = ev || window.event;　　　　
    var target = ev.target || ev.srcElement;　　　　
    if (target.nodeName.toLowerCase() == 'li') {　
        $(".header__li").removeClass("active");　　
        $("#" + target.id).addClass("active");　　
        var id = "#" + target.innerHTML.toLowerCase();
        $(id).removeClass("hide").addClass("show");　
        var contentBox = $(".content__box");
        for (var i = 0; i < contentBox.length; i++) {
            if (contentBox[i].id !== target.innerHTML.toLowerCase()) {
                contentBox.eq(i).removeClass("show").addClass("hide");
            }
        }
    }
});
var EmailObject = AV.Object.extend('EmailObject');
var emailObject = new EmailObject();
/*存储email信息*/
$(".submit-button").on("click", function() {
    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var message = $("#message").val();
    emailObject.set("name", name);
    emailObject.set("email", email);
    emailObject.set("subject", subject);
    emailObject.set("message", message);
    emailObject.save().then(function(object) {
        alert("发送成功");
    });
});
/*初始化content高度*/
var contentHeight = $(window).height() - 42;
$(".content__box").css("height", contentHeight);