import { Component, For, Show } from "solid-js";
import { useAppContext } from "../contexts/AppContext";
import { Clock } from "./Clock";
import { AnalogueClock } from "./AnalogueClock";


export const ClockList: Component = () => {
    const { state, removeClock } = useAppContext();
    return (

        <div class="flex flex-col gap-12 w-full min-h-screen bg-gray-100 dark:bg-neutral-800 dark:text-neutral-300">

            <Show when={state.clocks.length === 0}>
                <span class="text-3xl w-full font-[Bungee] text-neutral-500 text-center">No clocks added yet.</span>
            </Show>
            <div class="container mx-auto pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
                <For each={state.clocks}>
                    {(clock, index) => (
                        <div class="relative">
                            <button class="absolute top-4 right-4 z-10 font-[Bungee] text-sm text-red-300 inline-flex flex-row items-center cursor-pointer w-fill" onClick={() => { removeClock(index()) }}>
                                <span class="material-symbols-outlined transform rotate-45 ">
                                    add
                                </span>
                                Remove
                            </button>
                            <Show when={state.clockType === "digital"}>
                                <Clock index={index()} timezone={clock.timezone} name={clock.name} date={state.date} />
                            </Show>
                            <Show when={state.clockType === "analogue"}>
                                <AnalogueClock index={index()} timezone={clock.timezone} name={clock.name} date={state.date} />
                            </Show>
                        </div>
                    )}
                </For>
            </div>
        </div>
    )
};
