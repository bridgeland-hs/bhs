<script lang="ts">
    import Period from './Period';
    import { titleCase } from '../../util';
    import type { LocalData } from './localstorage';

    export let local: LocalData;

    let untilNext = 100;
    let untilEnd = 0;
    let nextPeriod: Period = new Period('asdf', '7:20', '12:24');
    let currentPeriod: Period = new Period('next', '12:30', '14:50');

    setInterval(() => {
        untilNext -= 1;
        untilEnd += 1;
    }, 1000);

</script>

<main>

    {#if currentPeriod || nextPeriod}
        {#if currentPeriod}
            <h2 class="subtitle">Current Period:</h2>
            <h3 class="output-text">{titleCase(currentPeriod.name)}</h3>
            <h2 class="subtitle">Ends at:</h2>
            <h3 class="output-text">{currentPeriod.endTime(!local.hr24)} (in {untilEnd})</h3>
        {/if}
        {#if nextPeriod}
            <h2 class="subtitle">Next Period:</h2>
            <h3 class="output-text">{titleCase(nextPeriod.name)}</h3>
            <h2 class="subtitle">Starts at:</h2>
            <h3 class="output-text">{nextPeriod.startTime(!local.hr24)} (in {untilNext})</h3>
        {/if}
    {:else}
        <h1>No School Right Now!</h1>
    {/if}

</main>
