import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DraggableHtmlBlock from './DraggableHtmlBlock';

jest.mock('@atlaskit/pragmatic-drag-and-drop/element/adapter', () => ({
  draggable: ({ element, onDragStart }: any) => {
    element.addEventListener('dragstart', () => {
      onDragStart();
    });
    return () => {};
  },
}));

test('renders draggable Html block with correct attributes', () => {
    render(
        <DraggableHtmlBlock
            id="test-id"
            index={0}
            draggedIndex={-1}
            onDragStart={jest.fn()}
            onDropOnBlock={jest.fn()}
            children={<div>Test Content</div>}
        />
    );
    const draggable = screen.getByTestId('draggable-html-block');
    expect(draggable).toBeInTheDocument();
    expect(draggable).toHaveAttribute('draggable', 'true');
});

test('calls dragStart handler when dragged', () => {
  const dragStart = jest.fn();
  render(
    <DraggableHtmlBlock
      id="test-id"
      index={0}
      draggedIndex={-1}
      onDragStart={dragStart}
      onDropOnBlock={jest.fn()}
      children={<div>Test Content</div>}
    />
  );
  const draggable = screen.getByTestId('draggable-html-block');
  fireEvent.dragStart(draggable);
  expect(dragStart).toHaveBeenCalled();
});