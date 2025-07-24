// Vercel Function for File Upload
// Handles video and PDF uploads for DEVGERO admin

const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
    // Set CORS headers
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
        // Check admin authentication
        const authHeader = req.headers.authorization;
        if (!authHeader || !validateAdminAuth(authHeader)) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        
        // Parse form data
        const form = formidable({
            maxFileSize: 100 * 1024 * 1024, // 100MB limit
            keepExtensions: true,
            multiples: false
        });
        
        const [fields, files] = await form.parse(req);
        
        const title = fields.title?.[0];
        const description = fields.description?.[0];
        const category = fields.category?.[0];
        const videoUrl = fields.videoUrl?.[0];
        const file = files.file?.[0];
        
        // Validate required fields
        if (!title || !category) {
            return res.status(400).json({ error: 'Title and category are required' });
        }
        
        let uploadResult = null;
        
        // Handle file upload if present
        if (file) {
            uploadResult = await handleFileUpload(file);
        }
        
        // Create content entry
        const contentData = {
            id: generateId(),
            title,
            description: description || '',
            category,
            videoUrl: videoUrl || null,
            fileUrl: uploadResult?.url || null,
            fileName: uploadResult?.fileName || null,
            fileSize: uploadResult?.fileSize || null,
            fileType: uploadResult?.fileType || null,
            createdAt: new Date().toISOString(),
            views: 0
        };
        
        // In a real implementation, this would save to a database
        // For demo purposes, we'll simulate success
        await saveContentToDatabase(contentData);
        
        res.status(200).json({
            success: true,
            message: 'Content uploaded successfully',
            data: contentData
        });
        
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}

function validateAdminAuth(authHeader) {
    // Simple token validation
    // In production, use proper JWT validation
    const token = authHeader.replace('Bearer ', '');
    return token === 'devgero2024';
}

async function handleFileUpload(file) {
    // In a real implementation, this would upload to cloud storage
    // For demo purposes, we'll simulate the upload
    
    const allowedTypes = {
        'video/mp4': 'mp4',
        'video/avi': 'avi',
        'video/mov': 'mov',
        'application/pdf': 'pdf'
    };
    
    if (!allowedTypes[file.mimetype]) {
        throw new Error('File type not allowed');
    }
    
    // Simulate cloud upload
    const fileName = `${Date.now()}_${file.originalFilename}`;
    const fileUrl = `https://devgero-storage.vercel.app/uploads/${fileName}`;
    
    return {
        url: fileUrl,
        fileName: file.originalFilename,
        fileSize: file.size,
        fileType: file.mimetype
    };
}

async function saveContentToDatabase(contentData) {
    // In a real implementation, this would save to MongoDB, PostgreSQL, etc.
    // For demo purposes, we'll simulate database save
    
    console.log('Saving content to database:', contentData);
    
    // Simulate async database operation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return contentData;
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
