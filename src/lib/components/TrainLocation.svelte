<script lang="ts">
	interface Position {
		label: string;
		color: string;
	}

	let { arrivalTimestamp, departureTimestamp } = $props();

	let currentTimestamp = $state(Date.now() / 1000);
	let timeUntilArrival = $derived(arrivalTimestamp - currentTimestamp);
	let isArriving: Boolean = $derived(timeUntilArrival <= 3 * 60 && timeUntilArrival >= 0);
	let isOnPlatform: Boolean = $derived(
		currentTimestamp >= arrivalTimestamp && currentTimestamp <= departureTimestamp
	);
	let isDeparted = $derived(departureTimestamp != null && currentTimestamp > departureTimestamp);
	let currentPosition = $derived.by<Position | undefined>(() => {
		if (isArriving) {
			return positions[0];
		} else if (isOnPlatform) {
			return positions[1];
		} else if (isDeparted) {
			return positions[2];
		} else {
			return positions[3];
		}
	});

	const arriving: Position = { label: 'Arriving', color: 'text-blue-300' };
	const onPlatform: Position = { label: 'On platform', color: 'text-green-300' };
	const departed: Position = { label: 'Departed', color: 'text-red-300' };
	const notArrivedYet: Position = { label: 'Not at station yet', color: 'text-white' };

	const positions = [arriving, onPlatform, departed, notArrivedYet];
</script>

{#if currentPosition}
	<span class={currentPosition.color}>
		{currentPosition.label}
	</span>
{/if}
