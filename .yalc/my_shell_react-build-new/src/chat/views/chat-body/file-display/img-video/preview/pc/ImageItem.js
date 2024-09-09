import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import Spinner from '../../../../../../../common/components/ui/spinner.js';
export default function ImageItem({ imgObj, handleZoomIn, handleZoomOut, resetScaleValue, onClose }) {
    const draggableRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [loaded, setLoaded] = useState(false);
    const { width, height } = useWindowSize();
    const timer = useRef(null);
    const [moved, setMoved] = useState(false);
    const handleLoaded = () => {
        setLoaded(true);
    };
    useEffect(() => {
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
    const originDimension = useMemo(() => {
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
    return (_jsxs("div", { className: clsx('w-full h-full relative flex justify-center items-center'), children: [!loaded && (_jsx("div", { className: "absolute top-0 left-0 w-full h-full flex justify-center items-center z-10", children: _jsx("div", { className: "flex justify-center items-center bg-[#00000033] backdrop-blur-2xl", style: { ...originDimension }, children: _jsx("div", { className: "w-10 h-10 p-[6px] flex justify-center items-center", children: _jsx(Spinner, { size: "md", speed: "slow", className: "text-white" }) }) }) })), _jsx("div", { className: "image-item absolute w-full h-full top-0 left-0 z-[1]", onClick: onClose }), _jsx("img", { ref: draggableRef, alt: "image", src: imgObj.url, width: originDimension.width || 9999, height: originDimension.height || 9999, draggable: true, className: clsx('object-scale-down z-20', isDragging ? 'cursor-grabbing' : 'cursor-grab'), style: {
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    maxHeight: originDimension.height || '80vh'
                }, onMouseDown: handleMouseDown, onDragStart: e => e.preventDefault(), onWheel: handleWheel, onClick: handleSingleClick, onDoubleClick: handleDoubleClick })] }));
}
