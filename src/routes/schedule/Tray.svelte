<script lang="ts">
    import { formatTime, weekDays } from './util';

    export let runSettings = {};

    const nextBreak: {
        name: string,
        date: Date,
        days: number,
        unit: string,
        time: string | boolean,
    }
        = {
        name: 'Spring break',
        date: new Date(2022, 2, 11, 14, 50, 0, 0),
        // date: new Date(2022, 0, 29, 14, 50, 0, 0),
        days: 0,
        unit: 'days',
        time: false,
    };

    setInterval(() => {
        nextBreak.days = weekDays(new Date(), nextBreak.date);
        nextBreak.unit = nextBreak.days !== 1 ? 'days' : 'day';
        if (nextBreak.days <= 1) {
            nextBreak.time = formatTime(Math.floor((nextBreak.date.valueOf() - new Date().valueOf()) / 1000));
        }

    }, 200);

</script>

<div class="text-start ps-3 h3">
    <small>Made by Hayden Pott</small>
</div>
<div class="text-start ps-3 h3">
    {nextBreak.name} in <span
        class="glow-strong clock">{nextBreak.time || nextBreak.days}</span> {nextBreak.time ? '' : nextBreak.unit}!
</div>
<div class="text-end">
    <a href="../image/2022-Calendar.pdf" class="btn btn-outline-light" target="_blank">🗓️ Calendar</a>
    <button
            class="btn btn-outline-light"
            title="Toggle Settings Panel"
            on:click={() => runSettings.showSettings = !runSettings.showSettings}
    >⚙️&nbsp;Settings
    </button>
</div>
