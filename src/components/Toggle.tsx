import { Component } from 'solid-js';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
}

export const ToggleSwitch: Component<ToggleSwitchProps> = (props) => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            props.onChange(!props.checked);
        }
    };

    return (
        <label class="inline-flex gap-8 items-center cursor-pointer select-none">
            {/* Hidden checkbox for accessibility and state management */}
            <input
                type="checkbox"
                class="sr-only"
                checked={props.checked}
                onChange={(e) => props.onChange(e.currentTarget.checked)}
            />

            {props.label && <span class="font-[Bungee] text-neutral-300">{props.label}</span>}

            <div
                class={`relative w-12 h-7 rounded-full transition-colors duration-300 ease-in-out ${props.checked ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                tabindex="0"
                onKeyDown={handleKeyDown}
            >
                <div
                    class={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ease-in-out ${props.checked ? 'transform translate-x-5' : ''
                        }`}
                />
            </div>

        </label>
    );
};
