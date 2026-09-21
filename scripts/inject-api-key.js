const fs = require('fs');
const dotenv = require('dotenv');

try {
  // Load .env file
  const envFile = fs.readFileSync('.env');
  const envConfig = dotenv.parse(envFile);
  const apiKey = envConfig.GOOGLE_MAPS_API_KEY || '';

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
