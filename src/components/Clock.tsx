import { Component, splitProps } from "solid-js";
import { TimeZone } from "../timezones";
import { useAppContext } from "../contexts/AppContext";

export type ClockProps = {
    timezone: TimeZone;
    name: string;
    date: Date;
    index: number;
};

export const Clock: Component<ClockProps> = (props: ClockProps) => {
    const [local, _] = splitProps(props, ["timezone", "name", "date", "index"]);
    const { state, removeClock } = useAppContext();
    return (
        <div class="relative flex flex-col w-full h-full bg-neutral-50 rounded-lg shadow-sm p-4 dark:bg-neutral-900 dark:text-neutral-300">
            <h1 class="text-teal-500 text-6xl" style="font-family: 'Bungee', sans-serif">
                {props.date.toLocaleTimeString("en-US", { timeZone: local.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: state.twelveHourFormat })}
            </h1>
            <span class="text-neutral-500 dark:text-neutral-400 text-sm font-[Bungee]">{props.date.toLocaleDateString("en-US", { timeZone: local.timezone })}</span>

            <h2 class="text-neutral-500 dark:text-neutral-400 font-[Bungee] text-xl">{props.name} <span class="ml-2 text-xs">({props.timezone})</span></h2>
        </div>
    );
};

