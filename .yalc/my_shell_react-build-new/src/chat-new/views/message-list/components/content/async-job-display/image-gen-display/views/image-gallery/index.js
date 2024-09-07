"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ChevronLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronLeftIcon"));
const ChevronRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronRightIcon"));
const clsx_1 = __importDefault(require("clsx"));
const debounce_1 = __importDefault(require("lodash-es/debounce"));
const throttle_1 = __importDefault(require("lodash-es/throttle"));
const react_1 = require("react");
const react_swipeable_1 = require("react-swipeable");
const Fullscreen_1 = __importDefault(require("./Fullscreen.js"));
const Item_1 = __importDefault(require("./Item.js"));
const SwipeWrapper_1 = __importDefault(require("./SwipeWrapper.js"));
const screenChangeEvents = ['fullscreenchange', 'MSFullscreenChange', 'mozfullscreenchange', 'webkitfullscreenchange'];
const defaultProps = {
    onErrorImageURL: '',
    additionalClass: '',
    showNav: true,
    lazyLoad: false,
    infinite: true,
    showIndex: false,
    showBullets: false,
    bulltetPosition: 'inside',
    slideWrapperClass: '',
    showThumbnails: false,
    showFullscreenButton: false,
    disableThumbnailScroll: false,
    disableKeyDown: false,
    disableSwipe: false,
    disableThumbnailSwipe: false,
    useTranslate3D: true,
    useBrowserFullscreen: true,
    flickThreshold: 0.4,
    stopPropagation: false,
    indexSeparator: ' / ',
    startIndex: 0,
    slideDuration: 450,
    swipingTransitionDuration: 0,
    swipingThumbnailTransitionDuration: 0,
    onSlide: null,
    onBeforeSlide: null,
    onScreenChange: null,
    onPause: null,
    onPlay: null,
    onClick: () => { },
    onImageLoad: () => { },
    onImageError: () => { },
    onTouchMove: () => { },
    onTouchEnd: () => { },
    onTouchStart: () => { },
    onMouseOver: () => { },
    onMouseLeave: () => { },
    onBulletClick: () => { },
    onThumbnailError: () => { },
    onThumbnailClick: () => { },
    onContainerClick: () => { },
    renderCustomControls: null,
    renderThumbInner: null,
    renderItem: null,
    slideInterval: 3000,
    slideOnThumbnailOver: false,
    swipeThreshold: 30,
    renderLeftNav: (onClick, disabled) => ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('hidden w-6 h-6 rounded-full bg-white absolute left-1 z-10 top-1/2  -translate-y-1/2  justify-center items-center', { hidden: disabled, 'group-hover:flex': !disabled }), children: (0, jsx_runtime_1.jsx)(ChevronLeftIcon_1.default, { onClick: onClick, className: "w-4 h-4 text-black cursor-pointer" }) })),
    renderRightNav: (onClick, disabled) => ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('hidden w-6 h-6 rounded-full bg-white absolute right-1 z-10 top-1/2  -translate-y-1/2 justify-center items-center', { hidden: disabled, 'group-hover:flex': !disabled }), children: (0, jsx_runtime_1.jsx)(ChevronRightIcon_1.default, { onClick: onClick, className: "w-4 h-4 text-black  cursor-pointer" }) })),
    renderFullscreenButton: (onClick, isFullscreen) => ((0, jsx_runtime_1.jsx)(Fullscreen_1.default, { onClick: onClick, isFullscreen: isFullscreen })),
    useWindowKeyDown: true
};
function isEnterOrSpaceKey(event) {
    const key = parseInt(event.keyCode || event.which || 0, 10);
    const ENTER_KEY_CODE = 66;
    const SPACEBAR_KEY_CODE = 62;
    return key === ENTER_KEY_CODE || key === SPACEBAR_KEY_CODE;
}
const initialState = {
    currentIndex: 0,
    previousIndex: 0,
    isTransitioning: false,
    currentSlideOffset: 0,
    slideStyle: { transition: `all 500ms ease-out` },
    thumbsStyle: {
        transition: `all 500ms ease-out`
    },
    galleryWidth: 0,
    thumbnailsWrapperWidth: 0,
    thumbnailsWrapperHeight: 0,
    thumbsTranslate: 0,
    thumbsSwipedTranslate: 0,
    isFullscreen: false,
    isSwipingThumbnail: false,
    isModalFullscreen: false,
    swipingUpDown: false,
    swipingLeftRight: false,
    resetStyleIndex: -9999
};
const reducer = (state, action) => {
    const { type, payload = {} } = action;
    switch (action.type) {
        case 'SetState':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
const ImageGallery = (props) => {
    const { images, infinite, slideDuration, useBrowserFullscreen, disableKeyDown, useTranslate3D, disableSwipe, disableThumbnailScroll, stopPropagation, swipingTransitionDuration, swipingThumbnailTransitionDuration, swipeThreshold, flickThreshold, useWindowKeyDown, startIndex, onContainerClick, ...restProps } = { ...defaultProps, ...props };
    const [state, dispatch] = (0, react_1.useReducer)(reducer, { ...initialState, currentIndex: startIndex });
    const loadedImagesRef = (0, react_1.useRef)({});
    const imageGalleryRef = (0, react_1.useRef)(null);
    const thumbnailsWrapperRef = (0, react_1.useRef)(null);
    const thumbnailsRef = (0, react_1.useRef)(null);
    const imageGallerySlideWrapperRef = (0, react_1.useRef)(null);
    const transitionTimerRef = (0, react_1.useRef)(0);
    const isTransitioningRef = (0, react_1.useRef)(false);
    const thumbnailMouseOverTimerRef = (0, react_1.useRef)(null);
    const resizeSlideWrapperObserverRef = (0, react_1.useRef)(null);
    const resizeThumbnailWrapperObserverRef = (0, react_1.useRef)(null);
    const lazyLoadedRef = (0, react_1.useRef)([]);
    const directionRef = (0, react_1.useRef)('');
    const len = images.length;
    const canSlide = len >= 2;
    const canSlidePrevious = state.currentIndex > 0;
    const canSlideLeft = infinite || canSlidePrevious;
    const canSlideNext = state.currentIndex < len - 1;
    const canSlideRight = infinite || canSlideNext;
    const isFirstOrLastSlide = (0, react_1.useCallback)((index) => {
        const totalSlides = images.length - 1;
        const isLastSlide = index === totalSlides;
        const isFirstSlide = index === 0;
        return isLastSlide || isFirstSlide;
    }, [images.length]);
    const ignoreIsTransitioning = (0, react_1.useCallback)(() => {
        const { previousIndex, currentIndex } = state;
        const totalSlides = images.length - 1;
        const slidingMoreThanOneSlideLeftOrRight = Math.abs(previousIndex - currentIndex) > 1;
        const notGoingFromFirstToLast = !(previousIndex === 0 && currentIndex === totalSlides);
        const notGoingFromLastToFirst = !(previousIndex === totalSlides && currentIndex === 0);
        return slidingMoreThanOneSlideLeftOrRight && notGoingFromFirstToLast && notGoingFromLastToFirst;
    }, [state.currentIndex, state.previousIndex, images.length]);
    const slideIsTransitioning = (0, react_1.useCallback)((index) => {
        const { previousIndex, currentIndex } = state;
        const indexIsNotPreviousOrNextSlide = !(index === previousIndex || index === currentIndex);
        return isTransitioningRef.current && indexIsNotPreviousOrNextSlide;
    }, [isTransitioningRef.current, state.previousIndex, state.currentIndex]);
    const isSlideVisible = (0, react_1.useCallback)((index) => {
        return !slideIsTransitioning(index) || (ignoreIsTransitioning() && !isFirstOrLastSlide(index));
    }, [slideIsTransitioning, ignoreIsTransitioning, isFirstOrLastSlide]);
    (0, react_1.useEffect)(() => {
        transitionTimerRef.current = window.setTimeout(() => {
            if (isTransitioningRef.current) {
                isTransitioningRef.current = false;
                dispatch({
                    type: 'SetState',
                    payload: {
                        isSwipingThumbnail: false
                    }
                });
                clearTimeout(transitionTimerRef.current);
            }
        }, slideDuration + 50);
    }, [slideDuration, isTransitioningRef.current]);
    const setThumbsTranslate = (0, react_1.useCallback)((thumbsTranslate) => {
        dispatch({
            type: 'SetState',
            payload: {
                thumbsTranslate
            }
        });
    }, []);
    const isImageLoaded = (0, react_1.useCallback)((item) => {
        const imageExists = loadedImagesRef.current[item.original];
        if (imageExists) {
            return true;
        }
        loadedImagesRef.current[item.original] = true;
        return false;
    }, []);
    const handleImageLoaded = (event, original) => {
        const imageExists = loadedImagesRef.current[original];
        if (!imageExists && props.onImageLoad) {
            loadedImagesRef.current[original] = true;
            props.onImageLoad();
        }
    };
    const handleImageError = (event) => { };
    const addScreenChangeEvent = (0, react_1.useCallback)(() => {
        screenChangeEvents.forEach(eventName => {
            document.addEventListener(eventName, handleScreenChange);
        });
    }, []);
    const removeScreenChangeEvent = (0, react_1.useCallback)(() => {
        screenChangeEvents.forEach(eventName => {
            document.removeEventListener(eventName, handleScreenChange);
        });
    }, []);
    const fullScreen = (0, react_1.useCallback)(() => {
        const gallery = imageGalleryRef.current;
        if (useBrowserFullscreen) {
            if (gallery.requestFullscreen) {
                gallery.requestFullscreen();
            }
            else if (gallery.msRequestFullscreen) {
                gallery.msRequestFullscreen();
            }
            else if (gallery.mozRequestFullScreen) {
                gallery.mozRequestFullScreen();
            }
            else if (gallery.webkitRequestFullscreen) {
                gallery.webkitRequestFullscreen();
            }
            else {
                dispatch({
                    type: 'SetState',
                    payload: {
                        isModalFullScreen: true,
                        isFullscreen: true
                    }
                });
            }
        }
        else {
            dispatch({
                type: 'SetState',
                payload: {
                    isModalFullScreen: true,
                    isFullscreen: true
                }
            });
        }
    }, []);
    const setModalFullscreen = (0, react_1.useCallback)((isModalFullscreen) => {
        dispatch({
            type: 'SetState',
            payload: {
                isFullscreen: !state.isFullscreen
            }
        });
        if (restProps.onScreenChange) {
        }
    }, [state.isFullscreen]);
    const exitFullScreen = (0, react_1.useCallback)(() => {
        if (state.isFullscreen) {
            if (useBrowserFullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                else {
                    setModalFullscreen(false);
                }
            }
            else {
                setModalFullscreen(false);
            }
            dispatch({
                type: 'SetState',
                payload: {
                    isFullscreen: false
                }
            });
        }
    }, [state.isFullscreen, useBrowserFullscreen, setModalFullscreen]);
    const handleScreenChange = (0, react_1.useCallback)(() => {
        const fullScreenElement = document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement;
        const isFullscreen = imageGalleryRef.current === fullScreenElement;
        if (restProps.onScreenChange) {
        }
        if (useBrowserFullscreen) {
            dispatch({
                type: 'SetState',
                payload: {
                    isFullscreen
                }
            });
        }
    }, [useBrowserFullscreen]);
    const toggleFullScreen = (0, react_1.useCallback)(() => {
        if (state.isFullscreen) {
            exitFullScreen();
        }
        else {
            fullScreen();
        }
    }, [state.isFullscreen, exitFullScreen, fullScreen]);
    const unthrottledSlideToIndex = (0, react_1.useCallback)((index, event) => {
        if (!isTransitioningRef.current) {
            const slideCount = images.length - 1;
            let nextIndex = index;
            if (index < 0) {
                nextIndex = slideCount;
            }
            else if (index > slideCount) {
                nextIndex = 0;
            }
            if (restProps.onBeforeSlide && nextIndex !== state.currentIndex) {
            }
            (isTransitioningRef.current = nextIndex !== state.currentIndex),
                dispatch({
                    type: 'SetState',
                    payload: {
                        previousIndex: state.currentIndex,
                        currentIndex: nextIndex,
                        isTransitioning: nextIndex !== state.currentIndex,
                        currentSlideOffset: 0,
                        slideStyle: { transition: `all ${slideDuration}ms ease-out` }
                    }
                });
        }
    }, [images.length, state.currentIndex, isTransitioningRef.current]);
    const slideToIndex = (0, react_1.useMemo)(() => {
        return (0, throttle_1.default)(unthrottledSlideToIndex, slideDuration, { trailing: false });
    }, [slideDuration, unthrottledSlideToIndex]);
    const slideToIndexWithStyleReset = (0, react_1.useCallback)((nextIndex, event) => {
        const { currentIndex, currentSlideOffset } = state;
        dispatch({
            type: 'SetState',
            payload: {
                currentSlideOffset: currentSlideOffset + (currentIndex > nextIndex ? 0.001 : -0.001),
                slideStyle: { transition: 'none' },
                resetStyleIndex: nextIndex
            }
        });
    }, [state.currentIndex, state.currentSlideOffset]);
    const slideTo = (0, react_1.useCallback)((event, direction) => {
        const nextIndex = state.currentIndex + (direction === 'left' ? -1 : 1);
        if (isTransitioningRef.current)
            return;
        if (images.length === 2) {
            slideToIndexWithStyleReset(nextIndex, event);
        }
        else {
            slideToIndex(nextIndex, event);
        }
    }, [images.length, state.currentIndex, slideToIndexWithStyleReset, slideToIndex]);
    const slideLeft = (0, react_1.useCallback)((event) => {
        event.stopPropagation();
        slideTo(event, 'left');
    }, [slideTo]);
    const slideRight = (0, react_1.useCallback)((event) => {
        event.stopPropagation();
        slideTo(event, 'right');
    }, [slideTo]);
    const onBulletClick = (0, react_1.useCallback)((event, index) => {
        event.stopPropagation();
        event.target.blur();
        if (state.currentIndex !== index) {
            if (images.length === 2) {
                slideToIndexWithStyleReset(index, event);
            }
            else {
                slideToIndex(index, event);
            }
        }
    }, [images.length, state.currentIndex, slideToIndex, slideToIndexWithStyleReset]);
    const onThumbnailClick = (0, react_1.useCallback)((event, index) => {
        event.stopPropagation();
        event.target.parentNode.parentNode.blur();
        if (state.currentIndex !== index) {
            if (images.length === 2) {
                slideToIndexWithStyleReset(index, event);
            }
            else {
                slideToIndex(index, event);
            }
        }
    }, [slideToIndexWithStyleReset, slideToIndex, state.currentIndex, images.length]);
    const handleSwiping = (0, react_1.useCallback)(({ event, absX, dir }) => {
        const { galleryWidth, swipingUpDown, swipingLeftRight } = state;
        if ((dir === react_swipeable_1.UP || dir === react_swipeable_1.DOWN || swipingUpDown) && !swipingLeftRight) {
            if (!swipingUpDown) {
                dispatch({
                    type: 'SetState',
                    payload: {
                        swipingUpDown: true
                    }
                });
            }
            return;
        }
        if ((dir === react_swipeable_1.LEFT || dir === react_swipeable_1.RIGHT) && !swipingLeftRight) {
            dispatch({
                type: 'SetState',
                payload: {
                    swipingLeftRight: true
                }
            });
        }
        if (disableSwipe)
            return;
        if (stopPropagation) {
            event.preventDefault();
        }
        if (!isTransitioningRef.current) {
            const side = dir === react_swipeable_1.RIGHT ? 1 : -1;
            let currentSlideOffset = (absX / galleryWidth) * 100;
            if (Math.abs(currentSlideOffset) >= 100) {
                currentSlideOffset = 100;
            }
            const swipingTransition = {
                transition: `transform ${swipingTransitionDuration}ms ease-out`
            };
            dispatch({
                type: 'SetState',
                payload: {
                    currentSlideOffset: side * currentSlideOffset,
                    slideStyle: swipingTransition
                }
            });
        }
        else {
            dispatch({
                type: 'SetState',
                payload: {
                    currentSlideOffset: 0
                }
            });
        }
    }, [state]);
    const handleThumbnailSwiping = (0, react_1.useCallback)(({ event, absX, absY, dir }) => {
        if (restProps.disableThumbnailSwipe) {
            return;
        }
        const { thumbsSwipedTranslate, thumbnailsWrapperHeight, thumbnailsWrapperWidth, swipingUpDown, swipingLeftRight } = state;
        if ((dir === react_swipeable_1.UP || dir === react_swipeable_1.DOWN || swipingUpDown) && !swipingLeftRight) {
            if (!swipingUpDown) {
                dispatch({
                    type: 'SetState',
                    payload: {
                        cswipingUpDown: true
                    }
                });
                return;
            }
        }
        if ((dir === react_swipeable_1.LEFT || dir === react_swipeable_1.RIGHT) && !swipingLeftRight) {
            dispatch({
                type: 'SetState',
                payload: {
                    swipingLeftRight: true
                }
            });
        }
        const thumbsElement = thumbnailsRef.current;
        const emptySpaceMargin = 20;
        let thumbsTranslate;
        let totalSwipeableLength;
        let hasSwipedPassedEnd;
        let hasSwipedPassedStart;
        let isThumbnailBarSmallerThanContainer;
        if (thumbsElement) {
            const slideX = dir === react_swipeable_1.RIGHT ? absX || 0 : -(absX || 0);
            thumbsTranslate = thumbsSwipedTranslate + slideX;
            totalSwipeableLength = thumbsElement.scrollWidth - thumbnailsWrapperWidth + emptySpaceMargin;
            hasSwipedPassedEnd = Math.abs(thumbsTranslate) > totalSwipeableLength;
            hasSwipedPassedStart = thumbsTranslate > emptySpaceMargin;
            isThumbnailBarSmallerThanContainer = thumbsElement.scrollWidth <= thumbnailsWrapperWidth;
        }
        if (isThumbnailBarSmallerThanContainer) {
            return;
        }
        if ((dir === react_swipeable_1.LEFT || dir === react_swipeable_1.UP) && hasSwipedPassedEnd) {
            return;
        }
        if ((dir === react_swipeable_1.RIGHT || dir === react_swipeable_1.DOWN) && hasSwipedPassedStart) {
            return;
        }
        if (stopPropagation)
            event.stopPropagation();
        const swipingTransition = {
            transition: `transform ${swipingThumbnailTransitionDuration}ms ease-out`
        };
        dispatch({
            type: 'SetState',
            payload: {
                thumbsTranslate,
                thumbsStyle: swipingTransition
            }
        });
    }, [restProps.disableThumbnailSwipe, state]);
    const sufficientSwipe = (0, react_1.useCallback)(() => {
        const { currentSlideOffset } = state;
        return Math.abs(currentSlideOffset) > swipeThreshold;
    }, [state.currentSlideOffset, swipeThreshold]);
    const resetSwipingDirection = (0, react_1.useCallback)(() => {
        const { swipingUpDown, swipingLeftRight } = state;
        if (swipingUpDown) {
            dispatch({
                type: 'SetState',
                payload: {
                    swipingUpDown: false
                }
            });
        }
        if (swipingLeftRight) {
            dispatch({
                type: 'SetState',
                payload: {
                    swipingLeftRight: false
                }
            });
        }
    }, [state.swipingLeftRight, state.swipingUpDown]);
    const handleOnThumbnailSwiped = (0, react_1.useCallback)(() => {
        if (restProps.disableThumbnailSwipe) {
            return;
        }
        const { thumbsTranslate } = state;
        resetSwipingDirection();
        dispatch({
            type: 'SetState',
            payload: {
                isSwipingThumbnail: true,
                thumbsSwipedTranslate: thumbsTranslate,
                thumbsStyle: { transition: `all ${slideDuration}ms ease-out` }
            }
        });
    }, [resetSwipingDirection, state.thumbsTranslate, slideDuration]);
    const handleOnSwipedTo = (0, react_1.useCallback)((swipeDirection, isLeftRightFlick) => {
        const { currentIndex } = state;
        if (isTransitioningRef.current) {
            return;
        }
        let slideTo = currentIndex;
        if ((sufficientSwipe() || isLeftRightFlick) && !isTransitioningRef.current) {
            slideTo += swipeDirection;
        }
        if ((swipeDirection === -1 && !canSlideLeft) || (swipeDirection === 1 && !canSlideRight)) {
            slideTo = currentIndex;
        }
        unthrottledSlideToIndex(slideTo, '');
    }, [unthrottledSlideToIndex, state.currentIndex, sufficientSwipe]);
    const handleOnSwiped = (0, react_1.useCallback)(({ event, dir, velocity }) => {
        if (disableSwipe || isTransitioningRef.current)
            return;
        if (stopPropagation)
            event.stopPropagation();
        resetSwipingDirection();
        const swipeDirection = dir === react_swipeable_1.LEFT ? 1 : -1;
        const isSwipeUpOrDown = dir === react_swipeable_1.UP || dir === react_swipeable_1.DOWN;
        const isLeftRightFlick = velocity > flickThreshold && !isSwipeUpOrDown;
        handleOnSwipedTo(swipeDirection, isLeftRightFlick);
    }, [flickThreshold, disableSwipe, handleOnSwipedTo, resetSwipingDirection]);
    const handleKeyDown = (0, react_1.useCallback)((event) => {
        const { isFullscreen } = state;
        if (disableKeyDown)
            return;
        const LEFT_ARROW = 37;
        const RIGHT_ARROW = 39;
        const ESC_KEY = 27;
        const key = parseInt(event.keyCode || event.which || 0, 10);
        switch (key) {
            case LEFT_ARROW:
                if (canSlideLeft) {
                    slideLeft(event);
                }
                break;
            case RIGHT_ARROW:
                if (canSlideRight) {
                    slideRight(event);
                }
                break;
            case ESC_KEY:
                if (isFullscreen && !useBrowserFullscreen) {
                    exitFullScreen();
                }
                break;
            default:
                break;
        }
    }, [disableKeyDown, state.isFullscreen, canSlideLeft, canSlideRight, slideLeft, slideRight, exitFullScreen]);
    const handleTouchMove = (0, react_1.useCallback)((event) => {
        const { swipingLeftRight } = state;
        if (swipingLeftRight) {
            event.preventDefault();
        }
    }, [state.swipingLeftRight]);
    const getThumbsTranslate = (0, react_1.useCallback)((indexDifference) => {
        const { thumbnailsWrapperWidth } = state;
        let hiddenScroll;
        const thumbsElement = thumbnailsRef.current;
        if (disableThumbnailScroll)
            return 0;
        if (thumbsElement) {
            if (thumbsElement.scrollWidth <= thumbnailsWrapperWidth || thumbnailsWrapperWidth <= 0) {
                return 0;
            }
            hiddenScroll = thumbsElement.scrollWidth - thumbnailsWrapperWidth;
            const perIndexScroll = hiddenScroll / (images.length - 1);
            return indexDifference * perIndexScroll;
        }
        return 0;
    }, [disableThumbnailScroll, state.thumbnailsWrapperWidth]);
    const handleResize = (0, react_1.useCallback)(() => {
        const { currentIndex } = state;
        if (!imageGalleryRef.current) {
            return;
        }
        if (imageGalleryRef.current) {
            dispatch({
                type: 'SetState',
                payload: {
                    galleryWidth: imageGalleryRef.current.offsetWidth
                }
            });
        }
        if (imageGallerySlideWrapperRef.current) {
            dispatch({
                type: 'SetState',
                payload: {
                    gallerySlideWrapperHeight: imageGallerySlideWrapperRef.current.offsetHeight
                }
            });
        }
        setThumbsTranslate(-getThumbsTranslate(currentIndex));
    }, [state.currentIndex, getThumbsTranslate, setThumbsTranslate]);
    const initSlideWrapperResizeObserver = (0, react_1.useCallback)((element) => {
        if (element && !element.current)
            return;
        resizeSlideWrapperObserverRef.current = new ResizeObserver((0, debounce_1.default)(entries => {
            if (!entries)
                return;
            entries.forEach((entry) => {
                dispatch({
                    type: 'SetState',
                    payload: {
                        thumbnailsWrapperWidth: entry.contentRect.width
                    }
                });
            });
        }, 50));
        resizeSlideWrapperObserverRef.current.observe(element.current);
    }, []);
    const removeThumbnailsResizeObserver = (0, react_1.useCallback)(() => {
        if (resizeThumbnailWrapperObserverRef.current && thumbnailsWrapperRef && thumbnailsWrapperRef.current) {
            resizeThumbnailWrapperObserverRef.current.unobserve(thumbnailsWrapperRef.current);
            resizeThumbnailWrapperObserverRef.current = null;
        }
    }, []);
    const removeResizeObserver = (0, react_1.useCallback)(() => {
        if (resizeSlideWrapperObserverRef.current && imageGallerySlideWrapperRef && imageGallerySlideWrapperRef.current) {
            resizeSlideWrapperObserverRef.current.unobserve(imageGallerySlideWrapperRef.current);
            resizeSlideWrapperObserverRef.current = null;
        }
        removeThumbnailsResizeObserver();
    }, [removeThumbnailsResizeObserver]);
    const initThumbnailWrapperResizeObserver = (0, react_1.useCallback)((element) => {
        if (element && !element.current)
            return;
        resizeThumbnailWrapperObserverRef.current = new ResizeObserver((0, debounce_1.default)(entries => {
            if (!entries)
                return;
            entries.forEach((entry) => {
                dispatch({
                    type: 'SetState',
                    payload: {
                        thumbnailsWrapperHeight: entry.contentRect.height
                    }
                });
            });
        }, 50));
        resizeThumbnailWrapperObserverRef.current.observe(element.current);
    }, []);
    (0, react_1.useEffect)(() => {
        if (state.thumbnailsWrapperWidth > 0 || state.thumbnailsWrapperHeight > 0) {
            handleResize();
        }
    }, [state.thumbnailsWrapperWidth, state.thumbnailsWrapperHeight, handleResize]);
    (0, react_1.useEffect)(() => {
        if (state.resetStyleIndex > -9999) {
            slideToIndex(state.resetStyleIndex, '');
        }
    }, [state.resetStyleIndex]);
    (0, react_1.useEffect)(() => {
        if (useWindowKeyDown) {
            window.addEventListener('keydown', handleKeyDown);
        }
        else if (imageGalleryRef.current) {
            imageGalleryRef.current.addEventListener('keydown', handleKeyDown);
        }
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        initSlideWrapperResizeObserver(imageGallerySlideWrapperRef);
        initThumbnailWrapperResizeObserver(thumbnailsWrapperRef);
        addScreenChangeEvent();
        return () => {
            window.removeEventListener('touchmove', handleTouchMove);
            removeScreenChangeEvent();
            removeResizeObserver();
            if (useWindowKeyDown) {
                window.removeEventListener('keydown', handleKeyDown);
            }
            else if (imageGalleryRef.current) {
                imageGalleryRef.current.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [useWindowKeyDown, handleKeyDown, addScreenChangeEvent, handleTouchMove]);
    const getThumbnailPositionClassName = () => {
        return 'image-gallery-thumbnails-bottom';
    };
    const getAlignmentClassName = (index) => {
        const { currentIndex } = state;
        let alignment = '';
        const leftClassName = 'image-gallery-left';
        const centerClassName = 'image-gallery-center relative';
        const rightClassName = 'image-gallery-right';
        switch (index) {
            case currentIndex - 1:
                alignment = ` ${leftClassName}`;
                break;
            case currentIndex:
                alignment = ` ${centerClassName}`;
                break;
            case currentIndex + 1:
                alignment = ` ${rightClassName}`;
                break;
            default:
                break;
        }
        if (images.length >= 3 && infinite) {
            if (index === 0 && currentIndex === images.length - 1) {
                alignment = ` ${rightClassName}`;
            }
            else if (index === images.length - 1 && currentIndex === 0) {
                alignment = ` ${leftClassName}`;
            }
        }
        return alignment;
    };
    const getTranslateXForTwoSlide = (index) => {
        const { currentIndex, currentSlideOffset, previousIndex } = state;
        const indexChanged = currentIndex !== previousIndex;
        const firstSlideWasPrevSlide = index === 0 && previousIndex === 0;
        const secondSlideWasPrevSlide = index === 1 && previousIndex === 1;
        const firstSlideIsNextSlide = index === 0 && currentIndex === 1;
        const secondSlideIsNextSlide = index === 1 && currentIndex === 0;
        const swipingEnded = currentSlideOffset === 0;
        const baseTranslateX = -100 * currentIndex;
        let translateX = baseTranslateX + index * 100 + currentSlideOffset;
        if (currentSlideOffset > 0) {
            directionRef.current = 'left';
        }
        else if (currentSlideOffset < 0) {
            directionRef.current = 'right';
        }
        if (secondSlideIsNextSlide && currentSlideOffset > 0) {
            translateX = -100 + currentSlideOffset;
        }
        if (firstSlideIsNextSlide && currentSlideOffset < 0) {
            translateX = 100 + currentSlideOffset;
        }
        if (indexChanged) {
            if (firstSlideWasPrevSlide && swipingEnded && directionRef.current === 'left') {
                translateX = 100;
            }
            else if (secondSlideWasPrevSlide && swipingEnded && directionRef.current === 'right') {
                translateX = -100;
            }
        }
        else {
            if (secondSlideIsNextSlide && swipingEnded && directionRef.current === 'left') {
                translateX = -100;
            }
            if (firstSlideIsNextSlide && swipingEnded && directionRef.current === 'right') {
                translateX = 100;
            }
        }
        return translateX;
    };
    const getThumbnailBarHeight = () => {
        return {};
    };
    const getThumbnailStyle = () => {
        let translate;
        const { thumbsTranslate, thumbsStyle } = state;
        translate = `translate(${thumbsTranslate}px, 0)`;
        if (useTranslate3D) {
            translate = `translate3d(${thumbsTranslate}px, 0, 0)`;
        }
        return {
            WebkitTransform: translate,
            MozTransform: translate,
            msTransform: translate,
            OTransform: translate,
            transform: translate,
            ...thumbsStyle
        };
    };
    const getSlideStyle = (index) => {
        const { currentIndex, currentSlideOffset, slideStyle } = state;
        const baseTranslateX = -100 * currentIndex;
        const totalSlides = images.length - 1;
        let translateX = baseTranslateX + index * 100 + currentSlideOffset;
        if (infinite && images.length > 2) {
            if (currentIndex === 0 && index === totalSlides) {
                translateX = -100 + currentSlideOffset;
            }
            else if (currentIndex === totalSlides && index === 0) {
                translateX = 100 + currentSlideOffset;
            }
        }
        if (infinite && images.length === 2) {
            translateX = getTranslateXForTwoSlide(index);
        }
        let translate = `translate(${translateX}%, 0)`;
        if (useTranslate3D) {
            translate = `translate3d(${translateX}%, 0, 0)`;
        }
        const isVisible = isSlideVisible(index);
        return {
            display: isVisible ? 'inherit' : 'none',
            WebkitTransform: translate,
            MozTransform: translate,
            msTransform: translate,
            OTransform: translate,
            transform: translate,
            ...slideStyle
        };
    };
    const renderItem = (item) => {
        const { isFullscreen } = state;
        const { onImageError } = restProps;
        const handleImgError = onImageError || handleImageError;
        if (!Array.isArray(item)) {
            return ((0, jsx_runtime_1.jsx)(Item_1.default, { fullscreen: item.fullscreen, handleImageLoaded: handleImageLoaded, isFullscreen: isFullscreen, onImageError: handleImgError, original: item.original, originalAlt: item.originalAlt, originalHeight: String(item.originalHeight), originalWidth: String(item.originalWidth), sizes: item.sizes, loading: item.loading, srcSet: item.srcSet }));
        }
    };
    const renderThumbInner = (item) => {
        const handleThumbnailError = restProps.onThumbnailError || handleImageError;
        return ((0, jsx_runtime_1.jsx)("div", { className: "image-gallery-thumbnail-inner block relative w-full h-full", children: (0, jsx_runtime_1.jsx)("img", { className: "image-gallery-thumbnail-image align-middle leading-0 w-full h-full", src: item.thumbnail, height: item.thumbnailHeight, width: item.thumbnailWidth, alt: item.thumbnailAlt, loading: item.thumbnailLoading, onError: handleThumbnailError }) }));
    };
    const getSlideItems = () => {
        const { currentIndex } = state;
        const slides = [];
        const thumbnails = [];
        const bullets = [];
        images.forEach((item, index) => {
            const alignment = getAlignmentClassName(index);
            const isArr = Array.isArray(item);
            const originalClass = !isArr && item.originalClass ? ` ${item.originalClass}` : '';
            const thumbnailClass = !isArr && item.thumbnailClass ? ` ${item.thumbnailClass}` : '';
            const handleRenderItem = ((!isArr && item.renderItem) || restProps.renderItem || renderItem);
            const handleRenderThumbInner = ((!isArr && item.renderThumbInner) ||
                restProps.renderThumbInner ||
                renderThumbInner);
            const showItem = !restProps.lazyLoad || alignment || lazyLoadedRef.current[index];
            if (showItem && restProps.lazyLoad && !lazyLoadedRef.current[index]) {
                lazyLoadedRef.current[index] = true;
            }
            const slideStyle = getSlideStyle(index);
            const slide = ((0, jsx_runtime_1.jsx)("div", { "aria-label": `Go to Slide ${index + 1}`, tabIndex: -1, className: `image-gallery-slide absolute left-0 top-0 w-full ${alignment} ${originalClass}`, style: slideStyle, onClick: restProps.onClick, onTouchMove: restProps.onTouchMove, onTouchEnd: restProps.onTouchEnd, onTouchStart: restProps.onTouchStart, role: "button", children: showItem ? handleRenderItem(item) || null : (0, jsx_runtime_1.jsx)("div", { style: { height: '100%' } }) }, `slide-${index}`));
            slides.push(slide);
            if (restProps.showThumbnails && !isArr && item.thumbnail) {
                const igThumbnailClass = (0, clsx_1.default)('image-gallery-thumbnail inline-block transition-all w-10 h-10 bg-transparent p-0 rounded-[6px] overflow-hidden', thumbnailClass, { 'opacity-20': currentIndex !== index });
                thumbnails.push((0, jsx_runtime_1.jsx)("button", { type: "button", tabIndex: 0, "aria-pressed": currentIndex === index ? 'true' : 'false', "aria-label": `Go to Slide ${index + 1}`, className: igThumbnailClass, onClick: event => onThumbnailClick(event, index), children: handleRenderThumbInner(item) }, `thumbnail-${index}`));
            }
            if (restProps.showBullets) {
                const igBulletClass = (0, clsx_1.default)('appearance-none bg-[#DBDDDF] rounded-full cursor-pointer inline-block  w-2 h-2 outline-none transition-all', !isArr ? item.bulletClass : '', {
                    'bg-primary': currentIndex === index
                });
                bullets.push((0, jsx_runtime_1.jsx)("button", { type: "button", className: igBulletClass, onClick: event => onBulletClick(event, index), "aria-pressed": currentIndex === index ? 'true' : 'false', "aria-label": `Go to Slide ${index + 1}` }, `bullet-${index}`));
            }
        });
        return {
            slides,
            thumbnails,
            bullets
        };
    };
    const slideThumbnailBar = () => {
        const { currentIndex, isSwipingThumbnail } = state;
        const nextTranslate = -getThumbsTranslate(currentIndex);
        if (isSwipingThumbnail) {
            return;
        }
        if (currentIndex === 0) {
            dispatch({
                type: 'SetState',
                payload: {
                    thumbsTranslate: 0,
                    thumbsSwipedTranslate: 0
                }
            });
        }
        else {
            dispatch({
                type: 'SetState',
                payload: {
                    thumbsTranslate: nextTranslate,
                    thumbsSwipedTranslate: nextTranslate
                }
            });
        }
    };
    const { currentIndex, isFullscreen, isModalFullscreen } = state;
    const thumbnailStyle = getThumbnailStyle();
    const slideContext = getSlideItems();
    const slideWrapperClass = (0, clsx_1.default)('image-gallery-slide-wrapper relative overflow-hidden w-full flex-1 flex justify-center group', restProps.slideWrapperClass, getThumbnailPositionClassName());
    const handleClick = () => {
        onContainerClick();
    };
    const slideWrapper = ((0, jsx_runtime_1.jsxs)("div", { ref: imageGallerySlideWrapperRef, className: slideWrapperClass, children: [restProps.renderCustomControls && restProps.renderCustomControls(), canSlide ? ((0, jsx_runtime_1.jsx)("div", { className: "relative overflow-hidden w-fit flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(SwipeWrapper_1.default, { className: "image-gallery-swipe", delta: 0, onSwiping: handleSwiping, onSwiped: handleOnSwiped, children: (0, jsx_runtime_1.jsx)("div", { className: "image-gallery-slides leading-[0] w-full overflow-hidden relative whitespace-nowrap text-center", children: slideContext.slides }) }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "image-gallery-slides leading-[0] overflow-hidden w-full relative whitespace-nowrap text-center flex items-center justify-center", children: slideContext.slides })), restProps.showBullets && restProps.bulltetPosition === 'inside' && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('absolute left-0 right-0 w-[80%] z-[4] mx-auto'), children: (0, jsx_runtime_1.jsx)("div", { className: "m-0 p-0 text-center space-x-2", role: "navigation", "aria-label": "Bullet Navigation", children: slideContext.bullets }) })), canSlide && restProps.showNav && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [restProps.renderLeftNav(slideLeft, !canSlideLeft), restProps.renderRightNav(slideRight, !canSlideRight)] })), restProps.showFullscreenButton && restProps.renderFullscreenButton(setModalFullscreen, isFullscreen)] }));
    const igClass = (0, clsx_1.default)('image-gallery relative select-none tap-higtlight h-full', restProps.additionalClass);
    const igContentClass = (0, clsx_1.default)('relative top-0 leading-[0] h-full flex justify-center items-center flex-col', {
        'bg-surface': isFullscreen
    });
    const thumbnailWrapperClass = (0, clsx_1.default)('relative ', getThumbnailPositionClassName(), {
        'thumbnails-swipe-horizontal touch-pan-y': !restProps.disableThumbnailSwipe
    });
    return ((0, jsx_runtime_1.jsx)("div", { ref: imageGalleryRef, className: igClass, "aria-live": "polite", onClick: handleClick, children: (0, jsx_runtime_1.jsxs)("div", { className: igContentClass, children: [slideWrapper, restProps.showBullets && restProps.bulltetPosition !== 'inside' && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-[80%] z-[4] mx-auto mt-3'), children: (0, jsx_runtime_1.jsx)("div", { className: "m-0 p-0 text-center space-x-2", role: "navigation", "aria-label": "Bullet Navigation", children: slideContext.bullets }) })), restProps.showThumbnails && slideContext.thumbnails.length > 1 ? ((0, jsx_runtime_1.jsx)(SwipeWrapper_1.default, { className: thumbnailWrapperClass, delta: 0, onSwiping: handleThumbnailSwiping, onSwiped: handleOnThumbnailSwiped, children: (0, jsx_runtime_1.jsx)("div", { className: "image-gallery-thumbnails overflow-y-hidden overflow-x-scroll py-1 md:py-3", ref: thumbnailsWrapperRef, style: getThumbnailBarHeight(), children: (0, jsx_runtime_1.jsx)("nav", { ref: thumbnailsRef, className: "image-gallery-thumbnails-container w-full cursor-pointer whitespace-nowrap text-center space-x-2", style: thumbnailStyle, "aria-label": "Thumbnail Navigation", children: slideContext.thumbnails }) }) })) : null, restProps.renderBottom && restProps.renderBottom(state.currentIndex)] }) }));
};
exports.default = ImageGallery;
