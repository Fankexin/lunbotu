var slider = function (opt) {
    var $box = $(opt.box),
        imgs = opt.imgs,
        len = opt.imgs.length,
        time = opt.time || 2000,
        auto = opt.auto,
        index = 0;
    var $slider = $('<div class="slider" id="slider"></div>'),
        $leftBtn = $('<span id="left"><</span>'),
        $rightBtn = $('<span id="right">></span>'),
        $dot = $('<ul class="nav" id="navs"></ul>'),
        $li = [];
    $slider.append($('<div class="slide"><img src="' + imgs[len - 1] + '" alt=""></div>'));
    for (var i = 0; i < len; i++) {
        var $imgDiv = $('<div class="slide"><img src="' + imgs[i] + '" alt=""></div>');
        $li[i] = $('<li>' + (i + 1) + '</li>');
        $slider.append($imgDiv);
        $dot.append($li[i]);
    }
    $slider.append($('<div class="slide"><img src="' + imgs[0] + '" alt=""></div>'));
    $li[0].addClass("active");
    function changeli(num) {
        for (var i = 0; i < len; i++) {
            if ($li[i].hasClass("active")) {
                $li[i].removeClass("active");
            }
        }
        $li[num].addClass("active");
    }

    function prev() {
        if (index == 0) {
            changeli(len - 1);
            $slider.animate({ 'left': '+=' + 1200 }, 1000, function () { $slider.css('left', -1200 * len); });
            index = len - 1;
        } else {
            changeli(index - 1);
            $slider.animate({ 'left': '+=' + 1200 }, 1000);
            index--;
        }
    }
    function next() {
        if (index == len - 1) {
            changeli(0);
            $slider.animate({ 'left': '-=' + 1200 }, 1000, function () { $slider.css('left', -1200); });
            index = 0;
        } else {
            changeli(index + 1);
            $slider.animate({ 'left': '-=' + 1200 }, 1000);
            index++;
        }
    }
    if (auto) {
        var timer = setInterval(next, time);
    }

    $box.hover(function () {
        $leftBtn.stop().animate({ 'opacity': 0.6 }, 'fast');
        $rightBtn.stop().animate({ 'opacity': 0.6 }, 'fast');
        if (auto) {
            clearInterval(timer);
        }           
    }, function () {
        $leftBtn.stop().animate({ 'opacity': 0 }, 'fast');
        $rightBtn.stop().animate({ 'opacity': 0 }, 'fast');
        if (auto) {
            timer = setInterval(next, time);
        }
    });
    $leftBtn.click(prev);
    $rightBtn.click(next);

    for (var i = 0; i < len; i++) {
        (function (num) {
            $li[num].click(function () {
                changeli(num);
                var distance = num - index;
                if (distance > 0) {
                    $slider.animate({ 'left': '-=' + (distance * 1200) }, 1000);
                } else if (distance < 0) {
                    $slider.animate({ 'left': '+=' + (distance * -1200) }, 1000);
                }
                index = num;
            });
        })(i);
    }

    $box.append($slider);
    $box.append($leftBtn);
    $box.append($rightBtn);
    $box.append($dot);


    return $box;
}