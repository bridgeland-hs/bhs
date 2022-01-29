<script lang="ts">

    import { local } from './store-localstorage.ts';
    import json from './alerts.json';

</script>

<div id="alerts">
    {#each Object.entries(json) as [id, { type, title, description }]}
        {#if !$local.clearedAlerts.includes(id)}
            <div class="alert alert-dismissible alert-{type}"
                 on:click|once|preventDefault={() => $local.clearedAlerts = [...$local.clearedAlerts, id]}>
                <button class="btn-close" data-bs-dismiss="alert"></button>
                <strong>{title}</strong><br>
                {@html description}
            </div>
        {/if}
    {/each}
</div>
