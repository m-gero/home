// Vercel Function for Content Management
// Handles CRUD operations for videos, books, and materials

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    try {
        const { method } = req;
        const { type, id } = req.query;
        
        switch (method) {
            case 'GET':
                return await handleGet(req, res, type, id);
            case 'POST':
                return await handlePost(req, res, type);
            case 'PUT':
                return await handlePut(req, res, type, id);
            case 'DELETE':
                return await handleDelete(req, res, type, id);
            default:
                return res.status(405).json({ error: 'Method not allowed' });
        }
        
    } catch (error) {
        console.error('Content API error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}

// Get content
async function handleGet(req, res, type, id) {
    if (id) {
        // Get specific item
        const item = await getContentById(type, id);
        if (!item) {
            return res.status(404).json({ error: 'Content not found' });
        }
        return res.status(200).json({ success: true, data: item });
    } else {
        // Get all items of type
        const items = await getContentByType(type);
        return res.status(200).json({ success: true, data: items });
    }
}

// Create content
async function handlePost(req, res, type) {
    // Check admin authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !validateAdminAuth(authHeader)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const contentData = req.body;
    const newItem = await createContent(type, contentData);
    
    return res.status(201).json({ 
        success: true, 
        message: 'Content created successfully',
        data: newItem 
    });
}

// Update content
async function handlePut(req, res, type, id) {
    // Check admin authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !validateAdminAuth(authHeader)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const updateData = req.body;
    const updatedItem = await updateContent(type, id, updateData);
    
    if (!updatedItem) {
        return res.status(404).json({ error: 'Content not found' });
    }
    
    return res.status(200).json({ 
        success: true, 
        message: 'Content updated successfully',
        data: updatedItem 
    });
}

// Delete content
async function handleDelete(req, res, type, id) {
    // Check admin authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !validateAdminAuth(authHeader)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const deleted = await deleteContent(type, id);
    
    if (!deleted) {
        return res.status(404).json({ error: 'Content not found' });
    }
    
    return res.status(200).json({ 
        success: true, 
        message: 'Content deleted successfully' 
    });
}

// Database functions (mock implementation)
async function getContentById(type, id) {
    // Mock data for demonstration
    const mockData = {
        videos: {
            'video-1': {
                id: 'video-1',
                title: 'Cálculo I - Introdução aos Limites',
                description: 'Conceitos fundamentais de limites com exemplos práticos',
                category: 'matematica',
                duration: '15:30',
                views: 234,
                videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
                createdAt: '2024-01-20T10:00:00Z'
            }
        },
        books: {
            'book-1': {
                id: 'book-1',
                title: 'Cálculo - James Stewart',
                description: 'Volume I - 8ª Edição',
                category: 'matematica',
                author: 'James Stewart',
                fileSize: 47513600,
                fileUrl: 'https://example.com/files/calculo-stewart.pdf',
                downloads: 156,
                createdAt: '2024-01-15T09:00:00Z'
            }
        },
        materials: {
            'material-1': {
                id: 'material-1',
                title: 'Resumos de Cálculo I',
                description: 'Resumos completos das principais fórmulas e conceitos',
                category: 'matematica',
                fileType: 'PDF',
                pages: 12,
                fileSize: 2411724,
                fileUrl: 'https://example.com/files/resumos-calculo.pdf',
                downloads: 89,
                createdAt: '2024-01-10T14:00:00Z'
            }
        }
    };
    
    return mockData[type]?.[id] || null;
}

async function getContentByType(type) {
    // Return all content of specified type
    const allContent = await getAllMockContent();
    return allContent[type] || [];
}

async function getAllMockContent() {
    return {
        videos: [
            {
                id: 'video-1',
                title: 'Cálculo I - Introdução aos Limites',
                category: 'matematica',
                duration: '15:30',
                views: 234,
                createdAt: '2024-01-20T10:00:00Z'
            },
            {
                id: 'video-2',
                title: 'Python Básico - Estruturas de Dados',
                category: 'programacao',
                duration: '22:45',
                views: 189,
                createdAt: '2024-01-18T11:00:00Z'
            }
        ],
        books: [
            {
                id: 'book-1',
                title: 'Cálculo - James Stewart',
                category: 'matematica',
                fileSize: 47513600,
                downloads: 156,
                createdAt: '2024-01-15T09:00:00Z'
            },
            {
                id: 'book-2',
                title: 'Python Crash Course',
                category: 'programacao',
                fileSize: 30097408,
                downloads: 123,
                createdAt: '2024-01-12T10:00:00Z'
            }
        ],
        materials: [
            {
                id: 'material-1',
                title: 'Resumos de Cálculo I',
                category: 'matematica',
                fileSize: 2411724,
                downloads: 89,
                createdAt: '2024-01-10T14:00:00Z'
            },
            {
                id: 'material-2',
                title: 'Lista de Exercícios - Python',
                category: 'programacao',
                fileSize: 9123456,
                downloads: 67,
                createdAt: '2024-01-08T16:00:00Z'
            }
        ]
    };
}

async function createContent(type, data) {
    // In real implementation, save to database
    const newItem = {
        id: generateId(),
        ...data,
        createdAt: new Date().toISOString(),
        views: 0,
        downloads: 0
    };
    
    console.log(`Creating ${type}:`, newItem);
    return newItem;
}

async function updateContent(type, id, data) {
    // In real implementation, update in database
    const updatedItem = {
        id,
        ...data,
        updatedAt: new Date().toISOString()
    };
    
    console.log(`Updating ${type} ${id}:`, updatedItem);
    return updatedItem;
}

async function deleteContent(type, id) {
    // In real implementation, delete from database
    console.log(`Deleting ${type} ${id}`);
    return true;
}

function validateAdminAuth(authHeader) {
    const token = authHeader.replace('Bearer ', '');
    return token === 'devgero2024';
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
