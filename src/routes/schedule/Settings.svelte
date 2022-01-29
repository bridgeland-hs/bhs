<script lang="ts">
    import { todaySchedule } from './schedule.ts';
    import { load } from './loadSchedules.ts';
    import { titleCase } from './util.ts';
    import { local } from './store-localstorage';

    // let local = get();

    export let selectedSchedule = todaySchedule();

    const schedules = load();

</script>

<main>
    <fieldset>
        <legend>Settings</legend>
        <div class="form-group">
            <label for="lunch" class="form-label">Lunch:</label>
            <select class="form-select" id="lunch" bind:value={$local.lunch}>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
            </select>
        </div>

        <div class="form-group">
            <label for="schedule-select" class="form-label">Schedule:</label>
            <select class="form-select" id="schedule-select" bind:value={selectedSchedule}>
                {#each [...schedules.keys()] as name}
                    <option value="{name}">{titleCase(name)}</option>
                {/each}
            </select>
        </div>

        <div class="form-group">
            <div class="form-check form-switch">
                <label class="form-check-label" for="time">24 Hour Time</label>
                <input class="form-check-input" type="checkbox" id="time" bind:checked={$local.hr24}>
            </div>
            <div class="form-check form-switch">
                <label class="form-check-label" for="clock">🕒 Clock</label>
                <input class="form-check-input" type="checkbox" id="clock" bind:checked={$local.clock}>
            </div>
        </div>

    </fieldset>
</main>
