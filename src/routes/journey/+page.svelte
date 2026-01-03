<script>
	import { page } from '$app/stores';
	import { apiResponse } from '../../stores/apiResponse.svelte';
	import Time from 'svelte-time';

	import * as Item from '$lib/components/ui/item';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	const urlParams = $page.url.searchParams;
	const id = urlParams.get('id') ?? '';

	const sections = apiResponse.connections[id].sections;

	const getTrainName = (journey) => {
		return journey ? `${journey.category} ${journey.number}` : 'Walk';
	};

	const singleStep = (data, verb = null, preposition, train = null) => ({
		verb,
		preposition,
		platform: data?.platform,
		stationName: data.station.name,
		timestamp: data.departure ?? data.arrival,
		train
	});

	const steps = [
		singleStep(sections[0].departure, 'Departure', 'from', getTrainName(sections[0].journey)),

		...sections
			.slice(1)
			.map((section) =>
				singleStep(section.departure, 'Change', 'in', getTrainName(section.journey))
			),

		singleStep(sections.at(-1).arrival, 'Arrival', 'in')
	];
</script>

{#snippet map(x, y)}
	//
{/snippet}

<div>
	{#each steps as step}
		<Item.Root class="h-svh">
			<Item.Header class="flex flex-col gap-1">
				<div class="text-lg font-semibold text-neutral-500 uppercase">
					{step.verb}
				</div>

				<div class="text-xl">
					{step.preposition}
					{step.stationName}
				</div>
			</Item.Header>

			<Item.Content class="flex flex-col items-center gap-8 text-6xl font-semibold">
				<!--<Badge variant="destructive">{step.train}</Badge>-->
				<div class="flex items-center gap-3">
					<div>
						<Time timestamp={step.timestamp} format="HH:mm" />
					</div>

					<div class="flex flex-col text-3xl">
						<div>
							<Time timestamp={step.timestamp} live relative />
						</div>

						<div>
							{'on time'}
						</div>
					</div>
				</div>

				<div>
					Pl. {step.platform}
				</div>
			</Item.Content>
		</Item.Root>
	{/each}
</div>
