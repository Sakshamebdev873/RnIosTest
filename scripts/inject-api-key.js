const fs = require('fs');
const dotenv = require('dotenv');

try {
  // Load .env file
  const envFile = fs.readFileSync('.env');
  const envConfig = dotenv.parse(envFile);
  const apiKey = (envConfig.GOOGLE_MAPS_API_KEY || '').trim();

  // An empty key makes the Google Maps SDK throw on first MapView render,
  // so the app crashes on launch. Fail the build instead.
  if (!apiKey) {
    throw new Error('GOOGLE_MAPS_API_KEY is empty. Set it in .env (local) or as a GitHub Actions secret (CI).');
  }

  // Update AppDelegate.swift
  const appDelegatePath = 'ios/RnIosTest/AppDelegate.swift';
  let appDelegate = fs.readFileSync(appDelegatePath, 'utf8');

  // Replace the API key line securely
  appDelegate = appDelegate.replace(/let apiKey = .*/, `let apiKey = "${apiKey}"`);
  fs.writeFileSync(appDelegatePath, appDelegate);
  
  console.log('✅ Successfully injected API key from .env into AppDelegate.swift');
} catch (error) {
  console.error('❌ Failed to inject API key:', error.message);
  process.exit(1);
}
