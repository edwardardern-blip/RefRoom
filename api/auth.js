import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, email, password, username } = req.body;
    
    if (action === 'signup') {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0]
          }
        }
      });
      
      if (authError) {
        console.error('Auth signup error:', authError);
        throw authError;
      }
      
      if (authData.user) {
        console.log('User created:', authData.user.id);
        
        // Create profile - use upsert to avoid conflicts
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            username: username || email.split('@')[0],
            email: email,
            reputation: 0
          }, {
            onConflict: 'id'
          })
          .select()
          .single();
        
        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Continue anyway - profile might already exist
        }
        
        const profile = profileData || {
          id: authData.user.id,
          username: username || email.split('@')[0],
          email: email,
          reputation: 0
        };
        
        res.status(200).json({ 
          user: authData.user,
          profile: profile
        });
      } else {
        throw new Error('User creation failed');
      }
      
    } else if (action === 'login') {
      // Login
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (authError) {
        console.error('Auth login error:', authError);
        throw authError;
      }
      
      // Get or create profile
      let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();
      
      if (!profile) {
        console.log('Profile not found, creating...');
        const { data: newProfile } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            username: email.split('@')[0],
            email: email,
            reputation: 0
          }, {
            onConflict: 'id'
          })
          .select()
          .single();
        
        profile = newProfile || {
          id: authData.user.id,
          username: email.split('@')[0],
          email: email,
          reputation: 0
        };
      }
      
      res.status(200).json({ 
        user: authData.user, 
        profile: profile 
      });
      
    } else {
      res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Auth handler error:', error);
    res.status(500).json({ error: error.message });
  }
}
