<script lang="ts">
    import Period from './Period';
    import { formatTime, titleCase } from '../../util';
    import type { LocalData } from './localstorage';
    import { surroundingPeriods, todaySchedule } from './schedule';

    export let local: LocalData;
    export let runSettings: null | { schedule: string };
    export let selectedSchedule = todaySchedule();

    let untilNext = '-';
    let timeLeft = '-';

    export let periods: { prev: Period; current: Period; next: Period } = { prev: null, current: null, next: null };

    setInterval(() => {
        // periods = surroundingPeriods(selectedSchedule, local.lunch);
        periods = { // Used for dev testing
            prev: null,
            current: new Period('test2', '19:06', '20:00'),
            next: new Period('test1', '20:10', '21:00'),
        };

        const end = periods.current?.timeLeft();
        timeLeft = end < 0 ? `${end}` : formatTime(end);

        const next = periods.next?.timeUntil();
        untilNext = next < 0 ? `${next}` : formatTime(next);
    }, 200);

</script>


<svelte:head>
    {#if periods.current}
        <title>{!Number.isNaN(+periods.current.name) ? `Period ${ periods.current.name }` : titleCase(periods.current.name)}
            | {timeLeft}</title>
    {/if}
</svelte:head>

<main>

    {#if periods.current || periods.next}
        {#if periods.current}
            <h2 class="subtitle">Current Period:</h2>
            <h3 class="output-text">{titleCase(periods.current.name)}</h3>
            <h2 class="subtitle">Ends at:</h2>
            <h3 class="output-text">{periods.current.endTime(!local.hr24)} ({timeLeft})</h3>
        {:else if periods.prev}
            <h2 className="subtitle">Current Period:</h2>
            <h3 className="output-text">Passing</h3>
        {/if}
        {#if periods.next}
            <h2 class="subtitle">Next Period:</h2>
            <h3 class="output-text">{titleCase(periods.next.name)}</h3>
            <h2 class="subtitle">Starts at:</h2>
            <h3 class="output-text">{periods.next.startTime(!local.hr24)} ({untilNext})</h3>
        {/if}
    {:else}
        <h1>No School Right Now!</h1>
    {/if}

</main>
