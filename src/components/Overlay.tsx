import { Component, createEffect, Show } from "solid-js";
import { useAppContext } from "../contexts/AppContext";
import { Transition } from "solid-transition-group";

export const Overlay: Component<{ children: any }> = (props) => {
    const { state, showOverlay, hideOverlay } = useAppContext();
    return (
        <>
            <button onClick={() => showOverlay()} class="fixed bottom-5 right-5 rounded-full w-16 h-16 bg-teal-500 flex items-center justify-center text-black dark:text-black shadow-lg hover:bg-teal-600 transition-colors duration-300 cursor-pointer">
                <span class="material-symbols-outlined">
                    add
                </span>
            </button>

            <Show when={state.overlayShown}>
                <Transition name="grow-in">
                    <div class="fixed top-0 left-0 w-full h-full bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center" onClick={() => hideOverlay()}>
                        <button class="absolute top-5 right-5 cursor-pointer p-4" onClick={() => hideOverlay()}>
                            <span class="material-symbols-outlined transform rotate-45">
                                add
                            </span>
                        </button>

                        <div class="flex flex-col p-4" onClick={(e) => e.stopPropagation()}>
                            {props.children}
                        </div>
                    </div>
                </Transition>
            </Show>
        </>
    );
};
