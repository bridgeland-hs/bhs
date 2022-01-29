<svelte:head>
    <title>Grade Calculator</title>
</svelte:head>

<script>

	import { onMount } from 'svelte';

	onMount(() => {
		const table = {
			daily: {
				short: 'dg',
				// stuPts, maxPts, weight, percent, points
			},
			assessment: {
				short: 'as',
				// stuPts, maxPts, weight, percent, points
			},
			major: {
				short: 'mg',
				// stuPts, maxPts, weight, percent, points
			},
			totals: {
				// weight, points
			},
		};

		const categories = ['daily', 'assessment', 'major'];

		const updateTotals = () => {
			const weightTotal = table.daily.weight.valueAsNumber
				+ table.assessment.weight.valueAsNumber
				+ table.major.weight.valueAsNumber;
			const pointsTotal = table.daily.pts + table.assessment.pts + table.major.pts;

			if (Number.isNaN(weightTotal)) {
				table.totals.weight.value = 0;
			} else {
				table.totals.weight.innerText = weightTotal;
			}

			if (Number.isNaN(pointsTotal)) {
				table.totals.points.value = 0;
			} else {
				table.totals.points.innerText = pointsTotal;
			}
		};

		const update = (e) => {
			if (e?.valueAsNumber < 0) {
				e.value = 0;
			}

			// Update all values
			for (const key of categories) {
				const category = table[key];
				const percent = Math.round(
					(category.stuPts.valueAsNumber / (category.maxPts.valueAsNumber || 1)) * 10000,
				) / 100;

				category.percent.innerText = `${ percent }%`;

				category.pts = category.weight.valueAsNumber * (percent / 100);
				category.pts *= 1000;
				category.pts = Math.round(category.pts);
				category.pts /= 1000;

				category.points.innerText = category.pts;
			}

			updateTotals();
		};

		window.onload = () => {
			// Setup all elements
			for (const key in table) {
				const row = table[key];

				// Add input values
				const arr = document.querySelectorAll(`#${ row.short }Row input`);
				row.stuPts = arr[0];
				row.maxPts = arr[1];
				row.weight = arr[2];

				arr.forEach(e => {
					e.value = e.value || 0; // Set values to 0 if there's nothing there already
				});

				// Add percent and points output
				row.percent = document.querySelector(`#${ row.short }Row #percent`);
				row.points = document.querySelector(`#${ row.short }Row #points`);

				// Custom calculated values for background stuff
				row.pts = 0; // Points for each category, same as category points
			}

			// Add the totals row
			table.totals = {
				weight: document.querySelector('#totalRow #weight'),
				points: document.querySelector('#totalRow #points'),
			};

			// Make every input run the 'update' function
			document.querySelectorAll('input')
				.forEach((input) => input.addEventListener('input', update));

			// Update all values when finished loading
			update();
		};
	});

</script>

<main>
    <h1 class="text-center w-100 py-5">Grade Calculator</h1>


    <div class="w-100">
        <table class="grade-table mx-auto">
            <thead>
            <tr id="headerRow">
                <th class="">Category</th>
                <th class="">Student's Points</th>
                <th class="">/ Maximum Points</th>
                <th class="">= Percent</th>
                <th class="">* Category Weight</th>
                <th class="">= Category Points</th>
            </tr>
            </thead>
            <tbody>
            <tr id="dgRow">
                <td class="">DG</td>
                <td class=""><input min="0" type="number"></td>
                <td class=""><input min="0" type="number"></td>
                <td class="" id="percent"></td>
                <td class=""><input min="0" type="number" value="20"></td>
                <td class="" id="points"></td>
            </tr>
            <tr id="asRow">
                <td class="">AS</td>
                <td class=""><input min="0" type="number"></td>
                <td class=""><input min="0" type="number"></td>
                <td class="" id="percent"></td>
                <td class=""><input min="0" type="number" value="40"></td>
                <td class="" id="points"></td>
            </tr>
            <tr id="mgRow">
                <td class="">MG</td>
                <td class=""><input min="0" type="number"></td>
                <td class=""><input min="0" type="number"></td>
                <td class="" id="percent"></td>
                <td class=""><input min="0" type="number" value="40"></td>
                <td class="" id="points"></td>
            </tr>
            <tr id="totalRow">
                <td class="">Totals</td>
                <td class="" colspan="3"></td>
                <td class="" id="weight">100</td>
                <td class="" id="points"></td>
            </tr>
            </tbody>
        </table>
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

    table {
        border-collapse: collapse;
    }

    thead {

        background: linear-gradient(#7E9FBC, #0F4D83);
        padding: 0;
        margin: 0;
    }

    th {
        color: #fff;
        padding: 1em;
        margin: 0;
        border: 1px solid black;
    }

    td {
        border: 1px solid black;
        padding: .2em;
    }

    .grade-table {
        background: white;
        color: black;
    }

    #totalRow {
        font-weight: bold;
    }
</style>
