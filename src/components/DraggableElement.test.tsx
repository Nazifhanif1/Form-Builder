import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DraggableElement from './DraggableElement';

test('renders draggable element with correct attributes', () => {
  render(<DraggableElement elementType="heading" elementName="Heading" icon="🔠" />);
  const draggable = screen.getByText(/Heading/i).closest('[draggable]');
  expect(draggable).toBeInTheDocument();
  expect(draggable).toHaveAttribute('draggable', 'true');
});

test('calls drag event handlers', () => {
  render(<DraggableElement elementType="heading" elementName="Heading" icon="🔠" />);
  const draggable = screen.getByText(/Heading/i).closest('[draggable]');
  const dragStart = jest.fn();
  draggable && draggable.addEventListener('dragstart', dragStart);

  draggable && fireEvent.dragStart(draggable);
  expect(dragStart).toHaveBeenCalled();
});