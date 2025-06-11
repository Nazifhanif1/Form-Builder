import React from "react";
import { useState } from "react";
import { getNames } from 'country-list';

interface AddressElementProps {
    idx: number;
}
function AddressElement({idx}: AddressElementProps) {
    const [labels, setLabels] = useState<{ [key: number]: string }>({});

    function handleKeyDown(e: React.KeyboardEvent<HTMLElement>, idx: number) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const content = e.currentTarget.textContent || '';
            setLabels(prev => ({ ...prev, [idx]: content }));
            e.currentTarget.blur();
        }
    }

    return (<div className='flex flex-col gap-2 w-full mb-4'>
        <label contentEditable="true" onKeyDown={(e) => { handleKeyDown(e, idx) }} className="block cursor-text">Address</label>
        <input type="text" placeholder="Address Line 1" className="border p-2 mb-2 w-full" />
        <input type="text" placeholder="Address Line 2" className="border p-2 mb-2 w-full" />
        <div className={`flex flex-row w-full gap-6 mb-2`}>
            <input type="text" placeholder="City" className="border p-2 w-1/2" />
            <input type="text" placeholder="State" className="border p-2 w-1/2" />
        </div>
        <div className={`flex flex-row w-full gap-6 mb-2`}>
            <input type="text" placeholder="Postcode" className="border p-2 w-1/2" />
            <select className="border p-2 w-1/2">
                <option value="">Select a country</option>
                {getNames().map((country) => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
        </div>
    </div>);
}

export default AddressElement;