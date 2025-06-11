import React from 'react';
import DraggableElement from './DraggableElement';

const formElements = [
  { elementType: 'heading', elementName: 'Heading', icon: '🔠' },
  { elementType: 'fullName', elementName: 'Full Name', icon: '👤' },
  { elementType: 'email', elementName: 'Email', icon: '📧' },
  { elementType: 'address', elementName: 'Address', icon: '🏠' },
  { elementType: 'phone', elementName: 'Phone', icon: '📞' },
  { elementType: 'datePicker', elementName: 'Date Picker', icon: '📅' },
  { elementType: 'shortText', elementName: 'Short Text', icon: '✏️' },
  { elementType: 'longText', elementName: 'Long Text', icon: '📝' },
  { elementType: 'dropdown', elementName: 'Dropdown', icon: '🔽' },
  { elementType: 'singleChoice', elementName: 'Single Choice', icon: '🔘' },
  { elementType: 'multipleChoice', elementName: 'Multiple Choice', icon: '☑️' },
  { elementType: 'fileUpload', elementName: 'File Upload', icon: '📎' },
  { elementType: 'counter', elementName: 'Counter', icon: '🔢' },
  { elementType: 'submit', elementName: 'Submit', icon: '✅' },
  { elementType: 'divider', elementName: 'Divider', icon: '➖' },
];

function ElementsPanel() {
  return (
    <div className="flex flex-col bg-[#222831] p-8 h-screen overflow-y-scroll min-w-[25rem]">
      <h2 className="text-lg font-semibold mb-4 text-white">Form Elements</h2>
      <div className="space-y-2">
        {formElements.map((el) => (
          <DraggableElement
            key={el.elementType}
            elementType={el.elementType}
            elementName={el.elementName}
            icon={el.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default ElementsPanel;
