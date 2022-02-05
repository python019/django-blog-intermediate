///*!
// * fullPage 3.0.7
// * https://github.com/alvarotrigo/fullPage.js
// *
// * @license GPLv3 for open source use only
// * or Fullpage Commercial License for commercial use
// * http://alvarotrigo.com/fullPage/pricing/
// *
// * Copyright (C) 2018 http://alvarotrigo.com/fullPage - A project by Alvaro Trigo
// */
//(function( root, window, document, factory, undefined) {
//    if( typeof define === 'function' && define.amd ) {
//        // AMD. Register as an anonymous module.
//        define( function() {
//            root.fullpage = factory(window, document);
//            return root.fullpage;
//        } );
//    } else if( typeof exports === 'object' ) {
//        // Node. Does not work with strict CommonJS.
//        module.exports = factory(window, document);
//    } else {
//        // Browser globals.
//        window.fullpage = factory(window, document);
//    }
//}(this, window, document, function(window, document){
//    'use strict';
//
//    // keeping central set of classnames and selectors
//    var WRAPPER =               'fullpage-wrapper';
//    var WRAPPER_SEL =           '.' + WRAPPER;
//
//    // slimscroll
//    var SCROLLABLE =            'fp-scrollable';
//    var SCROLLABLE_SEL =        '.' + SCROLLABLE;
//
//    // util
//    var RESPONSIVE =            'fp-responsive';
//    var NO_TRANSITION =         'fp-notransition';
//    var DESTROYED =             'fp-destroyed';
//    var ENABLED =               'fp-enabled';
//    var VIEWING_PREFIX =        'fp-viewing';
//    var ACTIVE =                'active';
//    var ACTIVE_SEL =            '.' + ACTIVE;
//    var COMPLETELY =            'fp-completely';
//    var COMPLETELY_SEL =        '.' + COMPLETELY;
//
//    // section
//    var SECTION_DEFAULT_SEL =   '.section';
//    var SECTION =               'fp-section';
//    var SECTION_SEL =           '.' + SECTION;
//    var SECTION_ACTIVE_SEL =    SECTION_SEL + ACTIVE_SEL;
//    var TABLE_CELL =            'fp-tableCell';
//    var TABLE_CELL_SEL =        '.' + TABLE_CELL;
//    var AUTO_HEIGHT =           'fp-auto-height';
//    var AUTO_HEIGHT_SEL =       '.' + AUTO_HEIGHT;
//    var AUTO_HEIGHT_RESPONSIVE = 'fp-auto-height-responsive';
//    var AUTO_HEIGHT_RESPONSIVE_SEL = '.' + AUTO_HEIGHT_RESPONSIVE;
//    var NORMAL_SCROLL =         'fp-normal-scroll';
//    var NORMAL_SCROLL_SEL =     '.' + NORMAL_SCROLL;
//
//    // section nav
//    var SECTION_NAV =           'fp-nav';
//    var SECTION_NAV_SEL =       '#' + SECTION_NAV;
//    var SECTION_NAV_TOOLTIP =   'fp-tooltip';
//    var SECTION_NAV_TOOLTIP_SEL='.'+SECTION_NAV_TOOLTIP;
//    var SHOW_ACTIVE_TOOLTIP =   'fp-show-active';
//
//    // slide
//    var SLIDE_DEFAULT_SEL =     '.slide';
//    var SLIDE =                 'fp-slide';
//    var SLIDE_SEL =             '.' + SLIDE;
//    var SLIDE_ACTIVE_SEL =      SLIDE_SEL + ACTIVE_SEL;
//    var SLIDES_WRAPPER =        'fp-slides';
//    var SLIDES_WRAPPER_SEL =    '.' + SLIDES_WRAPPER;
//    var SLIDES_CONTAINER =      'fp-slidesContainer';
//    var SLIDES_CONTAINER_SEL =  '.' + SLIDES_CONTAINER;
//    var TABLE =                 'fp-table';
//
//    // slide nav
//    var SLIDES_NAV =            'fp-slidesNav';
//    var SLIDES_NAV_SEL =        '.' + SLIDES_NAV;
//    var SLIDES_NAV_LINK_SEL =   SLIDES_NAV_SEL + ' a';
//    var SLIDES_ARROW =          'fp-controlArrow';
//    var SLIDES_ARROW_SEL =      '.' + SLIDES_ARROW;
//    var SLIDES_PREV =           'fp-prev';
//    var SLIDES_PREV_SEL =       '.' + SLIDES_PREV;
//    var SLIDES_ARROW_PREV =     SLIDES_ARROW + ' ' + SLIDES_PREV;
//    var SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL;
//    var SLIDES_NEXT =           'fp-next';
//    var SLIDES_NEXT_SEL =       '.' + SLIDES_NEXT;
//    var SLIDES_ARROW_NEXT =     SLIDES_ARROW + ' ' + SLIDES_NEXT;
//    var SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + SLIDES_NEXT_SEL;
//
//    function initialise(containerSelector, options) {
//        var isOK = options && new RegExp('([\\d\\w]{8}-){3}[\\d\\w]{8}|^(?=.*?[A-Y])(?=.*?[a-y])(?=.*?[0-8])(?=.*?[#?!@$%^&*-]).{8,}$').test(options['li'+'cen'+'seK' + 'e' + 'y']) || document.domain.indexOf('al'+'varotri' +'go' + '.' + 'com') > -1;
//
//        // cache common elements
//        var $htmlBody = $('html, body');
//        var $html = $('html')[0];
//        var $body = $('body')[0];
//
//        //only once my friend!
//        if(hasClass($html, ENABLED)){ displayWarnings(); return; }
//
//        var FP = {};
//
//        // Creating some defaults, extending them with any options that were provided
//        options = deepExtend({
//            //navigation
//            menu: false,
//            anchors:[],
//            lockAnchors: false,
//            navigation: false,
//            navigationPosition: 'right',
//            navigationTooltips: [],
//            showActiveTooltip: false,
//            slidesNavigation: false,
//            slidesNavPosition: 'bottom',
//            scrollBar: false,
//            hybrid: false,
//
//            //scrolling
//            css3: true,
//            scrollingSpeed: 700,
//            autoScrolling: true,
//            fitToSection: true,
//            fitToSectionDelay: 1000,
//            easing: 'easeInOutCubic',
//            easingcss3: 'ease',
//            loopBottom: false,
//            loopTop: false,
//            loopHorizontal: true,
//            continuousVertical: false,
//            continuousHorizontal: false,
//            scrollHorizontally: false,
//            interlockedSlides: false,
//            dragAndMove: false,
//            offsetSections: false,
//            resetSliders: false,
//            fadingEffect: false,
//            normalScrollElements: null,
//            scrollOverflow: false,
//            scrollOverflowReset: false,
//            scrollOverflowHandler: window.fp_scrolloverflow ? window.fp_scrolloverflow.iscrollHandler : null,
//            scrollOverflowOptions: null,
//            touchSensitivity: 5,
//            touchWrapper: typeof containerSelector === 'string' ? $(containerSelector)[0] : containerSelector,
//            bigSectionsDestination: null,
//
//            //Accessibility
//            keyboardScrolling: true,
//            animateAnchor: true,
//            recordHistory: true,
//
//            //design
//            controlArrows: true,
//            controlArrowColor: '#fff',
//            verticalCentered: true,
//            sectionsColor : [],
//            paddingTop: 0,
//            paddingBottom: 0,
//            fixedElements: null,
//            responsive: 0, //backwards compabitility with responsiveWiddth
//            responsiveWidth: 0,
//            responsiveHeight: 0,
//            responsiveSlides: false,
//            parallax: false,
//            parallaxOptions: {
//                type: 'reveal',
//                percentage: 62,
//                property: 'translate'
//            },
//            cards: false,
//            cardsOptions: {
//                perspective: 100,
//                fadeContent: true,
//                fadeBackground: true
//            },
//
//            //Custom selectors
//            sectionSelector: SECTION_DEFAULT_SEL,
//            slideSelector: SLIDE_DEFAULT_SEL,
//
//            //events
//            v2compatible: false,
//            afterLoad: null,
//            onLeave: null,
//            afterRender: null,
//            afterResize: null,
//            afterReBuild: null,
//            afterSlideLoad: null,
//            onSlideLeave: null,
//            afterResponsive: null,
//
//            lazyLoading: true
//        }, options);
//
//        //flag to avoid very fast sliding for landscape sliders
//        var slideMoving = false;
//
//        var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
//        var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
//        var container = typeof containerSelector === 'string' ? $(containerSelector)[0] : containerSelector;
//        var windowsHeight = getWindowHeight();
//        var windowsWidth = getWindowWidth();
//        var isResizing = false;
//        var isWindowFocused = true;
//        var lastScrolledDestiny;
//        var lastScrolledSlide;
//        var canScroll = true;
//        var scrollings = [];
//        var controlPressed;
//        var startingSection;
//        var isScrollAllowed = {};
//        isScrollAllowed.m = {  'up':true, 'down':true, 'left':true, 'right':true };
//        isScrollAllowed.k = deepExtend({}, isScrollAllowed.m);
//        var MSPointer = getMSPointer();
//        var events = {
//            touchmove: 'ontouchmove' in window ? 'touchmove' :  MSPointer.move,
//            touchstart: 'ontouchstart' in window ? 'touchstart' :  MSPointer.down
//        };
//        var scrollBarHandler;
//
//        // taken from https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution/modal.js
//        var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
//
//        //cheks for passive event support
//        var g_supportsPassive = false;
//        try {
//          var opts = Object.defineProperty({}, 'passive', {
//            get: function() {
//              g_supportsPassive = true;
//            }
//          });
//          window.addEventListener("testPassive", null, opts);
//          window.removeEventListener("testPassive", null, opts);
//        } catch (e) {}
//
//        //timeouts
//        var resizeId;
//        var resizeHandlerId;
//        var afterSectionLoadsId;
//        var afterSlideLoadsId;
//        var scrollId;
//        var scrollId2;
//        var keydownId;
//        var g_doubleCheckHeightId;
//        var originals = deepExtend({}, options); //deep copy
//        var activeAnimation;
//        var g_initialAnchorsInDom = false;
//        var g_canFireMouseEnterNormalScroll = true;
//        var g_mediaLoadedId;
//        var extensions = [
//            'parallax',
//            'scrollOverflowReset',
//            'dragAndMove',
//            'offsetSections',
//            'fadingEffect',
//            'responsiveSlides',
//            'continuousHorizontal',
//            'interlockedSlides',
//            'scrollHorizontally',
//            'resetSliders',
//            'cards'
//        ];
//
//        displayWarnings();
//
//        //easeInOutCubic animation included in the plugin
//        window.fp_easings = deepExtend(window.fp_easings, {
//            easeInOutCubic: function (t, b, c, d) {
//                if ((t/=d/2) < 1) return c/2*t*t*t + b;return c/2*((t-=2)*t*t + 2) + b;
//            }
//        });
//
//        /**
//        * Sets the autoScroll option.
//        * It changes the scroll bar visibility and the history of the site as a result.
//        */
//        function setAutoScrolling(value, type){
//            //removing the transformation
//            if(!value){
//                silentScroll(0);
//            }
//
//            setVariableState('autoScrolling', value, type);
//
//            var element = $(SECTION_ACTIVE_SEL)[0];
//
//            if(options.autoScrolling && !options.scrollBar){
//                css($htmlBody, {
//                    'overflow': 'hidden',
//                    'height': '100%'
//                });
//
//                setRecordHistory(originals.recordHistory, 'internal');
//
//                //for IE touch devices
//                css(container, {
//                    '-ms-touch-action': 'none',
//                    'touch-action': 'none'
//                });
//
//                if(element != null){
//                    //moving the container up
//                    silentScroll(element.offsetTop);
//                }
//            }else{
//                css($htmlBody, {
//                    'overflow' : 'visible',
//                    'height' : 'initial'
//                });
//
//                var recordHistory = !options.autoScrolling ? false : originals.recordHistory;
//                setRecordHistory(recordHistory, 'internal');
//
//                //for IE touch devices
//                css(container, {
//                    '-ms-touch-action': '',
//                    'touch-action': ''
//                });
//
//                //scrolling the page to the section with no animation
//                if (element != null) {
//                    var scrollSettings = getScrollSettings(element.offsetTop);
//                    scrollSettings.element.scrollTo(0, scrollSettings.options);
//                }
//            }
//        }
//
//        /**
//        * Defines wheter to record the history for each hash change in the URL.
//        */
//        function setRecordHistory(value, type){
//            setVariableState('recordHistory', value, type);
//        }
//
//        /**
//        * Defines the scrolling speed
//        */
//        function setScrollingSpeed(value, type){
//            setVariableState('scrollingSpeed', value, type);
//        }
//
//        /**
//        * Sets fitToSection
//        */
//        function setFitToSection(value, type){
//            setVariableState('fitToSection', value, type);
//        }
//
//        /**
//        * Sets lockAnchors
//        */
//        function setLockAnchors(value){
//            options.lockAnchors = value;
//        }
//
//        /**
//        * Adds or remove the possibility of scrolling through sections by using the mouse wheel or the trackpad.
//        */
//        function setMouseWheelScrolling(value){
//            if(value){
//                addMouseWheelHandler();
//                addMiddleWheelHandler();
//            }else{
//                removeMouseWheelHandler();
//                removeMiddleWheelHandler();
//            }
//        }
//
//        /**
//        * Adds or remove the possibility of scrolling through sections by using the mouse wheel/trackpad or touch gestures.
//        * Optionally a second parameter can be used to specify the direction for which the action will be applied.
//        *
//        * @param directions string containing the direction or directions separated by comma.
//        */
//        function setAllowScrolling(value, directions){
//            if(typeof directions !== 'undefined'){
//                directions = directions.replace(/ /g,'').split(',');
//
//                directions.forEach(function (direction){
//                    setIsScrollAllowed(value, direction, 'm');
//                });
//            }
//            else{
//                setIsScrollAllowed(value, 'all', 'm');
//            }
//        }
//
//        /**
//        * Adds or remove the mouse wheel hijacking
//        */
//        function setMouseHijack(value){
//            if(value){
//                setMouseWheelScrolling(true);
//                addTouchHandler();
//            }else{
//                setMouseWheelScrolling(false);
//                removeTouchHandler();
//            }
//        }
//
//        /**
//        * Adds or remove the possibility of scrolling through sections by using the keyboard arrow keys
//        */
//        function setKeyboardScrolling(value, directions){
//            if(typeof directions !== 'undefined'){
//                directions = directions.replace(/ /g,'').split(',');
//
//                directions.forEach(function(direction){
//                    setIsScrollAllowed(value, direction, 'k');
//                });
//            }else{
//                setIsScrollAllowed(value, 'all', 'k');
//                options.keyboardScrolling = value;
//            }
//        }
//
//        /**
//        * Moves the page up one section.
//        */
//        function moveSectionUp(){
//            var prev = prevUntil($(SECTION_ACTIVE_SEL)[0], SECTION_SEL);
//
//            //looping to the bottom if there's no more sections above
//            if (!prev && (options.loopTop || options.continuousVertical)) {
//                prev = last($(SECTION_SEL));
//            }
//
//            if (prev != null) {
//                scrollPage(prev, null, true);
//            }
//        }
//
//        /**
//        * Moves the page down one section.
//        */
//        function moveSectionDown(){
//            var next = nextUntil($(SECTION_ACTIVE_SEL)[0], SECTION_SEL);
//
//            //looping to the top if there's no more sections below
//            if(!next &&
//                (options.loopBottom || options.continuousVertical)){
//                next = $(SECTION_SEL)[0];
//            }
//
//            if(next != null){
//                scrollPage(next, null, false);
//            }
//        }
//
//        /**
//        * Moves the page to the given section and slide with no animation.
//        * Anchors or index positions can be used as params.
//        */
//        function silentMoveTo(sectionAnchor, slideAnchor){
//            setScrollingSpeed (0, 'internal');
//            moveTo(sectionAnchor, slideAnchor);
//            setScrollingSpeed (originals.scrollingSpeed, 'internal');
//        }
//
//        /**
//        * Moves the page to the given section and slide.
//        * Anchors or index positions can be used as params.
//        */
//        function moveTo(sectionAnchor, slideAnchor){
//            var destiny = getSectionByAnchor(sectionAnchor);
//
//            if (typeof slideAnchor !== 'undefined'){
//                scrollPageAndSlide(sectionAnchor, slideAnchor);
//            }else if(destiny != null){
//                scrollPage(destiny);
//            }
//        }
//
//        /**
//        * Slides right the slider of the active section.
//        * Optional `section` param.
//        */
//        function moveSlideRight(section){
//            moveSlide('right', section);
//        }
//
//        /**
//        * Slides left the slider of the active section.
//        * Optional `section` param.
//        */
//        function moveSlideLeft(section){
//            moveSlide('left', section);
//        }
//
//        /**
//         * When resizing is finished, we adjust the slides sizes and positions
//         */
//        function reBuild(resizing){
//            if(hasClass(container, DESTROYED)){ return; }  //nothing to do if the plugin was destroyed
//
//            isResizing = true;
//
//            //updating global vars
//            windowsHeight = getWindowHeight();
//            windowsWidth = getWindowWidth();
//
//            var sections = $(SECTION_SEL);
//            for (var i = 0; i < sections.length; ++i) {
//                var section = sections[i];
//                var slidesWrap = $(SLIDES_WRAPPER_SEL, section)[0];
//                var slides = $(SLIDE_SEL, section);
//
//                //adjusting the height of the table-cell for IE and Firefox
//                if(options.verticalCentered){
//                    css($(TABLE_CELL_SEL, section), {'height': getTableHeight(section) + 'px'});
//                }
//
//                css(section, {'height': windowsHeight + 'px'});
//
//                //adjusting the position fo the FULL WIDTH slides...
//                if (slides.length > 1) {
//                    landscapeScroll(slidesWrap, $(SLIDE_ACTIVE_SEL, slidesWrap)[0]);
//                }
//            }
//
//            if(options.scrollOverflow){
//                scrollBarHandler.createScrollBarForAll();
//            }
//
//            var activeSection = $(SECTION_ACTIVE_SEL)[0];
//            var sectionIndex = index(activeSection, SECTION_SEL);
//
//            //isn't it the first section?
//            if(sectionIndex){
//                //adjusting the position for the current section
//                silentMoveTo(sectionIndex + 1);
//            }
//
//            isResizing = false;
//            if(isFunction( options.afterResize ) && resizing){
//                options.afterResize.call(container, window.innerWidth, window.innerHeight);
//            }
//            if(isFunction( options.afterReBuild ) && !resizing){
//                options.afterReBuild.call(container);
//            }
//        }
//
//        /**
//        * Determines whether fullpage.js is in responsive mode or not.
//        */
//        function isResponsiveMode(){
//           return hasClass($body, RESPONSIVE);
//        }
//
//        /**
//        * Turns fullPage.js to normal scrolling mode when the viewport `width` or `height`
//        * are smaller than the set limit values.
//        */
//        function setResponsive(active){
//            var isResponsive = isResponsiveMode();
//
//            if(active){
//                if(!isResponsive){
//                    setAutoScrolling(false, 'internal');
//                    setFitToSection(false, 'internal');
//                    hide($(SECTION_NAV_SEL));
//                    addClass($body, RESPONSIVE);
//                    if(isFunction( options.afterResponsive )){
//                        options.afterResponsive.call( container, active);
//                    }
//
//                    //when on page load, we will remove scrolloverflow if necessary
//                    if(options.scrollOverflow){
//                        scrollBarHandler.createScrollBarForAll();
//                    }
//                }
//            }
//            else if(isResponsive){
//                setAutoScrolling(originals.autoScrolling, 'internal');
//                setFitToSection(originals.autoScrolling, 'internal');
//                show($(SECTION_NAV_SEL));
//                removeClass($body, RESPONSIVE);
//                if(isFunction( options.afterResponsive )){
//                    options.afterResponsive.call( container, active);
//                }
//            }
//        }
//
//        if(container){
//            //public functions
//            FP.version = '3.0.5';
//            FP.setAutoScrolling = setAutoScrolling;
//            FP.setRecordHistory = setRecordHistory;
//            FP.setScrollingSpeed = setScrollingSpeed;
//            FP.setFitToSection = setFitToSection;
//            FP.setLockAnchors = setLockAnchors;
//            FP.setMouseWheelScrolling = setMouseWheelScrolling;
//            FP.setAllowScrolling = setAllowScrolling;
//            FP.setKeyboardScrolling = setKeyboardScrolling;
//            FP.moveSectionUp = moveSectionUp;
//            FP.moveSectionDown = moveSectionDown;
//            FP.silentMoveTo = silentMoveTo;
//            FP.moveTo = moveTo;
//            FP.moveSlideRight = moveSlideRight;
//            FP.moveSlideLeft = moveSlideLeft;
//            FP.fitToSection = fitToSection;
//            FP.reBuild = reBuild;
//            FP.setResponsive = setResponsive;
//            FP.getFullpageData = function(){ return options };
//            FP.destroy = destroy;
//            FP.getActiveSection = getActiveSection;
//            FP.getActiveSlide = getActiveSlide;
//
//            FP.test = {
//                top: '0px',
//                translate3d: 'translate3d(0px, 0px, 0px)',
//                translate3dH: (function(){
//                    var a = [];
//                    for(var i = 0; i < $(options.sectionSelector, container).length; i++){
//                        a.push('translate3d(0px, 0px, 0px)');
//                    }
//                    return a;
//                })(),
//                left: (function(){
//                    var a = [];
//                    for(var i = 0; i < $(options.sectionSelector, container).length; i++){
//                        a.push(0);
//                    }
//                    return a;
//                })(),
//                options: options,
//                setAutoScrolling: setAutoScrolling
//            };
//
//            //functions we want to share across files but which are not
//            //mean to be used on their own by developers
//            FP.shared = {
//                afterRenderActions: afterRenderActions,
//                isNormalScrollElement: false
//            };
//
//            window.fullpage_api = FP;
//
//            //using jQuery initialization? Creating the $.fn.fullpage object
//            if(options.$){
//                Object.keys(FP).forEach(function (key) {    
//                    options.$.fn.fullpage[key] = FP[key];   
//                });
//            }
//
//            init();
//
//            bindEvents();
//        }
//
//        function init(){
//            //if css3 is not supported, it will use jQuery animations
//            if(options.css3){
//                options.css3 = support3d();
//            }
//
//            options.scrollBar = options.scrollBar || options.hybrid;
//
//            setOptionsFromDOM();
//            prepareDom();
//            setAllowScrolling(true);
//            setMouseHijack(true);
//            setAutoScrolling(options.autoScrolling, 'internal');
//            responsive();
//
//            //setting the class for the body element
//            setBodyClass();
//
//            if(document.readyState === 'complete'){
//                scrollToAnchor();
//            }
//            window.addEventListener('load', scrollToAnchor);
//
//            //if we use scrollOverflow we'll fire afterRender in the scrolloverflow file
//            if(!options.scrollOverflow){
//                afterRenderActions();
//            }
//
//            doubleCheckHeight();
//        }
//
//        function bindEvents(){
//
//            //when scrolling...
//            window.addEventListener('scroll', scrollHandler);
//
//            //detecting any change on the URL to scroll to the given anchor link
//            //(a way to detect back history button as we play with the hashes on the URL)
//            window.addEventListener('hashchange', hashChangeHandler);
//
//            //when opening a new tab (ctrl + t), `control` won't be pressed when coming back.
//            window.addEventListener('blur', blurHandler);
//
//            //when resizing the site, we adjust the heights of the sections, slimScroll...
//            window.addEventListener('resize', resizeHandler);
//
//            //Sliding with arrow keys, both, vertical and horizontal
//            document.addEventListener('keydown', keydownHandler);
//
//            //to prevent scrolling while zooming
//            document.addEventListener('keyup', keyUpHandler);
//
//            //Scrolls to the section when clicking the navigation bullet
//            //simulating the jQuery .on('click') event using delegation
//            ['click', 'touchstart'].forEach(function(eventName){
//                document.addEventListener(eventName, delegatedEvents);
//            });
//
//            /**
//            * Applying normalScroll elements.
//            * Ignoring the scrolls over the specified selectors.
//            */
//            if(options.normalScrollElements){
//                ['mouseenter', 'touchstart'].forEach(function(eventName){
//                    forMouseLeaveOrTouch(eventName, false);
//                });
//
//                ['mouseleave', 'touchend'].forEach(function(eventName){
//                   forMouseLeaveOrTouch(eventName, true);
//                });
//            }
//        }
//
//        function delegatedEvents(e){
//            var target = e.target;
//
//            if(target && closest(target, SECTION_NAV_SEL + ' a')){
//                sectionBulletHandler.call(target, e);
//            }
//            else if(matches(target, SECTION_NAV_TOOLTIP_SEL)){
//                tooltipTextHandler.call(target);
//            }
//            else if(matches(target, SLIDES_ARROW_SEL)){
//                slideArrowHandler.call(target, e);
//            }
//            else if(matches(target, SLIDES_NAV_LINK_SEL) || closest(target, SLIDES_NAV_LINK_SEL) != null){
//                slideBulletHandler.call(target, e);
//            }
//            else if(closest(target, options.menu + ' [data-menuanchor]')){
//                menuItemsHandler.call(target, e);
//            }
//        }
//
//        function forMouseLeaveOrTouch(eventName, allowScrolling){
//            //a way to pass arguments to the onMouseEnterOrLeave function
//            document['fp_' + eventName] = allowScrolling;
//            document.addEventListener(eventName, onMouseEnterOrLeave, true); //capturing phase
//        }
//
//        function onMouseEnterOrLeave(e) {
//            //onMouseLeave will use the destination target, not the one we are moving away from
//            var target = event.toElement || e.relatedTarget || e.target;
//
//            var type = e.type;
//            var isInsideOneNormalScroll = false;
//
//            //coming from closing a normalScrollElements modal or moving outside viewport?
//            if(target == document || !target){
//                setMouseHijack(true);
//                return;
//            }
//
//            if(type === 'touchend'){
//                g_canFireMouseEnterNormalScroll = false;
//                setTimeout(function(){
//                    g_canFireMouseEnterNormalScroll = true;
//                }, 800);
//            }
//
//            //preventing mouseenter event to do anything when coming from a touchEnd event
//            //fixing issue #3576
//            if(type === 'mouseenter' && !g_canFireMouseEnterNormalScroll){
//                return;
//            }
//
//            var normalSelectors = options.normalScrollElements.split(',');
//
//            normalSelectors.forEach(function(normalSelector){
//                if(!isInsideOneNormalScroll){
//                    var isNormalScrollTarget = matches(target, normalSelector);
//
//                    //leaving a child inside the normalScoll element is not leaving the normalScroll #3661
//                    var isNormalScrollChildFocused = closest(target, normalSelector);
//
//                    if(isNormalScrollTarget || isNormalScrollChildFocused){
//                        if(!FP.shared.isNormalScrollElement){
//                            setMouseHijack(false);
//                        }
//                        FP.shared.isNormalScrollElement = true;
//                        isInsideOneNormalScroll = true;
//                    }
//                }
//            });
//
//            //not inside a single normal scroll element anymore?
//            if(!isInsideOneNormalScroll && FP.shared.isNormalScrollElement){
//                setMouseHijack(true);
//                FP.shared.isNormalScrollElement = false;
//            }
//        }
//
//        /**
//        * Checks the viewport a few times on a define interval of time to 
//        * see if it has changed in any of those. If that's the case, it resizes.
//        */
//        function doubleCheckHeight(){
//            for(var i = 1; i < 4; i++){
//                g_doubleCheckHeightId = setTimeout(adjustToNewViewport, 350 * i);
//            }
//        }
//
//        /**
//        * Adjusts a section to the viewport if it has changed.
//        */
//        function adjustToNewViewport(){
//            var newWindowHeight = getWindowHeight();
//            var newWindowWidth = getWindowWidth();
//
//            if(windowsHeight !== newWindowHeight || windowsWidth !== newWindowWidth){
//                windowsHeight = newWindowHeight;
//                windowsWidth = newWindowWidth;
//                reBuild(true);
//            }
//        }
//
//        /**
//        * Setting options from DOM elements if they are not provided.
//        */
//        function setOptionsFromDOM(){
//
//            //no anchors option? Checking for them in the DOM attributes
//            if(!options.anchors.length){
//                var attrName = '[data-anchor]';
//                var anchors = $(options.sectionSelector.split(',').join(attrName + ',') + attrName, container);
//                if(anchors.length){
//                    g_initialAnchorsInDom = true;
//                    anchors.forEach(function(item){
//                        options.anchors.push(item.getAttribute('data-anchor').toString());
//                    });
//                }
//            }
//
//            //no tooltips option? Checking for them in the DOM attributes
//            if(!options.navigationTooltips.length){
//                var attrName = '[data-tooltip]';
//                var tooltips = $(options.sectionSelector.split(',').join(attrName + ',') + attrName, container);
//                if(tooltips.length){
//                    tooltips.forEach(function(item){
//                        options.navigationTooltips.push(item.getAttribute('data-tooltip').toString());
//                    });
//                }
//            }
//        }
//
//        /**
//        * Works over the DOM structure to set it up for the current fullpage options.
//        */
//        function prepareDom(){
//            css(container, {
//                'height': '100%',
//                'position': 'relative'
//            });
//
//            //adding a class to recognize the container internally in the code
//            addClass(container, WRAPPER);
//            addClass($html, ENABLED);
//
//            //due to https://github.com/alvarotrigo/fullPage.js/issues/1502
//            windowsHeight = getWindowHeight();
//
//            removeClass(container, DESTROYED); //in case it was destroyed before initializing it again
//
//            addInternalSelectors();
//
//            var sections = $(SECTION_SEL);
//
//            //styling the sections / slides / menu
//            for(var i = 0; i<sections.length; i++){
//                var sectionIndex = i;
//                var section = sections[i];
//                var slides = $(SLIDE_SEL, section);
//                var numSlides = slides.length;
//
//                //caching the original styles to add them back on destroy('all')
//                section.setAttribute('data-fp-styles', section.getAttribute('style'));
//
//                styleSection(section, sectionIndex);
//                styleMenu(section, sectionIndex);
//
//                // if there's any slide
//                if (numSlides > 0) {
//                    styleSlides(section, slides, numSlides);
//                }else{
//                    if(options.verticalCentered){
//                        addTableClass(section);
//                    }
//                }
//            }
//
//            //fixed elements need to be moved out of the plugin container due to problems with CSS3.
//            if(options.fixedElements && options.css3){
//                $(options.fixedElements).forEach(function(item){
//                    $body.appendChild(item);
//                });
//            }
//
//            //vertical centered of the navigation + active bullet
//            if(options.navigation){
//                addVerticalNavigation();
//            }
//
//            enableYoutubeAPI();
//
//            if(options.scrollOverflow){
//                scrollBarHandler = options.scrollOverflowHandler.init(options);
//            }
//        }
//
//        /**
//        * Styles the horizontal slides for a section.
//        */
//        function styleSlides(section, slides, numSlides){
//            var sliderWidth = numSlides * 100;
//            var slideWidth = 100 / numSlides;
//
//            var slidesWrapper = document.createElement('div');
//            slidesWrapper.className = SLIDES_WRAPPER; //fp-slides
//            wrapAll(slides, slidesWrapper);
//
//            var slidesContainer = document.createElement('div');
//            slidesContainer.className = SLIDES_CONTAINER; //fp-slidesContainer
//            wrapAll(slides, slidesContainer);
//
//            css($(SLIDES_CONTAINER_SEL, section), {'width': sliderWidth + '%'});
//
//            if(numSlides > 1){
//                if(options.controlArrows){
//                    createSlideArrows(section);
//                }
//
//                if(options.slidesNavigation){
//                    addSlidesNavigation(section, numSlides);
//                }
//            }
//
//            slides.forEach(function(slide) {
//                css(slide, {'width': slideWidth + '%'});
//
//                if(options.verticalCentered){
//                    addTableClass(slide);
//                }
//            });
//
//            var startingSlide = $(SLIDE_ACTIVE_SEL, section)[0];
//
//            //if the slide won't be an starting point, the default will be the first one
//            //the active section isn't the first one? Is not the first slide of the first section? Then we load that section/slide by default.
//            if( startingSlide != null && (index($(SECTION_ACTIVE_SEL), SECTION_SEL) !== 0 || (index($(SECTION_ACTIVE_SEL), SECTION_SEL) === 0 && index(startingSlide) !== 0))){
//                silentLandscapeScroll(startingSlide, 'internal');
//            }else{
//                addClass(slides[0], ACTIVE);
//            }
//        }
//
//        /**
//        * Styling vertical sections
//        */
//        function styleSection(section, index){
//            //if no active section is defined, the 1st one will be the default one
//            if(!index && $(SECTION_ACTIVE_SEL)[0] == null) {
//                addClass(section, ACTIVE);
//            }
//            startingSection = $(SECTION_ACTIVE_SEL)[0];
//
//            css(section, {'height': windowsHeight + 'px'});
//
//            if(options.paddingTop){
//                css(section, {'padding-top': options.paddingTop});
//            }
//
//            if(options.paddingBottom){
//                css(section, {'padding-bottom': options.paddingBottom});
//            }
//
//            if (typeof options.sectionsColor[index] !==  'undefined') {
//                css(section, {'background-color': options.sectionsColor[index]});
//            }
//
//            if (typeof options.anchors[index] !== 'undefined') {
//                section.setAttribute('data-anchor', options.anchors[index]);
//            }
//        }
//
//        /**
//        * Sets the data-anchor attributes to the menu elements and activates the current one.
//        */
//        function styleMenu(section, index){
//            if (typeof options.anchors[index] !== 'undefined') {
//                //activating the menu / nav element on load
//                if(hasClass(section, ACTIVE)){
//                    activateMenuAndNav(options.anchors[index], index);
//                }
//            }
//
//            //moving the menu outside the main container if it is inside (avoid problems with fixed positions when using CSS3 tranforms)
//            if(options.menu && options.css3 && closest($(options.menu)[0], WRAPPER_SEL) != null){
//                $(options.menu).forEach(function(menu) {
//                    $body.appendChild(menu);
//                });
//            }
//        }
//
//        /**
//        * Adds internal classes to be able to provide customizable selectors
//        * keeping the link with the style sheet.
//        */
//        function addInternalSelectors(){
//            addClass($(options.sectionSelector, container), SECTION);
//            addClass($(options.slideSelector, container), SLIDE);
//        }
//
//        /**
//        * Creates the control arrows for the given section
//        */
//        function createSlideArrows(section){
//            var arrows = [createElementFromHTML('<div class="' + SLIDES_ARROW_PREV + '"></div>'), createElementFromHTML('<div class="' + SLIDES_ARROW_NEXT + '"></div>')];
//            after($(SLIDES_WRAPPER_SEL, section)[0], arrows);
//
//            if(options.controlArrowColor !== '#fff'){
//                css($(SLIDES_ARROW_NEXT_SEL, section), {'border-color': 'transparent transparent transparent '+options.controlArrowColor});
//                css($(SLIDES_ARROW_PREV_SEL, section), {'border-color': 'transparent '+ options.controlArrowColor + ' transparent transparent'});
//            }
//
//            if(!options.loopHorizontal){
//                hide($(SLIDES_ARROW_PREV_SEL, section));
//            }
//        }
//
//        /**
//        * Creates a vertical navigation bar.
//        */
//        function addVerticalNavigation(){
//            var navigation = document.createElement('div');
//            navigation.setAttribute('id', SECTION_NAV);
//
//            var divUl = document.createElement('ul');
//            navigation.appendChild(divUl);
//
//            appendTo(navigation, $body);
//            var nav = $(SECTION_NAV_SEL)[0];
//
//            addClass(nav, 'fp-' + options.navigationPosition);
//
//            if(options.showActiveTooltip){
//                addClass(nav, SHOW_ACTIVE_TOOLTIP);
//            }
//
//            var li = '';
//
//            for (var i = 0; i < $(SECTION_SEL).length; i++) {
//                var link = '';
//                if (options.anchors.length) {
//                    link = options.anchors[i];
//                }
//
//                li += '<li><a href="#' + link + '"><span class="fp-sr-only">' + getBulletLinkName(i, 'Section') + '</span><span></span></a>';
//
//                // Only add tooltip if needed (defined by user)
//                var tooltip = options.navigationTooltips[i];
//
//                if (typeof tooltip !== 'undefined' && tooltip !== '') {
//                    li += '<div class="' + SECTION_NAV_TOOLTIP + ' fp-' + options.navigationPosition + '">' + tooltip + '</div>';
//                }
//
//                li += '</li>';
//            }
//            $('ul', nav)[0].innerHTML = li;
//
//            //centering it vertically
//            css($(SECTION_NAV_SEL), {'margin-top': '-' + ($(SECTION_NAV_SEL)[0].offsetHeight/2) + 'px'});
//
//            //activating the current active section
//
//            var bullet = $('li', $(SECTION_NAV_SEL)[0])[index($(SECTION_ACTIVE_SEL)[0], SECTION_SEL)];
//            addClass($('a', bullet), ACTIVE);
//        }
//
//        /**
//        * Gets the name for screen readers for a section/slide navigation bullet.
//        */
//        function getBulletLinkName(i, defaultName){
//            return options.navigationTooltips[i]
//                || options.anchors[i]
//                || defaultName + ' ' + (i+1)
//        }
//
//        /*
//        * Enables the Youtube videos API so we can control their flow if necessary.
//        */
//        function enableYoutubeAPI(){
//            $('iframe[src*="youtube.com/embed/"]', container).forEach(function(item){
//                addURLParam(item, 'enablejsapi=1');
//            });
//        }
//
//        /**
//        * Adds a new parameter and its value to the `src` of a given element
//        */
//        function addURLParam(element, newParam){
//            var originalSrc = element.getAttribute('src');
//            element.setAttribute('src', originalSrc + getUrlParamSign(originalSrc) + newParam);
//        }
//
//        /*
//        * Returns the prefix sign to use for a new parameter in an existen URL.
//        *
//        * @return {String}  ? | &
//        */
//        function getUrlParamSign(url){
//            return ( !/\?/.test( url ) ) ? '?' : '&';
//        }
//
//        /**
//        * Actions and callbacks to fire afterRender
//        */
//        function afterRenderActions(){
//            var section = $(SECTION_ACTIVE_SEL)[0];
//
//            addClass(section, COMPLETELY);
//
//            lazyLoad(section);
//            lazyLoadOthers();
//            playMedia(section);
//
//            if(options.scrollOverflow){
//                options.scrollOverflowHandler.afterLoad();
//            }
//
//            if(isDestinyTheStartingSection() && isFunction(options.afterLoad) ){
//                fireCallback('afterLoad', {
//                    activeSection: section,
//                    element: section,
//                    direction: null,
//
//                    //for backwards compatibility callback (to be removed in a future!)
//                    anchorLink: section.getAttribute('data-anchor'),
//                    sectionIndex: index(section, SECTION_SEL)
//                });
//            }
//
//            if(isFunction(options.afterRender)){
//                fireCallback('afterRender');
//            }
//        }
//
//        /**
//        * Determines if the URL anchor destiny is the starting section (the one using 'active' class before initialization)
//        */
//        function isDestinyTheStartingSection(){
//            var anchor = getAnchorsURL();
//            var destinationSection = getSectionByAnchor(anchor.section);
//            return !anchor.section || !destinationSection || typeof destinationSection !=='undefined' && index(destinationSection) === index(startingSection);
//        }
//
//        var isScrolling = false;
//        var lastScroll = 0;
//
//        //when scrolling...
//        function scrollHandler(){
//            var currentSection;
//
//            if(!options.autoScrolling || options.scrollBar){
//                var currentScroll = getScrollTop();
//                var scrollDirection = getScrollDirection(currentScroll);
//                var visibleSectionIndex = 0;
//                var screen_mid = currentScroll + (getWindowHeight() / 2.0);
//                var isAtBottom = $body.offsetHeight - getWindowHeight() === currentScroll;
//                var sections =  $(SECTION_SEL);
//
//                //when using `auto-height` for a small last section it won't be centered in the viewport
//                if(isAtBottom){
//                    visibleSectionIndex = sections.length - 1;
//                }
//                //is at top? when using `auto-height` for a small first section it won't be centered in the viewport
//                else if(!currentScroll){
//                    visibleSectionIndex = 0;
//                }
//
//                //taking the section which is showing more content in the viewport
//                else{
//                    for (var i = 0; i < sections.length; ++i) {
//                        var section = sections[i];
//
//                        // Pick the the last section which passes the middle line of the screen.
//                        if (section.offsetTop <= screen_mid)
//                        {
//                            visibleSectionIndex = i;
//                        }
//                    }
//                }
//
//                if(isCompletelyInViewPort(scrollDirection)){
//                    if(!hasClass($(SECTION_ACTIVE_SEL)[0], COMPLETELY)){
//                        addClass($(SECTION_ACTIVE_SEL)[0], COMPLETELY);
//                        removeClass(siblings($(SECTION_ACTIVE_SEL)[0]), COMPLETELY);
//                    }
//                }
//
//                //geting the last one, the current one on the screen
//                currentSection = sections[visibleSectionIndex];
//
//                //setting the visible section as active when manually scrolling
//                //executing only once the first time we reach the section
//                if(!hasClass(currentSection, ACTIVE)){
//                    isScrolling = true;
//                    var leavingSection = $(SECTION_ACTIVE_SEL)[0];
//                    var leavingSectionIndex = index(leavingSection, SECTION_SEL) + 1;
//                    var yMovement = getYmovement(currentSection);
//                    var anchorLink  = currentSection.getAttribute('data-anchor');
//                    var sectionIndex = index(currentSection, SECTION_SEL) + 1;
//                    var activeSlide = $(SLIDE_ACTIVE_SEL, currentSection)[0];
//                    var slideIndex;
//                    var slideAnchorLink;
//                    var callbacksParams = {
//                        activeSection: leavingSection,
//                        sectionIndex: sectionIndex -1,
//                        anchorLink: anchorLink,
//                        element: currentSection,
//                        leavingSection: leavingSectionIndex,
//                        direction: yMovement
//                    };
//
//                    if(activeSlide){
//                        slideAnchorLink = activeSlide.getAttribute('data-anchor');
//                        slideIndex = index(activeSlide);
//                    }
//
//                    if(canScroll){
//                        addClass(currentSection, ACTIVE);
//                        removeClass(siblings(currentSection), ACTIVE);
//
//                        if(isFunction( options.onLeave )){
//                            fireCallback('onLeave', callbacksParams);
//                        }
//                        if(isFunction( options.afterLoad )){
//                            fireCallback('afterLoad', callbacksParams);
//                        }
//
//                        stopMedia(leavingSection);
//                        lazyLoad(currentSection);
//                        playMedia(currentSection);
//
//                        activateMenuAndNav(anchorLink, sectionIndex - 1);
//
//                        if(options.anchors.length){
//                            //needed to enter in hashChange event when using the menu with anchor links
//                            lastScrolledDestiny = anchorLink;
//                        }
//                        setState(slideIndex, slideAnchorLink, anchorLink, sectionIndex);
//                    }
//
//                    //small timeout in order to avoid entering in hashChange event when scrolling is not finished yet
//                    clearTimeout(scrollId);
//                    scrollId = setTimeout(function(){
//                        isScrolling = false;
//                    }, 100);
//                }
//
//                if(options.fitToSection){
//                    //for the auto adjust of the viewport to fit a whole section
//                    clearTimeout(scrollId2);
//
//                    scrollId2 = setTimeout(function(){
//                        //checking it again in case it changed during the delay
//                        if(options.fitToSection &&
//
//                            //is the destination element bigger than the viewport?
//                            $(SECTION_ACTIVE_SEL)[0].offsetHeight <= windowsHeight
//                        ){
//                            fitToSection();
//                        }
//                    }, options.fitToSectionDelay);
//                }
//            }
//        }
//
//        /**
//        * Fits the site to the nearest active section
//        */
//        function fitToSection(){
//            //checking fitToSection again in case it was set to false before the timeout delay
//            if(canScroll){
//                //allows to scroll to an active section and
//                //if the section is already active, we prevent firing callbacks
//                isResizing = true;
//
//                scrollPage($(SECTION_ACTIVE_SEL)[0]);
//                isResizing = false;
//            }
//        }
//
//        /**
//        * Determines whether the active section has seen in its whole or not.
//        */
//        function isCompletelyInViewPort(movement){
//            var top = $(SECTION_ACTIVE_SEL)[0].offsetTop;
//            var bottom = top + getWindowHeight();
//
//            if(movement == 'up'){
//                return bottom >= (getScrollTop() + getWindowHeight());
//            }
//            return top <= getScrollTop();
//        }
//
//        /**
//        * Determines whether a section is in the viewport or not.
//        */
//        function isSectionInViewport (el) {
//            var rect = el.getBoundingClientRect();
//            var top = rect.top;
//            var bottom = rect.bottom;
//
//            //sometimes there's a 1px offset on the bottom of the screen even when the 
//            //section's height is the window.innerHeight one. I guess because pixels won't allow decimals.
//            //using this prevents from lazyLoading the section that is not yet visible 
//            //(only 1 pixel offset is)
//            var pixelOffset = 2;
//            
//            var isTopInView = top + pixelOffset < windowsHeight && top > 0;
//            var isBottomInView = bottom > pixelOffset && bottom < windowsHeight;
//
//            return isTopInView || isBottomInView;
//        }
//
//        /**
//        * Gets the directon of the the scrolling fired by the scroll event.
//        */
//        function getScrollDirection(currentScroll){
//            var direction = currentScroll > lastScroll ? 'down' : 'up';
//
//            lastScroll = currentScroll;
//
//            //needed for auto-height sections to determine if we want to scroll to the top or bottom of the destination
//            previousDestTop = currentScroll;
//
//            return direction;
//        }
//
//        /**
//        * Determines the way of scrolling up or down:
//        * by 'automatically' scrolling a section or by using the default and normal scrolling.
//        */
//        function scrolling(type){
//            if (!isScrollAllowed.m[type]){
//                return;
//            }
//
//            var scrollSection = (type === 'down') ? moveSectionDown : moveSectionUp;
//
//            if(options.scrollOverflow){
//                var scrollable = options.scrollOverflowHandler.scrollable($(SECTION_ACTIVE_SEL)[0]);
//                var check = (type === 'down') ? 'bottom' : 'top';
//
//                if(scrollable != null ){
//                    //is the scrollbar at the start/end of the scroll?
//                    if(options.scrollOverflowHandler.isScrolled(check, scrollable)){
//                        scrollSection();
//                    }else{
//                        return true;
//                    }
//                }else{
//                    // moved up/down
//                    scrollSection();
//                }
//            }else{
//                // moved up/down
//                scrollSection();
//            }
//        }
//
//        /*
//        * Preventing bouncing in iOS #2285
//        */
//        function preventBouncing(e){
//            if(options.autoScrolling && isReallyTouch(e) && isScrollAllowed.m.up){
//                //preventing the easing on iOS devices
//                preventDefault(e);
//            }
//        }
//
//        var touchStartY = 0;
//        var touchStartX = 0;
//        var touchEndY = 0;
//        var touchEndX = 0;
//
//        /* Detecting touch events
//
//        * As we are changing the top property of the page on scrolling, we can not use the traditional way to detect it.
//        * This way, the touchstart and the touch moves shows an small difference between them which is the
//        * used one to determine the direction.
//        */
//        function touchMoveHandler(e){
//            var activeSection = closest(e.target, SECTION_SEL) || $(SECTION_ACTIVE_SEL)[0];
//
//            if (isReallyTouch(e) ) {
//
//                if(options.autoScrolling){
//                    //preventing the easing on iOS devices
//                    preventDefault(e);
//                }
//
//                var touchEvents = getEventsPage(e);
//
//                touchEndY = touchEvents.y;
//                touchEndX = touchEvents.x;
//
//                //if movement in the X axys is greater than in the Y and the currect section has slides...
//                if ($(SLIDES_WRAPPER_SEL, activeSection).length && Math.abs(touchStartX - touchEndX) > (Math.abs(touchStartY - touchEndY))) {
//
//                    //is the movement greater than the minimum resistance to scroll?
//                    if (!slideMoving && Math.abs(touchStartX - touchEndX) > (getWindowWidth() / 100 * options.touchSensitivity)) {
//                        if (touchStartX > touchEndX) {
//                            if(isScrollAllowed.m.right){
//                                moveSlideRight(activeSection); //next
//                            }
//                        } else {
//                            if(isScrollAllowed.m.left){
//                                moveSlideLeft(activeSection); //prev
//                            }
//                        }
//                    }
//                }
//
//                //vertical scrolling (only when autoScrolling is enabled)
//                else if(options.autoScrolling && canScroll){
//
//                    //is the movement greater than the minimum resistance to scroll?
//                    if (Math.abs(touchStartY - touchEndY) > (window.innerHeight / 100 * options.touchSensitivity)) {
//                        if (touchStartY > touchEndY) {
//                            scrolling('down');
//                        } else if (touchEndY > touchStartY) {
//                            scrolling('up');
//                        }
//                    }
//                }
//            }
//        }
//
//        /**
//        * As IE >= 10 fires both touch and mouse events when using a mouse in a touchscreen
//        * this way we make sure that is really a touch event what IE is detecting.
//        */
//        function isReallyTouch(e){
//            //if is not IE   ||  IE is detecting `touch` or `pen`
//            return typeof e.pointerType === 'undefined' || e.pointerType != 'mouse';
//        }
//
//        /**
//        * Handler for the touch start event.
//        */
//        function touchStartHandler(e){
//
//            //stopping the auto scroll to adjust to a section
//            if(options.fitToSection){
//                activeAnimation = false;
//            }
//
//            if(isReallyTouch(e)){
//                var touchEvents = getEventsPage(e);
//                touchStartY = touchEvents.y;
//                touchStartX = touchEvents.x;
//            }
//        }
//
//        /**
//        * Gets the average of the last `number` elements of the given array.
//        */
//        function getAverage(elements, number){
//            var sum = 0;
//
//            //taking `number` elements from the end to make the average, if there are not enought, 1
//            var lastElements = elements.slice(Math.max(elements.length - number, 1));
//
//            for(var i = 0; i < lastElements.length; i++){
//                sum = sum + lastElements[i];
//            }
//
//            return Math.ceil(sum/number);
//        }
//
//        /**
//         * Detecting mousewheel scrolling
//         *
//         * http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html
//         * http://www.sitepoint.com/html5-javascript-mouse-wheel/
//         */
//        var prevTime = new Date().getTime();
//
//        function MouseWheelHandler(e) {
//            var curTime = new Date().getTime();
//            var isNormalScroll = hasClass($(COMPLETELY_SEL)[0], NORMAL_SCROLL);
//
//            //is scroll allowed?
//            if (!isScrollAllowed.m.down && !isScrollAllowed.m.up) {
//                preventDefault(e);
//                return false;
//            }
//
//            //autoscrolling and not zooming?
//            if(options.autoScrolling && !controlPressed && !isNormalScroll){
//                // cross-browser wheel delta
//                e = e || window.event;
//                var value = e.wheelDelta || -e.deltaY || -e.detail;
//                var delta = Math.max(-1, Math.min(1, value));
//
//                var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
//                var isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX ) < Math.abs(e.deltaY) || !horizontalDetection);
//
//                //Limiting the array to 150 (lets not waste memory!)
//                if(scrollings.length > 149){
//                    scrollings.shift();
//                }
//
//                //keeping record of the previous scrollings
//                scrollings.push(Math.abs(value));
//
//                //preventing to scroll the site on mouse wheel when scrollbar is present
//                if(options.scrollBar){
//                    preventDefault(e);
//                }
//
//                //time difference between the last scroll and the current one
//                var timeDiff = curTime-prevTime;
//                prevTime = curTime;
//
//                //haven't they scrolled in a while?
//                //(enough to be consider a different scrolling action to scroll another section)
//                if(timeDiff > 200){
//                    //emptying the array, we dont care about old scrollings for our averages
//                    scrollings = [];
//                }
//
//                if(canScroll){
//                    var averageEnd = getAverage(scrollings, 10);
//                    var averageMiddle = getAverage(scrollings, 70);
//                    var isAccelerating = averageEnd >= averageMiddle;
//
//                    //to avoid double swipes...
//                    if(isAccelerating && isScrollingVertically){
//                        //scrolling down?
//                        if (delta < 0) {
//                            scrolling('down');
//
//                        //scrolling up?
//                        }else {
//                            scrolling('up');
//                        }
//                    }
//                }
//
//                return false;
//            }
//
//            if(options.fitToSection){
//                //stopping the auto scroll to adjust to a section
//                activeAnimation = false;
//            }
//        }
//
//        /**
//        * Slides a slider to the given direction.
//        * Optional `section` param.
//        */
//        function moveSlide(direction, section){
//            var activeSection = section == null ? $(SECTION_ACTIVE_SEL)[0] : section;
//            var slides = $(SLIDES_WRAPPER_SEL, activeSection)[0];
//
//            // more than one slide needed and nothing should be sliding
//            if (slides == null || slideMoving || $(SLIDE_SEL, slides).length < 2) {
//                return;
//            }
//
//            var currentSlide = $(SLIDE_ACTIVE_SEL, slides)[0];
//            var destiny = null;
//
//            if(direction === 'left'){
//                destiny = prevUntil(currentSlide, SLIDE_SEL);
//            }else{
//                destiny = nextUntil(currentSlide, SLIDE_SEL);
//            }
//
//            //isn't there a next slide in the secuence?
//            if(destiny == null){
//                //respect loopHorizontal settin
//                if (!options.loopHorizontal) return;
//
//                var slideSiblings = siblings(currentSlide);
//                if(direction === 'left'){
//                    destiny = slideSiblings[slideSiblings.length - 1]; //last
//                }else{
//                    destiny = slideSiblings[0]; //first
//                }
//            }
//
//            slideMoving = true && !FP.test.isTesting;
//            landscapeScroll(slides, destiny, direction);
//        }
//
//        /**
//        * Maintains the active slides in the viewport
//        * (Because the `scroll` animation might get lost with some actions, such as when using continuousVertical)
//        */
//        function keepSlidesPosition(){
//            var activeSlides = $(SLIDE_ACTIVE_SEL);
//            for( var i =0; i<activeSlides.length; i++){
//                silentLandscapeScroll(activeSlides[i], 'internal');
//            }
//        }
//
//        var previousDestTop = 0;
//        /**
//        * Returns the destination Y position based on the scrolling direction and
//        * the height of the section.
//        */
//        function getDestinationPosition(element){
//            var elementHeight = element.offsetHeight;
//            var elementTop = element.offsetTop;
//
//            //top of the desination will be at the top of the viewport
//            var position = elementTop;
//            var isScrollingDown =  elementTop > previousDestTop;
//            var sectionBottom = position - windowsHeight + elementHeight;
//            var bigSectionsDestination = options.bigSectionsDestination;
//
//            //is the destination element bigger than the viewport?
//            if(elementHeight > windowsHeight){
//                //scrolling up?
//                if(!isScrollingDown && !bigSectionsDestination || bigSectionsDestination === 'bottom' ){
//                    position = sectionBottom;
//                }
//            }
//
//            //sections equal or smaller than the viewport height && scrolling down? ||  is resizing and its in the last section
//            else if(isScrollingDown || (isResizing && next(element) == null) ){
//                //The bottom of the destination will be at the bottom of the viewport
//                position = sectionBottom;
//            }
//
//            /*
//            Keeping record of the last scrolled position to determine the scrolling direction.
//            No conventional methods can be used as the scroll bar might not be present
//            AND the section might not be active if it is auto-height and didnt reach the middle
//            of the viewport.
//            */
//            previousDestTop = position;
//            return position;
//        }
//
//        /**
//        * Scrolls the site to the given element and scrolls to the slide if a callback is given.
//        */
//        function scrollPage(element, callback, isMovementUp){
//            if(element == null){ return; } //there's no element to scroll, leaving the function
//
//            var dtop = getDestinationPosition(element);
//            var slideAnchorLink;
//            var slideIndex;
//
//            //local variables
//            var v = {
//                element: element,
//                callback: callback,
//                isMovementUp: isMovementUp,
//                dtop: dtop,
//                yMovement: getYmovement(element),
//                anchorLink: element.getAttribute('data-anchor'),
//                sectionIndex: index(element, SECTION_SEL),
//                activeSlide: $(SLIDE_ACTIVE_SEL, element)[0],
//                activeSection: $(SECTION_ACTIVE_SEL)[0],
//                leavingSection: index($(SECTION_ACTIVE_SEL), SECTION_SEL) + 1,
//
//                //caching the value of isResizing at the momment the function is called
//                //because it will be checked later inside a setTimeout and the value might change
//                localIsResizing: isResizing
//            };
//
//            //quiting when destination scroll is the same as the current one
//            if((v.activeSection == element && !isResizing) || (options.scrollBar && getScrollTop() === v.dtop && !hasClass(element, AUTO_HEIGHT) )){ return; }
//
//            if(v.activeSlide != null){
//                slideAnchorLink = v.activeSlide.getAttribute('data-anchor');
//                slideIndex = index(v.activeSlide);
//            }
//
//            //callback (onLeave) if the site is not just resizing and readjusting the slides
//            if(!v.localIsResizing){
//                var direction = v.yMovement;
//
//                //required for continousVertical
//                if(typeof isMovementUp !== 'undefined'){
//                    direction = isMovementUp ? 'up' : 'down';
//                }
//
//                //for the callback
//                v.direction = direction;
//
//                if(isFunction(options.onLeave)){
//                    if(fireCallback('onLeave', v) === false){
//                        return;
//                    }
//                }
//            }
//
//            // If continuousVertical && we need to wrap around
//            if (options.autoScrolling && options.continuousVertical && typeof (v.isMovementUp) !== "undefined" &&
//                ((!v.isMovementUp && v.yMovement == 'up') || // Intending to scroll down but about to go up or
//                (v.isMovementUp && v.yMovement == 'down'))) { // intending to scroll up but about to go down
//
//                v = createInfiniteSections(v);
//            }
//
//            //pausing media of the leaving section (if we are not just resizing, as destinatino will be the same one)
//            if(!v.localIsResizing){
//                stopMedia(v.activeSection);
//            }
//
//            if(options.scrollOverflow){
//                options.scrollOverflowHandler.beforeLeave();
//            }
//
//            addClass(element, ACTIVE);
//            removeClass(siblings(element), ACTIVE);
//            lazyLoad(element);
//
//            if(options.scrollOverflow){
//                options.scrollOverflowHandler.onLeave();
//            }
//
//            //preventing from activating the MouseWheelHandler event
//            //more than once if the page is scrolling
//            canScroll = false || FP.test.isTesting;
//
//            setState(slideIndex, slideAnchorLink, v.anchorLink, v.sectionIndex);
//
//            performMovement(v);
//
//            //flag to avoid callingn `scrollPage()` twice in case of using anchor links
//            lastScrolledDestiny = v.anchorLink;
//
//            //avoid firing it twice (as it does also on scroll)
//            activateMenuAndNav(v.anchorLink, v.sectionIndex);
//        }
//
//        /**
//        * Dispatch events & callbacks making sure it does it on the right format, depending on
//        * whether v2compatible is being used or not.
//        */
//        function fireCallback(eventName, v){
//            var eventData = getEventData(eventName, v);
//
//            if(!options.v2compatible){
//                trigger(container, eventName, eventData);
//
//                if(options[eventName].apply(eventData[Object.keys(eventData)[0]], toArray(eventData)) === false){
//                    return false;
//                }
//            }
//            else{
//                if(options[eventName].apply(eventData[0], eventData.slice(1)) === false){
//                    return false;
//                }
//            }
//
//            return true;
//        }
//
//        /**
//        * Makes sure to only create a Panel object if the element exist
//        */
//        function nullOrSection(el){
//            return el ? new Section(el) : null;
//        }
//
//        function nullOrSlide(el){
//            return el ? new Slide(el) : null;
//        }
//
//        /**
//        * Gets the event's data for the given event on the right format. Depending on whether
//        * v2compatible is being used or not.
//        */
//        function getEventData(eventName, v){
//            var paramsPerEvent;
//
//            if(!options.v2compatible){
//
//                //using functions to run only the necessary bits within the object
//                paramsPerEvent = {
//                    afterRender: function(){
//                        return {
//                            section: nullOrSection($(SECTION_ACTIVE_SEL)[0]),
//                            slide: nullOrSlide($(SLIDE_ACTIVE_SEL, $(SECTION_ACTIVE_SEL)[0])[0])
//                        };
//                    },
//                    onLeave: function(){
//                        return {
//                            origin: nullOrSection(v.activeSection),
//                            destination: nullOrSection(v.element),
//                            direction: v.direction
//                        };
//                    },
//
//                    afterLoad: function(){
//                        return paramsPerEvent.onLeave();
//                    },
//
//                    afterSlideLoad: function(){
//                        return {
//                            section: nullOrSection(v.section),
//                            origin: nullOrSlide(v.prevSlide),
//                            destination: nullOrSlide(v.destiny),
//                            direction: v.direction
//                        };
//                    },
//
//                    onSlideLeave: function(){
//                        return paramsPerEvent.afterSlideLoad();
//                    }
//                };
//            }
//            else{
//                paramsPerEvent = {
//                    afterRender: function(){ return [container]; },
//                    onLeave: function(){ return [v.activeSection, v.leavingSection, (v.sectionIndex + 1), v.direction]; },
//                    afterLoad: function(){ return [v.element, v.anchorLink, (v.sectionIndex + 1)]; },
//                    afterSlideLoad: function(){ return [v.destiny, v.anchorLink, (v.sectionIndex + 1), v.slideAnchor, v.slideIndex]; },
//                    onSlideLeave: function(){ return [v.prevSlide, v.anchorLink, (v.sectionIndex + 1), v.prevSlideIndex, v.direction, v.slideIndex]; },
//                };
//            }
//
//            return paramsPerEvent[eventName]();
//        }
//
//        /**
//        * Performs the vertical movement (by CSS3 or by jQuery)
//        */
//        function performMovement(v){
//            // using CSS3 translate functionality
//            if (options.css3 && options.autoScrolling && !options.scrollBar) {
//
//                // The first section can have a negative value in iOS 10. Not quite sure why: -0.0142822265625
//                // that's why we round it to 0.
//                var translate3d = 'translate3d(0px, -' + Math.round(v.dtop) + 'px, 0px)';
//                transformContainer(translate3d, true);
//
//                //even when the scrollingSpeed is 0 there's a little delay, which might cause the
//                //scrollingSpeed to change in case of using silentMoveTo();
//                if(options.scrollingSpeed){
//                    clearTimeout(afterSectionLoadsId);
//                    afterSectionLoadsId = setTimeout(function () {
//                        afterSectionLoads(v);
//                    }, options.scrollingSpeed);
//                }else{
//                    afterSectionLoads(v);
//                }
//            }
//
//            // using JS to animate
//            else{
//                var scrollSettings = getScrollSettings(v.dtop);
//                FP.test.top = -v.dtop + 'px';
//
//                scrollTo(scrollSettings.element, scrollSettings.options, options.scrollingSpeed, function(){
//                    if(options.scrollBar){
//
//                        /* Hack!
//                        The timeout prevents setting the most dominant section in the viewport as "active" when the user
//                        scrolled to a smaller section by using the mousewheel (auto scrolling) rather than draging the scroll bar.
//
//                        When using scrollBar:true It seems like the scroll events still getting propagated even after the scrolling animation has finished.
//                        */
//                        setTimeout(function(){
//                            afterSectionLoads(v);
//                        },30);
//                    }else{
//                        afterSectionLoads(v);
//                    }
//                });
//            }
//        }
//
//        /**
//        * Gets the scrolling settings depending on the plugin autoScrolling option
//        */
//        function getScrollSettings(top){
//            var scroll = {};
//
//            //top property animation
//            if(options.autoScrolling && !options.scrollBar){
//                scroll.options = -top;
//                scroll.element = $(WRAPPER_SEL)[0];
//            }
//
//            //window real scrolling
//            else{
//                scroll.options = top;
//                scroll.element = window;
//            }
//
//            return scroll;
//        }
//
//        /**
//        * Adds sections before or after the current one to create the infinite effect.
//        */
//        function createInfiniteSections(v){
//            // Scrolling down
//            if (!v.isMovementUp) {
//                // Move all previous sections to after the active section
//                after($(SECTION_ACTIVE_SEL)[0], prevAll(v.activeSection, SECTION_SEL).reverse());
//            }
//            else { // Scrolling up
//                // Move all next sections to before the active section
//                before($(SECTION_ACTIVE_SEL)[0], nextAll(v.activeSection, SECTION_SEL));
//            }
//
//            // Maintain the displayed position (now that we changed the element order)
//            silentScroll($(SECTION_ACTIVE_SEL)[0].offsetTop);
//
//            // Maintain the active slides visible in the viewport
//            keepSlidesPosition();
//
//            // save for later the elements that still need to be reordered
//            v.wrapAroundElements = v.activeSection;
//
//            // Recalculate animation variables
//            v.dtop = v.element.offsetTop;
//            v.yMovement = getYmovement(v.element);
//
//            return v;
//        }
//
//        /**
//        * Fix section order after continuousVertical changes have been animated
//        */
//        function continuousVerticalFixSectionOrder (v) {
//            // If continuousVertical is in effect (and autoScrolling would also be in effect then),
//            // finish moving the elements around so the direct navigation will function more simply
//            if (v.wrapAroundElements == null) {
//                return;
//            }
//
//            if (v.isMovementUp) {
//                before($(SECTION_SEL)[0], v.wrapAroundElements);
//            }
//            else {
//                after($(SECTION_SEL)[$(SECTION_SEL).length-1], v.wrapAroundElements);
//            }
//
//            silentScroll($(SECTION_ACTIVE_SEL)[0].offsetTop);
//
//            // Maintain the active slides visible in the viewport
//            keepSlidesPosition();
//        }
//
//        /**
//        * Actions to do once the section is loaded.
//        */
//        function afterSectionLoads (v){
//            continuousVerticalFixSectionOrder(v);
//
//            //callback (afterLoad) if the site is not just resizing and readjusting the slides
//            if(isFunction(options.afterLoad) && !v.localIsResizing){
//                fireCallback('afterLoad', v);
//            }
//
//            if(options.scrollOverflow){
//                options.scrollOverflowHandler.afterLoad();
//            }
//
//            if(!v.localIsResizing){
//                playMedia(v.element);
//            }
//
//            addClass(v.element, COMPLETELY);
//            removeClass(siblings(v.element), COMPLETELY);
//            lazyLoadOthers();
//
//            canScroll = true;
//
//            if(isFunction(v.callback)){
//                v.callback();
//            }
//        }
//
//        /**
//        * Sets the value for the given attribute from the `data-` attribute with the same suffix
//        * ie: data-srcset ==> srcset  |  data-src ==> src
//        */
//        function setSrc(element, attribute){
//            element.setAttribute(attribute, element.getAttribute('data-' + attribute));
//            element.removeAttribute('data-' + attribute);
//        }
//
//        /**
//        * Makes sure lazyload is done for other sections in the viewport that are not the
//        * active one. 
//        */
//        function lazyLoadOthers(){
//            var hasAutoHeightSections = $(AUTO_HEIGHT_SEL)[0] || isResponsiveMode() && $(AUTO_HEIGHT_RESPONSIVE_SEL)[0];
//
//            //quitting when it doesn't apply
//            if (!options.lazyLoading || !hasAutoHeightSections){
//                return;
//            }
//
//            //making sure to lazy load auto-height sections that are in the viewport
//            $(SECTION_SEL + ':not(' + ACTIVE_SEL + ')').forEach(function(section){
//                if(isSectionInViewport(section)){
//                    lazyLoad(section);
//                }
//            });
//        }
//
//        /**
//        * Lazy loads image, video and audio elements.
//        */
//        function lazyLoad(destiny){
//            if (!options.lazyLoading){
//                return;
//            }
//
//            var panel = getSlideOrSection(destiny);
//
//            $('img[data-src], img[data-srcset], source[data-src], source[data-srcset], video[data-src], audio[data-src], iframe[data-src]', panel).forEach(function(element){
//                ['src', 'srcset'].forEach(function(type){
//                    var attribute = element.getAttribute('data-' + type);
//                    if(attribute != null && attribute){
//                        setSrc(element, type);
//                        element.addEventListener('load', function(){
//                            onMediaLoad(destiny);
//                        });
//                    }
//                });
//
//                if(matches(element, 'source')){
//                    var elementToPlay =  closest(element, 'video, audio');
//                    if(elementToPlay){
//                        elementToPlay.load();
//                        elementToPlay.onloadeddata = function(){
//                            onMediaLoad(destiny);
//                        }
//                    }
//                }
//            });
//        }
//
//        /**
//        * Callback firing when a lazy load media element has loaded.
//        * Making sure it only fires one per section in normal conditions (if load time is not huge)
//        */
//        function onMediaLoad(section){
//            if(options.scrollOverflow){
//                clearTimeout(g_mediaLoadedId);
//                g_mediaLoadedId = setTimeout(function(){
//                    scrollBarHandler.createScrollBar(section);
//                }, 200);
//            }
//        }
//
//        /**
//        * Plays video and audio elements.
//        */
//        function playMedia(destiny){
//            var panel = getSlideOrSection(destiny);
//
//            //playing HTML5 media elements
//            $('video, audio', panel).forEach(function(element){
//                if( element.hasAttribute('data-autoplay') && typeof element.play === 'function' ) {
//                    element.play();
//                }
//            });
//
//            //youtube videos
//            $('iframe[src*="youtube.com/embed/"]', panel).forEach(function(element){
//                if ( element.hasAttribute('data-autoplay') ){
//                    playYoutube(element);
//                }
//
//                //in case the URL was not loaded yet. On page load we need time for the new URL (with the API string) to load.
//                element.onload = function() {
//                    if ( element.hasAttribute('data-autoplay') ){
//                        playYoutube(element);
//                    }
//                };
//            });
//        }
//
//        /**
//        * Plays a youtube video
//        */
//        function playYoutube(element){
//            element.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
//        }
//
//        /**
//        * Stops video and audio elements.
//        */
//        function stopMedia(destiny){
//            var panel = getSlideOrSection(destiny);
//
//            //stopping HTML5 media elements
//            $('video, audio', panel).forEach(function(element){
//                if( !element.hasAttribute('data-keepplaying') && typeof element.pause === 'function' ) {
//                    element.pause();
//                }
//            });
//
//            //youtube videos
//            $('iframe[src*="youtube.com/embed/"]', panel).forEach(function(element){
//                if( /youtube\.com\/embed\//.test(element.getAttribute('src')) && !element.hasAttribute('data-keepplaying')){
//                    element.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
//                }
//            });
//        }
//
//        /**
//        * Gets the active slide (or section) for the given section
//        */
//        function getSlideOrSection(destiny){
//            var slide = $(SLIDE_ACTIVE_SEL, destiny);
//            if( slide.length ) {
//                destiny = slide[0];
//            }
//
//            return destiny;
//        }
//
//        /**
//        * Scrolls to the anchor in the URL when loading the site
//        */
//        function scrollToAnchor(){
//            var anchors =  getAnchorsURL();
//            var sectionAnchor = anchors.section;
//            var slideAnchor = anchors.slide;
//
//            if(sectionAnchor){  //if theres any #
//                if(options.animateAnchor){
//                    scrollPageAndSlide(sectionAnchor, slideAnchor);
//                }else{
//                    silentMoveTo(sectionAnchor, slideAnchor);
//                }
//            }
//        }
//
//        /**
//        * Detecting any change on the URL to scroll to the given anchor link
//        * (a way to detect back history button as we play with the hashes on the URL)
//        */
//        function hashChangeHandler(){
//            if(!isScrolling && !options.lockAnchors){
//                var anchors = getAnchorsURL();
//                var sectionAnchor = anchors.section;
//                var slideAnchor = anchors.slide;
//
//                //when moving to a slide in the first section for the first time (first time to add an anchor to the URL)
//                var isFirstSlideMove =  (typeof lastScrolledDestiny === 'undefined');
//                var isFirstScrollMove = (typeof lastScrolledDestiny === 'undefined' && typeof slideAnchor === 'undefined' && !slideMoving);
//
//                if(sectionAnchor && sectionAnchor.length){
//                    /*in order to call scrollpage() only once for each destination at a time
//                    It is called twice for each scroll otherwise, as in case of using anchorlinks `hashChange`
//                    event is fired on every scroll too.*/
//                    if ((sectionAnchor && sectionAnchor !== lastScrolledDestiny) && !isFirstSlideMove
//                        || isFirstScrollMove
//                        || (!slideMoving && lastScrolledSlide != slideAnchor )){
//
//                        scrollPageAndSlide(sectionAnchor, slideAnchor);
//                    }
//                }
//            }
//        }
//
//        //gets the URL anchors (section and slide)
//        function getAnchorsURL(){
//            var section;
//            var slide;
//            var hash = window.location.hash;
//
//            if(hash.length){
//                //getting the anchor link in the URL and deleting the `#`
//                var anchorsParts =  hash.replace('#', '').split('/');
//
//                //using / for visual reasons and not as a section/slide separator #2803
//                var isFunkyAnchor = hash.indexOf('#/') > -1;
//
//                section = isFunkyAnchor ? '/' + anchorsParts[1] : decodeURIComponent(anchorsParts[0]);
//
//                var slideAnchor = isFunkyAnchor ? anchorsParts[2] : anchorsParts[1];
//                if(slideAnchor && slideAnchor.length){
//                    slide = decodeURIComponent(slideAnchor);
//                }
//            }
//
//            return {
//                section: section,
//                slide: slide
//            };
//        }
//
//        //Sliding with arrow keys, both, vertical and horizontal
//        function keydownHandler(e) {
//            clearTimeout(keydownId);
//
//            var activeElement = document.activeElement;
//            var keyCode = e.keyCode;
//
//            //tab?
//            if(keyCode === 9){
//                onTab(e);
//            }
//
//            else if(!matches(activeElement, 'textarea') && !matches(activeElement, 'input') && !matches(activeElement, 'select') &&
//                activeElement.getAttribute('contentEditable') !== "true" && activeElement.getAttribute('contentEditable') !== '' &&
//                options.keyboardScrolling && options.autoScrolling){
//
//                //preventing the scroll with arrow keys & spacebar & Page Up & Down keys
//                var keyControls = [40, 38, 32, 33, 34];
//                if(keyControls.indexOf(keyCode) > -1){
//                    preventDefault(e);
//                }
//
//                controlPressed = e.ctrlKey;
//
//                keydownId = setTimeout(function(){
//                    onkeydown(e);
//                },150);
//            }
//        }
//
//        function tooltipTextHandler(){
//            /*jshint validthis:true */
//            trigger(prev(this), 'click');
//        }
//
//        //to prevent scrolling while zooming
//        function keyUpHandler(e){
//            if(isWindowFocused){ //the keyup gets fired on new tab ctrl + t in Firefox
//                controlPressed = e.ctrlKey;
//            }
//        }
//
//        //binding the mousemove when the mouse's middle button is released
//        function mouseDownHandler(e){
//            //middle button
//            if (e.which == 2){
//                oldPageY = e.pageY;
//                container.addEventListener('mousemove', mouseMoveHandler);
//            }
//        }
//
//        //unbinding the mousemove when the mouse's middle button is released
//        function mouseUpHandler(e){
//            //middle button
//            if (e.which == 2){
//                container.removeEventListener('mousemove', mouseMoveHandler);
//            }
//        }
//
//        /**
//        * Makes sure the tab key will only focus elements within the current section/slide
//        * preventing this way from breaking the page.
//        * Based on "Modals and keyboard traps"
//        * from https://developers.google.com/web/fundamentals/accessibility/focus/using-tabindex
//        */
//        function onTab(e){
//            var isShiftPressed = e.shiftKey;
//            var activeElement = document.activeElement;
//            var focusableElements = getFocusables(getSlideOrSection($(SECTION_ACTIVE_SEL)[0]));
//
//            function preventAndFocusFirst(e){
//                preventDefault(e);
//                return focusableElements[0] ? focusableElements[0].focus() : null;
//            }
//
//            //outside any section or slide? Let's not hijack the tab!
//            if(isFocusOutside(e)){
//                return;
//            }
//
//            //is there an element with focus?
//            if(activeElement){
//                if(closest(activeElement, SECTION_ACTIVE_SEL + ',' + SECTION_ACTIVE_SEL + ' ' + SLIDE_ACTIVE_SEL) == null){
//                    activeElement = preventAndFocusFirst(e);
//                }
//            }
//
//            //no element if focused? Let's focus the first one of the section/slide
//            else{
//                preventAndFocusFirst(e);
//            }
//
//            //when reached the first or last focusable element of the section/slide
//            //we prevent the tab action to keep it in the last focusable element
//            if(!isShiftPressed && activeElement == focusableElements[focusableElements.length - 1] ||
//                isShiftPressed && activeElement == focusableElements[0]
//            ){
//                preventDefault(e);
//            }
//        }
//
//        /**
//        * Gets all the focusable elements inside the passed element.
//        */
//        function getFocusables(el){
//            return [].slice.call($(focusableElementsString, el)).filter(function(item) {
//                    return item.getAttribute('tabindex') !== '-1'
//                    //are also not hidden elements (or with hidden parents)
//                    && item.offsetParent !== null;
//            });
//        }
//
//        /**
//        * Determines whether the focus is outside fullpage.js sections/slides or not.
//        */
//        function isFocusOutside(e){
//            var allFocusables = getFocusables(document);
//            var currentFocusIndex = allFocusables.indexOf(document.activeElement);
//            var focusDestinationIndex = e.shiftKey ? currentFocusIndex - 1 : currentFocusIndex + 1;
//            var focusDestination = allFocusables[focusDestinationIndex];
//            var destinationItemSlide = nullOrSlide(closest(focusDestination, SLIDE_SEL));
//            var destinationItemSection = nullOrSection(closest(focusDestination, SECTION_SEL));
//
//            return !destinationItemSlide && !destinationItemSection;
//        }
//
//        //Scrolling horizontally when clicking on the slider controls.
//        function slideArrowHandler(){
//            /*jshint validthis:true */
//            var section = closest(this, SECTION_SEL);
//
//            /*jshint validthis:true */
//            if (hasClass(this, SLIDES_PREV)) {
//                if(isScrollAllowed.m.left){
//                    moveSlideLeft(section);
//                }
//            } else {
//                if(isScrollAllowed.m.right){
//                    moveSlideRight(section);
//                }
//            }
//        }
//
//        //when opening a new tab (ctrl + t), `control` won't be pressed when coming back.
//        function blurHandler(){
//            isWindowFocused = false;
//            controlPressed = false;
//        }
//
//        //Scrolls to the section when clicking the navigation bullet
//        function sectionBulletHandler(e){
//            preventDefault(e);
//
//            /*jshint validthis:true */
//            var indexBullet = index(closest(this, SECTION_NAV_SEL + ' li'));
//            scrollPage($(SECTION_SEL)[indexBullet]);
//        }
//
//        //Scrolls the slider to the given slide destination for the given section
//        function slideBulletHandler(e){
//            preventDefault(e);
//
//            /*jshint validthis:true */
//            var slides = $(SLIDES_WRAPPER_SEL, closest(this, SECTION_SEL))[0];
//            var destiny = $(SLIDE_SEL, slides)[index(closest(this, 'li'))];
//
//            landscapeScroll(slides, destiny);
//        }
//
//        //Menu item handler when not using anchors or using lockAnchors:true
//        function menuItemsHandler(e){
//            if($(options.menu)[0] && (options.lockAnchors || !options.anchors.length)){
//                preventDefault(e);
//                moveTo(this.getAttribute('data-menuanchor'));
//            }
//        }
//
//        /**
//        * Keydown event
//        */
//        function onkeydown(e){
//            var shiftPressed = e.shiftKey;
//            var activeElement = document.activeElement;
//            var isMediaFocused = matches(activeElement, 'video') || matches(activeElement, 'audio');
//
//            //do nothing if we can not scroll or we are not using horizotnal key arrows.
//            if(!canScroll && [37,39].indexOf(e.keyCode) < 0){
//                return;
//            }
//
//            switch (e.keyCode) {
//                //up
//                case 38:
//                case 33:
//                    if(isScrollAllowed.k.up){
//                        moveSectionUp();
//                    }
//                    break;
//
//                //down
//                case 32: //spacebar
//
//                    if(shiftPressed && isScrollAllowed.k.up && !isMediaFocused){
//                        moveSectionUp();
//                        break;
//                    }
//                /* falls through */
//                case 40:
//                case 34:
//                    if(isScrollAllowed.k.down){
//                        // space bar?
//                        if(e.keyCode !== 32 || !isMediaFocused){
//                            moveSectionDown();
//                        }
//                    }
//                    break;
//
//                //Home
//                case 36:
//                    if(isScrollAllowed.k.up){
//                        moveTo(1);
//                    }
//                    break;
//
//                //End
//                case 35:
//                     if(isScrollAllowed.k.down){
//                        moveTo( $(SECTION_SEL).length );
//                    }
//                    break;
//
//                //left
//                case 37:
//                    if(isScrollAllowed.k.left){
//                        moveSlideLeft();
//                    }
//                    break;
//
//                //right
//                case 39:
//                    if(isScrollAllowed.k.right){
//                        moveSlideRight();
//                    }
//                    break;
//
//                default:
//                    return; // exit this handler for other keys
//            }
//        }
//
//        /**
//        * Detecting the direction of the mouse movement.
//        * Used only for the middle button of the mouse.
//        */
//        var oldPageY = 0;
//        function mouseMoveHandler(e){
//            if(!options.autoScrolling){
//                return;
//            }
//            if(canScroll){
//                // moving up
//                if (e.pageY < oldPageY && isScrollAllowed.m.up){
//                    moveSectionUp();
//                }
//
//                // moving down
//                else if(e.pageY > oldPageY && isScrollAllowed.m.down){
//                    moveSectionDown();
//                }
//            }
//            oldPageY = e.pageY;
//        }
//
//        /**
//        * Scrolls horizontal sliders.
//        */
//        function landscapeScroll(slides, destiny, direction){
//            var section = closest(slides, SECTION_SEL);
//            var v = {
//                slides: slides,
//                destiny: destiny,
//                direction: direction,
//                destinyPos: {left: destiny.offsetLeft},
//                slideIndex: index(destiny),
//                section: section,
//                sectionIndex: index(section, SECTION_SEL),
//                anchorLink: section.getAttribute('data-anchor'),
//                slidesNav: $(SLIDES_NAV_SEL, section)[0],
//                slideAnchor: getAnchor(destiny),
//                prevSlide: $(SLIDE_ACTIVE_SEL, section)[0],
//                prevSlideIndex: index($(SLIDE_ACTIVE_SEL, section)[0]),
//
//                //caching the value of isResizing at the momment the function is called
//                //because it will be checked later inside a setTimeout and the value might change
//                localIsResizing: isResizing
//            };
//            v.xMovement = getXmovement(v.prevSlideIndex, v.slideIndex);
//            v.direction = v.direction ? v.direction : v.xMovement;
//
//            //important!! Only do it when not resizing
//            if(!v.localIsResizing){
//                //preventing from scrolling to the next/prev section when using scrollHorizontally
//                canScroll = false;
//            }
//
//            if(options.onSlideLeave){
//
//                //if the site is not just resizing and readjusting the slides
//                if(!v.localIsResizing && v.xMovement!=='none'){
//                    if(isFunction( options.onSlideLeave )){
//                        if( fireCallback('onSlideLeave', v) === false){
//                            slideMoving = false;
//                            return;
//                        }
//                    }
//                }
//            }
//
//            addClass(destiny, ACTIVE);
//            removeClass(siblings(destiny), ACTIVE);
//
//            if(!v.localIsResizing){
//                stopMedia(v.prevSlide);
//                lazyLoad(destiny);
//            }
//
//            if(!options.loopHorizontal && options.controlArrows){
//                //hidding it for the fist slide, showing for the rest
//                toggle($(SLIDES_ARROW_PREV_SEL, section), v.slideIndex!==0);
//
//                //hidding it for the last slide, showing for the rest
//                toggle($(SLIDES_ARROW_NEXT_SEL, section), next(destiny) != null);
//            }
//
//            //only changing the URL if the slides are in the current section (not for resize re-adjusting)
//            if(hasClass(section, ACTIVE) && !v.localIsResizing){
//                setState(v.slideIndex, v.slideAnchor, v.anchorLink, v.sectionIndex);
//            }
//
//            performHorizontalMove(slides, v, true);
//        }
//
//
//        function afterSlideLoads(v){
//            activeSlidesNavigation(v.slidesNav, v.slideIndex);
//
//            //if the site is not just resizing and readjusting the slides
//            if(!v.localIsResizing){
//                if(isFunction( options.afterSlideLoad )){
//                    fireCallback('afterSlideLoad', v);
//                }
//
//                //needs to be inside the condition to prevent problems with continuousVertical and scrollHorizontally
//                //and to prevent double scroll right after a windows resize
//                canScroll = true;
//
//                playMedia(v.destiny);
//            }
//
//            //letting them slide again
//            slideMoving = false;
//        }
//
//        /**
//        * Performs the horizontal movement. (CSS3 or jQuery)
//        *
//        * @param fireCallback {Bool} - determines whether or not to fire the callback
//        */
//        function performHorizontalMove(slides, v, fireCallback){
//            var destinyPos = v.destinyPos;
//
//            if(options.css3){
//                var translate3d = 'translate3d(-' + Math.round(destinyPos.left) + 'px, 0px, 0px)';
//
//                FP.test.translate3dH[v.sectionIndex] = translate3d;
//                css(addAnimation($(SLIDES_CONTAINER_SEL, slides)), getTransforms(translate3d));
//
//                afterSlideLoadsId = setTimeout(function(){
//                    if(fireCallback){
//                        afterSlideLoads(v);
//                    }
//                }, options.scrollingSpeed);
//            }else{
//                FP.test.left[v.sectionIndex] = Math.round(destinyPos.left);
//
//                scrollTo(slides, Math.round(destinyPos.left), options.scrollingSpeed, function(){
//                    if(fireCallback){
//                        afterSlideLoads(v);
//                    }
//                });
//            }
//        }
//
//        /**
//        * Sets the state for the horizontal bullet navigations.
//        */
//        function activeSlidesNavigation(slidesNav, slideIndex){
//            if(options.slidesNavigation && slidesNav != null){
//                removeClass($(ACTIVE_SEL, slidesNav), ACTIVE);
//                addClass( $('a', $('li', slidesNav)[slideIndex] ), ACTIVE);
//            }
//        }
//
//        var previousHeight = windowsHeight;
//
//        /*
//        * Resize event handler.
//        */        
//        function resizeHandler(){
//            clearTimeout(resizeId);
//
//            //in order to call the functions only when the resize is finished
//            //http://stackoverflow.com/questions/4298612/jquery-how-to-call-resize-event-only-once-its-finished-resizing    
//            resizeId = setTimeout(function(){
//
//                //issue #3336 
//                //(some apps or browsers, like Chrome/Firefox for Mobile take time to report the real height)
//                //so we check it 3 times with intervals in that case
//                for(var i = 0; i< 4; i++){
//                    resizeHandlerId = setTimeout(resizeActions, 200 * i);
//                }
//            }, 200);
//        }
//
//        /**
//        * When resizing the site, we adjust the heights of the sections, slimScroll...
//        */
//        function resizeActions(){
//
//            //checking if it needs to get responsive
//            responsive();
//
//            // rebuild immediately on touch devices
//            if (isTouchDevice) {
//                var activeElement = document.activeElement;
//
//                //if the keyboard is NOT visible
//                if (!matches(activeElement, 'textarea') && !matches(activeElement, 'input') && !matches(activeElement, 'select')) {
//                    var currentHeight = getWindowHeight();
//
//                    //making sure the change in the viewport size is enough to force a rebuild. (20 % of the window to avoid problems when hidding scroll bars)
//                    if( Math.abs(currentHeight - previousHeight) > (20 * Math.max(previousHeight, currentHeight) / 100) ){
//                        reBuild(true);
//                        previousHeight = currentHeight;
//                    }
//                }
//            }
//            else{
//                adjustToNewViewport();
//            }
//        }
//
//        /**
//        * Checks if the site needs to get responsive and disables autoScrolling if so.
//        * A class `fp-responsive` is added to the plugin's container in case the user wants to use it for his own responsive CSS.
//        */
//        function responsive(){
//            var widthLimit = options.responsive || options.responsiveWidth; //backwards compatiblity
//            var heightLimit = options.responsiveHeight;
//
//            //only calculating what we need. Remember its called on the resize event.
//            var isBreakingPointWidth = widthLimit && window.innerWidth < widthLimit;
//            var isBreakingPointHeight = heightLimit && window.innerHeight < heightLimit;
//
//            if(widthLimit && heightLimit){
//                setResponsive(isBreakingPointWidth || isBreakingPointHeight);
//            }
//            else if(widthLimit){
//                setResponsive(isBreakingPointWidth);
//            }
//            else if(heightLimit){
//                setResponsive(isBreakingPointHeight);
//            }
//        }
//
//        /**
//        * Adds transition animations for the given element
//        */
//        function addAnimation(element){
//            var transition = 'all ' + options.scrollingSpeed + 'ms ' + options.easingcss3;
//
//            removeClass(element, NO_TRANSITION);
//            return css(element, {
//                '-webkit-transition': transition,
//                'transition': transition
//            });
//        }
//
//        /**
//        * Remove transition animations for the given element
//        */
//        function removeAnimation(element){
//            return addClass(element, NO_TRANSITION);
//        }
//
//        /**
//        * Activating the vertical navigation bullets according to the given slide name.
//        */
//        function activateNavDots(name, sectionIndex){
//            if(options.navigation && $(SECTION_NAV_SEL)[0] != null){
//                    removeClass($(ACTIVE_SEL, $(SECTION_NAV_SEL)[0]), ACTIVE);
//                if(name){
//                    addClass( $('a[href="#' + name + '"]', $(SECTION_NAV_SEL)[0]), ACTIVE);
//                }else{
//                    addClass($('a', $('li', $(SECTION_NAV_SEL)[0])[sectionIndex]), ACTIVE);
//                }
//            }
//        }
//
//        /**
//        * Activating the website main menu elements according to the given slide name.
//        */
//        function activateMenuElement(name){
//            $(options.menu).forEach(function(menu) {
//                if(options.menu && menu != null){
//                    removeClass($(ACTIVE_SEL, menu), ACTIVE);
//                    addClass($('[data-menuanchor="'+name+'"]', menu), ACTIVE);
//                }
//            });
//        }
//
//        /**
//        * Sets to active the current menu and vertical nav items.
//        */
//        function activateMenuAndNav(anchor, index){
//            activateMenuElement(anchor);
//            activateNavDots(anchor, index);
//        }
//
//        /**
//        * Retuns `up` or `down` depending on the scrolling movement to reach its destination
//        * from the current section.
//        */
//        function getYmovement(destiny){
//            var fromIndex = index($(SECTION_ACTIVE_SEL)[0], SECTION_SEL);
//            var toIndex = index(destiny, SECTION_SEL);
//            if( fromIndex == toIndex){
//                return 'none';
//            }
//            if(fromIndex > toIndex){
//                return 'up';
//            }
//            return 'down';
//        }
//
//        /**
//        * Retuns `right` or `left` depending on the scrolling movement to reach its destination
//        * from the current slide.
//        */
//        function getXmovement(fromIndex, toIndex){
//            if( fromIndex == toIndex){
//                return 'none';
//            }
//            if(fromIndex > toIndex){
//                return 'left';
//            }
//            return 'right';
//        }
//
//        function addTableClass(element){
//            //In case we are styling for the 2nd time as in with reponsiveSlides
//            if(!hasClass(element, TABLE)){
//                var wrapper = document.createElement('div');
//                wrapper.className = TABLE_CELL;
//                wrapper.style.height = getTableHeight(element) + 'px';
//
//                addClass(element, TABLE);
//                wrapInner(element, wrapper);
//            }
//        }
//
//        function getTableHeight(element){
//            var sectionHeight = windowsHeight;
//
//            if(options.paddingTop || options.paddingBottom){
//                var section = element;
//                if(!hasClass(section, SECTION)){
//                    section = closest(element, SECTION_SEL);
//                }
//
//                var paddings = parseInt(getComputedStyle(section)['padding-top']) + parseInt(getComputedStyle(section)['padding-bottom']);
//                sectionHeight = (windowsHeight - paddings);
//            }
//
//            return sectionHeight;
//        }
//
//        /**
//        * Adds a css3 transform property to the container class with or without animation depending on the animated param.
//        */
//        function transformContainer(translate3d, animated){
//            if(animated){
//                addAnimation(container);
//            }else{
//                removeAnimation(container);
//            }
//
//            css(container, getTransforms(translate3d));
//            FP.test.translate3d = translate3d;
//
//            //syncronously removing the class after the animation has been applied.
//            setTimeout(function(){
//                removeClass(container, NO_TRANSITION);
//            },10);
//        }
//
//        /**
//        * Gets a section by its anchor / index
//        */
//        function getSectionByAnchor(sectionAnchor){
//            var section = $(SECTION_SEL + '[data-anchor="'+sectionAnchor+'"]', container)[0];
//            if(!section){
//                var sectionIndex = typeof sectionAnchor !== 'undefined' ? sectionAnchor -1 : 0;
//                section = $(SECTION_SEL)[sectionIndex];
//            }
//
//            return section;
//        }
//
//        /**
//        * Gets a slide inside a given section by its anchor / index
//        */
//        function getSlideByAnchor(slideAnchor, section){
//            var slide = $(SLIDE_SEL + '[data-anchor="'+slideAnchor+'"]', section)[0];
//            if(slide == null){
//                slideAnchor = typeof slideAnchor !== 'undefined' ? slideAnchor : 0;
//                slide = $(SLIDE_SEL, section)[slideAnchor];
//            }
//
//            return slide;
//        }
//
//        /**
//        * Scrolls to the given section and slide anchors
//        */
//        function scrollPageAndSlide(sectionAnchor, slideAnchor){
//            var section = getSectionByAnchor(sectionAnchor);
//
//            //do nothing if there's no section with the given anchor name
//            if(section == null) return;
//
//            var slide = getSlideByAnchor(slideAnchor, section);
//
//            //we need to scroll to the section and then to the slide
//            if (getAnchor(section) !== lastScrolledDestiny && !hasClass(section, ACTIVE)){
//                scrollPage(section, function(){
//                    scrollSlider(slide);
//                });
//            }
//            //if we were already in the section
//            else{
//                scrollSlider(slide);
//            }
//        }
//
//        /**
//        * Scrolls the slider to the given slide destination for the given section
//        */
//        function scrollSlider(slide){
//            if(slide != null){
//                landscapeScroll(closest(slide, SLIDES_WRAPPER_SEL), slide);
//            }
//        }
//
//        /**
//        * Creates a landscape navigation bar with dots for horizontal sliders.
//        */
//        function addSlidesNavigation(section, numSlides){
//            appendTo(createElementFromHTML('<div class="' + SLIDES_NAV + '"><ul></ul></div>'), section);
//            var nav = $(SLIDES_NAV_SEL, section)[0];
//
//            //top or bottom
//            addClass(nav, 'fp-' + options.slidesNavPosition);
//
//            for(var i=0; i< numSlides; i++){
//                appendTo(createElementFromHTML('<li><a href="#"><span class="fp-sr-only">'+ getBulletLinkName(i, 'Slide') +'</span><span></span></a></li>'), $('ul', nav)[0] );
//            }
//
//            //centering it
//            css(nav, {'margin-left': '-' + (nav.innerWidth/2) + 'px'});
//
//            addClass($('a', $('li', nav)[0] ), ACTIVE);
//        }
//
//
//        /**
//        * Sets the state of the website depending on the active section/slide.
//        * It changes the URL hash when needed and updates the body class.
//        */
//        function setState(slideIndex, slideAnchor, anchorLink, sectionIndex){
//            var sectionHash = '';
//
//            if(options.anchors.length && !options.lockAnchors){
//
//                //isn't it the first slide?
//                if(slideIndex){
//                    if(anchorLink != null){
//                        sectionHash = anchorLink;
//                    }
//
//                    //slide without anchor link? We take the index instead.
//                    if(slideAnchor == null){
//                        slideAnchor = slideIndex;
//                    }
//
//                    lastScrolledSlide = slideAnchor;
//                    setUrlHash(sectionHash + '/' + slideAnchor);
//
//                //first slide won't have slide anchor, just the section one
//                }else if(slideIndex != null){
//                    lastScrolledSlide = slideAnchor;
//                    setUrlHash(anchorLink);
//                }
//
//                //section without slides
//                else{
//                    setUrlHash(anchorLink);
//                }
//            }
//
//            setBodyClass();
//        }
//
//        /**
//        * Sets the URL hash.
//        */
//        function setUrlHash(url){
//            if(options.recordHistory){
//                location.hash = url;
//            }else{
//                //Mobile Chrome doesn't work the normal way, so... lets use HTML5 for phones :)
//                if(isTouchDevice || isTouch){
//                    window.history.replaceState(undefined, undefined, '#' + url);
//                }else{
//                    var baseUrl = window.location.href.split('#')[0];
//                    window.location.replace( baseUrl + '#' + url );
//                }
//            }
//        }
//
//        /**
//        * Gets the anchor for the given slide / section. Its index will be used if there's none.
//        */
//        function getAnchor(element){
//            if(!element){
//                return null;
//            }
//            var anchor = element.getAttribute('data-anchor');
//            var elementIndex = index(element);
//
//            //Slide without anchor link? We take the index instead.
//            if(anchor == null){
//                anchor = elementIndex;
//            }
//
//            return anchor;
//        }
//
//        /**
//        * Sets a class for the body of the page depending on the active section / slide
//        */
//        function setBodyClass(){
//            var section = $(SECTION_ACTIVE_SEL)[0];
//            var slide = $(SLIDE_ACTIVE_SEL, section)[0];
//
//            var sectionAnchor = getAnchor(section);
//            var slideAnchor = getAnchor(slide);
//
//            var text = String(sectionAnchor);
//
//            if(slide){
//                text = text + '-' + slideAnchor;
//            }
//
//            //changing slash for dash to make it a valid CSS style
//            text = text.replace('/', '-').replace('#','');
//
//            //removing previous anchor classes
//            var classRe = new RegExp('\\b\\s?' + VIEWING_PREFIX + '-[^\\s]+\\b', "g");
//            $body.className = $body.className.replace(classRe, '');
//
//            //adding the current anchor
//            addClass($body, VIEWING_PREFIX + '-' + text);
//        }
//
//        /**
//        * Checks for translate3d support
//        * @return boolean
//        * http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
//        */
//        function support3d() {
//            var el = document.createElement('p'),
//                has3d,
//                transforms = {
//                    'webkitTransform':'-webkit-transform',
//                    'OTransform':'-o-transform',
//                    'msTransform':'-ms-transform',
//                    'MozTransform':'-moz-transform',
//                    'transform':'transform'
//                };
//
//            //preventing the style p:empty{display: none;} from returning the wrong result
//            el.style.display = 'block'
//
//            // Add it to the body to get the computed style.
//            document.body.insertBefore(el, null);
//
//            for (var t in transforms) {
//                if (el.style[t] !== undefined) {
//                    el.style[t] = 'translate3d(1px,1px,1px)';
//                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
//                }
//            }
//
//            document.body.removeChild(el);
//
//            return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
//        }
//
//        /**
//        * Removes the auto scrolling action fired by the mouse wheel and trackpad.
//        * After this function is called, the mousewheel and trackpad movements won't scroll through sections.
//        */
//        function removeMouseWheelHandler(){
//            if (document.addEventListener) {
//                document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
//                document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
//                document.removeEventListener('MozMousePixelScroll', MouseWheelHandler, false); //old Firefox
//            } else {
//                document.detachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
//            }
//        }
//
//        /**
//        * Adds the auto scrolling action for the mouse wheel and trackpad.
//        * After this function is called, the mousewheel and trackpad movements will scroll through sections
//        * https://developer.mozilla.org/en-US/docs/Web/Events/wheel
//        */
//        function addMouseWheelHandler(){
//            var prefix = '';
//            var _addEventListener;
//
//            if (window.addEventListener){
//                _addEventListener = "addEventListener";
//            }else{
//                _addEventListener = "attachEvent";
//                prefix = 'on';
//            }
//
//            // detect available wheel event
//            var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
//                      document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
//                      'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox
//            var passiveEvent = g_supportsPassive ? {passive: false }: false;
//
//            if(support == 'DOMMouseScroll'){
//                document[ _addEventListener ](prefix + 'MozMousePixelScroll', MouseWheelHandler, passiveEvent);
//            }
//
//            //handle MozMousePixelScroll in older Firefox
//            else{
//                document[ _addEventListener ](prefix + support, MouseWheelHandler, passiveEvent);
//            }
//        }
//
//        /**
//        * Binding the mousemove when the mouse's middle button is pressed
//        */
//        function addMiddleWheelHandler(){
//            container.addEventListener('mousedown', mouseDownHandler);
//            container.addEventListener('mouseup', mouseUpHandler);
//        }
//
//        /**
//        * Unbinding the mousemove when the mouse's middle button is released
//        */
//        function removeMiddleWheelHandler(){
//            container.removeEventListener('mousedown', mouseDownHandler);
//            container.removeEventListener('mouseup', mouseUpHandler);
//        }
//
//        /**
//        * Adds the possibility to auto scroll through sections on touch devices.
//        */
//        function addTouchHandler(){
//            if(isTouchDevice || isTouch){
//                if(options.autoScrolling){
//                    $body.removeEventListener(events.touchmove, preventBouncing, {passive: false});
//                    $body.addEventListener(events.touchmove, preventBouncing, {passive: false});
//                }
//
//                var touchWrapper = options.touchWrapper;
//                touchWrapper.removeEventListener(events.touchstart, touchStartHandler);
//                touchWrapper.removeEventListener(events.touchmove, touchMoveHandler, {passive: false});
//
//                touchWrapper.addEventListener(events.touchstart, touchStartHandler);
//                touchWrapper.addEventListener(events.touchmove, touchMoveHandler, {passive: false});
//            }
//        }
//
//        /**
//        * Removes the auto scrolling for touch devices.
//        */
//        function removeTouchHandler(){
//            if(isTouchDevice || isTouch){
//                // normalScrollElements requires it off #2691
//                if(options.autoScrolling){
//                    $body.removeEventListener(events.touchmove, touchMoveHandler, {passive: false});
//                    $body.removeEventListener(events.touchmove, preventBouncing, {passive: false});
//                }
//
//                var touchWrapper = options.touchWrapper;
//                touchWrapper.removeEventListener(events.touchstart, touchStartHandler);
//                touchWrapper.removeEventListener(events.touchmove, touchMoveHandler, {passive: false});
//            }
//        }
//
//        /*
//        * Returns and object with Microsoft pointers (for IE<11 and for IE >= 11)
//        * http://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
//        */
//        function getMSPointer(){
//            var pointer;
//
//            //IE >= 11 & rest of browsers
//            if(window.PointerEvent){
//                pointer = { down: 'pointerdown', move: 'pointermove'};
//            }
//
//            //IE < 11
//            else{
//                pointer = { down: 'MSPointerDown', move: 'MSPointerMove'};
//            }
//
//            return pointer;
//        }
//
//        /**
//        * Gets the pageX and pageY properties depending on the browser.
//        * https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
//        */
//        function getEventsPage(e){
//            var events = [];
//
//            events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
//            events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);
//
//            //in touch devices with scrollBar:true, e.pageY is detected, but we have to deal with touch events. #1008
//            if(isTouch && isReallyTouch(e) && options.scrollBar && typeof e.touches !== 'undefined'){
//                events.y = e.touches[0].pageY;
//                events.x = e.touches[0].pageX;
//            }
//
//            return events;
//        }
//
//        /**
//        * Slides silently (with no animation) the active slider to the given slide.
//        * @param noCallback {bool} true or defined -> no callbacks
//        */
//        function silentLandscapeScroll(activeSlide, noCallbacks){
//            setScrollingSpeed(0, 'internal');
//
//            if(typeof noCallbacks !== 'undefined'){
//                //preventing firing callbacks afterSlideLoad etc.
//                isResizing = true;
//            }
//
//            landscapeScroll(closest(activeSlide, SLIDES_WRAPPER_SEL), activeSlide);
//
//            if(typeof noCallbacks !== 'undefined'){
//                isResizing = false;
//            }
//
//            setScrollingSpeed(originals.scrollingSpeed, 'internal');
//        }
//
//        /**
//        * Scrolls silently (with no animation) the page to the given Y position.
//        */
//        function silentScroll(top){
//            // The first section can have a negative value in iOS 10. Not quite sure why: -0.0142822265625
//            // that's why we round it to 0.
//            var roundedTop = Math.round(top);
//
//            if (options.css3 && options.autoScrolling && !options.scrollBar){
//                var translate3d = 'translate3d(0px, -' + roundedTop + 'px, 0px)';
//                transformContainer(translate3d, false);
//            }
//            else if(options.autoScrolling && !options.scrollBar){
//                css(container, {'top': -roundedTop + 'px'});
//                FP.test.top = -roundedTop + 'px';
//            }
//            else{
//                var scrollSettings = getScrollSettings(roundedTop);
//                setScrolling(scrollSettings.element, scrollSettings.options);
//            }
//        }
//
//        /**
//        * Returns the cross-browser transform string.
//        */
//        function getTransforms(translate3d){
//            return {
//                '-webkit-transform': translate3d,
//                '-moz-transform': translate3d,
//                '-ms-transform':translate3d,
//                'transform': translate3d
//            };
//        }
//
//        /**
//        * Allowing or disallowing the mouse/swipe scroll in a given direction. (not for keyboard)
//        * @type  m (mouse) or k (keyboard)
//        */
//        function setIsScrollAllowed(value, direction, type){
//            //up, down, left, right
//            if(direction !== 'all'){
//                isScrollAllowed[type][direction] = value;
//            }
//
//            //all directions?
//            else{
//                Object.keys(isScrollAllowed[type]).forEach(function(key){
//                    isScrollAllowed[type][key] = value;
//                });
//            }
//        }
//
//        /*
//        * Destroys fullpage.js plugin events and optinally its html markup and styles
//        */
//        function destroy(all){
//            setAutoScrolling(false, 'internal');
//            setAllowScrolling(true);
//            setMouseHijack(false);
//            setKeyboardScrolling(false);
//            addClass(container, DESTROYED);
//
//            [
//                afterSlideLoadsId, 
//                afterSectionLoadsId,
//                resizeId,
//                scrollId,
//                scrollId2,
//                g_doubleCheckHeightId,
//                resizeHandlerId
//            ].forEach(function(timeoutId){
//                clearTimeout(timeoutId);
//            });
//
//            window.removeEventListener('scroll', scrollHandler);
//            window.removeEventListener('hashchange', hashChangeHandler);
//            window.removeEventListener('resize', resizeHandler);
//
//            document.removeEventListener('keydown', keydownHandler);
//            document.removeEventListener('keyup', keyUpHandler);
//
//            ['click', 'touchstart'].forEach(function(eventName){
//                document.removeEventListener(eventName, delegatedEvents);
//            });
//
//            ['mouseenter', 'touchstart', 'mouseleave', 'touchend'].forEach(function(eventName){
//                document.removeEventListener(eventName, onMouseEnterOrLeave, true); //true is required!
//            });
//
//            //lets make a mess!
//            if(all){
//                destroyStructure();
//            }
//        }
//
//        /*
//        * Removes inline styles added by fullpage.js
//        */
//        function destroyStructure(){
//            //reseting the `top` or `translate` properties to 0
//            silentScroll(0);
//
//            //loading all the lazy load content
//            $('img[data-src], source[data-src], audio[data-src], iframe[data-src]', container).forEach(function(item){
//                setSrc(item, 'src');
//            });
//
//            $('img[data-srcset]').forEach(function(item){
//                setSrc(item, 'srcset');
//            });
//
//            remove($(SECTION_NAV_SEL + ', ' + SLIDES_NAV_SEL +  ', ' + SLIDES_ARROW_SEL));
//
//            //removing inline styles
//            css($(SECTION_SEL), {
//                'height': '',
//                'background-color' : '',
//                'padding': ''
//            });
//
//            css($(SLIDE_SEL), {
//                'width': ''
//            });
//
//            css(container, {
//                'height': '',
//                'position': '',
//                '-ms-touch-action': '',
//                'touch-action': ''
//            });
//
//            css($htmlBody, {
//                'overflow': '',
//                'height': ''
//            });
//
//            // remove .fp-enabled class
//            removeClass($html, ENABLED);
//
//            // remove .fp-responsive class
//            removeClass($body, RESPONSIVE);
//
//            // remove all of the .fp-viewing- classes
//            $body.className.split(/\s+/).forEach(function (className) {
//                if (className.indexOf(VIEWING_PREFIX) === 0) {
//                    removeClass($body, className);
//                }
//            });
//
//            //removing added classes
//            $(SECTION_SEL + ', ' + SLIDE_SEL).forEach(function(item){
//                if(options.scrollOverflowHandler && options.scrollOverflow){
//                    options.scrollOverflowHandler.remove(item);
//                }
//                removeClass(item, TABLE + ' ' + ACTIVE + ' ' + COMPLETELY);
//                var previousStyles = item.getAttribute('data-fp-styles');
//                if(previousStyles){
//                    item.setAttribute('style', item.getAttribute('data-fp-styles'));
//                }
//
//                //removing anchors if they were not set using the HTML markup
//                if(hasClass(item, SECTION) && !g_initialAnchorsInDom){
//                    item.removeAttribute('data-anchor');
//                }
//            });
//
//            //removing the applied transition from the fullpage wrapper
//            removeAnimation(container);
//
//            //Unwrapping content
//            [TABLE_CELL_SEL, SLIDES_CONTAINER_SEL,SLIDES_WRAPPER_SEL].forEach(function(selector){
//                $(selector, container).forEach(function(item){
//                    //unwrap not being use in case there's no child element inside and its just text
//                    unwrap(item);
//                });
//            });
//
//            //removing the applied transition from the fullpage wrapper
//            css(container, {
//                '-webkit-transition': 'none',
//                'transition': 'none'
//            });
//
//            //scrolling the page to the top with no animation
//            window.scrollTo(0, 0);
//
//            //removing selectors
//            var usedSelectors = [SECTION, SLIDE, SLIDES_CONTAINER];
//            usedSelectors.forEach(function(item){
//                removeClass($('.' + item), item);
//            });
//        }
//
//        /*
//        * Sets the state for a variable with multiple states (original, and temporal)
//        * Some variables such as `autoScrolling` or `recordHistory` might change automatically its state when using `responsive` or `autoScrolling:false`.
//        * This function is used to keep track of both states, the original and the temporal one.
//        * If type is not 'internal', then we assume the user is globally changing the variable.
//        */
//        function setVariableState(variable, value, type){
//            options[variable] = value;
//            if(type !== 'internal'){
//                originals[variable] = value;
//            }
//        }
//
//        /**
//        * Displays warnings
//        */
//        function displayWarnings(){
//            var l = options['li' + 'c' + 'enseK' + 'e' + 'y'];
//            var msgStyle = 'font-size: 15px;background:yellow;'
//
//            if(!isOK){
//                showError('error', 'Fullpage.js version 3 has changed its license to GPLv3 and it requires a `licenseKey` option. Read about it here:');
//                showError('error', 'https://github.com/alvarotrigo/fullPage.js#options.');
//            }
//            else if(l && l.length < 20){
//                console.warn('%c This website was made using fullPage.js slider. More info on the following website:', msgStyle);
//                console.warn('%c https://alvarotrigo.com/fullPage/', msgStyle);
//            }
//
//            if(hasClass($html, ENABLED)){
//                showError('error', 'Fullpage.js can only be initialized once and you are doing it multiple times!');
//                return;
//            }
//
//            // Disable mutually exclusive settings
//            if (options.continuousVertical &&
//                (options.loopTop || options.loopBottom)) {
//                options.continuousVertical = false;
//                showError('warn', 'Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
//            }
//
//            if(options.scrollOverflow &&
//               (options.scrollBar || !options.autoScrolling)){
//                showError('warn', 'Options scrollBar:true and autoScrolling:false are mutually exclusive with scrollOverflow:true. Sections with scrollOverflow might not work well in Firefox');
//            }
//
//            if(options.continuousVertical && (options.scrollBar || !options.autoScrolling)){
//                options.continuousVertical = false;
//                showError('warn', 'Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
//            }
//
//            if(options.scrollOverflow && options.scrollOverflowHandler == null){
//                options.scrollOverflow = false;
//                showError('error', 'The option `scrollOverflow:true` requires the file `scrolloverflow.min.js`. Please include it before fullPage.js.');
//            }
//
//            //using extensions? Wrong file!
//            extensions.forEach(function(extension){
//                //is the option set to true?
//                if(options[extension]){
//                    showError('warn', 'fullpage.js extensions require fullpage.extensions.min.js file instead of the usual fullpage.js. Requested: '+ extension);
//                }
//            });
//
//            //anchors can not have the same value as any element ID or NAME
//            options.anchors.forEach(function(name){
//
//                //case insensitive selectors (http://stackoverflow.com/a/19465187/1081396)
//                var nameAttr = [].slice.call($('[name]')).filter(function(item) {
//                    return item.getAttribute('name') && item.getAttribute('name').toLowerCase() == name.toLowerCase();
//                });
//
//                var idAttr = [].slice.call($('[id]')).filter(function(item) {
//                    return item.getAttribute('id') && item.getAttribute('id').toLowerCase() == name.toLowerCase();
//                });
//
//                if(idAttr.length || nameAttr.length ){
//                    showError('error', 'data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).');
//                    var propertyName = idAttr.length ? 'id' : 'name';
//
//                    if(idAttr.length || nameAttr.length){
//                        showError('error', '"' + name + '" is is being used by another element `'+ propertyName +'` property');
//                    }
//                }
//            });
//        }
//
//        /**
//        * Getting the position of the element to scroll when using jQuery animations
//        */
//        function getScrolledPosition(element){
//            var position;
//
//            //is not the window element and is a slide?
//            if(element.self != window && hasClass(element, SLIDES_WRAPPER)){
//                position = element.scrollLeft;
//            }
//            else if(!options.autoScrolling  || options.scrollBar){
//                position = getScrollTop();
//            }
//            else{
//                position = element.offsetTop;
//            }
//
//            //gets the top property of the wrapper
//            return position;
//        }
//
//        /**
//        * Simulates the animated scrollTop of jQuery. Used when css3:false or scrollBar:true or autoScrolling:false
//        * http://stackoverflow.com/a/16136789/1081396
//        */
//        function scrollTo(element, to, duration, callback) {
//            var start = getScrolledPosition(element);
//            var change = to - start;
//            var currentTime = 0;
//            var increment = 20;
//            activeAnimation = true;
//
//            var animateScroll = function(){
//                if(activeAnimation){ //in order to stope it from other function whenever we want
//                    var val = to;
//
//                    currentTime += increment;
//
//                    if(duration){
//                        val = window.fp_easings[options.easing](currentTime, start, change, duration);
//                    }
//
//                    setScrolling(element, val);
//
//                    if(currentTime < duration) {
//                        setTimeout(animateScroll, increment);
//                    }else if(typeof callback !== 'undefined'){
//                        callback();
//                    }
//                }else if (currentTime < duration){
//                    callback();
//                }
//            };
//
//            animateScroll();
//        }
//
//        /**
//        * Scrolls the page / slider the given number of pixels.
//        * It will do it one or another way dependiong on the library's config.
//        */
//        function setScrolling(element, val){
//            if(!options.autoScrolling || options.scrollBar || (element.self != window && hasClass(element, SLIDES_WRAPPER))){
//
//                //scrolling horizontally through the slides?
//                if(element.self != window  && hasClass(element, SLIDES_WRAPPER)){
//                    element.scrollLeft = val;
//                }
//                //vertical scroll
//                else{
//                    element.scrollTo(0, val);
//                }
//            }else{
//                 element.style.top = val + 'px';
//            }
//        }
//
//        /**
//        * Gets the active slide.
//        */
//        function getActiveSlide(){
//            var activeSlide = $(SLIDE_ACTIVE_SEL, $(SECTION_ACTIVE_SEL)[0])[0];
//            return nullOrSlide(activeSlide);
//        }
//
//        /**
//        * Gets the active section.
//        */
//        function getActiveSection(){
//            return new Section($(SECTION_ACTIVE_SEL)[0]);
//        }
//
//        /**
//        * Item. Slide or Section objects share the same properties.
//        */
//        function Item(el, selector){
//            this.anchor = el.getAttribute('data-anchor');
//            this.item = el;
//            this.index = index(el, selector);
//            this.isLast = this.index === el.parentElement.querySelectorAll(selector).length -1;
//            this.isFirst = !this.index;
//        }
//
//        /**
//        * Section object
//        */
//        function Section(el){
//            Item.call(this, el, SECTION_SEL);
//        }
//
//        /**
//        * Slide object
//        */
//        function Slide(el){
//            Item.call(this, el, SLIDE_SEL);
//        }
//
//        return FP;
//    } //end of $.fn.fullpage
//
//    //utils
//    /**
//    * Shows a message in the console of the given type.
//    */
//    function showError(type, text){
//        window.console && window.console[type] && window.console[type]('fullPage: ' + text);
//    }
//
//    /**
//    * Equivalent or jQuery function $().
//    */
//    function $(selector, context){
//        context = arguments.length > 1 ? context : document;
//        return context ? context.querySelectorAll(selector) : null;
//    }
//
//    /**
//    * Extends a given Object properties and its childs.
//    */
//    function deepExtend(out) {
//        out = out || {};
//        for (var i = 1, len = arguments.length; i < len; ++i){
//            var obj = arguments[i];
//
//            if(!obj){
//              continue;
//            }
//
//            for(var key in obj){
//              if (!obj.hasOwnProperty(key)){
//                continue;
//              }
//
//              // based on https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
//              if (Object.prototype.toString.call(obj[key]) === '[object Object]'){
//                out[key] = deepExtend(out[key], obj[key]);
//                continue;
//              }
//
//              out[key] = obj[key];
//            }
//        }
//        return out;
//    }
//
//    /**
//    * Checks if the passed element contains the passed class.
//    */
//    function hasClass(el, className){
//        if(el == null){
//            return false;
//        }
//        if (el.classList){
//            return el.classList.contains(className);
//        }
//        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
//    }
//
//    /**
//    * Gets the window height. Crossbrowser.
//    */
//    function getWindowHeight(){
//        return 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
//    }
//
//    /**
//    * Gets the window width.
//    */
//    function getWindowWidth(){
//        return window.innerWidth;
//    }
//
//    /**
//    * Set's the CSS properties for the passed item/s.
//    * @param {NodeList|HTMLElement} items
//    * @param {Object} props css properties and values.
//    */
//    function css(items, props) {
//        items = getList(items);
//
//        var key;
//        for (key in props) {
//            if (props.hasOwnProperty(key)) {
//                if (key !== null) {
//                    for (var i = 0; i < items.length; i++) {
//                        var item = items[i];
//                        item.style[key] = props[key];
//                    }
//                }
//            }
//        }
//
//        return items;
//    }
//
//    /**
//    * Generic function to get the previous or next element.
//    */
//    function until(item, selector, fn){
//        var sibling = item[fn];
//        while(sibling && !matches(sibling, selector)){
//            sibling = sibling[fn];
//        }
//
//        return sibling;
//    }
//
//    /**
//    * Gets the previous element to the passed element that matches the passed selector.
//    */
//    function prevUntil(item, selector){
//        return until(item, selector, 'previousElementSibling');
//    }
//
//    /**
//    * Gets the next element to the passed element that matches the passed selector.
//    */
//    function nextUntil(item, selector){
//        return until(item, selector, 'nextElementSibling');
//    }
//
//    /**
//    * Gets the previous element to the passed element.
//    */
//    function prev(item){
//        return item.previousElementSibling;
//    }
//
//    /**
//    * Gets the next element to the passed element.
//    */
//    function next(item){
//        return item.nextElementSibling;
//    }
//
//    /**
//    * Gets the last element from the passed list of elements.
//    */
//    function last(item){
//        return item[item.length-1];
//    }
//
//    /**
//    * Gets index from the passed element.
//    * @param {String} selector is optional.
//    */
//    function index(item, selector) {
//        item = isArrayOrList(item) ? item[0] : item;
//        var children = selector != null? $(selector, item.parentNode) : item.parentNode.childNodes;
//        var num = 0;
//        for (var i=0; i<children.length; i++) {
//             if (children[i] == item) return num;
//             if (children[i].nodeType==1) num++;
//        }
//        return -1;
//    }
//
//    /**
//    * Gets an iterable element for the passed element/s
//    */
//    function getList(item){
//        return !isArrayOrList(item) ? [item] : item;
//    }
//
//    /**
//    * Adds the display=none property for the passed element/s
//    */
//    function hide(el){
//        el = getList(el);
//
//        for(var i = 0; i<el.length; i++){
//            el[i].style.display = 'none';
//        }
//        return el;
//    }
//
//    /**
//    * Adds the display=block property for the passed element/s
//    */
//    function show(el){
//        el = getList(el);
//
//        for(var i = 0; i<el.length; i++){
//            el[i].style.display = 'block';
//        }
//        return el;
//    }
//
//    /**
//    * Checks if the passed element is an iterable element or not
//    */
//    function isArrayOrList(el){
//        return Object.prototype.toString.call( el ) === '[object Array]' ||
//            Object.prototype.toString.call( el ) === '[object NodeList]';
//    }
//
//    /**
//    * Adds the passed class to the passed element/s
//    */
//    function addClass(el, className) {
//        el = getList(el);
//
//        for(var i = 0; i<el.length; i++){
//            var item = el[i];
//            if (item.classList){
//                item.classList.add(className);
//            }
//            else{
//              item.className += ' ' + className;
//            }
//        }
//        return el;
//    }
//
//    /**
//    * Removes the passed class to the passed element/s
//    * @param {String} `className` can be multiple classnames separated by whitespace
//    */
//    function removeClass(el, className){
//        el = getList(el);
//
//        var classNames = className.split(' ');
//
//        for(var a = 0; a<classNames.length; a++){
//            className = classNames[a];
//            for(var i = 0; i<el.length; i++){
//                var item = el[i];
//                if (item.classList){
//                    item.classList.remove(className);
//                }
//                else{
//                    item.className = item.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
//                }
//            }
//        }
//        return el;
//    }
//
//    /**
//    * Appends the given element ot the given parent.
//    */
//    function appendTo(el, parent){
//        parent.appendChild(el);
//    }
//
//    /**
//    Usage:
//
//    var wrapper = document.createElement('div');
//    wrapper.className = 'fp-slides';
//    wrap($('.slide'), wrapper);
//
//    https://jsfiddle.net/qwzc7oy3/15/ (vanilla)
//    https://jsfiddle.net/oya6ndka/1/ (jquery equivalent)
//    */
//    function wrap(toWrap, wrapper, isWrapAll) {
//        var newParent;
//        wrapper = wrapper || document.createElement('div');
//        for(var i = 0; i < toWrap.length; i++){
//            var item = toWrap[i];
//            if(isWrapAll && !i || !isWrapAll){
//                newParent = wrapper.cloneNode(true);
//                item.parentNode.insertBefore(newParent, item);
//            }
//            newParent.appendChild(item);
//        }
//        return toWrap;
//    }
//
//    /**
//    Usage:
//    var wrapper = document.createElement('div');
//    wrapper.className = 'fp-slides';
//    wrap($('.slide'), wrapper);
//
//    https://jsfiddle.net/qwzc7oy3/27/ (vanilla)
//    https://jsfiddle.net/oya6ndka/4/ (jquery equivalent)
//    */
//    function wrapAll(toWrap, wrapper) {
//        wrap(toWrap, wrapper, true);
//    }
//
//    /**
//    * Usage:
//    * wrapInner(document.querySelector('#pepe'), '<div class="test">afdas</div>');
//    * wrapInner(document.querySelector('#pepe'), element);
//    *
//    * https://jsfiddle.net/zexxz0tw/6/
//    *
//    * https://stackoverflow.com/a/21817590/1081396
//    */
//    function wrapInner(parent, wrapper) {
//        if (typeof wrapper === "string"){
//            wrapper = createElementFromHTML(wrapper);
//        }
//
//        parent.appendChild(wrapper);
//
//        while(parent.firstChild !== wrapper){
//            wrapper.appendChild(parent.firstChild);
//       }
//    }
//
//    /**
//    * Usage:
//    * unwrap(document.querySelector('#pepe'));
//    * unwrap(element);
//    *
//    * https://jsfiddle.net/szjt0hxq/1/
//    *
//    */
//    function unwrap(wrapper) {
//        var wrapperContent = document.createDocumentFragment();
//        while (wrapper.firstChild) {
//            wrapperContent.appendChild(wrapper.firstChild);
//        }
//
//        wrapper.parentNode.replaceChild(wrapperContent, wrapper);
//    }
//
//    /**
//    * http://stackoverflow.com/questions/22100853/dom-pure-javascript-solution-to-jquery-closest-implementation
//    * Returns the element or `false` if there's none
//    */
//    function closest(el, selector) {
//        if(el && el.nodeType === 1){
//            if(matches(el, selector)){
//                return el;
//            }
//            return closest(el.parentNode, selector);
//        }
//        return null;
//    }
//
//    /**
//    * Places one element (rel) after another one or group of them (reference).
//    * @param {HTMLElement} reference
//    * @param {HTMLElement|NodeList|String} el
//    * https://jsfiddle.net/9s97hhzv/1/
//    */
//    function after(reference, el) {
//        insertBefore(reference, reference.nextSibling, el);
//    }
//
//    /**
//    * Places one element (rel) before another one or group of them (reference).
//    * @param {HTMLElement} reference
//    * @param {HTMLElement|NodeList|String} el
//    * https://jsfiddle.net/9s97hhzv/1/
//    */
//    function before(reference, el) {
//        insertBefore(reference, reference, el);
//    }
//
//    /**
//    * Based in https://stackoverflow.com/a/19316024/1081396
//    * and https://stackoverflow.com/a/4793630/1081396
//    */
//    function insertBefore(reference, beforeElement, el){
//        if(!isArrayOrList(el)){
//            if(typeof el == 'string'){
//                el = createElementFromHTML(el);
//            }
//            el = [el];
//        }
//
//        for(var i = 0; i<el.length; i++){
//            reference.parentNode.insertBefore(el[i], beforeElement);
//        }
//    }
//
//    //http://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
//    function getScrollTop(){
//        var doc = document.documentElement;
//        return (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
//    }
//
//    /**
//    * Gets the siblings of the passed element
//    */
//    function siblings(el){
//        return Array.prototype.filter.call(el.parentNode.children, function(child){
//          return child !== el;
//        });
//    }
//
//    //for IE 9 ?
//    function preventDefault(event){
//        if(event.preventDefault){
//            event.preventDefault();
//        }
//        else{
//            event.returnValue = false;
//        }
//    }
//
//    /**
//    * Determines whether the passed item is of function type.
//    */
//    function isFunction(item) {
//      if (typeof item === 'function') {
//        return true;
//      }
//      var type = Object.prototype.toString(item);
//      return type === '[object Function]' || type === '[object GeneratorFunction]';
//    }
//
//    /**
//    * Trigger custom events
//    */
//    function trigger(el, eventName, data){
//        var event;
//        data = typeof data === 'undefined' ? {} : data;
//
//        // Native
//        if(typeof window.CustomEvent === "function" ){
//            event = new CustomEvent(eventName, {detail: data});
//        }
//        else{
//            event = document.createEvent('CustomEvent');
//            event.initCustomEvent(eventName, true, true, data);
//        }
//
//        el.dispatchEvent(event);
//    }
//
//    /**
//    * Polyfill of .matches()
//    */
//    function matches(el, selector) {
//        return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
//    }
//
//    /**
//    * Toggles the visibility of the passed element el.
//    */
//    function toggle(el, value){
//        if(typeof value === "boolean"){
//            for(var i = 0; i<el.length; i++){
//                el[i].style.display = value ? 'block' : 'none';
//            }
//        }
//        //we don't use it in other way, so no else :)
//
//        return el;
//    }
//
//    /**
//    * Creates a HTMLElement from the passed HTML string.
//    * https://stackoverflow.com/a/494348/1081396
//    */
//    function createElementFromHTML(htmlString) {
//        var div = document.createElement('div');
//        div.innerHTML = htmlString.trim();
//
//        // Change this to div.childNodes to support multiple top-level nodes
//        return div.firstChild;
//    }
//
//    /**
//    * Removes the passed item/s from the DOM.
//    */
//    function remove(items){
//        items = getList(items);
//        for(var i = 0; i<items.length; i++){
//            var item = items[i];
//            if(item && item.parentElement) {
//                item.parentNode.removeChild(item);
//            }
//        }
//    }
//
//    /**
//    * Filters an array by the passed filter funtion.
//    */
//    function filter(el, filterFn){
//        Array.prototype.filter.call(el, filterFn);
//    }
//
//    //https://jsfiddle.net/w1rktecz/
//    function untilAll(item, selector, fn){
//        var sibling = item[fn];
//        var siblings = [];
//        while(sibling){
//            if(matches(sibling, selector) || selector == null) {
//                siblings.push(sibling);
//            }
//            sibling = sibling[fn];
//        }
//
//        return siblings;
//    }
//
//    /**
//    * Gets all next elements matching the passed selector.
//    */
//    function nextAll(item, selector){
//        return untilAll(item, selector, 'nextElementSibling');
//    }
//
//    /**
//    * Gets all previous elements matching the passed selector.
//    */
//    function prevAll(item, selector){
//        return untilAll(item, selector, 'previousElementSibling');
//    }
//
//    /**
//    * Converts an object to an array.
//    */
//    function toArray(objectData){
//        return Object.keys(objectData).map(function(key) {
//           return objectData[key];
//        });
//    }
//
//    /**
//    * forEach polyfill for IE
//    * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Browser_Compatibility
//    */
//    if (window.NodeList && !NodeList.prototype.forEach) {
//        NodeList.prototype.forEach = function (callback, thisArg) {
//            thisArg = thisArg || window;
//            for (var i = 0; i < this.length; i++) {
//                callback.call(thisArg, this[i], i, this);
//            }
//        };
//    }
//
//    //utils are public, so we can use it wherever we want
//    window.fp_utils = {
//        $: $,
//        deepExtend: deepExtend,
//        hasClass: hasClass,
//        getWindowHeight: getWindowHeight,
//        css: css,
//        until: until,
//        prevUntil: prevUntil,
//        nextUntil: nextUntil,
//        prev: prev,
//        next: next,
//        last: last,
//        index: index,
//        getList: getList,
//        hide: hide,
//        show: show,
//        isArrayOrList: isArrayOrList,
//        addClass: addClass,
//        removeClass: removeClass,
//        appendTo: appendTo,
//        wrap: wrap,
//        wrapAll: wrapAll,
//        wrapInner: wrapInner,
//        unwrap: unwrap,
//        closest: closest,
//        after: after,
//        before: before,
//        insertBefore: insertBefore,
//        getScrollTop: getScrollTop,
//        siblings: siblings,
//        preventDefault: preventDefault,
//        isFunction: isFunction,
//        trigger: trigger,
//        matches: matches,
//        toggle: toggle,
//        createElementFromHTML: createElementFromHTML,
//        remove: remove,
//        filter: filter,
//        untilAll: untilAll,
//        nextAll: nextAll,
//        prevAll: prevAll,
//        showError: showError
//    };
//
//    return initialise;
//}));
//
///**
// * jQuery adapter for fullPage.js 3.0.0
// */
//if(window.jQuery && window.fullpage){
//    (function ($, fullpage) {
//        'use strict';
//
//        // No jQuery No Go
//        if (!$ || !fullpage) {
//            window.fp_utils.showError('error', 'jQuery is required to use the jQuery fullpage adapter!');
//            return;
//        }
//
//        $.fn.fullpage = function(options) {
//            options = $.extend({}, options, {'$': $});
//            new fullpage(this[0], options);
//        };
//    })(window.jQuery, window.fullpage);
//}

// 5. fullPage v2.9.4
/*!
 * fullPage 2.9.4
 * https://github.com/alvarotrigo/fullPage.js
 * @license MIT licensed
 *
 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo
 */
!function(e,n){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(t){return n(t,e,e.document,e.Math)}):"object"==typeof exports&&exports?module.exports=n(require("jquery"),e,e.document,e.Math):n(jQuery,e,e.document,e.Math)}("undefined"!=typeof window?window:this,function(e,n,t,o,i){"use strict";var a="fullpage-wrapper",r="."+a,l="fp-scrollable",s="."+l,c="fp-responsive",d="fp-notransition",f="fp-destroyed",u="fp-enabled",h="fp-viewing",p="active",v="."+p,g="fp-completely",m="."+g,w=".section",S="fp-section",y="."+S,b=y+v,x=y+":first",C=y+":last",T="fp-tableCell",k="."+T,I="fp-auto-height",L="fp-normal-scroll",E="fp-nav",M="#"+E,O="fp-tooltip",A="."+O,R="fp-show-active",H=".slide",B="fp-slide",z="."+B,D=z+v,P="fp-slides",q="."+P,F="fp-slidesContainer",V="."+F,W="fp-table",U="fp-slidesNav",Y="."+U,j=Y+" a",N="fp-controlArrow",X="."+N,K="fp-prev",Q="."+K,G=N+" "+K,J=X+Q,Z="fp-next",$="."+Z,_=N+" "+Z,ee=X+$,ne=e(n),te=e(t),oe={scrollbars:!0,mouseWheel:!0,hideScrollbars:!1,fadeScrollbars:!1,disableMouse:!0,interactiveScrollbars:!0};e.fn.fullpage=function(l){function s(n,t){n||nt(0),rt("autoScrolling",n,t);var o=e(b);l.autoScrolling&&!l.scrollBar?(ct.css({overflow:"hidden",height:"100%"}),N(Bt.recordHistory,"internal"),St.css({"-ms-touch-action":"none","touch-action":"none"}),o.length&&nt(o.position().top)):(ct.css({overflow:"visible",height:"initial"}),N(!1,"internal"),St.css({"-ms-touch-action":"","touch-action":""}),o.length&&ct.scrollTop(o.position().top))}function N(e,n){rt("recordHistory",e,n)}function Q(e,n){rt("scrollingSpeed",e,n)}function Z(e,n){rt("fitToSection",e,n)}function $(e){l.lockAnchors=e}function ae(e){e?(Kn(),Qn()):(Xn(),Gn())}function re(n,t){"undefined"!=typeof t?(t=t.replace(/ /g,"").split(","),e.each(t,function(e,t){ot(n,t,"m")})):n?(ae(!0),Jn()):(ae(!1),Zn())}function le(n,t){"undefined"!=typeof t?(t=t.replace(/ /g,"").split(","),e.each(t,function(e,t){ot(n,t,"k")})):l.keyboardScrolling=n}function se(){var n=e(b).prev(y);n.length||!l.loopTop&&!l.continuousVertical||(n=e(y).last()),n.length&&Ke(n,null,!0)}function ce(){var n=e(b).next(y);n.length||!l.loopBottom&&!l.continuousVertical||(n=e(y).first()),n.length&&Ke(n,null,!1)}function de(e,n){Q(0,"internal"),fe(e,n),Q(Bt.scrollingSpeed,"internal")}function fe(e,n){var t=Dn(e);"undefined"!=typeof n?qn(e,n):t.length>0&&Ke(t)}function ue(e){je("right",e)}function he(e){je("left",e)}function pe(n){if(!St.hasClass(f)){bt=!0,yt=ne.height(),e(y).each(function(){var n=e(this).find(q),t=e(this).find(z);l.verticalCentered&&e(this).find(k).css("height",Bn(e(this))+"px"),e(this).css("height",yt+"px"),l.scrollOverflow&&(t.length?t.each(function(){Rn(e(this))}):Rn(e(this))),t.length>1&&Sn(n,n.find(D))});var t=e(b),o=t.index(y);o&&de(o+1),bt=!1,e.isFunction(l.afterResize)&&n&&l.afterResize.call(St),e.isFunction(l.afterReBuild)&&!n&&l.afterReBuild.call(St)}}function ve(n){var t=dt.hasClass(c);n?t||(s(!1,"internal"),Z(!1,"internal"),e(M).hide(),dt.addClass(c),e.isFunction(l.afterResponsive)&&l.afterResponsive.call(St,n)):t&&(s(Bt.autoScrolling,"internal"),Z(Bt.autoScrolling,"internal"),e(M).show(),dt.removeClass(c),e.isFunction(l.afterResponsive)&&l.afterResponsive.call(St,n))}function ge(){l.css3&&(l.css3=Nn()),l.scrollBar=l.scrollBar||l.hybrid,we(),Se(),re(!0),s(l.autoScrolling,"internal"),Tn(),jn(),"complete"===t.readyState&&rn(),ne.on("load",rn)}function me(){ne.on("scroll",Re).on("hashchange",ln).blur(pn).resize(Cn),te.keydown(sn).keyup(dn).on("click touchstart",M+" a",vn).on("click touchstart",j,gn).on("click",A,cn),e(y).on("click touchstart",X,hn),l.normalScrollElements&&(te.on("mouseenter",l.normalScrollElements,function(){ae(!1)}),te.on("mouseleave",l.normalScrollElements,function(){ae(!0)}))}function we(){var n=St.find(l.sectionSelector);l.anchors.length||(l.anchors=n.filter("[data-anchor]").map(function(){return e(this).data("anchor").toString()}).get()),l.navigationTooltips.length||(l.navigationTooltips=n.filter("[data-tooltip]").map(function(){return e(this).data("tooltip").toString()}).get())}function Se(){St.css({height:"100%",position:"relative"}),St.addClass(a),e("html").addClass(u),yt=ne.height(),St.removeClass(f),Ce(),e(y).each(function(n){var t=e(this),o=t.find(z),i=o.length;be(t,n),xe(t,n),i>0?ye(t,o,i):l.verticalCentered&&Hn(t)}),l.fixedElements&&l.css3&&e(l.fixedElements).appendTo(dt),l.navigation&&ke(),Le(),l.scrollOverflow?("complete"===t.readyState&&Ie(),ne.on("load",Ie)):Oe()}function ye(n,t,o){var i=100*o,a=100/o;t.wrapAll('<div class="'+F+'" />'),t.parent().wrap('<div class="'+P+'" />'),n.find(V).css("width",i+"%"),o>1&&(l.controlArrows&&Te(n),l.slidesNavigation&&Vn(n,o)),t.each(function(n){e(this).css("width",a+"%"),l.verticalCentered&&Hn(e(this))});var r=n.find(D);r.length&&(0!==e(b).index(y)||0===e(b).index(y)&&0!==r.index())?et(r,"internal"):t.eq(0).addClass(p)}function be(n,t){t||0!==e(b).length||n.addClass(p),vt=e(b),n.css("height",yt+"px"),l.paddingTop&&n.css("padding-top",l.paddingTop),l.paddingBottom&&n.css("padding-bottom",l.paddingBottom),"undefined"!=typeof l.sectionsColor[t]&&n.css("background-color",l.sectionsColor[t]),"undefined"!=typeof l.anchors[t]&&n.attr("data-anchor",l.anchors[t])}function xe(n,t){"undefined"!=typeof l.anchors[t]&&n.hasClass(p)&&Mn(l.anchors[t],t),l.menu&&l.css3&&e(l.menu).closest(r).length&&e(l.menu).appendTo(dt)}function Ce(){St.find(l.sectionSelector).addClass(S),St.find(l.slideSelector).addClass(B)}function Te(e){e.find(q).after('<div class="'+G+'"></div><div class="'+_+'"></div>'),"#fff"!=l.controlArrowColor&&(e.find(ee).css("border-color","transparent transparent transparent "+l.controlArrowColor),e.find(J).css("border-color","transparent "+l.controlArrowColor+" transparent transparent")),l.loopHorizontal||e.find(J).hide()}function ke(){dt.append('<div id="'+E+'"><ul></ul></div>');var n=e(M);n.addClass(function(){return l.showActiveTooltip?R+" "+l.navigationPosition:l.navigationPosition});for(var t=0;t<e(y).length;t++){var o="";l.anchors.length&&(o=l.anchors[t]);var i='<li><a href="#'+o+'"><span></span></a>',a=l.navigationTooltips[t];"undefined"!=typeof a&&""!==a&&(i+='<div class="'+O+" "+l.navigationPosition+'">'+a+"</div>"),i+="</li>",n.find("ul").append(i)}e(M).css("margin-top","-"+e(M).height()/2+"px"),e(M).find("li").eq(e(b).index(y)).find("a").addClass(p)}function Ie(){e(y).each(function(){var n=e(this).find(z);n.length?n.each(function(){Rn(e(this))}):Rn(e(this))}),Oe()}function Le(){St.find('iframe[src*="youtube.com/embed/"]').each(function(){Ee(e(this),"enablejsapi=1")})}function Ee(e,n){var t=e.attr("src");e.attr("src",t+Me(t)+n)}function Me(e){return/\?/.test(e)?"&":"?"}function Oe(){var n=e(b);n.addClass(g),l.scrollOverflowHandler.afterRender&&l.scrollOverflowHandler.afterRender(n),en(n),nn(n),l.scrollOverflowHandler.afterLoad(),Ae()&&e.isFunction(l.afterLoad)&&l.afterLoad.call(n,n.data("anchor"),n.index(y)+1),e.isFunction(l.afterRender)&&l.afterRender.call(St)}function Ae(){var e=n.location.hash.replace("#","").split("/"),t=Dn(decodeURIComponent(e[0]));return!t.length||t.length&&t.index()===vt.index()}function Re(){var n;if(!l.autoScrolling||l.scrollBar){var o=ne.scrollTop(),i=ze(o),a=0,r=o+ne.height()/2,s=dt.height()-ne.height()===o,c=t.querySelectorAll(y);if(s)a=c.length-1;else if(o)for(var d=0;d<c.length;++d){var f=c[d];f.offsetTop<=r&&(a=d)}else a=0;if(Be(i)&&(e(b).hasClass(g)||e(b).addClass(g).siblings().removeClass(g)),n=e(c).eq(a),!n.hasClass(p)){zt=!0;var u,h,v=e(b),m=v.index(y)+1,w=On(n),S=n.data("anchor"),x=n.index(y)+1,C=n.find(D);C.length&&(h=C.data("anchor"),u=C.index()),Ct&&(n.addClass(p).siblings().removeClass(p),e.isFunction(l.onLeave)&&l.onLeave.call(v,m,x,w),e.isFunction(l.afterLoad)&&l.afterLoad.call(n,S,x),on(v),en(n),nn(n),Mn(S,x-1),l.anchors.length&&(ut=S),Wn(u,h,S,x)),clearTimeout(Mt),Mt=setTimeout(function(){zt=!1},100)}l.fitToSection&&(clearTimeout(Ot),Ot=setTimeout(function(){l.fitToSection&&He()},l.fitToSectionDelay))}}function He(){Ct&&(bt=!0,Ke(e(b)),bt=!1)}function Be(n){var t=e(b).position().top,o=t+ne.height();return"up"==n?o>=ne.scrollTop()+ne.height():t<=ne.scrollTop()}function ze(e){var n=e>Dt?"down":"up";return Dt=e,Ut=e,n}function De(e,n){if(kt.m[e]){var t="down"===e?"bottom":"top",o="down"===e?ce:se;if(n.length>0){if(!l.scrollOverflowHandler.isScrolled(t,n))return!0;o()}else o()}}function Pe(e){var n=e.originalEvent;!Fe(e.target)&&l.autoScrolling&&Ve(n)&&e.preventDefault()}function qe(n){var t=n.originalEvent,i=e(t.target).closest(y);if(!Fe(n.target)&&Ve(t)){l.autoScrolling&&n.preventDefault();var a=l.scrollOverflowHandler.scrollable(i),r=_n(t);Ft=r.y,Vt=r.x,i.find(q).length&&o.abs(qt-Vt)>o.abs(Pt-Ft)?!gt&&o.abs(qt-Vt)>ne.outerWidth()/100*l.touchSensitivity&&(qt>Vt?kt.m.right&&ue(i):kt.m.left&&he(i)):l.autoScrolling&&Ct&&o.abs(Pt-Ft)>ne.height()/100*l.touchSensitivity&&(Pt>Ft?De("down",a):Ft>Pt&&De("up",a))}}function Fe(n,t){t=t||0;var o=e(n).parent();return t<l.normalScrollElementTouchThreshold&&o.is(l.normalScrollElements)?!0:t==l.normalScrollElementTouchThreshold?!1:Fe(o,++t)}function Ve(e){return"undefined"==typeof e.pointerType||"mouse"!=e.pointerType}function We(e){var n=e.originalEvent;if(l.fitToSection&&ct.stop(),Ve(n)){var t=_n(n);Pt=t.y,qt=t.x}}function Ue(e,n){for(var t=0,i=e.slice(o.max(e.length-n,1)),a=0;a<i.length;a++)t+=i[a];return o.ceil(t/n)}function Ye(t){var i=(new Date).getTime(),a=e(m).hasClass(L);if(l.autoScrolling&&!pt&&!a){t=t||n.event;var r=t.wheelDelta||-t.deltaY||-t.detail,s=o.max(-1,o.min(1,r)),c="undefined"!=typeof t.wheelDeltaX||"undefined"!=typeof t.deltaX,d=o.abs(t.wheelDeltaX)<o.abs(t.wheelDelta)||o.abs(t.deltaX)<o.abs(t.deltaY)||!c;Tt.length>149&&Tt.shift(),Tt.push(o.abs(r)),l.scrollBar&&(t.preventDefault?t.preventDefault():t.returnValue=!1);var f=e(b),u=l.scrollOverflowHandler.scrollable(f),h=i-Wt;if(Wt=i,h>200&&(Tt=[]),Ct){var p=Ue(Tt,10),v=Ue(Tt,70),g=p>=v;g&&d&&(0>s?De("down",u):De("up",u))}return!1}l.fitToSection&&ct.stop()}function je(n,t){var o="undefined"==typeof t?e(b):t,i=o.find(q),a=i.find(z).length;if(!(!i.length||gt||2>a)){var r=i.find(D),s=null;if(s="left"===n?r.prev(z):r.next(z),!s.length){if(!l.loopHorizontal)return;s="left"===n?r.siblings(":last"):r.siblings(":first")}gt=!0,Sn(i,s,n)}}function Ne(){e(D).each(function(){et(e(this),"internal")})}function Xe(e){var n=e.position(),t=n.top,o=n.top>Ut,i=t-yt+e.outerHeight(),a=l.bigSectionsDestination;return e.outerHeight()>yt?(!o&&!a||"bottom"===a)&&(t=i):(o||bt&&e.is(":last-child"))&&(t=i),Ut=t,t}function Ke(n,t,o){if("undefined"!=typeof n){var i,a,r=Xe(n),s={element:n,callback:t,isMovementUp:o,dtop:r,yMovement:On(n),anchorLink:n.data("anchor"),sectionIndex:n.index(y),activeSlide:n.find(D),activeSection:e(b),leavingSection:e(b).index(y)+1,localIsResizing:bt};s.activeSection.is(n)&&!bt||l.scrollBar&&ne.scrollTop()===s.dtop&&!n.hasClass(I)||(s.activeSlide.length&&(i=s.activeSlide.data("anchor"),a=s.activeSlide.index()),l.autoScrolling&&l.continuousVertical&&"undefined"!=typeof s.isMovementUp&&(!s.isMovementUp&&"up"==s.yMovement||s.isMovementUp&&"down"==s.yMovement)&&(s=Je(s)),(!e.isFunction(l.onLeave)||s.localIsResizing||l.onLeave.call(s.activeSection,s.leavingSection,s.sectionIndex+1,s.yMovement)!==!1)&&(s.localIsResizing||on(s.activeSection),l.scrollOverflowHandler.beforeLeave(),n.addClass(p).siblings().removeClass(p),en(n),l.scrollOverflowHandler.onLeave(),Ct=!1,Wn(a,i,s.anchorLink,s.sectionIndex),Qe(s),ut=s.anchorLink,Mn(s.anchorLink,s.sectionIndex)))}}function Qe(n){if(l.css3&&l.autoScrolling&&!l.scrollBar){var t="translate3d(0px, -"+o.round(n.dtop)+"px, 0px)";zn(t,!0),l.scrollingSpeed?(clearTimeout(Lt),Lt=setTimeout(function(){$e(n)},l.scrollingSpeed)):$e(n)}else{var i=Ge(n);e(i.element).animate(i.options,l.scrollingSpeed,l.easing).promise().done(function(){l.scrollBar?setTimeout(function(){$e(n)},30):$e(n)})}}function Ge(e){var n={};return l.autoScrolling&&!l.scrollBar?(n.options={top:-e.dtop},n.element=r):(n.options={scrollTop:e.dtop},n.element="html, body"),n}function Je(n){return n.isMovementUp?e(b).before(n.activeSection.nextAll(y)):e(b).after(n.activeSection.prevAll(y).get().reverse()),nt(e(b).position().top),Ne(),n.wrapAroundElements=n.activeSection,n.dtop=n.element.position().top,n.yMovement=On(n.element),n}function Ze(n){n.wrapAroundElements&&n.wrapAroundElements.length&&(n.isMovementUp?e(x).before(n.wrapAroundElements):e(C).after(n.wrapAroundElements),nt(e(b).position().top),Ne())}function $e(n){Ze(n),e.isFunction(l.afterLoad)&&!n.localIsResizing&&l.afterLoad.call(n.element,n.anchorLink,n.sectionIndex+1),l.scrollOverflowHandler.afterLoad(),n.localIsResizing||nn(n.element),n.element.addClass(g).siblings().removeClass(g),Ct=!0,e.isFunction(n.callback)&&n.callback.call(this)}function _e(e,n){e.attr(n,e.data(n)).removeAttr("data-"+n)}function en(n){if(l.lazyLoading){var t,o=an(n);o.find("img[data-src], img[data-srcset], source[data-src], audio[data-src], iframe[data-src]").each(function(){t=e(this),e.each(["src","srcset"],function(e,n){var o=t.attr("data-"+n);"undefined"!=typeof o&&o&&_e(t,n)}),t.is("source")&&t.closest("video").get(0).load()})}}function nn(n){var t=an(n);t.find("video, audio").each(function(){var n=e(this).get(0);n.hasAttribute("data-autoplay")&&"function"==typeof n.play&&n.play()}),t.find('iframe[src*="youtube.com/embed/"]').each(function(){var n=e(this).get(0);n.hasAttribute("data-autoplay")&&tn(n),n.onload=function(){n.hasAttribute("data-autoplay")&&tn(n)}})}function tn(e){e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*")}function on(n){var t=an(n);t.find("video, audio").each(function(){var n=e(this).get(0);n.hasAttribute("data-keepplaying")||"function"!=typeof n.pause||n.pause()}),t.find('iframe[src*="youtube.com/embed/"]').each(function(){var n=e(this).get(0);/youtube\.com\/embed\//.test(e(this).attr("src"))&&!n.hasAttribute("data-keepplaying")&&e(this).get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")})}function an(n){var t=n.find(D);return t.length&&(n=e(t)),n}function rn(){var e=n.location.hash.replace("#","").split("/"),t=decodeURIComponent(e[0]),o=decodeURIComponent(e[1]);t&&(l.animateAnchor?qn(t,o):de(t,o))}function ln(){if(!zt&&!l.lockAnchors){var e=n.location.hash.replace("#","").split("/"),t=decodeURIComponent(e[0]),o=decodeURIComponent(e[1]),i="undefined"==typeof ut,a="undefined"==typeof ut&&"undefined"==typeof o&&!gt;t.length&&(t&&t!==ut&&!i||a||!gt&&ht!=o)&&qn(t,o)}}function sn(n){clearTimeout(At);var t=e(":focus");if(!t.is("textarea")&&!t.is("input")&&!t.is("select")&&"true"!==t.attr("contentEditable")&&""!==t.attr("contentEditable")&&l.keyboardScrolling&&l.autoScrolling){var o=n.which,i=[40,38,32,33,34];e.inArray(o,i)>-1&&n.preventDefault(),pt=n.ctrlKey,At=setTimeout(function(){mn(n)},150)}}function cn(){e(this).prev().trigger("click")}function dn(e){xt&&(pt=e.ctrlKey)}function fn(e){2==e.which&&(Yt=e.pageY,St.on("mousemove",wn))}function un(e){2==e.which&&St.off("mousemove")}function hn(){var n=e(this).closest(y);e(this).hasClass(K)?kt.m.left&&he(n):kt.m.right&&ue(n)}function pn(){xt=!1,pt=!1}function vn(n){n.preventDefault();var t=e(this).parent().index();Ke(e(y).eq(t))}function gn(n){n.preventDefault();var t=e(this).closest(y).find(q),o=t.find(z).eq(e(this).closest("li").index());Sn(t,o)}function mn(n){var t=n.shiftKey;if(Ct||!([37,39].indexOf(n.which)<0))switch(n.which){case 38:case 33:kt.k.up&&se();break;case 32:if(t&&kt.k.up){se();break}case 40:case 34:kt.k.down&&ce();break;case 36:kt.k.up&&fe(1);break;case 35:kt.k.down&&fe(e(y).length);break;case 37:kt.k.left&&he();break;case 39:kt.k.right&&ue();break;default:return}}function wn(e){Ct&&(e.pageY<Yt&&kt.m.up?se():e.pageY>Yt&&kt.m.down&&ce()),Yt=e.pageY}function Sn(n,t,o){var i=n.closest(y),a={slides:n,destiny:t,direction:o,destinyPos:t.position(),slideIndex:t.index(),section:i,sectionIndex:i.index(y),anchorLink:i.data("anchor"),slidesNav:i.find(Y),slideAnchor:Yn(t),prevSlide:i.find(D),prevSlideIndex:i.find(D).index(),localIsResizing:bt};return a.xMovement=An(a.prevSlideIndex,a.slideIndex),a.localIsResizing||(Ct=!1),l.onSlideLeave&&!a.localIsResizing&&"none"!==a.xMovement&&e.isFunction(l.onSlideLeave)&&l.onSlideLeave.call(a.prevSlide,a.anchorLink,a.sectionIndex+1,a.prevSlideIndex,a.xMovement,a.slideIndex)===!1?void(gt=!1):(t.addClass(p).siblings().removeClass(p),a.localIsResizing||(on(a.prevSlide),en(t)),!l.loopHorizontal&&l.controlArrows&&(i.find(J).toggle(0!==a.slideIndex),i.find(ee).toggle(!t.is(":last-child"))),i.hasClass(p)&&!a.localIsResizing&&Wn(a.slideIndex,a.slideAnchor,a.anchorLink,a.sectionIndex),void bn(n,a,!0))}function yn(n){xn(n.slidesNav,n.slideIndex),n.localIsResizing||(e.isFunction(l.afterSlideLoad)&&l.afterSlideLoad.call(n.destiny,n.anchorLink,n.sectionIndex+1,n.slideAnchor,n.slideIndex),Ct=!0,nn(n.destiny)),gt=!1}function bn(e,n,t){var i=n.destinyPos;if(l.css3){var a="translate3d(-"+o.round(i.left)+"px, 0px, 0px)";kn(e.find(V)).css(tt(a)),Et=setTimeout(function(){t&&yn(n)},l.scrollingSpeed,l.easing)}else e.animate({scrollLeft:o.round(i.left)},l.scrollingSpeed,l.easing,function(){t&&yn(n)})}function xn(e,n){e.find(v).removeClass(p),e.find("li").eq(n).find("a").addClass(p)}function Cn(){if(Tn(),mt){var n=e(t.activeElement);if(!n.is("textarea")&&!n.is("input")&&!n.is("select")){var i=ne.height();o.abs(i-jt)>20*o.max(jt,i)/100&&(pe(!0),jt=i)}}else clearTimeout(It),It=setTimeout(function(){pe(!0)},350)}function Tn(){var e=l.responsive||l.responsiveWidth,n=l.responsiveHeight,t=e&&ne.outerWidth()<e,o=n&&ne.height()<n;e&&n?ve(t||o):e?ve(t):n&&ve(o)}function kn(e){var n="all "+l.scrollingSpeed+"ms "+l.easingcss3;return e.removeClass(d),e.css({"-webkit-transition":n,transition:n})}function In(e){return e.addClass(d)}function Ln(n,t){l.navigation&&(e(M).find(v).removeClass(p),n?e(M).find('a[href="#'+n+'"]').addClass(p):e(M).find("li").eq(t).find("a").addClass(p))}function En(n){l.menu&&(e(l.menu).find(v).removeClass(p),e(l.menu).find('[data-menuanchor="'+n+'"]').addClass(p))}function Mn(e,n){En(e),Ln(e,n)}function On(n){var t=e(b).index(y),o=n.index(y);return t==o?"none":t>o?"up":"down"}function An(e,n){return e==n?"none":e>n?"left":"right"}function Rn(e){if(!e.hasClass("fp-noscroll")){e.css("overflow","hidden");var n,t=l.scrollOverflowHandler,o=t.wrapContent(),i=e.closest(y),a=t.scrollable(e);a.length?n=t.scrollHeight(e):(n=e.get(0).scrollHeight,l.verticalCentered&&(n=e.find(k).get(0).scrollHeight));var r=yt-parseInt(i.css("padding-bottom"))-parseInt(i.css("padding-top"));n>r?a.length?t.update(e,r):(l.verticalCentered?e.find(k).wrapInner(o):e.wrapInner(o),t.create(e,r)):t.remove(e),e.css("overflow","")}}function Hn(e){e.hasClass(W)||e.addClass(W).wrapInner('<div class="'+T+'" style="height:'+Bn(e)+'px;" />')}function Bn(e){var n=yt;if(l.paddingTop||l.paddingBottom){var t=e;t.hasClass(S)||(t=e.closest(y));var o=parseInt(t.css("padding-top"))+parseInt(t.css("padding-bottom"));n=yt-o}return n}function zn(e,n){n?kn(St):In(St),St.css(tt(e)),setTimeout(function(){St.removeClass(d)},10)}function Dn(n){if(!n)return[];var t=St.find(y+'[data-anchor="'+n+'"]');return t.length||(t=e(y).eq(n-1)),t}function Pn(e,n){var t=n.find(q),o=t.find(z+'[data-anchor="'+e+'"]');return o.length||(o=t.find(z).eq(e)),o}function qn(e,n){var t=Dn(e);t.length&&("undefined"==typeof n&&(n=0),e===ut||t.hasClass(p)?Fn(t,n):Ke(t,function(){Fn(t,n)}))}function Fn(e,n){if("undefined"!=typeof n){var t=e.find(q),o=Pn(n,e);o.length&&Sn(t,o)}}function Vn(e,n){e.append('<div class="'+U+'"><ul></ul></div>');var t=e.find(Y);t.addClass(l.slidesNavPosition);for(var o=0;n>o;o++)t.find("ul").append('<li><a href="#"><span></span></a></li>');t.css("margin-left","-"+t.width()/2+"px"),t.find("li").first().find("a").addClass(p)}function Wn(e,n,t,o){var i="";l.anchors.length&&!l.lockAnchors&&(e?("undefined"!=typeof t&&(i=t),"undefined"==typeof n&&(n=e),ht=n,Un(i+"/"+n)):"undefined"!=typeof e?(ht=n,Un(t)):Un(t)),jn()}function Un(e){if(l.recordHistory)location.hash=e;else if(mt||wt)n.history.replaceState(i,i,"#"+e);else{var t=n.location.href.split("#")[0];n.location.replace(t+"#"+e)}}function Yn(e){var n=e.data("anchor"),t=e.index();return"undefined"==typeof n&&(n=t),n}function jn(){var n=e(b),t=n.find(D),o=Yn(n),i=Yn(t),a=String(o);t.length&&(a=a+"-"+i),a=a.replace("/","-").replace("#","");var r=new RegExp("\\b\\s?"+h+"-[^\\s]+\\b","g");dt[0].className=dt[0].className.replace(r,""),dt.addClass(h+"-"+a)}function Nn(){var e,o=t.createElement("p"),a={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};t.body.insertBefore(o,null);for(var r in a)o.style[r]!==i&&(o.style[r]="translate3d(1px,1px,1px)",e=n.getComputedStyle(o).getPropertyValue(a[r]));return t.body.removeChild(o),e!==i&&e.length>0&&"none"!==e}function Xn(){t.addEventListener?(t.removeEventListener("mousewheel",Ye,!1),t.removeEventListener("wheel",Ye,!1),t.removeEventListener("MozMousePixelScroll",Ye,!1)):t.detachEvent("onmousewheel",Ye)}function Kn(){var e,o="";n.addEventListener?e="addEventListener":(e="attachEvent",o="on");var a="onwheel"in t.createElement("div")?"wheel":t.onmousewheel!==i?"mousewheel":"DOMMouseScroll";"DOMMouseScroll"==a?t[e](o+"MozMousePixelScroll",Ye,!1):t[e](o+a,Ye,!1)}function Qn(){St.on("mousedown",fn).on("mouseup",un)}function Gn(){St.off("mousedown",fn).off("mouseup",un)}function Jn(){(mt||wt)&&(l.autoScrolling&&dt.off(Ht.touchmove).on(Ht.touchmove,Pe),e(r).off(Ht.touchstart).on(Ht.touchstart,We).off(Ht.touchmove).on(Ht.touchmove,qe))}function Zn(){(mt||wt)&&e(r).off(Ht.touchstart).off(Ht.touchmove)}function $n(){var e;return e=n.PointerEvent?{down:"pointerdown",move:"pointermove"}:{down:"MSPointerDown",move:"MSPointerMove"}}function _n(e){var n=[];return n.y="undefined"!=typeof e.pageY&&(e.pageY||e.pageX)?e.pageY:e.touches[0].pageY,n.x="undefined"!=typeof e.pageX&&(e.pageY||e.pageX)?e.pageX:e.touches[0].pageX,wt&&Ve(e)&&l.scrollBar&&(n.y=e.touches[0].pageY,n.x=e.touches[0].pageX),n}function et(e,n){Q(0,"internal"),"undefined"!=typeof n&&(bt=!0),Sn(e.closest(q),e),"undefined"!=typeof n&&(bt=!1),Q(Bt.scrollingSpeed,"internal")}function nt(e){var n=o.round(e);if(l.css3&&l.autoScrolling&&!l.scrollBar){var t="translate3d(0px, -"+n+"px, 0px)";zn(t,!1)}else l.autoScrolling&&!l.scrollBar?St.css("top",-n):ct.scrollTop(n)}function tt(e){return{"-webkit-transform":e,"-moz-transform":e,"-ms-transform":e,transform:e}}function ot(e,n,t){switch(n){case"up":kt[t].up=e;break;case"down":kt[t].down=e;break;case"left":kt[t].left=e;break;case"right":kt[t].right=e;break;case"all":"m"==t?re(e):le(e)}}function it(n){s(!1,"internal"),re(!1),le(!1),St.addClass(f),clearTimeout(Et),clearTimeout(Lt),clearTimeout(It),clearTimeout(Mt),clearTimeout(Ot),ne.off("scroll",Re).off("hashchange",ln).off("resize",Cn),te.off("click touchstart",M+" a").off("mouseenter",M+" li").off("mouseleave",M+" li").off("click touchstart",j).off("mouseover",l.normalScrollElements).off("mouseout",l.normalScrollElements),e(y).off("click touchstart",X),clearTimeout(Et),clearTimeout(Lt),n&&at()}function at(){nt(0),St.find("img[data-src], source[data-src], audio[data-src], iframe[data-src]").each(function(){_e(e(this),"src")}),St.find("img[data-srcset]").each(function(){_e(e(this),"srcset")}),e(M+", "+Y+", "+X).remove(),e(y).css({height:"","background-color":"",padding:""}),e(z).css({width:""}),St.css({height:"",position:"","-ms-touch-action":"","touch-action":""}),ct.css({overflow:"",height:""}),e("html").removeClass(u),dt.removeClass(c),e.each(dt.get(0).className.split(/\s+/),function(e,n){0===n.indexOf(h)&&dt.removeClass(n)}),e(y+", "+z).each(function(){l.scrollOverflowHandler.remove(e(this)),e(this).removeClass(W+" "+p)}),In(St),St.find(k+", "+V+", "+q).each(function(){e(this).replaceWith(this.childNodes)}),St.css({"-webkit-transition":"none",transition:"none"}),ct.scrollTop(0);var n=[S,B,F];e.each(n,function(n,t){e("."+t).removeClass(t)})}function rt(e,n,t){l[e]=n,"internal"!==t&&(Bt[e]=n)}function lt(){var n=["fadingEffect","continuousHorizontal","scrollHorizontally","interlockedSlides","resetSliders","responsiveSlides","offsetSections","dragAndMove","scrollOverflowReset","parallax"];return e("html").hasClass(u)?void st("error","Fullpage.js can only be initialized once and you are doing it multiple times!"):(l.continuousVertical&&(l.loopTop||l.loopBottom)&&(l.continuousVertical=!1,st("warn","Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),l.scrollBar&&l.scrollOverflow&&st("warn","Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox"),!l.continuousVertical||!l.scrollBar&&l.autoScrolling||(l.continuousVertical=!1,st("warn","Scroll bars (`scrollBar:true` or `autoScrolling:false`) are mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),e.each(n,function(e,n){l[n]&&st("warn","fullpage.js extensions require jquery.fullpage.extensions.min.js file instead of the usual jquery.fullpage.js. Requested: "+n)}),void e.each(l.anchors,function(n,t){var o=te.find("[name]").filter(function(){return e(this).attr("name")&&e(this).attr("name").toLowerCase()==t.toLowerCase()}),i=te.find("[id]").filter(function(){return e(this).attr("id")&&e(this).attr("id").toLowerCase()==t.toLowerCase()});(i.length||o.length)&&(st("error","data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE)."),i.length&&st("error",'"'+t+'" is is being used by another element `id` property'),o.length&&st("error",'"'+t+'" is is being used by another element `name` property'))}))}function st(e,n){console&&console[e]&&console[e]("fullPage: "+n)}if(e("html").hasClass(u))return void lt();var ct=e("html, body"),dt=e("body"),ft=e.fn.fullpage;l=e.extend({menu:!1,anchors:[],lockAnchors:!1,navigation:!1,navigationPosition:"right",navigationTooltips:[],showActiveTooltip:!1,slidesNavigation:!1,slidesNavPosition:"bottom",scrollBar:!1,hybrid:!1,css3:!0,scrollingSpeed:700,autoScrolling:!0,fitToSection:!0,fitToSectionDelay:1e3,easing:"easeInOutCubic",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,continuousHorizontal:!1,scrollHorizontally:!1,interlockedSlides:!1,dragAndMove:!1,offsetSections:!1,resetSliders:!1,fadingEffect:!1,normalScrollElements:null,scrollOverflow:!1,scrollOverflowReset:!1,scrollOverflowHandler:ie,scrollOverflowOptions:null,touchSensitivity:5,normalScrollElementTouchThreshold:5,bigSectionsDestination:null,keyboardScrolling:!0,animateAnchor:!0,recordHistory:!0,controlArrows:!0,controlArrowColor:"#fff",verticalCentered:!0,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,responsiveWidth:0,responsiveHeight:0,responsiveSlides:!1,parallax:!1,parallaxOptions:{type:"reveal",percentage:62,property:"translate"},sectionSelector:w,slideSelector:H,afterLoad:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null,afterResponsive:null,lazyLoading:!0},l);var ut,ht,pt,vt,gt=!1,mt=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),wt="ontouchstart"in n||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints,St=e(this),yt=ne.height(),bt=!1,xt=!0,Ct=!0,Tt=[],kt={};kt.m={up:!0,down:!0,left:!0,right:!0},kt.k=e.extend(!0,{},kt.m);var It,Lt,Et,Mt,Ot,At,Rt=$n(),Ht={touchmove:"ontouchmove"in n?"touchmove":Rt.move,touchstart:"ontouchstart"in n?"touchstart":Rt.down},Bt=e.extend(!0,{},l);lt(),oe.click=wt,oe=e.extend(oe,l.scrollOverflowOptions),e.extend(e.easing,{easeInOutCubic:function(e,n,t,o,i){return(n/=i/2)<1?o/2*n*n*n+t:o/2*((n-=2)*n*n+2)+t}}),e(this).length&&(ft.setAutoScrolling=s,ft.setRecordHistory=N,ft.setScrollingSpeed=Q,ft.setFitToSection=Z,ft.setLockAnchors=$,ft.setMouseWheelScrolling=ae,ft.setAllowScrolling=re,ft.setKeyboardScrolling=le,ft.moveSectionUp=se,ft.moveSectionDown=ce,ft.silentMoveTo=de,ft.moveTo=fe,ft.moveSlideRight=ue,ft.moveSlideLeft=he,ft.fitToSection=He,ft.reBuild=pe,ft.setResponsive=ve,ft.destroy=it,ge(),me());var zt=!1,Dt=0,Pt=0,qt=0,Ft=0,Vt=0,Wt=(new Date).getTime(),Ut=0,Yt=0,jt=yt},"undefined"!=typeof IScroll&&(IScroll.prototype.wheelOn=function(){this.wrapper.addEventListener("wheel",this),this.wrapper.addEventListener("mousewheel",this),this.wrapper.addEventListener("DOMMouseScroll",this)},IScroll.prototype.wheelOff=function(){this.wrapper.removeEventListener("wheel",this),this.wrapper.removeEventListener("mousewheel",this),this.wrapper.removeEventListener("DOMMouseScroll",this)});var ie={refreshId:null,iScrollInstances:[],toggleWheel:function(n){var t=e(b).find(s);t.each(function(){var t=e(this).data("iscrollInstance");"undefined"!=typeof t&&t&&(n?t.wheelOn():t.wheelOff())})},onLeave:function(){ie.toggleWheel(!1)},beforeLeave:function(){ie.onLeave()},afterLoad:function(){ie.toggleWheel(!0)},create:function(n,t){var o=n.find(s);o.height(t),o.each(function(){var n=e(this),t=n.data("iscrollInstance");t&&e.each(ie.iScrollInstances,function(){e(this).destroy()}),t=new IScroll(n.get(0),oe),ie.iScrollInstances.push(t),t.wheelOff(),n.data("iscrollInstance",t)})},isScrolled:function(e,n){var t=n.data("iscrollInstance");return t?"top"===e?t.y>=0&&!n.scrollTop():"bottom"===e?0-t.y+n.scrollTop()+1+n.innerHeight()>=n[0].scrollHeight:void 0:!0},scrollable:function(e){return e.find(q).length?e.find(D).find(s):e.find(s)},scrollHeight:function(e){return e.find(s).children().first().get(0).scrollHeight},remove:function(e){var n=e.find(s);if(n.length){var t=n.data("iscrollInstance");t.destroy(),n.data("iscrollInstance",null)}e.find(s).children().first().children().first().unwrap().unwrap()},update:function(n,t){clearTimeout(ie.refreshId),ie.refreshId=setTimeout(function(){e.each(ie.iScrollInstances,function(){e(this).get(0).refresh()})},150),n.find(s).css("height",t+"px").parent().css("height",t+"px")},wrapContent:function(){return'<div class="'+l+'"><div class="fp-scroller"></div></div>'}}});

