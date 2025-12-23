<script>
	import { page } from '$app/stores';
	import { apiResponse } from '../../stores/apiResponse.svelte';
	import dateFormat, { masks } from 'dateformat';

	import * as Item from '$lib/components/ui/item';

	const urlParams = $page.url.searchParams;
	const id = urlParams.get('id') ?? '';

	const sections = apiResponse.connections[id].sections;

	const singleStep = (data, verb) => ({
		verb,
		platform: data.platform,
		stationName: data.station.name,
		timestamp: data.departure ?? data.arrival
	});

	const steps = [
		singleStep(sections[0].departure, 'Start in'),

		...sections.slice(1).map((section) => singleStep(section.departure, 'Change in')),

		singleStep(sections.at(-1).arrival, 'Arrive in')
	];
</script>

{#snippet map(x, y)}
	//
{/snippet}

{#each steps as step}
	<Item.Root>
		<Item.Header>
			{dateFormat(step.timestamp, 'HH:MM')}, Pl. {step.platform}
		</Item.Header>
		<Item.Content>
			{step.verb}
			{step.stationName}
		</Item.Content>
	</Item.Root>
{/each}
