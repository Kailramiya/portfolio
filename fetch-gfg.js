// Quick test to fetch GFG HTML and save a sample
const http = require('http');
const https = require('https');

const url = 'https://www.geeksforgeeks.org/user/amankundu/';

https.get(url, { 
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  timeout: 5000
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Save sample
    require('fs').writeFileSync('gfg_sample.html', data.substring(0, 50000));
    console.log('Sample saved (50KB), total size:', data.length);
    
    // Search for patterns
    console.log('\n=== Pattern Search ===');
    
    // Look for any numbers near score/rank text
    const scorePatterns = data.match(/score[^<]{0,100}/gi);
    if (scorePatterns) console.log('Score lines:', scorePatterns.slice(0, 3).join('\n  '));
    
    const rankPatterns = data.match(/rank[^<]{0,100}/gi);
    if (rankPatterns) console.log('Rank lines:', rankPatterns.slice(0, 3).join('\n  '));
    
    // Check for data attributes
    const dataAttrs = data.match(/data-[a-z]+="[^"]*(?:score|rank)[^"]*"/gi);
    if (dataAttrs) console.log('Data attrs:', dataAttrs.slice(0, 3));
    
    // Check for span/div with specific classes
    const classes = data.match(/class="[^"]*(?:score|rank|stats)[^"]*"/gi);
    if (classes) console.log('Classes:', classes.slice(0, 3));
  });
}).on('error', (e) => {
  console.error('Error:', e.message);
});
