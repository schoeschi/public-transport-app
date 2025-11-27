<script>
	import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
	import '@maptiler/sdk/dist/maptiler-sdk.css';
	import polyline from '@mapbox/polyline';

	import { Toaster, toast } from 'svelte-sonner';

	let map;
	let mapContainer;

	config.apiKey = 'sLc4ldOHYBX3Rjawy99L';

	const MAPTILER_STYLE_URL = MapStyle.STREETS;
	const DIRECTIONS_API_URL =
		'https://corsproxy.io/?url=https://maps.googleapis.com/maps/api/directions/json?origin=47.399,8.05598&destination=47.391579694240775,8.05138092567529&key=AIzaSyDzNNDTxwtufhcuaka0eXliuabJb2cEHoA&mode=transit';

	async function fetchAndConvertDirections() {
		try {
			const response = await fetch(DIRECTIONS_API_URL);
			if (!response.ok) {
				throw new Error();
			}
			const data = await response.json();
			const durationText = data.routes[0].legs[0].duration.text;
			const encodedPolyline = data.routes[0].overview_polyline.points;
			const lineString = polyline.toGeoJSON(encodedPolyline);

			toast(durationText);

			return {
				geoJson: {
					type: 'FeatureCollection',
					features: [
						{
							type: 'Feature',
							geometry: lineString,
							properties: {}
						}
					]
				},
				duration: durationText
			};
		} catch (error) {
			return null;
		}
	}

	$effect(() => {
		const origin = [8.05598, 47.399];
		const destination = [8, 47];
		const initialState = { lng: origin[0], lat: origin[1], zoom: 17 };

		map = new Map({
			container: mapContainer,
			style: MAPTILER_STYLE_URL,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});

		new Marker({ color: '#FF0000' }).setLngLat(origin).addTo(map);
		new Marker({ color: '#0000FF' }).setLngLat(destination).addTo(map);

		map.on('load', async () => {
			const routeData = await fetchAndConvertDirections();

			if (routeData) {
				map.addSource('directions', {
					type: 'geojson',
					data: routeData.geoJson
				});

				map.addLayer({
					id: 'route-line',
					type: 'line',
					source: 'directions',
					layout: {
						'line-join': 'round',
						'line-cap': 'round'
					},
					paint: {
						'line-color': '#00BFFF',
						'line-width': 6,
						'line-opacity': 0.8
					}
				});

				const bounds = new Map.LngLatBounds();
				routeData.geoJson.features[0].geometry.coordinates.forEach((coord) => {
					bounds.extend(coord);
				});
				map.fitBounds(bounds, { padding: 50 });
			}
		});

		return () => {
			map.remove();
		};
	});
</script>

<div class="h-screen" bind:this={mapContainer}></div>
