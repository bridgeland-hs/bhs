<svelte:head>
    <title>Faculty List</title>
</svelte:head>

<script lang="ts">

    import json from './json/teachers.json';

    type faculty = {
        name: string;
        email: string;
    }

    let people: faculty[] = json;
    let value = '';

    const filter = () => {
        people = json.filter(t => t.name.toLowerCase().includes(value));
    };

</script>

<main>


    <h1 class="text-center w-100 py-5">Faculty List</h1>

    <div id="list">
        <div class="form-floating mb-3" id="search">
            <input type="text" class="form-control" id="name-filter" placeholder="Name" bind:value={value}
                   on:input={filter}>
            <label for="name-filter">Name Filter</label>
        </div>

        <ul class="list-group" id="faculty-list">
            {#each people as teacher}
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <h3 class="name">{teacher.name}</h3>
                    <a href="mailto:{teacher.email}">{teacher.name}</a>
                </li>
            {/each}
        </ul>
    </div>
</main>

<style>
    main {
        min-height: 120vh; /* To prevent the scroll bar from going away when typing */
    }

    #list {
        max-width: 50vw;
        margin: 0 auto;
    }

    @media screen and (max-width: 600px) {
        #list {
            max-width: 100vw;
        }
    }
</style>
