<svelte:head>
    <link rel="stylesheet" href="style/schedule.css">
    <title>BHS Schedule</title>
</svelte:head>

<script lang="ts">
    import Settings from './Settings.svelte';
    import Schedule from './Schedule.svelte';
    import Tray from './Tray.svelte';

    import { onMount } from 'svelte';
    import { defData } from './localstorage';

    let runSettings = {
        showSettings: false,
        showClock: false,
    };

    let put, get, update;
    let local = defData;
    onMount(() => {
        put = (key: string, value: any) => window.localStorage.setItem(key, JSON.stringify(value));
        get = (key: string) => JSON.parse(window.localStorage.getItem(key));

        local = get('schedule') || local;

        update = () => {
            put('schedule', local);
        };
    });
    $: {
        local; // ? Required for some reason :P
        update && update();
    }

</script>


<main>
    <div class="progress" id="progress-day"></div>
    <div class="progress" id="progressbar-area">
        <div class="progress-bar bg-info progress-bar-striped progress-bar-animated progress-rounded" id="progressbar"
             style="width: 0;"></div>
    </div>


    <div class="text-center w-100 py-3 my-2" id="header">
        <h2 id="clock" class="clock text-center w-100 subtitle glow{local.clock ? '' : ' hide-text'}">(These times are not accurate :P)</h2>
    </div>

    <div id="alerts"></div>

    <div class="container">

        <div class="row align-items-center">
            <div class="col text-center" id="schedule">
                <Schedule bind:local={local}/>
            </div> <!-- Schedule Info -->

            <div class="col text-center">
                <img id="schedule-img" src="../image/Default_Schedule.jpg" alt="Schedule">
            </div>

        </div>

    </div>

    <div id="tray" class="navbar p-0">
        <Tray bind:runSettings="{runSettings}"/>
    </div>

    <div class="scroll-height"></div> <!-- Add height when in mobile view, so that one can scroll -->
    <form class="settings{runSettings.showSettings ? '' : ' hide'}" id="settings">
        <Settings bind:local={local}/>
    </form>
</main>

<!--<script src="js/schedule/index.ts" lang="ts"></script>-->
