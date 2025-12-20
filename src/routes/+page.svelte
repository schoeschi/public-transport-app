<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Item from '$lib/components/ui/item/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	import { userDirections } from '../stores/userDirectionsInput.svelte';

	import { ArrowRight, ArrowDownUp } from '@lucide/svelte';

	let originByLocation = $state(true);

	function switchOriginDestination() {
		[userDirections.from, userDirections.to] = [userDirections.to, userDirections.from];
	}
</script>

<div class="flex h-screen flex-1 flex-col justify-end pb-14">
	<Item.Root class="border-none pb-0">
		<Item.Content>
			<Input
				id="origin"
				class="rounded-b-none"
				placeholder="Enter origin"
				bind:value={userDirections.from}
				autocomplete="off"
			/>
		</Item.Content>
	</Item.Root>

	<Item.Root class="z-20 -my-5 flex w-full gap-0 border-none py-0">
		<Item.Content>
			<Separator />
		</Item.Content>

		<Button
			variant="secondary"
			class="aspect-square bg-input/30"
			onclick={switchOriginDestination}
			size="icon-lg"
		>
			<ArrowDownUp size={6} />
		</Button>

		<Item.Content class="flex-[0.05]">
			<Separator class="w-2" />
		</Item.Content>
	</Item.Root>

	<Item.Root class="border-none pt-0">
		<Item.Content>
			<Input
				id="origin"
				class="rounded-t-none"
				placeholder="Enter destination"
				bind:value={userDirections.to}
				autocomplete="off"
			/>
		</Item.Content>
	</Item.Root>

	<Item.Root>
		<Item.Header>
			<div class="block w-full [view-transition-name:journey-btn]">
				<Button class="w-full" href="/connections/{userDirections.from}/{userDirections.to}">
					<ArrowRight /> Start journey
				</Button>
			</div>

			<Button variant="secondary" size="sm">via</Button>
		</Item.Header>
	</Item.Root>
</div>
