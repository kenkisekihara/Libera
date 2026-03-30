export default function handler(req: any, res: any) {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Vercel API is working!',
    env_check: {
      has_domain: !!process.env.MICROCMS_SERVICE_DOMAIN,
      has_key: !!process.env.MICROCMS_API_KEY
    }
  });
}
