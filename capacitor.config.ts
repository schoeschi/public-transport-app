import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'public-transport-app',
  webDir: 'dist',
  server: {
    // This points the app to your Vite server immediately on launch
    url: 'http://192.168.1.118:5173', 
    cleartext: true,
    androidScheme: 'http'
  }
};

export default config;
