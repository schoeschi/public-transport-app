<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Item from '$lib/components/ui/item/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	import { goto } from '$app/navigation';

	import { userDirections } from '../stores/userDirectionsInput.svelte';

	import { ArrowRight, ArrowDownUp, CircleDot } from '@lucide/svelte';

	function switchOriginDestination() {
		[userDirections.from, userDirections.to] = [userDirections.to, userDirections.from];
	}

	function openConnections(e) {
		e?.preventDefault();

		if (userDirections.from.trim() == '' || userDirections.to.trim() == '') {
			return;
		}

		const urlFrom = encodeURIComponent(userDirections.from);
		const urlTo = encodeURIComponent(userDirections.to);

		goto(`/connections/${urlFrom}/${urlTo}`);
	}
</script>

<form class="flex h-svh flex-1 flex-col justify-end pb-14" onsubmit={openConnections}>
	<Item.Root class="grid grid-cols-[auto_1fr] gap-0 pr-0">
		<div class="flex h-full flex-col items-center justify-center">
			<CircleDot />
			<Separator orientation="vertical" class="flex-[0.3] bg-white" />
			<CircleDot />
		</div>
		<div class="flex flex-col">
			<Item.Root class="border-none pb-0">
				<Item.Content>
					<Input
						id="origin"
						class="rounded-b-none"
						placeholder="Enter origin"
						bind:value={userDirections.from}
						autocomplete="off"
						required
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
					aria-label="Swap origin and destination"
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
						id="destination"
						class="rounded-t-none"
						placeholder="Enter destination"
						bind:value={userDirections.to}
						autocomplete="off"
						required
					/>
				</Item.Content>
			</Item.Root>
		</div>
	</Item.Root>

	<Item.Root>
		<Item.Header>
			<div class="block w-full [view-transition-name:journey-btn]">
				<Button class="w-full" type="submit">
					<ArrowRight /> Start journey
				</Button>
			</div>

			<Button variant="secondary" size="sm">via</Button>
		</Item.Header>
	</Item.Root>
</form>
