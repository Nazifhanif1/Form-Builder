import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ElementsPanel from './ElementsPanel';

test('renders heading element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Heading/i));
});

test('renders full name element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Full Name/i));
});

test('renders email element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Email/i));
});

test('renders address element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Address/i));
});

test('renders phone element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Phone/i));
});

test('renders date picker element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Date Picker/i));
});

test('renders short text element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Short Text/i));
});

test('renders long text element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Long Text/i));
});

test('renders dropdown element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Dropdown/i));
});

test('renders single choice element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Single Choice/i));
});

test('renders multiple choice element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Multiple Choice/i));
});

test('renders file upload element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/File Upload/i));
});

test('renders counter element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Counter/i));
});

test('renders submit element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Submit/i));
});

test('renders divider element', () => {
    render(<ElementsPanel />);
    const elementsPanel = screen.getByText(/Form Elements/i).parentElement;
    expect(elementsPanel).toBeInTheDocument();
    expect(elementsPanel).toContainElement(screen.getByText(/Divider/i));
});