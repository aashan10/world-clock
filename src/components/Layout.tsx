import { Component } from "solid-js";

export const Layout: Component<{ children: any }> = (props) => {
    return (
        <div class="relative w-full min-h-screen bg-gray-100 dark:bg-neutral-800 dark:text-neutral-300">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=add,remove" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=chevron_right" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet" />

            <div class="container mx-auto p-4">
                {props.children}
            </div>
        </div>
    );
};
