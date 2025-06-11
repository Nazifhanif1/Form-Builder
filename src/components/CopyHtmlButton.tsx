import React, { useState } from "react";

function CopyHtmlButton() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const canvas = document.querySelector("#canvas-root");
        if (canvas) {
            const clone = canvas.cloneNode(true) as HTMLElement;

            // Remove all contentEditable and draggable attributes recursively
            const removeAttributes = (el: Element) => {
                if (el.hasAttribute("contenteditable")) el.removeAttribute("contenteditable");
                if (el.hasAttribute("draggable")) el.removeAttribute("draggable");
                if (el.hasAttribute("data-drop-target-for-element")) el.removeAttribute("data-drop-target-for-element");
                el.classList.remove("max-w-\[1000px\]", "overflow-y-scroll", "h-\[85\%\]", "shadow-lg");
                Array.from(el.children).forEach(removeAttributes);
            };
            removeAttributes(clone);

            const html = clone.outerHTML.trim();
            try {
                await navigator.clipboard.writeText(html);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            } catch (err) {
                setCopied(false);
                alert("Failed to copy HTML.");
            }
        }
    };

    return (
        <button
            type="button"
            className="bg-[#00ADB5] mt-4 text-white px-4 py-2 rounded hover:bg-[#009fae] transition w-fit"
            onClick={handleCopy}
        >
            {copied ? "Copied!" : "Copy HTML"}
        </button>
    );
}

export default CopyHtmlButton;
