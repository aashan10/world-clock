import { Component, createSignal, For } from "solid-js";
import { TimeZone, TimeZones } from "../timezones";
import { useAppContext } from "../contexts/AppContext";

export const AddClock: Component = () => {

    const [timeZone, setTimeZone] = createSignal<TimeZone>("America/New_York"); // Default timezone, can be changed later
    const [name, setName] = createSignal<string>("");

    const {
        addClock
    } = useAppContext();

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        if (name().trim() === "") {
            alert("Please enter a name for the clock.");
            return;
        }
        addClock(name(), timeZone());
    }

    return (
        <div class="container mt-5 flex flex-col items-start mx-auto p-4">
            <h1 class="text-2xl text-teal-500" style="font-family: 'Bungee', sans-serif">Add a new Clock</h1>

            <form onSubmit={handleSubmit} class="w-full">
                <div class="mt-32 w-full flex flex-col gap-8">

                    <div class="flex flex-col w-full lg:flex-row gap-4">
                        <label for="timezone" class="text-teal-500 font-[Bungee] lg:min-w-sm">Timezone</label>

                        <select onChange={(e) => setTimeZone(e.currentTarget.value as TimeZone)} id="timezone" class="w-full bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 text-black rounded-lg font-[Bungee] border-teal-500 border-b-2 p-2">
                            <For each={TimeZones.toSorted()}>
                                {(timezone) => (
                                    <option selected={timezone === timeZone()} value={timezone}>{timezone}</option>
                                )}
                            </For>
                        </select>
                    </div>

                    <div class="flex flex-col w-full lg:flex-row gap-4 items-center justify-start">
                        <label for="name" class="text-teal-500 font-[Bungee] lg:min-w-sm">Name</label>

                        <input value={name()} onInput={(e) => setName(e.currentTarget.value)} id="name" type="text" placeholder="Enter a name for your clock" class="w-full bg-neutral-200 border-teal-500 border-b-2 dark:bg-neutral-900 dark:text-neutral-300 text-black rounded-lg font-[Bungee] p-2" />
                    </div>

                    <div class="flex flex-col w-full justify-end lg:flex-row gap-4 mt-8">
                        <button type="submit" onClick={handleSubmit} class="w-full flex flex-row gap-4 items-center justify-center lg:w-auto bg-teal-500 text-white rounded-lg font-[Bungee] p-2 hover:bg-teal-600 transition-colors duration-300 cursor-pointer">
                            Add Clock
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
}
