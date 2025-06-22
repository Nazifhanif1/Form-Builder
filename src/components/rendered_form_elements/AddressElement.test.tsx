import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddressElement from './AddressElement';

test('renders address input', () => {
    render(<AddressElement idx={1} />);
    expect(screen.getByPlaceholderText(/address line 1/i)).toBeInTheDocument();
});

test('country dropdown has 250 options', () => {
    const { container } = render(<AddressElement idx={1} />);
    const countrySelect = container.querySelector('select');
    expect(countrySelect).toBeInTheDocument();
    expect(countrySelect?.children.length).toBe(250);
});