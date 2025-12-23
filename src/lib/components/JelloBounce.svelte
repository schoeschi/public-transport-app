<script>
	let { children } = $props();

	import { spring } from 'svelte/motion';

	let coords = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.25 });

	function handleMove(e) {
		if (e.buttons !== 1) return;
		coords.update((c) => ({ x: c.x + e.movementX * 0.8, y: c.y + e.movementY * 0.8 }));
	}
</script>

<div
	onpointermove={handleMove}
	onpointerup={() => coords.set({ x: 0, y: 0 })}
	onpointerleave={() => coords.set({ x: 0, y: 0 })}
	style:transform="translate({$coords.x}px, {$coords.y}px)"
	style:touch-action="none"
	class="cursor-grab active:cursor-grabbing"
>
	{@render children()}
</div>
