import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Canvas from './Canvas';

// Mock Atlaskit drop adapter to call onDrop with a custom event
jest.mock('@atlaskit/pragmatic-drag-and-drop/element/adapter', () => ({
    dropTargetForElements: ({ element, onDrop }: any) => {
        element.addEventListener('drop', (event: any) => {
            if (onDrop) {
                if (!event.source) {
                    event.source = { data: { elementType: event.__mockElementType } };
                }
                onDrop(event);
            }
        });
        return () => { };
    },
    draggable: () => () => { },
}));

function dispatchDrop(form: HTMLElement, elementType: string) {
    const dropEvent = new Event('drop', { bubbles: true });
    // Attach a custom property that our mock will use
    // @ts-ignore
    dropEvent.__mockElementType = elementType;
    form.dispatchEvent(dropEvent);
}

test('renders Canvas component', () => {
    render(<Canvas />);
    expect(screen.getByTestId('canvas-root')).toBeInTheDocument();
});

test('renders nothing by default', () => {
    render(<Canvas />);
    expect(screen.getByTestId('canvas-root').children.length).toBe(0);
});

test('allows editing content in contenteditable heading', async () => {
    render(<Canvas />);
    const form = screen.getByTestId('canvas-root');
    await act(async () => {
        dispatchDrop(form, 'heading');
    });
    const heading = screen.getByText(/Heading/i);
    expect(heading).toBeInTheDocument();
    fireEvent.input(heading, { target: { textContent: 'New Heading' } });
    expect(heading.textContent).toBe('New Heading');
});

test('handles dropping an email element', async () => {
    render(<Canvas />);
    const form = screen.getByTestId('canvas-root');
    await act(async () => {
        dispatchDrop(form, 'email');
    });
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
});