<script>
	import { page } from '$app/stores';
	import { apiResponse } from '../../stores/apiResponse.svelte';

	const urlParams = $page.url.searchParams;
	const id = urlParams.get('id') ?? '';

	const initialStation = apiResponse.connections[id]?.from.station.name ?? '';
</script>

Start in {initialStation}
