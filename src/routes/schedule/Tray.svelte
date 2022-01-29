<script>
	export let runSettings = {};
</script>

<div class="text-start ps-3 h3">
    <small style="">Made by Hayden Pott</small>
</div>
<div class="text-start ps-3 h3">
    Spring break in <span class="glow-strong clock" id="next-break">0</span><span id="next-break-days"></span>!
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
