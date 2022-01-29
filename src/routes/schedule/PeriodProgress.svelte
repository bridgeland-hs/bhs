<script lang="ts">

    import Period from './Period';
    import { onMount } from 'svelte';

    export let periods: { prev: Period; current: Period; next: Period } = { prev: null, current: null, next: null };

    let width: number;

    setInterval(() => {
        width = !periods.current ? 0 : ((periods.current.duration() - periods.current.timeLeft()) / periods.current.duration()) * 100;
        // console.log(periods, width);``

    }, 500)

</script>

<div class="progress-bar bg-info progress-bar-striped progress-bar-animated progress-rounded"
     style="width: {width}%"></div>
