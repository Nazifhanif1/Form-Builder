import React, { useState, useEffect } from "react";

function CopyJsButton() {
    const [copied, setCopied] = useState(false);
    const [hasEmailInput, setHasEmailInput] = useState(false);

    useEffect(() => {
        // Function to check for email input
        const checkEmailInput = () => {
            const canvas = document.querySelector("#canvas-root");
            setHasEmailInput(!!(canvas && canvas.querySelector('input[type="email"]')));
        };

        // Run on mount and whenever the DOM changes
        checkEmailInput();

        // Optional: Use a MutationObserver to watch for DOM changes in the canvas
        const canvas = document.querySelector("#canvas-root");
        let observer: MutationObserver | null = null;
        if (canvas) {
            observer = new MutationObserver(checkEmailInput);
            observer.observe(canvas, { childList: true, subtree: true });
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, []);

    const handleCopy = async () => {
        const canvas = document.querySelector("#canvas-root");
        if (canvas && hasEmailInput) {

            const jsCode = `
            document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('input[type="email"]').forEach(function(input) {
                input.addEventListener('blur', function() {
                    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    var errorDiv = input.nextElementSibling;
                    if (!emailPattern.test(input.value)) {
                        if (!errorDiv || !errorDiv.classList.contains('email-error')) {
                            errorDiv = document.createElement('div');
                            errorDiv.className = 'email-error';
                            errorDiv.style.color = 'red';
                            errorDiv.style.fontSize = '0.875rem';
                            input.parentNode.insertBefore(errorDiv, input.nextSibling);
                        }
                        errorDiv.textContent = 'Invalid email address';
                    } else if (errorDiv && errorDiv.classList.contains('email-error')) {
                        errorDiv.textContent = '';
                    }
                });
            });
        });`.trim();

            try {
                await navigator.clipboard.writeText(jsCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            } catch {
                setCopied(false);
                alert("Failed to copy JS.");
            }
        } else {
            alert("No email input found in the form.");
        }
    };

    return (
        <button
            type="button"
            className={`bg-[#00ADB5] mt-4 text-white px-4 py-2 rounded hover:bg-[#009fae] transition w-fit ${hasEmailInput ? 'block' : 'hidden'}`}
            onClick={handleCopy}
        >
            {copied ? "Copied!" : "Copy JS"}
        </button>
    );
}

export default CopyJsButton;
