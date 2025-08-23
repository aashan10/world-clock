import { Component, For, Show } from "solid-js";
import { useAppContext } from "../contexts/AppContext";
import { Clock } from "./Clock";
import { AnalogueClock } from "./AnalogueClock";


export const ClockList: Component = () => {
    const { state } = useAppContext();
    return (

        <div class="flex flex-col gap-12 w-full min-h-screen bg-gray-100 dark:bg-neutral-800 dark:text-neutral-300">
            <div class="container mx-auto pb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
                <Show when={state.clocks.length === 0}>
                    No clocks added yet.
                </Show>
                <For each={state.clocks}>
                    {(clock, index) => (
                        <>
                            <Show when={state.clockType === "digital"}>
                                <Clock index={index()} timezone={clock.timezone} name={clock.name} date={state.date} />
                            </Show>
                            <Show when={state.clockType === "analogue"}>
                                <AnalogueClock index={index()} timezone={clock.timezone} name={clock.name} date={state.date} />
                            </Show>
                        </>
                    )}
                </For>
            </div>
        </div>
    )
};
