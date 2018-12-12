var searchResult;
function IngredientSearch () {
        var key = "PceKzy1SbMmshlGe7UK7JiFA7ioep1uB4WZjsnDRgfNeFJPoJm"; 
        var num=10;
        url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number="+num+"&ranking=1&ingredients="
        var ing11=document.getElementById("form-autocomplete1").value;
        var ing22=document.getElementById("form-autocomplete2").value;
        url = url + ing11 + "%2C" + ing22;
        var testobj = JSON.parse(httpGet(url,key));
        //$("#egname").text(testobj[0].id+":"+testobj[0].title);
        //document.getElementById("egimg").src=testobj[0].image;
        //$("#egdes").text(testobj[0].likes);
        //$("#test").text(httpGet(url,key));     
        urlbulk = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids="
        for(i=0;i<num-1;i++)
        {
              urlbulk = urlbulk + testobj[i].id + "%2C";  
        } 
        urlbulk+=testobj[num-1].id;
        var searchResult= JSON.parse(httpGet(urlbulk,key));
        //$("#test").text(httpGet(urlbulk,key));
        //rendernMenu(0);
        for(i=0;i<6;i++)
        {
            $("#menu"+i+"name").text(searchResult[i].title);
            document.getElementById("menu"+i+"img").src=searchResult[i].image;
            $("#menu"+i+"id").text(searchResult[i].id);
            $("#menu"+i+"like").text("likes: "+searchResult[i].likes);
        }
}

function httpGet(url,key){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.setRequestHeader("X-RapidAPI-Key",key);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}
function renderMenu(page){
    //const container = document.getElementById('menu-grid');
    //ReactDOM.render(element, container);
    $("#test").text("renderMenu");
    for(i=page*6;i<page*6+6;i++)
    {
        $("#menu"+i+"name").text(searchResult[i].title);
        document.getElementById("menu1img").src=searchResult[i].image;
        $("#menu"+i+"id").text(searchResult[i].id);
        $("#menu"+i+"like").text("likes: "+searchResult[i].likes);
    }
 
}


function saveRecipe(url, recipeJSON){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "POST", url, true );
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");	
	xmlHttp.send(recipeJSON);
	return xmlHttp.responseText;
	//if 'good' is returned then good
	//else 'recipe exists'
	//this function is for both simple and complex recipe, depends on different url
}

function selectedActive(elem) {
        var selectedAttr = $(elem),
                selectionID = "." + $(selectedAttr).data("select");

        $(".selecton a").removeClass("active");
        $(selectedAttr).addClass("active");
        $(".food-menu").removeClass("active");

        if (selectionID == ".*") $(".food-menu").addClass("active");
        else $(selectionID).addClass("active");
}


function enableCounterUp(a) {
        var counterElement;
        if (isExists('#counter')) {
                counterElement = $('#counter');
        }
        else {
                return;
        }
        var oTop = $('#counter').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function () {
                        var $this = $(this),
                                countDuration = $this.data('duration'),
                                countTo = $this.attr('data-count');
                        $({countNum: $this.text()}).animate({countNum: countTo}, {
                                duration: countDuration,
                                easing: 'swing',
                                step: function () {
                                        $this.text(Math.floor(this.countNum));
                                },
                                complete: function () {
                                        $this.text(this.countNum);
                                }
                        });
                });
                a = 1;
        }
        return a;
}

function panelAccordian(){

        var panelTitle = $('.panel-title');
        panelTitle.on('click', function(){
                $(this).toggleClass('active');
                return false;
        });

}


function enableRadialProgress(){
        $(".radial-progress").each(function(){
                var $this = $(this),
                        progPercent = $this.data('prog-percent');

                var bar = new ProgressBar.Circle(this, {
                        color: '#fff',
                        strokeWidth: 3,
                        trailWidth: 0,
                        easing: 'easeInOut',
                        duration: 1400,
                        text: {},
                        from: { color: '#fff', width: 1 },
                        to: { color: '#EF002E', width: 3 },
                        // Set default step function for all animate calls
                        step: function(state, circle) {
                                circle.path.setAttribute('stroke', state.color);
                                circle.path.setAttribute('stroke-width', state.width);

                                var value = Math.round(circle.value() * 100);
                                if (value === 0) { circle.setText(''); } else { circle.setText(value); }
                        }
                });

                $(this).waypoint(function(){ bar.animate(progPercent); },{offset: "90%"})
        });
}


(function ($) {

        "use strict";

        // ACCORDIAN

        panelAccordian();

        // RADIAL PROGRESS BAR
        enableRadialProgress();

        enableSwiper();

        /*COUNTER*/
        var countLineProgress = 0;
        var countCounterUp = 0;
        var a = 0;
        countCounterUp = enableCounterUp(countCounterUp);

        $(window).on('scroll', function () {
                countCounterUp = enableCounterUp(countCounterUp);
        });

        /*CUSTOME ISOTOPE*/
        var selectedAttr = $('[data-select].active');
        selectedActive(selectedAttr);

        $('[data-select]').on("click", function () {
                var selectedAttr = $(this);
                selectedActive(selectedAttr);
                return false;
        });

        // DROPDOWN MENU

        var winWidth = $(window).width();
        dropdownMenu(winWidth);

        $(window).on('resize', function () {
                winWidth = $(window).width();
                dropdownMenu(winWidth);

        });


        $('[data-menu]').on('click', function () {

                var mainMenu = $(this).data('menu');

                $(mainMenu).toggleClass('visible-menu');

        });


})(jQuery);

function dropdownMenu(winWidth) {

        if (winWidth > 767) {

                $('.main-menu li.drop-down').on('mouseover', function () {
                        var $this = $(this),
                                menuAnchor = $this.children('a');

                        menuAnchor.addClass('mouseover');

                }).on('mouseleave', function () {
                        var $this = $(this),
                                menuAnchor = $this.children('a');

                        menuAnchor.removeClass('mouseover');
                });

        } else {

                $('.main-menu li.drop-down > a').on('click', function () {

                        if ($(this).attr('href') == '#') return false;
                        if ($(this).hasClass('mouseover')) {
                                $(this).removeClass('mouseover');
                        }
                        else {
                                $(this).addClass('mouseover');
                        }
                        return false;
                });
        }

}

function enableSwiper() {

        if (isExists('.swiper-container')) {

                $('.swiper-container').each(function (index) {

                        var swiperDirection = $(this).data('swiper-direction'),
                                swiperSlidePerView = $(this).data('swiper-slides-per-view'),
                                swiperBreakpoints = $(this).data('swiper-breakpoints'),
                                swiperSpeed = $(this).data('swiper-speed'),
                                swiperCrossFade = $(this).data('swiper-crossfade'),
                                swiperLoop = $(this).data('swiper-loop'),
                                swiperAutoplay = $(this).data('swiper-autoplay'),
                                swiperMousewheelControl = $(this).data('swiper-wheel-control'),
                                swipeSlidesPerview = $(this).data('slides-perview'),
                                swiperMargin = parseInt($(this).data('swiper-margin')),
                                swiperSlideEffect = $(this).data('slide-effect'),
                                swiperAutoHeight = $(this).data('autoheight'),
                                swiperScrollbar = ($(this).data('scrollbar') ? $(this).parentsUntil('.swiper-area').find('.swiper-scrollbar') : null);
                        swiperScrollbar = (isExists(swiperScrollbar) ? swiperScrollbar : null),
                                swprResponsive = $(this).data('swpr-responsive');

                        var swiper = new Swiper($(this)[0], {
                                pagination: $(this).find('.swiper-pagination'),
                                slidesPerView: (swiperSlidePerView ? swiperSlidePerView : 1),
                                direction: (swiperDirection ? swiperDirection : 'horizontal'),
                                loop: (swiperLoop ? swiperLoop : false),
                                nextButton: '.swiper-button-next',
                                prevButton: '.swiper-button-prev',
                                autoplay: (swiperAutoplay ? swiperAutoplay : false),
                                paginationClickable: true,
                                spaceBetween: (swiperMargin ? swiperMargin : 0),
                                mousewheelControl: ((swiperMousewheelControl) ? swiperMousewheelControl : false),
                                scrollbar: (swiperScrollbar ? swiperScrollbar : null),
                                scrollbarHide: false,
                                speed: (swiperSpeed ? swiperSpeed : 1000),
                                autoHeight: ((swiperAutoHeight == false) ? swiperAutoHeight : true),
                                effect: (swiperSlideEffect ? swiperSlideEffect : 'coverflow'),
                                fade: {crossFade: swiperCrossFade ? swiperCrossFade : false},
                                breakpoints: {
                                        1200: {slidesPerView: swprResponsive[3] ? swprResponsive[3] : 1,},
                                        992: {slidesPerView: swprResponsive[2] ? swprResponsive[2] : 1,},
                                        768: {slidesPerView: swprResponsive[1] ? swprResponsive[1] : 1,},
                                        576: {slidesPerView: swprResponsive[0] ? swprResponsive[0] : 1,}

                                },
                        });

                        $('.swiper-container').hover(function () {
                                swiper.stopAutoplay();
                        }, function () {
                                swiper.startAutoplay();
                        });


                });


        }
}
function isExists(elem) {
        if ($(elem).length > 0) {
                return true;
        }
        return false;
}

function initMap() {

        // Create a map object, and include the MapTypeId to add
        // to the map type control.

        var uluru = {lat: 40.729366, lng:  -73.996149};
        var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: uluru
        });

        var image = 'images/google-marker.png';
        var marker = new google.maps.Marker({
                position: uluru,
                map: map,
                icon: image
        });
        //Associate the styled map with the MapTypeId and set it to display.
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
}
