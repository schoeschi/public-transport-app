<script>
	import { page } from '$app/stores';
	import { apiResponse } from '../../stores/apiResponse.svelte';
	import Time from 'svelte-time';

	import * as Item from '$lib/components/ui/item';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { RefreshCw } from '@lucide/svelte';
	import TrainLocation from '$lib/components/TrainLocation.svelte';

	const urlParams = $page.url.searchParams;
	const id = urlParams.get('id') ?? '';

	const sections = apiResponse.connections[id].sections;

	const getTrainName = (journey) => {
		return journey ? `${journey.category} ${journey.number}` : 'Walk';
	};

	const singleStep = (data, verb = null, preposition, train = null) => {
		const platformHasChanged = data?.platform?.includes('!') ?? false;
		return {
			verb,
			preposition,
			platformHasChanged,
			platform: platformHasChanged ? data?.platform.replace('!', '') : data?.platform,
			stationName: data.station.name,
			departureTimestamp: data.departureTimestamp,
			arrivalTimestamp: data.arrivalTimestamp,
			relevantTimestamp: data.departure ?? data.arrival,
			train
		};
	};

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

<div class="h-svh snap-y snap-mandatory overflow-y-scroll">
	{#each steps as step}
		<Item.Root class="h-svh snap-start snap-always content-center gap-10">
			<Item.Header class="flex flex-col gap-1">
				<div class="text-lg font-semibold text-neutral-500 uppercase">
					{step.verb}
				</div>

				<div class="text-center text-3xl">
					{step.preposition}
					{step.stationName}
				</div>
			</Item.Header>

			<Item.Content class="flex flex-col items-center gap-3 text-5xl font-semibold">
				<!--<Badge variant="destructive">{step.train}</Badge>-->
				<div class="flex items-center gap-3">
					<div>
						<Time timestamp={step.relevantTimestamp} format="HH:mm" />
					</div>

					<div class="flex flex-col text-xl">
						<div>
							<Time timestamp={step.relevantTimestamp} live={3 * 1000} relative />
						</div>

						<div>on time</div>
					</div>
				</div>

				<div class="flex items-center gap-3">
					{#if step.platform}
						<div class="flex items-center gap-4">
							<span class={step.platformHasChanged ? 'text-red-400' : ''}>
								Pl. {step.platform}
							</span>

							{#if step.platformHasChanged}
								<RefreshCw />
							{/if}
						</div>
					{/if}
					<div class="text-xl">
						<TrainLocation
							arrivalTimestamp={step.arrivalTimestamp}
							departureTimestamp={step.departureTimestamp}
						/>
					</div>
				</div>
			</Item.Content>
		</Item.Root>
	{/each}
</div>

<Item.Root class="fixed bottom-18 mt-5 flex w-screen justify-center p-0">
	<div class="inline-block [view-transition-name:journey-btn]">
		<Button size="sm" href="/connections">back</Button>
	</div>
</Item.Root>
