import { createClient } from 'microcms-js-sdk';

export default async function handler(req: any, res: any) {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  if (!serviceDomain || !apiKey) {
    console.error('Missing microCMS environment variables');
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  const client = createClient({
    serviceDomain,
    apiKey,
  });

  // CORS設定
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
  } catch (error: any) {
    console.error('Error fetching articles from microCMS:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch articles' });
  }
}
