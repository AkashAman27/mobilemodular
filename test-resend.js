const https = require('https');
const fs = require('fs');

// Read API key from .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const apiKeyMatch = envFile.match(/RESEND_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

if (!apiKey) {
  console.log('❌ API key not found in .env.local');
  process.exit(1);
}

console.log('🔑 API Key found:', apiKey.substring(0, 10) + '...');

const data = JSON.stringify({
  from: 'onboarding@resend.dev',
  to: ['akashaman0426@gmail.com'],
  subject: 'Test Email - Quote System Working',
  html: '<h1>✅ Success!</h1><p>Your Resend API is working correctly. Quote submissions will now send emails properly.</p>'
});

const options = {
  hostname: 'api.resend.com',
  port: 443,
  path: '/emails',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    console.log('Response:', responseData);
    
    if (res.statusCode === 200) {
      console.log('✅ Email sent successfully!');
    } else {
      console.log('❌ Email failed to send');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error);
});

req.write(data);
req.end();