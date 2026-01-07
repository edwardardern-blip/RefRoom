import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { title, url, subject, description, username } = req.body;
    
    // For now, use a dummy UUID - we'll create proper users later
    const dummyUserId = '00000000-0000-0000-0000-000000000000';
    
    const { data, error } = await supabase
      .from('references')
      .insert({
        title,
        url,
        subject,
        description,
        added_by: dummyUserId,
        upvotes: 0,
        downvotes: 0,
        verified: false
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Add username to response
    data.added_by_username = username;
    
    res.status(200).json({ data });
  } catch (error) {
    console.error('Add error:', error);
    res.status(500).json({ error: error.message });
  }
}