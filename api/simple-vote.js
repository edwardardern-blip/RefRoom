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
    const { referenceId, direction } = req.body;
    
    const { data: ref } = await supabase
      .from('references')
      .select('upvotes, downvotes')
      .eq('id', referenceId)
      .single();
    
    if (!ref) {
      return res.status(404).json({ error: 'Reference not found' });
    }
    
    const field = direction > 0 ? 'upvotes' : 'downvotes';
    const newValue = ref[field] + 1;
    
    const { error } = await supabase
      .from('references')
      .update({ [field]: newValue })
      .eq('id', referenceId);
    
    if (error) throw error;
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Vote error:', error);
    res.status(500).json({ error: error.message });
  }
}