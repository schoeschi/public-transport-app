<script>
	import testdata from '$lib/assets/testdata.js';
	import { apiResponse } from '../../stores/apiResponse.svelte';
	import { userDirections } from '../../stores/userDirectionsInput.svelte';
	import { goto } from '$app/navigation';

	import * as Item from '$lib/components/ui/item/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import ConnectionCardSkeleton from '$lib/components/ConnectionCardSkeleton.svelte';

	let origin = $state('');
	let destination = $state('');
	let amountOfJourneys = $state(4);
	let connections = $state([]);
	let loading = $state(true);

	let tempDeparture = $state();
	let tempArrival = $state();

	let requestURL = 'https://transport.opendata.ch/v1/connections';

	async function fetchConnections() {
		let urlWithParams = `${requestURL}?from=${origin}&to=${destination}&limit=${amountOfJourneys}&time=${userDirections.departureTime}`;
		let response = await fetch(urlWithParams);
		let data = await response.json();
		Object.assign(apiResponse, data);

		connections = apiResponse.connections;

		loading = false;
	}

	$effect(() => {
		origin = userDirections.from;
		destination = userDirections.to;

		fetchConnections();

		window.scrollTo(0, document.body.scrollHeight);
	});

	function unixAsTime(unixTimestamp) {
		var date = new Date(unixTimestamp * 1000);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}

	function isNumeric(value) {
		return /^-?\d+$/.test(value);
	}

	const convertTime = (t) => {
		const match = t.match(/^(\d+)d(\d+):(\d+):(\d+)$/);
		if (!match) return 'Invalid Format';

		const [, d, h, m] = match.map(Number);
		const totalMinutes = d * 1440 + h * 60 + m;

		const resultHours = Math.floor(totalMinutes / 60);
		const resultMinutes = totalMinutes % 60;

		return `${resultHours > 0 ? `${resultHours}h ` : ''}${resultMinutes}min`;
	};

	const openJourney = (id) => {
		goto(`/journey?id=${id}`);
	};
</script>

<Item.Root
	class="flex min-h-screen w-screen flex-1 flex-col flex-nowrap justify-end overflow-x-hidden"
>
	{#if !loading}
		{#each connections as connection, i}
			{@const transfers = connection.transfers}
			{@const initialTrain = connection?.products[0]}
			{@const initialTrainDirection = connection?.sections[0]?.journey?.to ?? ''}
			{@const initialPlatform = connection?.from?.platform}

			{@const departureTime = unixAsTime(connection?.from?.departureTimestamp)}
			{@const arrivalTime = unixAsTime(connection?.to?.arrivalTimestamp)}
			{@const duration = convertTime(connection?.duration)}

			{@const arrivalDelay = connection.to?.delay}
			{@const hasDelay = parseInt(arrivalDelay) >= 3}
			{@const hasPlatform = isNumeric(initialPlatform)}

			<Card.Root
				class="w-full"
				onclick={() => {
					openJourney(i);
				}}
			>
				<Card.Header>
					<Card.Text class="flex text-lg">
						<div class="flex items-center gap-2">
							{#if initialTrain}
								<Badge variant="destructive">{initialTrain}</Badge>
								<span>
									to <span class="font-bold">{initialTrainDirection}</span>
								</span>
							{:else}
								<Badge>Walk</Badge>
							{/if}
						</div>

						{#if hasPlatform}
							<span class="shrink-0 font-bold break-keep">Pl. {initialPlatform}</span>
						{/if}
					</Card.Text>
				</Card.Header>

				<Card.Content class="flex items-center gap-5">
					<span class="text-2xl font-medium">
						{departureTime}
					</span>

					<Card.Text class="text-lg">
						<Separator class="flex-1" />
						{#if transfers == 1}
							{transfers} change
						{:else if transfers == 0}
							direct
						{:else}
							{transfers} changes
						{/if}
						<Separator class="flex-1" />
					</Card.Text>

					<span class="text-2xl font-medium">
						{#if !hasDelay}
							<span class="text-green-500">
								{arrivalTime}
							</span>
						{:else}
							<span class="text-red-500">
								{arrivalTime}
							</span>
						{/if}
					</span>
				</Card.Content>

				<Card.Footer>
					<Card.Text class="text-lg">
						<div></div>
						<div>
							{#if !arrivalDelay}
								<span>
									{duration}
								</span>
							{:else}
								{duration}
								<span class="text-red-500">+{arrivalDelay}min</span>
							{/if}
						</div>
					</Card.Text>
				</Card.Footer>
			</Card.Root>
		{/each}
	{:else}
		{#each new Array(amountOfJourneys) as i}
			<ConnectionCardSkeleton />
		{/each}
	{/if}
</Item.Root>

<Item.Root class="sticky bottom-0 mt-5 flex w-screen justify-center p-0 pb-18">
	<div class="inline-block [view-transition-name:journey-btn]">
		<Button size="sm" href="/">back</Button>
	</div>
</Item.Root>
