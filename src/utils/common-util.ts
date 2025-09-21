import { getShippingRate } from '../constants';

// Calculate shipping cost
export const calculateShippingCost = (weight: any, country: any) => {
  
  return (weight * getShippingRate(country)).toFixed(2);
};

// Convert hex color to RGB format
export const hexToRgb = (hex: any) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `(${r}, ${g}, ${b})`;
  }
  return '(0, 0, 0)';
};