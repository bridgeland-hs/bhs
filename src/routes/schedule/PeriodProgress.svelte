<script lang="ts">

    import Period from './Period';
    import { onMount } from 'svelte';

    export let periods: { prev: Period; current: Period; next: Period } = { prev: null, current: null, next: null };

    let width: number;

    setInterval(() => {
        width = !periods.current ? 0 : ((periods.current.duration() - periods.current.timeLeft()) / periods.current.duration()) * 100;

    }, 500);

</script>

<div class="progress" id="progressbar-area">
    <div class="progress-bar bg-info progress-bar-striped progress-bar-animated progress-rounded" title="{Math.floor(width)}%"
         style="width: {width}%"></div>
</div>
