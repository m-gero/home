// Vercel Function for File Downloads
// Handles secure file downloads for DEVGERO

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { fileId, type } = req.query;
        
        if (!fileId || !type) {
            return res.status(400).json({ error: 'File ID and type are required' });
        }
        
        // Get file information from database
        const fileInfo = await getFileInfo(fileId, type);
        
        if (!fileInfo) {
            return res.status(404).json({ error: 'File not found' });
        }
        
        // Track download
        await trackDownload(fileId);
        
        // Return file URL for download
        res.status(200).json({
            success: true,
            downloadUrl: fileInfo.url,
            fileName: fileInfo.fileName,
            fileSize: fileInfo.fileSize
        });
        
    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}

async function getFileInfo(fileId, type) {
    // In a real implementation, this would query the database
    // For demo purposes, return mock data
    
    const mockFiles = {
        'calculo-stewart': {
            url: 'https://example.com/files/calculo-stewart.pdf',
            fileName: 'Cálculo - James Stewart.pdf',
            fileSize: 47513600 // 45.2 MB
        },
        'python-crash-course': {
            url: 'https://example.com/files/python-crash-course.pdf',
            fileName: 'Python Crash Course.pdf',
            fileSize: 30097408 // 28.7 MB
        },
        'fisica-halliday': {
            url: 'https://example.com/files/fisica-halliday.pdf',
            fileName: 'Física - Halliday & Resnick.pdf',
            fileSize: 70582272 // 67.3 MB
        }
    };
    
    return mockFiles[fileId] || null;
}

async function trackDownload(fileId) {
    // Track download statistics
    console.log(`Download tracked for file: ${fileId}`);
    
    // In a real implementation, this would update database
    // await updateDownloadCount(fileId);
}
