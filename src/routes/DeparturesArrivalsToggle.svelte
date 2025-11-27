<script>
	import * as ButtonGroup from '$lib/components/ui/button-group/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { TrainFront, TrainFrontTunnel } from '@lucide/svelte';
</script>

<ButtonGroup.Root class="w-xs">
	<Button class="flex-1"><TrainFront /> Departures</Button>
	<Button variant="secondary" class="flex-1 cursor-not-allowed"
		><TrainFrontTunnel /> Arrivals</Button
	>
</ButtonGroup.Root>
