import React, { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';

interface DraggableElementProps {
  elementType: string;
  elementName: string;
  icon: string;
}

function DraggableElement({ elementType, elementName, icon }: DraggableElementProps) {
  const [isDragging, setDragging] = useState<boolean>(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({ elementType }), // <-- Add this line
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [elementType]);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 p-3 whitespace-nowrap mb-2 bg-[#00ADB5] rounded-md shadow-sm`}
      style={{ cursor: 'move' }}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium text-white">{elementName}</span>
    </div>
  );
};

export default DraggableElement;