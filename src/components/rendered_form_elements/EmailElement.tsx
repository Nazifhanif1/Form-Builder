import React, { useState } from 'react';

function EmailElement() {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [label, setLabel] = useState<{ [key: number]: string }>({});

    function validateEmail(email: string) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email) ? '' : 'Invalid email address';
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        setError(''); // Clear error while typing
    }

    function handleBlur() {
        setError(validateEmail(value));
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            setError(validateEmail(value));
        }
    }
    function handleLabelKeyDown(e: React.KeyboardEvent<HTMLElement>) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const content = e.currentTarget.textContent || '';
                e.currentTarget.blur();
            }
        }

    return (
        <div className={`flex flex-col gap-2 w-full mb-4`}>
            <label className="w-fit block mb-2 cursor-text"
                contentEditable="true"
                suppressContentEditableWarning
                onInput={e => setLabel(e.currentTarget.textContent || "")}
                onKeyDown={(e) => { handleLabelKeyDown(e) }}
            >Email</label>

            <input
                type="email"
                placeholder="Email"
                className="border p-2 mb-1 w-full"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
    );
}

export default EmailElement;