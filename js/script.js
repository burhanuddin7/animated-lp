jQuery(document).ready(function () {
    var eleVisible,
        sectionAnimation = function () {
            jQuery(".to-animate-elem").each(function (index, element) {
                var $this = jQuery(this),
                    dataAnimate = jQuery(this).data("animate"),
                    $delay = jQuery(this).data("delay");
                eleVisible = $this.detectViewPort();
                if (eleVisible) {
                    setTimeout(function () {
                        $this.addClass(dataAnimate);
                    }, $delay);
                }
            });
        },
        sectionImgAnimation = function () {
            jQuery(".lazy-load-img").each(function (index, element) {
                var $this = jQuery(this),
                    dataAnimate = jQuery(this).data("animate"),
                    dataBannerFlag = jQuery(this).data("banner")
                        ? jQuery(this).data("banner")
                        : false,
                    dataImgSrc = jQuery(".lazy-load-img")[index],
                    $delay = jQuery(this).data("delay");

                eleVisible = $this.detectViewPort();
                if (eleVisible || dataBannerFlag) {
                    setTimeout(function () {
                        // for img tag
                        if (
                            dataImgSrc &&
                            dataImgSrc.getAttribute("src") === null &&
                            dataImgSrc.getAttribute("data-src") !== ""
                        ) {
                            dataAnimate = dataAnimate.split(" ");
                            dataImgSrc.classList.add(...dataAnimate);
                            dataImgSrc.setAttribute(
                                "src",
                                dataImgSrc.getAttribute("data-src")
                            );
                        }
                    }, $delay);
                }
            });
        };

    jQuery(window).scroll(function () {
        sectionAnimation();
        sectionImgAnimation();
    });

    sectionAnimation();
    sectionImgAnimation();
});

jQuery.fn.detectViewPort = function () {
    var elementTop = jQuery(this).offset().top,
        elementBottom = elementTop + jQuery(this).outerHeight(),
        viewportTop = jQuery(window).scrollTop(),
        viewportBottom = viewportTop + jQuery(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};
