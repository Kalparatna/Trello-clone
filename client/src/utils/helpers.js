// Generate a unique ID 
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Format date for display 
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Check if a date is overdue 
export const isOverdue = (date) => {
  return new Date(date) < new Date();
};

// Mock user data 
export const mockUsers = [
  { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Alice Brown', avatar: 'https://i.pravatar.cc/150?img=4' },
];

// Mock label colors 
export const labelColors = [
  { id: '1', name: 'Red', color: '#ff4d4f' },
  { id: '2', name: 'Green', color: '#52c41a' },
  { id: '3', name: 'Blue', color: '#1890ff' },
  { id: '4', name: 'Yellow', color: '#faad14' },
  { id: '5', name: 'Purple', color: '#722ed1' },
];

// Mock attachment types 
export const attachmentTypes = {
  image: ['jpg', 'jpeg', 'png', 'gif'],
  document: ['pdf', 'doc', 'docx', 'txt'],
  spreadsheet: ['xls', 'xlsx', 'csv'],
  presentation: ['ppt', 'pptx'],
};

// Get file type icon 
export const getFileTypeIcon = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  
  if (attachmentTypes.image.includes(extension)) {
    return '📷';
  } else if (attachmentTypes.document.includes(extension)) {
    return '📄';
  } else if (attachmentTypes.spreadsheet.includes(extension)) {
    return '📊';
  } else if (attachmentTypes.presentation.includes(extension)) {
    return '📑';
  } else {
    return '📎';
  }
};

// Board backgrounds configuration
export const backgroundConfig = {
  // Color backgrounds
  colors: {
    "light-blue": "#e3f2fd",
    "blue": "#60A5FA",
    "green": "#34D399", 
    "purple": "#9c27b0",
    "pink": "#F472B6"
  },
  // Image backgrounds
  images: {
    "mountain1": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "mountain2": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    "nature": "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80"
  }
};

// Convert background object to consistent format for storage and display
export const normalizeBackground = (background) => {
  if (!background) return { type: 'color', value: backgroundConfig.colors.pink };
  
  if (background.type === 'color') {
    return { type: 'color', value: background.color };
  } else if (background.type === 'image') {
    return { type: 'image', value: background.src };
  }
  
  // If it's already normalized format, return as is
  if (background.value) return background;
  
  // Default fallback
  return { type: 'color', value: backgroundConfig.colors.pink };
};

// Get background style based on normalized background object
export const getBackgroundStyle = (background) => {
  const normalizedBg = normalizeBackground(background);
  
  if (normalizedBg.type === 'color') {
    return {
      style: { backgroundColor: normalizedBg.value },
      className: ""
    };
  } else if (normalizedBg.type === 'image') {
    return {
      style: { backgroundImage: `url(${normalizedBg.value})`, backgroundSize: 'cover', backgroundPosition: 'center' },
      className: ""
    };
  }
  
  // Fallback
  return {
    style: { backgroundColor: backgroundConfig.colors.pink },
    className: ""
  };
};