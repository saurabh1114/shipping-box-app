import React, { useState } from 'react';
import { SHIPPING_RATES } from '../constants';
import { hexToRgb, calculateShippingCost } from '../utils/common-util';
import { saveBox } from '../services/storageService';

import '../styles/addBoxForm.scss'

const BoxForm: React.FC<any> = ({ onSave }) => {
  const [formData, setFormData] = useState({
    receiverName: '',
    weight: 0,
    boxColor: '#000000',
    destinationCountry: ''
  });
  
  const [errors, setErrors] = useState< any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    
    // Handle negative weight
    if (name === 'weight' && parseFloat(value) < 0) {
      setFormData(prev => ({ ...prev, [name]: '0' }));
      setErrors((prev: any) => ({ ...prev, [name]: 'Negative values not allowed. Set to 0.' }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.receiverName.trim()) {
      newErrors.receiverName = 'Receiver name is required.';
    }
    
    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = 'Weight must be greater than 0.';
    }
    
    if (!formData.boxColor) {
      newErrors.boxColor = 'Box color is required/';
    }
    
    if (!formData.destinationCountry) {
      newErrors.destinationCountry = 'Destination country is required.';
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const boxToSave = {
        receiverName: formData.receiverName.trim(),
        weight: formData.weight,
        boxColor: hexToRgb(formData.boxColor),
        boxColorHex: formData.boxColor,
        destinationCountry: formData.destinationCountry,
        shippingCost: calculateShippingCost(formData.weight, formData.destinationCountry)
      };
      
      saveBox(boxToSave);
      // notify parent (if provided) so it can refresh list / navigate
      if (onSave) onSave();
      
      // Reset form
      setFormData({
        receiverName: '',
        weight: 0,
        boxColor: '#000000',
        destinationCountry: ''
      });
      setErrors({});
      
      alert('Box saved successfully!');
      onSave?.();
      
    } catch (error) {
      console.error('Error saving box:', error);
    //   alert('Failed to save box. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h2 className="form-title">Add New Shipping Box</h2>

        <form onSubmit={handleSubmit}>
          {/* Receiver Name */}
          <div className="form-group">
            <label>Receiver Name *</label>
            <input
              type="text"
              name="receiverName"
              value={formData.receiverName}
              onChange={handleChange}
              className={errors.receiverName ? "input error" : "input"}
              placeholder="Enter receiver name"
            />
            {errors.receiverName && (
              <small className="error-text">{errors.receiverName}</small>
            )}
          </div>

          {/* Weight */}
          <div className="form-group">
            <label>Weight (kg) *</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={errors.weight ? "input error" : "input"}
              placeholder="Enter weight in kg"
            />
            {errors.weight && (
              <small className="error-text">{errors.weight}</small>
            )}
          </div>

          {/* Box Color */}
          <div className="form-group">
            <label>Box Color *</label>
            <div className="color-picker-container">
              <input
                type="color"
                name="boxColor"
                value={formData.boxColor}
                onChange={handleChange}
                className="color-picker"
              />
              <input
                type="text"
                value={formData.boxColor}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, boxColor: e.target.value }))
                }
                className="input"
                placeholder="#000000"
              />
              <div
                className="color-preview"
                style={{ backgroundColor: formData.boxColor }}
                title={`RGB: ${hexToRgb(formData.boxColor)}`}
              />
            </div>
            <p className="hint-text">RGB: {hexToRgb(formData.boxColor)}</p>
            {errors.boxColor && (
              <small className="error-text">{errors.boxColor}</small>
            )}
          </div>

          {/* Destination Country */}
          <div className="form-group">
            <label>Destination Country *</label>
            <select
              name="destinationCountry"
              value={formData.destinationCountry}
              onChange={handleChange}
              className={errors.destinationCountry ? "input error" : "input"}
            >
              <option value="">Select destination country</option>
              {Object.entries(SHIPPING_RATES).map(([country, rate]) => (
                <option key={country} value={country}>
                  {country} (INR {rate} per kg)
                </option>
              ))}
            </select>
            {errors.destinationCountry && (
              <small className="error-text">{errors.destinationCountry}</small>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-btn ${isSubmitting ? "disabled" : ""}`}
          >
            {isSubmitting ? "Saving..." : "Save Box"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoxForm;