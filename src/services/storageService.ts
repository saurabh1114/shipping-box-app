const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY || 'shippingBoxes';

// Get all boxes from localStorage
export const getBoxes = () => {
  try {
    const boxes = localStorage.getItem(STORAGE_KEY);
    return boxes ? JSON.parse(boxes) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Save a box to localStorage
export const saveBox = (box: any) => {
  try {
    const boxes = getBoxes();
    const newBox = {
      ...box,
      id: Date.now(), // Simple ID generation
      createdAt: new Date().toISOString()
    };
    boxes.push(newBox);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boxes));
    return newBox;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    throw new Error('Failed to save box');
  }
};