<script lang="ts">
    import Period from './Period';
    import { formatTime, titleCase } from './util';
    import { surroundingPeriods, todaySchedule } from './schedule';
    import { local } from './store-localstorage';

    export let selectedSchedule = todaySchedule();

    let untilNext = '-';
    let timeLeft = '-';

    export let periods: { prev: Period; current: Period; next: Period } = { prev: null, current: null, next: null };

    setInterval(() => {
        periods = surroundingPeriods(selectedSchedule, $local.lunch) ?? { prev: null, current: null, next: null };
        // periods = { // Used for dev testing
        //     prev: null,
        //     current: new Period('test2', '20:06', '21:00'),
        //     next: new Period('test1', '21:10', '22:00'),
        // };

        const end = periods.current?.timeLeft();
        timeLeft = end < 0 ? `${end}` : formatTime(end);

        const next = periods.next?.timeUntil();
        untilNext = next < 0 ? `${next}` : formatTime(next);
    }, 200);

</script>

<svelte:head>

</svelte:head>

<main>
    {#if periods?.current}
        <title>{!Number.isNaN(+periods.current.name) ? `Period ${ periods.current.name }` : titleCase(periods.current.name)}
            | {timeLeft}</title>
    {/if}

    {#if periods?.current || periods?.next}
        {#if periods.current}
            <h2 class="subtitle">Current Period:</h2>
            <h3 class="output-text">{titleCase(periods.current.name)}</h3>
            <h2 class="subtitle">Ends at:</h2>
            <h3 class="output-text">{periods.current.endTime(!$local.hr24)} ({timeLeft})</h3>
        {:else if periods.prev}
            <h2 class="subtitle">Current Period:</h2>
            <h3 class="output-text">Passing</h3>
        {/if}
        {#if periods.next}
            <h2 class="subtitle">Next Period:</h2>
            <h3 class="output-text">{titleCase(periods.next.name)}</h3>
            <h2 class="subtitle">Starts at:</h2>
            <h3 class="output-text">{periods.next.startTime(!$local.hr24)} ({untilNext})</h3>
        {/if}
    {:else}
        <h1>No School Right Now!</h1>
    {/if}

</main>
