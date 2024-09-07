"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGuide = void 0;
const driver_js_1 = require("driver.js");
const react_1 = require("react");
require("driver.js/dist/driver.css");
const next_intl_1 = require("next-intl");
const store_1 = require("../../services/store/index.js");
const identityService_1 = require("../services/identityService.js");
const useGuide = () => {
    const driverObj = (0, react_1.useRef)(null);
    const guideRef = (0, react_1.useRef)(null);
    const t = (0, next_intl_1.useTranslations)('workshop');
    const guiding = (0, store_1.useGlobalStore)(state => state.guiding);
    const setGuiding = (0, store_1.useGlobalStore)(state => state.setGuiding);
    const driverGuide = ({ step, steps, showProgress = false, hasSkip = true, prevBtnText = t('guide_prev'), nextBtnText = t('guide_next'), doneBtnText = t('guide_done'), nextMove = true, onDestroyed, onNextClick }) => {
        if (guideRef.current) {
            clearTimeout(guideRef.current);
        }
        const userGuide = identityService_1.identityService.getUserGuide()?.split(',') || [];
        const hasGuide = userGuide?.includes(step);
        if (!hasGuide) {
            guideRef.current = setTimeout(() => {
                setGuiding(true);
                driverObj.current = (0, driver_js_1.driver)({
                    prevBtnText,
                    nextBtnText,
                    doneBtnText,
                    showProgress,
                    allowClose: false,
                    showButtons: ['next'],
                    progressText: '{{current}}/{{total}}',
                    steps,
                    onDestroyed: () => {
                        setGuiding(false);
                        onDestroyed && onDestroyed();
                    },
                    onNextClick: (props, _step) => {
                        onNextClick && onNextClick(_step?.element);
                        if (nextMove) {
                            const timer = setTimeout(() => {
                                driverObj.current.moveNext();
                                clearTimeout(timer);
                            }, 10);
                        }
                    },
                    ...(hasSkip && {
                        onPopoverRender: (popover, { config, state }) => {
                            const firstButton = document.createElement('button');
                            firstButton.innerText = t('guide_skip');
                            firstButton.className = 'driver-popover-skip-btn driver-popover-close-btn';
                            firstButton.type == 'button';
                            popover.footerButtons.appendChild(firstButton);
                            firstButton.addEventListener('click', () => {
                                driverObj.current.destroy();
                            });
                        }
                    })
                });
                driverObj.current.drive();
                userGuide?.push(step);
                identityService_1.identityService.setUserGuide(userGuide?.join(','));
            }, 100);
        }
    };
    (0, react_1.useEffect)(() => {
        return () => {
            if (guiding && driverObj.current) {
                driverObj.current.destroy();
                setGuiding(false);
            }
        };
    }, []);
    return { driverGuide };
};
exports.useGuide = useGuide;
