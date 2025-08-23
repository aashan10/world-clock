import { Component, createContext, useContext, batch, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { TimeZone } from "../timezones";

type AppState = {
    clocks: Array<{ name: string, timezone: TimeZone }>;
    useClientTime: boolean;
    twelveHourFormat: boolean;
    date: Date;
    overlayShown: boolean;
    clockType: "digital" | "analogue";
    theme: "light" | "dark" | "system";
};

type AppContextType = {
    state: AppState;
    addClock: (name: string, timezome: TimeZone) => void;
    removeClock: (index: number) => void;
    setDate: (date: Date) => void;
    setTwelveHourFormat: (value: boolean) => void;
    showOverlay: () => void;
    hideOverlay: () => void;
    setUseClientTime: (value: boolean) => void;
    setClockType: (type: "digital" | "analogue") => void;
    toggleClockType: () => void;
    setTheme: (theme: "light" | "dark" | "system") => void;
};

export const AppContext = createContext<AppContextType>();

const initialState = localStorage.getItem("clocks_settings");
const parsedState = {
    clocks: [],
    useClientTime: true,
    twelveHourFormat: false,
    date: new Date(),
    overlayShown: false,
    clockType: "digital" as "digital" | "analogue",
    theme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light" as "light" | "dark" | "system",
};

if (initialState) {
    try {
        const parsed = JSON.parse(initialState);

        if (parsed && parsed.clocks && Array.isArray(parsed.clocks)) {
            parsedState.clocks = parsed.clocks;
        }

        if (parsed && parsed.date && typeof parsed.date === "string") {
            parsedState.date = new Date(parsed.date);
        }

        parsedState.useClientTime = parsed.useClientTime ?? false;
        parsedState.twelveHourFormat = parsed.twelveHourFormat ?? false;
        parsedState.overlayShown = parsed.overlayShown ?? false;
        parsedState.clockType = parsed.clockType ?? "digital";

        if (parsed.theme) {
            parsedState.theme = parsed.theme;
        }

    } catch (e) {
        console.error("Failed to parse initial state from localStorage", e);
    }
}

const [state, setState] = createStore<AppState>(parsedState);

createEffect(() => {
    localStorage.setItem("clocks_settings", JSON.stringify(state));

    if (state.theme === "dark" || (state.theme === "system" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
});

export const AppProvider: Component<{ children: any }> = (props) => {
    const value: AppContextType = {
        state,
        showOverlay: () => {
            setState("overlayShown", true);
        },
        hideOverlay: () => {
            setState("overlayShown", false);
        },
        addClock: (name: string, timezone: TimeZone) => {
            batch(() => {
                setState("clocks", c => [...c, { name, timezone }]);
                setState("overlayShown", false);
            });
        },
        removeClock: (index: number) => {
            setState("clocks", previous => previous.filter((_, i) => i !== index));
        },
        setDate: (date: Date) => {
            setState("date", date);
        },
        setTwelveHourFormat: (value: boolean) => {
            setState("twelveHourFormat", value);
        },
        setUseClientTime: (value: boolean) => {
            setState("useClientTime", value);
        },
        setClockType: (type: "digital" | "analogue") => {
            setState("clockType", type);
        },
        toggleClockType: () => {
            setState("clockType", prev => prev === "digital" ? "analogue" : "digital");
        },
        setTheme: (theme: "light" | "dark" | "system") => {
            setState("theme", theme);
        }
    };

    let listener: number | undefined;

    createEffect(() => {
        if (state.useClientTime) {
            const currentDate = new Date();
            setState("date", currentDate);

            listener = setInterval(() => {
                if (state.useClientTime) {
                    const currentDate = new Date();
                    setState("date", currentDate);
                }
            }, 1000);
        } else {
            if (listener) {
                clearInterval(listener);
                listener = undefined;
            }
        }
    })

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};



export const useAppContext = () => {
    return useContext(AppContext)!;
}
