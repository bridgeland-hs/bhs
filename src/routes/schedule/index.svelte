<svelte:head>
    <link rel="stylesheet" href="style/schedule.css">
    <title>BHS Schedule</title>
</svelte:head>

<script lang="ts">
    import Settings from './Settings.svelte';
    import Schedule from './Schedule.svelte';
    import Tray from './Tray.svelte';
    import PeriodProgress from './PeriodProgress.svelte';
    import DayProgress from './DayProgress.svelte';
    import Alerts from './Alerts.svelte';

    import { toTime } from './util';
    import { todaySchedule } from './schedule';
    import Period from './Period';
    import { local } from './store-localstorage';

    let periods: { prev: Period; current: Period; next: Period } = {
        prev: null, current: null, next: null
    };
    let runSettings = {
        showSettings: false,
    };

    let selectedSchedule = todaySchedule();
    // let local = get();

    let time = '';
    setInterval(() => {
        time = toTime(!$local.hr24, new Date(), true);
    }, 200);

</script>


<main>
<!--    <DayProgress periods={periods}/>-->
    <PeriodProgress bind:periods={periods}/>


    <div class="text-center w-100 py-3 my-2" id="header">
        <h2 id="clock" class="clock text-center w-100 subtitle glow{$local.clock ? '' : ' hide-text'}">{time}</h2>
    </div>

<!--   Temp disabled until I can get working: <Alerts/>-->

    <div class="container">

        <div class="row align-items-center">
            <div class="col text-center" id="schedule">
                <Schedule bind:selectedSchedule={selectedSchedule} bind:periods={periods}/>
            </div>

            <div class="col text-center">
                <img id="schedule-img" src="/img/schedule.jpg" alt="Schedule">
            </div>

        </div>

    </div>

    <div id="tray" class="navbar p-0">
        <Tray bind:runSettings={runSettings}/>
    </div>

    <div class="scroll-height"></div> <!-- Add height when in mobile view, so that one can scroll -->
    <form class="settings{runSettings.showSettings ? '' : ' hide'}" id="settings">
        <Settings bind:selectedSchedule={selectedSchedule}/>
    </form>
</main>
