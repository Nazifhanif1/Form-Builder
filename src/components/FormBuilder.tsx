import React from 'react';
import { useEffect } from 'react';
import ElementsPanel from './ElementsPanel';
import Canvas from './Canvas';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import CopyHtmlButton from './CopyHtmlButton';
import CopyCssButton from './CopyCssButton';
import CopyJsButton from './CopyJsButton';

function FormBuilder() {

  useEffect(() => {
    return monitorForElements({});
  }, []);

  return (
    <div className="min-h-screen min-w-screen flex">
      <ElementsPanel />
      <div className={`flex flex-col min-h-screen p-8 bg-[#EEEEEE] flex flex-grow`}>
        <p className="text-sm text-gray-500 mb-4">Drag elements below to start building your form</p>
        <Canvas />
        <div className='flex flex-row gap-4'>
          <CopyHtmlButton />
          <CopyCssButton />
          <CopyJsButton />
        </div>
      </div>

    </div>
  );
}

export default FormBuilder;
