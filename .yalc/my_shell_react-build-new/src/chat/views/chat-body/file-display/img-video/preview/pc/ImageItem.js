"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const spinner_1 = __importDefault(require("../../../../../../../common/components/ui/spinner"));
function ImageItem({ imgObj, handleZoomIn, handleZoomOut, resetScaleValue, onClose }) {
    const draggableRef = (0, react_1.useRef)(null);
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const [position, setPosition] = (0, react_1.useState)({ x: 0, y: 0 });
    const [offset, setOffset] = (0, react_1.useState)({ x: 0, y: 0 });
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    const { width, height } = (0, usehooks_ts_1.useWindowSize)();
    const timer = (0, react_1.useRef)(null);
    const [moved, setMoved] = (0, react_1.useState)(false);
    const handleLoaded = () => {
        setLoaded(true);
    };
    (0, react_1.useEffect)(() => {
        const imgRef = draggableRef.current;
        const handleMouseMove = (event) => {
            if (!isDragging)
                return;
            const newX = event.clientX - offset.x;
            const newY = event.clientY - offset.y;
            setPosition({ x: newX, y: newY });
            setMoved(true);
        };
        const handleMouseUp = () => {
            setIsDragging(false);
        };
        if (imgRef) {
            imgRef.addEventListener('load', handleLoaded, {
                once: true
            });
        }
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, offset]);
    const handleMouseDown = (event) => {
        if (event.button === 2) {
            return;
        }
        event.stopPropagation();
        setIsDragging(true);
        setMoved(false);
        setOffset({
            x: event.clientX - position.x,
            y: event.clientY - position.y
        });
    };
    const handleWheel = (event) => {
        if (event.deltaY === 0)
            return;
        if (event.deltaY < 0) {
            handleZoomIn();
        }
        else {
            handleZoomOut();
        }
    };
    function calculateImageSize(containerSize, imageSize) {
        let newWidth = imageSize.width;
        let newHeight = imageSize.height;
        if (imageSize.width === 0 || imageSize.height === 0) {
            return containerSize;
        }
        if (imageSize.width <= containerSize.width && imageSize.height <= containerSize.height) {
            return imageSize;
        }
        const widthRatio = containerSize.width / imageSize.width;
        const heightRatio = containerSize.height / imageSize.height;
        const ratio = Math.min(widthRatio, heightRatio);
        newWidth = imageSize.width * ratio;
        newHeight = imageSize.height * ratio;
        return {
            width: newWidth,
            height: newHeight
        };
    }
    const originDimension = (0, react_1.useMemo)(() => {
        return calculateImageSize({ width, height: height - 80 }, { width: imgObj.mediaFileMetadata?.width ?? 0, height: imgObj.mediaFileMetadata?.height ?? 0 });
    }, [height, imgObj.mediaFileMetadata?.height, imgObj.mediaFileMetadata?.width, width]);
    const handleSingleClick = () => {
        if (moved) {
            setMoved(false);
            return;
        }
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            onClose();
        }, 200);
    };
    const handleDoubleClick = () => {
        if (timer.current) {
            clearTimeout(timer.current);
            resetScaleValue();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('w-full h-full relative flex justify-center items-center'), children: [!loaded && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 w-full h-full flex justify-center items-center z-10", children: (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center bg-[#00000033] backdrop-blur-2xl", style: { ...originDimension }, children: (0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 p-[6px] flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "md", speed: "slow", className: "text-white" }) }) }) })), (0, jsx_runtime_1.jsx)("div", { className: "image-item absolute w-full h-full top-0 left-0 z-[1]", onClick: onClose }), (0, jsx_runtime_1.jsx)("img", { ref: draggableRef, alt: "image", src: imgObj.url, width: originDimension.width || 9999, height: originDimension.height || 9999, draggable: true, className: (0, clsx_1.default)('object-scale-down z-20', isDragging ? 'cursor-grabbing' : 'cursor-grab'), style: {
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    maxHeight: originDimension.height || '80vh'
                }, onMouseDown: handleMouseDown, onDragStart: e => e.preventDefault(), onWheel: handleWheel, onClick: handleSingleClick, onDoubleClick: handleDoubleClick })] }));
}
