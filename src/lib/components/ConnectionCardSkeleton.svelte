<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
</script>

<Card.Root class="w-full">
	<Card.Header>
		<Card.Text class="text-lg">
			<div class="flex items-center gap-2">
				<Skeleton class="h-6 w-10" />
				<span>
					<Skeleton class="h-6 w-32" />
				</span>
			</div>

			<span class="font-bold"><Skeleton class="h-6 w-18" /></span>
		</Card.Text>
	</Card.Header>

	<Card.Content class="flex items-center gap-5">
		<span class="text-3xl font-medium">
			<Skeleton class="h-12 w-24" />
		</span>

		<Card.Text class="text-lg">
			<Separator class="flex-1" />
			<Skeleton class="h-8 w-16" />
			<Separator class="flex-1" />
		</Card.Text>

		<span class="text-3xl font-medium">
			<Skeleton class="h-12 w-24" />
		</span>
	</Card.Content>

	<Card.Footer>
		<Card.Text class="text-lg">
			<div></div>
			<div>
				<span><Skeleton class="h-6 w-12" /></span>
			</div>
		</Card.Text>
	</Card.Footer>
</Card.Root>
