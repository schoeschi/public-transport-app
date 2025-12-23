# Pubilic Transport App

This repository holds a public transport web-app for Switzerland made in Svelte using the Public Transport OpenData API.

The main idea of this app vs. the SBB app is optimization for the thumb zone.

## How to get your android app
### Prerequisites
You have to have Android Studio installed.

### Installation
First, install all the dependencies with `npm install`.

After making sure that capacitor is installed, run `npx cap add android`. After building the project using `npm run build`, you can sync it with the app using `npx cap sync`.

Finally, run `npx cap open android` and install the app on your device using Android Studio.