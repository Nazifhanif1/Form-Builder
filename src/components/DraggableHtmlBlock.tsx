import React, { useEffect, useRef, useState } from "react";
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import invariant from 'tiny-invariant';
import '../App.css';

interface DraggableHtmlBlockProps {
    id: string;
    index: number;
    draggedIndex: number | null;
    children: React.ReactNode;
    onDragStart: (index: number) => void;
    onDropOnBlock: (targetIdx: number) => void;
}

function DraggableHtmlBlock({ id, index, draggedIndex, children, onDragStart, onDropOnBlock }: DraggableHtmlBlockProps) {
    const [isDragging, setDragging] = useState<boolean>(false);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isHigherIndex, setIsHigherIndex] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const dragCounter = useRef(0);

    useEffect(() => {
        const el = ref.current;
        invariant(el);

        // Drag setup
        const cleanupDraggable = draggable({
            element: el,
            getInitialData: () => ({ id, children, index }),
            onDragStart: () => {
                setDragging(true);
                onDragStart(index);
            },
            onDrop: () => setDragging(false),
        });

        // Focus setup
        const handleFocusIn = () => setIsSelected(true);
        const handleFocusOut = () => setIsSelected(false);

        el.addEventListener('focusin', handleFocusIn);
        el.addEventListener('focusout', handleFocusOut);

        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
        };

        const handleDrop = (e: DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);
            dragCounter.current = 0;
            onDropOnBlock(index);
        };

        const handleDragEnter = (e: DragEvent) => {
            e.preventDefault();
            dragCounter.current += 1;
            setIsDragOver(true);
            setIsHigherIndex(draggedIndex !== null && draggedIndex > index);
        };

        const handleDragLeave = (e: DragEvent) => {
            dragCounter.current -= 1;
            if (dragCounter.current === 0) {
                setIsDragOver(false);
            }
        };

        el.addEventListener('dragover', handleDragOver);
        el.addEventListener('drop', handleDrop);
        el.addEventListener('dragenter', handleDragEnter);
        el.addEventListener('dragleave', handleDragLeave);
        return () => {
            cleanupDraggable();
            el.removeEventListener('focusin', handleFocusIn);
            el.removeEventListener('focusout', handleFocusOut);
            el.removeEventListener('dragover', handleDragOver);
            el.removeEventListener('drop', handleDrop);
            el.removeEventListener('dragenter', handleDragEnter);
            el.removeEventListener('dragleave', handleDragLeave);
        };
    }, [id, index, children, onDragStart, onDropOnBlock]);

    function handleDeleteBlock() {
        const block = ref.current;
        if (block) {
            block.remove();
        }
    }

    return (
        <div
            ref={ref}
            className={`relative draggable-block w-fit p-2 ${isSelected ? ' border border-[#00ADB5] rounded-lg' : ''} ${isDragging ? 'dragging opacity-50' : ''}`}
            tabIndex={-1}
            data-testid="draggable-html-block"
            draggable={true}
        >
            {isDragOver && (
                <DropIndicator edge={isHigherIndex ? "top" : "bottom"} />
            )}
            {isSelected && (
                <div className="absolute left-full flex flex-col gap-2">
                    {/* 
                    <a className="p-2 ml-2 bg-[#00ADB5] rounded-[2rem] cursor-pointer">
                        <i className="fi fi-bs-gears flex"></i>
                    </a>
                    */}
                    <a onClick={handleDeleteBlock} className="p-2 ml-2 bg-[#00ADB5] rounded-[2rem] cursor-pointer">
                        <i className="fi fi-rs-trash flex"></i>
                    </a>
                </div>
            )}
            {children}
        </div>
    );
}

export default DraggableHtmlBlock;