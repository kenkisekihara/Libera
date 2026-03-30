import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

export default async function handler(req: any, res: any) {
  // CORS設定（必要に応じて）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const response = await client.get({
      endpoint: 'articles',
      queries: { limit: 10, orders: "-publishedAt" },
    });
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching articles from microCMS:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}
