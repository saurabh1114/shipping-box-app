// Shipping rates per kilogram in INR with proper typing
export const SHIPPING_RATES = {
    'Sweden': parseFloat(import.meta.env.VITE_SWEDEN_RATE) || 7.35,
    'China': parseFloat(import.meta.env.VITE_CHINA_RATE) || 11.53,
    'Brazil': parseFloat(import.meta.env.VITE_BRAZIL_RATE) || 15.63,
    'Australia': parseFloat(import.meta.env.VITE_AUSTRALIA_RATE) || 50.09,
  };
  
  // Define a type for the keys of SHIPPING_RATES
  type Country = keyof typeof SHIPPING_RATES;
  
  
  // Helper function to get shipping rate safely
  export const getShippingRate = (country: Country): number => {
    return SHIPPING_RATES[country];
  };