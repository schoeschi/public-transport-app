<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Item from '$lib/components/ui/item/index.js';
	import Button from '$lib/components/ui/button/button.svelte';

	import { userDirections } from '../stores/userDirectionsInput.svelte';

	import { ArrowRight } from '@lucide/svelte';

	let originByLocation = $state(true);
	let origin = $state('Aarau, Berufsschule');
	let destination = $state('Aarau, Bahnhof');
</script>

<div class="flex h-screen flex-1 flex-col justify-end pb-14">
	<Item.Root>
		<Item.Header>
			<Label for="origin" class="text-xl">Origin</Label>
		</Item.Header>

		<Item.Content>
			<Input id="origin" placeholder="Enter origin" bind:value={userDirections.from}></Input>
		</Item.Content>
	</Item.Root>

	<Item.Root>
		<Item.Header>
			<Label for="origin" class="text-xl">Destination</Label>
		</Item.Header>

		<Item.Content>
			<Input id="origin" placeholder="Enter destination" bind:value={userDirections.to}></Input>
		</Item.Content>
	</Item.Root>

	<Item.Root>
		<Item.Header>
			<Button class="flex-1" href="/journey/{origin}/{destination}"
				><ArrowRight />Start journey</Button
			>
			<Button variant="secondary" size="sm">via</Button>
		</Item.Header>
	</Item.Root>
</div>
