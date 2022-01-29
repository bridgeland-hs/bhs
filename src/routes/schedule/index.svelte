<svelte:head>
    <link rel="stylesheet" href="style/schedule.css">
    <title>BHS Schedule</title>
</svelte:head>

<script lang="ts">
    import Settings from './Settings.svelte';
    import Schedule from './Schedule.svelte';
    import Tray from './Tray.svelte';
    import PeriodProgress from './PeriodProgress.svelte';

    import { onMount } from 'svelte';
    import { defData } from './localstorage';
    import { toTime } from '../../util';
    import { todaySchedule } from './schedule';
    import Period from './Period';

    let periods: { prev: Period; current: Period; next: Period } = {
        prev: null, current: null, next: null
    };
    let runSettings = {
        showSettings: false,
    };

    let selectedSchedule = todaySchedule();
    let update;
    let local = defData;
    onMount(() => {
        local = JSON.parse(window.localStorage.getItem('schedule')) || local;

        update = () => {
            window.localStorage.setItem('schedule', JSON.stringify(local));
        };
    });

    let time = '';
    setInterval(() => {
        time = toTime(!local.hr24, new Date(), true);
    }, 200);

    $: {
        local; // ? Required for some reason :P
        update && update();
    }

</script>


<main>
    <div class="progress" id="progress-day"></div>
    <div class="progress" id="progressbar-area">
        <PeriodProgress bind:periods={periods}/>
    </div>


    <div class="text-center w-100 py-3 my-2" id="header">
        <h2 id="clock" class="clock text-center w-100 subtitle glow{local.clock ? '' : ' hide-text'}">{time}</h2>
    </div>

    <div id="alerts"></div>

    <div class="container">

        <div class="row align-items-center">
            <div class="col text-center" id="schedule">
                <Schedule bind:local={local} bind:runSettings={runSettings} bind:selectedSchedule={selectedSchedule}
                          bind:periods={periods}/>
            </div> <!-- Schedule Info -->

            <div class="col text-center">
                <img id="schedule-img" src="../image/Default_Schedule.jpg" alt="Schedule">
            </div>

        </div>

    </div>

    <div id="tray" class="navbar p-0">
        <Tray bind:runSettings={runSettings}/>
    </div>

    <div class="scroll-height"></div> <!-- Add height when in mobile view, so that one can scroll -->
    <form class="settings{runSettings.showSettings ? '' : ' hide'}" id="settings">
        <Settings bind:local={local} bind:selectedSchedule={selectedSchedule}/>
    </form>
</main>
