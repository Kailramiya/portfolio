const fetch = require('undici').fetch;

(async () => {
  try {
    const res = await fetch('https://www.geeksforgeeks.org/user/amankundu/', {
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    console.log('HTML size:', html.length, 'bytes');
    
    // Extract all JSON scripts
    const jsonMatches = html.match(/<script[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/gi);
    if (jsonMatches) {
      console.log('\nFound', jsonMatches.length, 'JSON script tags\n');
      jsonMatches.forEach((match, i) => {
        try {
          const jsonStr = match.match(/>([\s\S]*?)</)[1];
          const json = JSON.parse(jsonStr);
          const keys = Object.keys(json).slice(0, 10).join(', ');
          console.log(`Script ${i}: Type=${typeof json}, Keys=${keys}`);
          
          // Deep search for score/rank fields
          const search = (obj, path = '') => {
            if (!obj || typeof obj !== 'object' || path.length > 100) return [];
            const results = [];
            for (const [key, value] of Object.entries(obj)) {
              const lowerKey = key.toLowerCase();
              if (lowerKey.includes('score') || lowerKey.includes('rank')) {
                results.push(`  ${path}.${key}=${value}`);
              }
              if (typeof value === 'object') {
                results.push(...search(value, path + '.' + key));
              }
            }
            return results;
          };
          const found = search(json);
          if (found.length) {
            console.log('  Found fields:', found.join(', '));
          }
        } catch (e) {
          // console.log(`Script ${i}: Parse error`);
        }
      });
    }
    
    // Look for HTML patterns
    console.log('\n--- HTML Pattern Matches ---');
    const patterns = [
      { name: 'Coding Score', pattern: /coding\s+score[^0-9]*([0-9]{3,5})/gi },
      { name: 'Institute Rank', pattern: /institute\s+rank[^0-9]*([0-9]{2,7})/gi },
      { name: 'Score:', pattern: /score\s*[:=]\s*([0-9]{3,5})/gi },
      { name: 'Rank:', pattern: /rank\s*[:=]\s*([0-9]{2,7})/gi },
    ];
    
    patterns.forEach(p => {
      const matches = html.match(p.pattern);
      if (matches && matches.length) {
        console.log(`${p.name}: ${matches.slice(0, 3).join(', ')}`);
      }
    });
    
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
