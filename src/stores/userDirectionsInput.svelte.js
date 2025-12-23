import { Geolocation } from '@capacitor/geolocation';

async function getCityName() {
	try {
		const coordinates = await Geolocation.getCurrentPosition({
			enableHighAccuracy: true,
			timeout: 10000
		});
		const { latitude, longitude } = coordinates.coords;

		const apiURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

		const response = await fetch(apiURL);
		const data = await response.json();

		return data.locality;
	} catch (error) {
		return 'Location access denied';
	}
}

export const userDirections = $state({
	from: '',
	to: '',
	departureTime: '',
	location: 'Getting location'
});

getCityName().then((cityName) => {
	userDirections.from = cityName;
	userDirections.location = cityName;
});
