// Vercel Function for Admin Authentication
// Handles admin login for DEVGERO

export default async function handler(req, res) {
    // Set CORS headers
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
        const { password } = req.body;
        
        // Simple password check
        // In production, use proper hashing and JWT
        if (password === 'devgero2024') {
            res.status(200).json({
                success: true,
                token: 'devgero2024',
                message: 'Authentication successful'
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }
        
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
