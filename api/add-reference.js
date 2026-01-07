import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, url, subject, description, userId } = req.body;
    
    // Verify the user exists in profiles table
    const { data: userProfile, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
    
    if (userError || !userProfile) {
      return res.status(403).json({ error: 'User not found. Please login again.' });
    }
    
    // Insert the reference using service role to bypass RLS temporarily
    const { data, error } = await supabase
      .from('references')
      .insert({
        title,
        url,
        subject,
        description,
        added_by: userId,
        upvotes: 0,
        downvotes: 0,
        verified: false
      })
      .select(`
        *,
        profiles:added_by (username)
      `)
      .single();
    
    if (error) {
      console.error('Insert error:', error);
      throw error;
    }
    
    res.status(200).json({ data });
  } catch (error) {
    console.error('Add reference error:', error);
    res.status(500).json({ error: error.message });
  }
}
