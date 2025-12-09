<script lang="ts">
	import { page } from '$app/state';

	let origin = $state('');
	let destination = $state('');

	$effect(() => {
		origin = page.params.from!;
		destination = page.params.to!;
	});
</script>

<div class="flex h-screen flex-1 flex-col justify-end gap-3 pb-14">
	<h1 class="text-3xl">From: {origin}</h1>
	<h1 class="text-3xl">To: {destination}</h1>
</div>
