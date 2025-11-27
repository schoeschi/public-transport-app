<script>
	import { TrainFront, TrainFrontTunnel } from '@lucide/svelte';

	import { Input } from '$lib/components/ui/input/index.js';
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import * as Alert from '$lib/components/ui/alert/index.js';

	let result = $state();
	let departureLocation = $state('Aarau, Berufsschule');
	let nextBusDeparture = $state();

	let loaded = $state(false);

	async function fetchResults() {
		let response = await fetch(
			`http://transport.opendata.ch/v1/stationboard?station=${departureLocation}&limit=1`
		);

		result = await response.json();

		nextBusDeparture = new Date(
			parseInt(result.stationboard[0].stop.departureTimestamp) * 1000
		).toLocaleTimeString();

		loaded = true;
	}
</script>

<main class="flex flex-col items-center gap-6 p-6">
	<h1 class="text-3xl font-semibold">Departure board for {departureLocation}</h1>

	<ButtonGroup.Root>
		<Button><TrainFront /> Departures</Button>
		<Button variant="secondary" class="cursor-not-allowed"><TrainFrontTunnel /> Arrivals</Button>
	</ButtonGroup.Root>

	<div class="flex flex-col gap-6">
		<Input placeholder="Location" class="w-xs" bind:value={departureLocation}></Input>
	</div>

	<Button onclick={() => fetchResults()}>Call API</Button>

	{#if loaded}
		<Alert.Root class="w-xs">
			<Alert.Title>Next bus departure at {nextBusDeparture}</Alert.Title>
		</Alert.Root>

		<pre class="max-h-200 overflow-y-scroll rounded-xl bg-secondary p-6">{JSON.stringify(
				result,
				null,
				2
			)}</pre>
	{/if}
</main>
