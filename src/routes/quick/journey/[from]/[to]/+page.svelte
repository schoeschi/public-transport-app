<script>
	import { page } from '$app/state';

	import data from './testdata.js';

	import * as Item from '$lib/components/ui/item/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	let origin = $state('');
	let destination = $state('');

	let requestURL = 'http://transport.opendata.ch/v1/connections';

	let connections = $state();

	/*$effect(
		async
		() => {
			origin = page.params.from ?? '';
			destination = page.params.to ?? '';

			let urlWithParams = `${requestURL}?from=${origin}&to=${destination}&limit=2`;
			let response = await fetch(urlWithParams);
			let data = await response.json();
		}
	);*/

	connections = data?.connections ?? [];
</script>

<div class="flex h-screen flex-1 flex-col justify-end gap-3 pb-14">
	{#each connections as connection}
		{@const changeCount = (connection[0]?.products.length ?? 1) - 1}
		{@const initialTrain = connection?.products[0] ?? 'Walk'}
		{@const initialTrainDirection = connection.sections[0].journey.to}
		{@const initalPlatform = connection?.from.platform}

		<Card.Root>
			<Card.Header>
				<Card.Text>
					<div class="flex items-center gap-2">
						<Badge variant="destructive">{initialTrain}</Badge>
						<span>
							Direction <span class="font-bold">{initialTrainDirection}</span>
						</span>
					</div>

					<span class="font-bold">Pl. {initalPlatform}</span>
				</Card.Text>
			</Card.Header>

			<Card.Content>
				<Separator class="flex-1" />
				Change {changeCount} times
				<Separator class="flex-1" />

				{connection.from.departureTimestamp} - {connection.to.arrivalTimestamp}
			</Card.Content>

			<Card.Footer>
				<Card.Text>
					<div>Peak times</div>
					<div>39min</div>
				</Card.Text>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
