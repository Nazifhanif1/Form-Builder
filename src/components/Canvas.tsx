import React, { JSX, useRef, useState, useEffect } from 'react';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import EmailElement from './rendered_form_elements/EmailElement';
import '../App.css'
import AddressElement from './rendered_form_elements/AddressElement';
import DraggableHtmlBlock from './DraggableHtmlBlock';

function Canvas() {
    const [elements, setElements] = useState<string[]>([]);
    const [isDraggedOver, setIsDraggedOver] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [labels, setLabels] = useState<{ [key: number]: string }>({});
    const ref = useRef(null);

    const [editableContent, setEditableContent] = useState<{ [key: number]: string }>({});

    function handleContentInput(idx: number, e: React.FormEvent<HTMLElement>) {
        const target = e.currentTarget;
        setEditableContent(prev => ({
            ...prev,
            [idx]: (target && typeof target.textContent === "string") ? target.textContent : ""
        }));
    }

    useEffect(() => {
        const el = ref.current;
        invariant(el);

        return dropTargetForElements({
            element: el,
            onDragEnter: () => {
                setIsDraggedOver(true);

                if (isDraggedOver) {

                }
            },
            onDragLeave: () => setIsDraggedOver(false),
            onDrop: ({ source }) => {
                setIsDraggedOver(false);
                // Get the elementType from the source data
                const elementType = source.data.elementType;
                if (typeof elementType === "string") {
                    setElements(prev => [...prev, elementType]);
                }
            },
        });
    }, []);

    function handleKeyDown(e: React.KeyboardEvent<HTMLElement>, idx: number) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const content = e.currentTarget.textContent || '';
            setLabels(prev => ({ ...prev, [idx]: content }));
            e.currentTarget.blur();

        }
    }
    const droppedElements = (el: string, idx: number): JSX.Element | null => {
        switch (el) {
            case 'heading':
                return (
                    <h1
                        contentEditable="true"
                        suppressContentEditableWarning
                        onInput={(e) => handleContentInput(idx, e)}
                        onKeyDown={(e) => { handleKeyDown(e, idx) }}
                        className="w-fit text-2xl font-bold mb-2"
                    >Heading</h1>
                );
            case 'fullName':
                return (
                    <div className={`flex flex-col gap-2 w-full mb-4`}>
                        <label
                            contentEditable="true"
                            suppressContentEditableWarning
                            onInput={(e) => handleContentInput(idx, e)}
                            onKeyDown={(e) => { handleKeyDown(e, idx) }}
                            className="w-fit block mb-2 cursor-text"
                        >Full Name
                        </label>
                        <div className={`flex flex-row w-full gap-6`}>
                            <input type="text" placeholder="First Name" className="border p-2 flex-grow" />
                            <input type="text" placeholder="Last Name" className="border p-2 flex-grow" />
                        </div>
                    </div>
                );
            case 'email':
                return <EmailElement />;
            case 'address':
                return <AddressElement idx={idx} />;
            case 'phone':
                return <input type="tel" placeholder="Phone" className="border p-2 mb-5 w-full" />;
            case 'datePicker':
                return (
                    <div className={`flex flex-col gap-2 w-1/2 mb-4`}>
                        <label
                            contentEditable="true"
                            suppressContentEditableWarning
                            onInput={(e) => handleContentInput(idx, e)}
                            onKeyDown={(e) => { handleKeyDown(e, idx) }}
                            className="block cursor-text"
                        >
                            Date
                        </label>
                        <input type="date" className="border p-2 mb-5 w-full" />
                    </div>
                );
            case 'shortText':
                return <input type="text" placeholder="Short Text" className="border p-2 mb-5 w-full" />;
            case 'longText':
                return <textarea placeholder="Long Text" className="border p-2 mb-5 w-full resize"></textarea>;
            case 'dropdown':
                return (
                    <div>
                        <label
                            contentEditable="true"
                            suppressContentEditableWarning
                            onInput={(e) => handleContentInput(idx, e)}
                            onKeyDown={(e) => { handleKeyDown(e, idx) }}
                            className="block cursor-text mb-2"
                        >
                            Select an option:
                        </label>
                        <select className="border p-2 mb-5 w-full">
                            <option disabled value="">Select an option</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                        </select>
                    </div>

                );
            case 'singleChoice':
                return (
                    <div className="mb-5">
                        <label
                            contentEditable="true"
                            suppressContentEditableWarning
                            onInput={(e) => handleContentInput(idx, e)}
                            onKeyDown={(e) => { handleKeyDown(e, idx) }}
                            className="block cursor-text mb-2"
                        >
                            Select an option:
                        </label>
                        <label><input type="radio" name={`choice-${idx}`} value="option1" /> Option 1</label><br />
                        <label><input type="radio" name={`choice-${idx}`} value="option2" /> Option 2</label>
                    </div>
                );
            case 'multipleChoice':
                return (
                    <div className="mb-5">
                        <label
                            contentEditable="true"
                            suppressContentEditableWarning
                            onInput={(e) => handleContentInput(idx, e)}
                            onKeyDown={(e) => { handleKeyDown(e, idx) }}
                            className="block cursor-text mb-2"
                        >
                            Select an option:
                        </label>
                        <label><input type="checkbox" value="option1" /> Option 1</label><br />
                        <label><input type="checkbox" value="option2" /> Option 2</label>
                    </div>
                );
            case 'fileUpload':
                return <input type="file" className="border p-2 mb-5 w-full" />;
            case 'counter':
                return (
                    <div className="flex items-center mb-5">
                        <label
                            contentEditable="true"
                            suppressContentEditableWarning
                            onInput={(e) => handleContentInput(idx, e)}
                            onKeyDown={(e) => { handleKeyDown(e, idx) }}
                            className="block cursor-text"
                        >
                            Enter a number:
                        </label>
                        <input type="number" className="border p-2 ml-2 w-1/4" min="0" defaultValue="0" />
                    </div>
                );
            case 'submit':
                return <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>;
            case 'divider':
                return <hr className="border-t-2 border-gray-300 my-4" />;
            default:
                return null;
        }
    };


    return (
        <form
            ref={ref}
            data-testid="canvas-root"
            className={"flex flex-col gap-4 rounded-lg bg-white shadow-lg p-12 h-[85%] overflow-y-scroll scrollbar-hide-button max-w-[1000px]" + (isDraggedOver ? " border-2 border-dashed border-gray-500" : "")}
        >
            {elements.map((el, idx) => (
                <DraggableHtmlBlock
                    key={idx}
                    id={`${el}-${idx}`}
                    index={idx}
                    draggedIndex={draggedIndex}
                    onDragStart={(index) => setDraggedIndex(index)}
                    onDropOnBlock={(targetIdx) => {
                        if (draggedIndex !== null && draggedIndex !== targetIdx) {
                            setElements(prev => {
                                const updated = [...prev];
                                const [removed] = updated.splice(draggedIndex, 1);
                                updated.splice(targetIdx, 0, removed);
                                return updated;
                            });
                        }
                        setDraggedIndex(null);
                    }}
                >
                    {droppedElements(el, idx)}
                </DraggableHtmlBlock>
            ))}
        </form>
    );
}

export default Canvas;
