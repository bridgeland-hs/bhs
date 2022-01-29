<svelte:head>
    <title>Clubs and Organisations</title>
</svelte:head>

<script lang="ts">

    import json from './json/clubs.json';

    let clubs = json;
    let value = '';

    const filter = () => {
        clubs = json.filter(c =>
            c.name.toLowerCase().includes(value.toLowerCase())
            || c.sponsor.toLowerCase().includes(value.toLowerCase())
        );
    };

    const clean = (s: string) => {
        return s.split('_').map(s => s[0].toUpperCase() + s.substring(1)).join(' ');
    };

    const getText = (k, club): string => {
        let str = club[k];
        if (k === 'sponsor' && club[k].toLowerCase().endsWith('@cfisd.net')) {
            str = club[k].split('@')[0].replace(/\./g, ' ');
        }
        return str;
    };

</script>

<main>

    <h1 class="text-center w-100 py-5">Clubs and Organisations</h1>

    <div class="container">
        <div class="form-floating mb-3 w-75 mx-auto" id="search">
            <input type="text" class="form-control" id="name-filter" placeholder="Name" bind:value={value} on:input={filter}>
            <label for="name-filter">Filter by Name or Sponsor</label>
        </div>

        <table class="table table-hover" id="clubs">
            <thead>
            <tr>
                {#each [...Object.keys(json[0])] as key}
                    {#if key !== 'info_videos'}
                        <th scope="col">{ clean(key) }</th>
                    {/if}
                {/each}
            </tr>
            </thead>
            <tbody>
            {#each clubs as club}
                <tr class="table-dark">
                    {#each Object.keys(club) as key, i}
                        {#if i === 0}
                            <th>
                                {getText(key, club)}
                            </th>
                        {:else}
                            <td>
                                {getText(key, club)}
                            </td>
                        {/if}
                    {/each}
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</main>


<style>

</style>
