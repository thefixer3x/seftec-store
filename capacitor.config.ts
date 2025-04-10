
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0a3e7ae961af4f2caa1b96ad5fddc817',
  appName: 'seftec-store',
  webDir: 'dist',
  server: {
    url: 'https://0a3e7ae9-61af-4f2c-aa1b-96ad5fddc817.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#13293D",
      showSpinner: true,
      spinnerColor: "#006C87",
      splashImmersive: true
    },
    CapacitorHttp: {
      enabled: true
    },
    CapacitorCookies: {
      enabled: true
    }
  },
  ios: {
    contentInset: 'always'
  }
};

export default config;
