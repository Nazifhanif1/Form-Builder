import React, { useState } from "react";
import { twi } from "tw-to-css";

function getAllTailwindClasses(element: Element, classSet: Set<string>) {
    if (element.classList) {
        element.classList.forEach(cls => classSet.add(cls.trim()));
    }
    Array.from(element.children).forEach(child => getAllTailwindClasses(child, classSet));
}

// Escape special characters for valid CSS selectors
function escapeClassName(className: string) {
    // Escape: [ ] % / . : # ( ) , and space
    return className.replace(/([!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~ ])/g, '\\$1');
}

function CopyCssButton() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const canvas = document.querySelector("#canvas-root");
        if (canvas) {
            const classSet = new Set<string>();
            getAllTailwindClasses(canvas, classSet);

            let cssBlocks = "";
            Array.from(classSet).forEach(cls => {
                const css = twi(cls);
                if (css && css.trim()) {
                    const escaped = escapeClassName(cls);
                    cssBlocks += `.${escaped} {${css.trim().replace(/;\s*/g, ';')}}`;
                }
            });

            if (cssBlocks) {
                try {
                    await navigator.clipboard.writeText(cssBlocks.trim());
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                } catch {
                    setCopied(false);
                    alert("Failed to copy CSS.");
                }
            } else {
                alert("No mapped Tailwind classes found.");
            }
        }
    };

    return (
        <button
            type="button"
            className="bg-[#00ADB5] mt-4 text-white px-4 py-2 rounded hover:bg-[#009fae] transition w-fit"
            onClick={handleCopy}
        >
            {copied ? "Copied!" : "Copy CSS"}
        </button>
    );
}

export default CopyCssButton;