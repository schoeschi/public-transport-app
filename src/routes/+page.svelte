<script>
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Item from '$lib/components/ui/item/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import JelloBounce from '$lib/components/JelloBounce.svelte';

	import { goto } from '$app/navigation';

	import { userDirections } from '../stores/userDirectionsInput.svelte';

	import { ArrowRight, ArrowDownUp, CircleDot, ClockPlus, Zap } from '@lucide/svelte';

	let suggestions = [
		{
			to: 'Olten'
		},
		{
			to: 'Zürich HB'
		}
	];

	function switchOriginDestination() {
		[userDirections.from, userDirections.to] = [userDirections.to, userDirections.from];
	}

	function openConnections(e) {
		if (e && e.submitter) {
			if (e.submitter.getAttribute('type') !== 'submit') {
				e.preventDefault();
				return;
			}
			e.preventDefault();
		}

		if (!userDirections.from.trim() || !userDirections.to.trim()) {
			return;
		}

		goto(`/connections`);
	}

	function openSuggestion(destination) {
		userDirections.to = destination;
	}

	$effect(() => {
		let now = new Date();
		userDirections.departureTime = now.toLocaleTimeString('en-GB', {
			hour: '2-digit',
			minute: '2-digit'
		});
	});
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

			<Drawer.Root>
				<Drawer.Trigger>
					<Button variant="secondary" size="md" type="button">
						<ClockPlus /> Set time
					</Button>
				</Drawer.Trigger>

				<Drawer.Content>
					<Drawer.Header>
						<Drawer.Title>Select your departure time</Drawer.Title>
						<Drawer.Description class="text-xl">
							Choose your desired time to leave
						</Drawer.Description>

						<Drawer.Description class="flex items-center gap-2 text-3xl">
							<Input type="time" bind:value={userDirections.departureTime} />
						</Drawer.Description>
					</Drawer.Header>

					<Drawer.Footer>
						<Drawer.Close>
							<Button>Save</Button>
						</Drawer.Close>
					</Drawer.Footer>
				</Drawer.Content>
			</Drawer.Root>
		</Item.Header>
	</Item.Root>

	<Item.Root class="absolute right-4 bottom-4 p-0">
		<Drawer.Root>
			<Drawer.Trigger>
				<JelloBounce>
					<Button size="icon-lg"><Zap /></Button>
				</JelloBounce>
			</Drawer.Trigger>

			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>Quick access</Drawer.Title>
				</Drawer.Header>

				<Drawer.Description class="flex min-w-[60vw] flex-col gap-2">
					{#each suggestions as suggestion}
						<Button
							variant="secondary"
							class="w-full"
							type="submit"
							onclick={() => {
								userDirections.to = suggestion.to;
								openConnections();
							}}
						>
							{suggestion.to}
						</Button>
					{/each}
				</Drawer.Description>
			</Drawer.Content>
		</Drawer.Root>
	</Item.Root>
</form>
