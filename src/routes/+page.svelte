<script>
	import ThemeToggler from './ThemeToggler.svelte';
	import DeparturesArrivalsToggle from './DeparturesArrivalsToggle.svelte';
	import Map from './directions-Map.svelte';

	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let result = $state();
	let departureLocation = $state('Aarau, Berufsschule');
	let limit = $state(4);
	let nextBusDeparture = $state();

	let toggleState = $state(0);

	let loaded = $state(false);

	async function fetchResults() {
		loaded = false;
		let response = await fetch(
			`http://transport.opendata.ch/v1/stationboard?station=${departureLocation}&limit=${limit}&type=departure`
		);

		let json = await response.json();
		result = json.stationboard;

		loaded = true;
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter') {
			fetchResults();
		}
	}

	function formatTimestamp(timestamp) {
		if (!timestamp) return 'N/A';
		return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}

	fetchResults();
</script>

<header class="fixed top-4 right-4 sm:top-6 sm:right-6">
	<ThemeToggler />
</header>

<main
	class="flex min-h-screen w-screen flex-col items-start justify-center gap-8 p-4 sm:p-8 lg:flex-row lg:items-center lg:gap-16"
>
	<section
		class="flex h-fit w-full max-w-lg flex-col items-center justify-center gap-6 rounded-xl border bg-card p-6 md:p-10 lg:max-w-sm"
	>
		<h1 class="text-xl font-semibold sm:text-2xl">Departure Board</h1>

		<DeparturesArrivalsToggle {toggleState} />

		<Input
			placeholder="Location"
			class="w-full max-w-xs"
			bind:value={departureLocation}
			onkeydown={handleKeyDown}
		/>

		<div class="flex w-full max-w-xs items-center gap-3">
			<Label for="limitSelector" class="text-base">Limit:</Label>
			<Input type="number" id="limitSelector" bind:value={limit} class="max-w-20"></Input>
		</div>

		<Button class="w-full max-w-xs" onclick={() => fetchResults()}>Show Departures</Button>
	</section>

	<section
		class="flex w-full max-w-lg flex-col items-center justify-center gap-4 p-0 sm:gap-6 sm:p-4"
	>
		{#if loaded}
			{#each result as departure}
				<Alert.Root class="w-full text-sm sm:text-base">
					<Alert.Title
						class="flex flex-col gap-1 text-base sm:flex-row sm:items-center sm:justify-between sm:text-lg"
						><span>
							<Badge variant="outline" class="text-xs sm:text-sm"
								>{departure.category}{departure.number}</Badge
							> to {departure.to}</span
						>
						<span class="text-xs text-muted-foreground sm:text-sm">{departure.operator}</span
						></Alert.Title
					>
					<Alert.Description class="flex items-center justify-between pt-2 text-xs sm:text-sm">
						<span>Platform: {departure.stop.platform || 'N/A'}</span>
						<span class="flex items-center gap-2">
							Departure: {formatTimestamp(departure.stop.departureTimestamp)}
							{#if parseInt(departure.stop.delay) > 0}
								<span class="font-medium text-destructive">+{departure.stop.delay}min</span>
							{/if}
						</span>
					</Alert.Description>
				</Alert.Root>
			{/each}
		{:else}
			{#each Array.from({ length: limit }) as _, i}
				<Alert.Root class="w-full text-sm sm:text-base">
					<Alert.Title class="flex gap-3"><Skeleton class="h-4 w-3/4 rounded-md" /></Alert.Title>
					<Alert.Description class="flex justify-between pt-2">
						<span><Skeleton class="h-3 w-1/4 rounded-md" /></span>
						<span>
							<Skeleton class="h-3 w-1/3 rounded-md" />
						</span>
					</Alert.Description>
				</Alert.Root>
			{/each}
		{/if}
	</section>
</main>
