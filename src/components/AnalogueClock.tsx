import { Component, createEffect, createSignal, onCleanup } from 'solid-js';

export type TimeZone = string; // e.g., 'America/New_York', 'Europe/London', 'Asia/Tokyo'

export type ClockProps = {
    timezone: TimeZone;
    name: string;
    date: Date;
    index: number;
};

const AnalogueClock: Component<ClockProps> = (props) => {
    const [currentTime, setCurrentTime] = createSignal(new Date());

    // Update time every second
    const interval = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);

    onCleanup(() => {
        clearInterval(interval);
    });

    // Get time in specified timezone
    const getTimeInTimezone = () => {
        const now = currentTime();

        // Use the provided date as base if it's different from current time
        // This allows for showing a specific time rather than current time
        const baseTime = props.date || now;

        try {
            // Create a date object representing the time in the specified timezone
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: props.timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });

            const parts = formatter.formatToParts(baseTime);
            const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0');
            const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0');
            const second = parseInt(parts.find(p => p.type === 'second')?.value || '0');

            return { hour, minute, second };
        } catch (error) {
            console.error('Invalid timezone:', props.timezone);
            // Fallback to local time
            return {
                hour: now.getHours(),
                minute: now.getMinutes(),
                second: now.getSeconds()
            };
        }
    };

    // Calculate angles for clock hands
    const getHandAngles = () => {
        const time = getTimeInTimezone();

        // Convert to 12-hour format for hour hand
        const hour12 = time.hour % 12;

        // Calculate angles (subtract 90 degrees to start from 12 o'clock)
        const secondAngle = (time.second * 6) - 90; // 360/60 = 6 degrees per second
        const minuteAngle = (time.minute * 6) - 90; // 360/60 = 6 degrees per minute
        const hourAngle = (hour12 * 30) + (time.minute * 0.5) - 90; // 360/12 = 30 degrees per hour, plus smooth movement

        return { hourAngle, minuteAngle, secondAngle };
    };

    // Generate hour markers
    const hourMarkers = Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30) - 90; // 30 degrees between each hour
        const isMainHour = i % 3 === 0; // Bold markers at 12, 3, 6, 9
        const length = 10;
        const width = isMainHour ? 2 : 1;

        const x1 = 50 + (40 - length) * Math.cos(angle * Math.PI / 180);
        const y1 = 50 + (40 - length) * Math.sin(angle * Math.PI / 180);
        const x2 = 50 + 40 * Math.cos(angle * Math.PI / 180);
        const y2 = 50 + 40 * Math.sin(angle * Math.PI / 180);

        return (
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                stroke-width={width}
                opacity={isMainHour ? 0.9 : 0.6}
            />
        );
    });
    const minuteMarkers = Array.from({ length: 60 }, (_, i) => {
        if (i % 5 === 0) return null; // Skip hour positions

        const angle = (i * 6) - 90; // 6 degrees between each minute
        const x1 = 50 + 37 * Math.cos(angle * Math.PI / 180);
        const y1 = 50 + 37 * Math.sin(angle * Math.PI / 180);
        const x2 = 50 + 40 * Math.cos(angle * Math.PI / 180);
        const y2 = 50 + 40 * Math.sin(angle * Math.PI / 180);

        return (
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                stroke-width={0.5}
                opacity={1}
            />
        );
    }).filter(Boolean);

    return (
        <div class="flex flex-col items-center space-y-2 p-4 dark:bg-neutral-900 rounded-lg">
            <h3 class="font-semibold text-teal-500 font-[Bungee] text-3xl">{props.name}</h3>
            <div class="relative">
                <svg
                    viewBox="0 0 100 100"
                    class="drop-shadow-lg w-full h-full"
                >
                    {/* Clock face */}
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        class="fill-neutral-300 dark:fill-neutral-700 stroke-neutral-500 dark:stroke-neutral-800"
                        stroke-width="2"
                    />

                    {/* Hour markers */}
                    {hourMarkers}

                    {/* Minute markers */}
                    {minuteMarkers}

                    {/* Clock hands */}
                    <g>
                        {/* Hour hand */}
                        <line
                            x1="50"
                            y1="50"
                            x2={50 + 20 * Math.cos(getHandAngles().hourAngle * Math.PI / 180)}
                            y2={50 + 20 * Math.sin(getHandAngles().hourAngle * Math.PI / 180)}
                            class="stroke-teal-500"
                            stroke-width="4"
                            stroke-linecap="round"
                        />

                        {/* Minute hand */}
                        <line
                            x1="50"
                            y1="50"
                            x2={50 + 30 * Math.cos(getHandAngles().minuteAngle * Math.PI / 180)}
                            y2={50 + 30 * Math.sin(getHandAngles().minuteAngle * Math.PI / 180)}
                            class="stroke-teal-500"
                            stroke-width="3"
                            stroke-linecap="round"
                        />

                        {/* Second hand */}
                        <line
                            x1="50"
                            y1="50"
                            x2={50 + 40 * Math.cos(getHandAngles().secondAngle * Math.PI / 180)}
                            y2={50 + 40 * Math.sin(getHandAngles().secondAngle * Math.PI / 180)}
                            stroke="#ef4444"
                            stroke-width="1"
                            stroke-linecap="round"
                        />
                    </g>

                    {/* Center dot */}
                    <circle
                        cx="50"
                        cy="50"
                        r="3"
                        class="fill-teal-500"
                    />
                </svg>
            </div>

            {/* Digital time display */}
            <div class="text-sm text-gray-600 font-mono">
                {(() => {
                    const time = getTimeInTimezone();
                    return `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}:${time.second.toString().padStart(2, '0')}`;
                })()}
            </div>

            <div class="text-xs text-gray-500">
                {props.timezone}
            </div>
        </div>
    );
};

export { AnalogueClock };

