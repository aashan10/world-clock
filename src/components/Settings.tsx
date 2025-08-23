import { Component, createEffect, createSignal, Show } from "solid-js";
import { useAppContext } from "../contexts/AppContext";
import { ToggleSwitch } from "./Toggle";

export const Settings: Component = () => {
    const { state, setTwelveHourFormat, setDate, setUseClientTime, toggleClockType, setTheme } = useAppContext();

    const parsedDate = () => {
        const date = state.date;
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        return formattedDateTime;
    }

    return (
        <div class="w-full my-4 bg-neutral-900 p-4 rounded transition-all">
            <button class="cursor-pointer text-teal-500 font-[Bungee] flex flex-row gap-2 items-center">
                Settings
            </button>

            <div class="mt-6 flex flex-col gap-4">

                <ToggleSwitch label="Use 12 hour format" checked={state.twelveHourFormat} onChange={() => { setTwelveHourFormat(!state.twelveHourFormat) }} />

                <ToggleSwitch label="Use current time" checked={state.useClientTime} onChange={() => { setUseClientTime(!state.useClientTime) }} />

                <ToggleSwitch label="Use Digital Clock" checked={state.clockType === "digital"} onChange={() => { toggleClockType() }} />

                <div class="flex flex-row gap-4 items-center">
                    <span class="text-white font-[Bungee]">Current Theme</span>

                    <button
                        class={`px-3 py-1 cursor-pointer rounded ${state.theme === "light" ? "bg-teal-500 text-white" : "bg-neutral-700 text-neutral-300"} font-[Bungee]`}
                        onClick={() => { setTheme("light") }}>
                        light
                    </button>
                    <button
                        class={`px-3 py-1 cursor-pointer rounded ${state.theme === "dark" ? "bg-teal-500 text-white" : "bg-neutral-700 text-neutral-300"} font-[Bungee]`}
                        onClick={() => { setTheme("dark") }}>
                        dark
                    </button>

                </div>

                <Show when={!state.useClientTime}>
                    <div class="text-white">
                        <input value={parsedDate()} class="font-[Bungee] text-neutral-300" type="datetime-local" onChange={(e) => setDate(new Date(e.currentTarget.value))} />
                    </div>
                </Show>
            </div>
        </div>
    );
}
