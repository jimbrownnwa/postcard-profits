import React, { useState } from 'react'
import { calculateProfit } from '../utils/calculateProfit'
import './CalculatorForm.css'

export default function CalculatorForm() {
  const [formData, setFormData] = useState({
    standardAds: 0,
    halfAds: 0,
    doubleAds: 0,
    pricePerStandard: 500,
    pricePerHalf: 280,
    pricePerDouble: 950,
    designCost: 0,
    bundledCost: 0,
    printCost: 0,
    eddmVolume: 2500,
    eddmSize: '6x11',
    deliveryOption: 'bundled'
  })

  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    const parsedValue = isNaN(Number(value)) ? value : Number(value)
    setFormData({ ...formData, [name]: parsedValue })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = calculateProfit(formData)
    setResult(result)
  }

  const getDisplayValue = (field) => (formData[field] === 0 ? '' : formData[field])

  return (
    <form onSubmit={handleSubmit} className="calculator-form">
      <div className="form-section">
        <h3>Ad Sales</h3>
        
        <div className="form-group">
          <label>Standard Ads Sold:</label>
          <input 
            type="number" 
            name="standardAds" 
            value={getDisplayValue('standardAds')} 
            onChange={handleChange}
            placeholder="Enter number of standard ads"
          />
        </div>
        
        <div className="form-group">
          <label>Price Per Standard Ad:</label>
          <input 
            type="number" 
            name="pricePerStandard" 
            value={getDisplayValue('pricePerStandard')} 
            onChange={handleChange}
            placeholder="Enter price per standard ad"
          />
        </div>

        <div className="form-group">
          <label>Half Ads Sold:</label>
          <input 
            type="number" 
            name="halfAds" 
            value={getDisplayValue('halfAds')} 
            onChange={handleChange}
            placeholder="Enter number of half ads"
          />
        </div>
        
        <div className="form-group">
          <label>Price Per Half Ad:</label>
          <input 
            type="number" 
            name="pricePerHalf" 
            value={getDisplayValue('pricePerHalf')} 
            onChange={handleChange}
            placeholder="Enter price per half ad"
          />
        </div>

        <div className="form-group">
          <label>Double Ads Sold:</label>
          <input 
            type="number" 
            name="doubleAds" 
            value={getDisplayValue('doubleAds')} 
            onChange={handleChange}
            placeholder="Enter number of double ads"
          />
        </div>
        
        <div className="form-group">
          <label>Price Per Double Ad:</label>
          <input 
            type="number" 
            name="pricePerDouble" 
            value={getDisplayValue('pricePerDouble')} 
            onChange={handleChange}
            placeholder="Enter price per double ad"
          />
        </div>
      </div>

      <div className="form-section">
        <h3>Design & Delivery</h3>
        
        <div className="form-group">
          <label>Design Cost:</label>
          <input 
            type="number" 
            name="designCost" 
            value={getDisplayValue('designCost')} 
            onChange={handleChange}
            placeholder="Enter design cost"
          />
        </div>

        <div className="form-group">
          <label>Delivery Option:</label>
          <select name="deliveryOption" value={formData.deliveryOption} onChange={handleChange}>
            <option value="bundled">Full Service (Bundled)</option>
            <option value="separate">Print & Postage Separate</option>
          </select>
        </div>

        {formData.deliveryOption === 'bundled' ? (
          <div className="form-group">
            <label>Bundled Print + Postage Cost:</label>
            <input 
              type="number" 
              name="bundledCost" 
              value={getDisplayValue('bundledCost')} 
              onChange={handleChange}
              placeholder="Enter bundled cost"
            />
          </div>
        ) : (
          <>
            <div className="form-group">
              <label>EDDM Volume:</label>
              <select name="eddmVolume" value={formData.eddmVolume} onChange={handleChange}>
                <option value={1000}>1,000</option>
                <option value={1500}>1,500</option>
                <option value={2500}>2,500</option>
                <option value={5000}>5,000</option>
                <option value={10000}>10,000</option>
              </select>
            </div>

            <div className="form-group">
              <label>EDDM Card Size:</label>
              <select name="eddmSize" value={formData.eddmSize} onChange={handleChange}>
                <option value="6x11">6x11</option>
                <option value="6.5x9">6.5x9</option>
                <option value="6.5x12">6.5x12</option>
                <option value="8.5x11">8.5x11</option>
                <option value="9x12">9x12</option>
              </select>
            </div>
          </>
        )}
      </div>

      <button type="submit" className="submit-button">Calculate Profit</button>

      {result && (
        <div className="results-section">
          <h3>Results</h3>
          
          <div className="result-item">
            <span className="result-label">Revenue:</span>
            <span className="result-value">${result.totalRevenue.toFixed(2)}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">Postage Cost:</span>
            <span className="result-value">${result.postageCost.toFixed(2)}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">Print Cost:</span>
            <span className="result-value">${result.printCost.toFixed(2)}</span>
          </div>
          
          <div className="result-item">
            <span className="result-label">Total Cost:</span>
            <span className="result-value">${result.totalCost.toFixed(2)}</span>
          </div>
          
          <div className="profit-highlight">
            <div className="result-item">
              <span className="result-label">Profit:</span>
              <span className="result-value">${result.profit.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="result-item">
            <span className="result-label">Break Even Price per Standard Ad:</span>
            <span className="result-value">
              {result.breakEvenPrice !== null ? `$${result.breakEvenPrice.toFixed(2)}` : 'N/A'}
            </span>
          </div>

          <h4>Cost per Unit to Advertiser</h4>
          {formData.standardAds > 0 && (
            <div className="result-item">
              <span className="result-label">Standard Ad:</span>
              <span className="result-value">${result.costPerUnit.standard.toFixed(3)}</span>
            </div>
          )}
          {formData.halfAds > 0 && (
            <div className="result-item">
              <span className="result-label">Half Ad:</span>
              <span className="result-value">${result.costPerUnit.half.toFixed(3)}</span>
            </div>
          )}
          {formData.doubleAds > 0 && (
            <div className="result-item">
              <span className="result-label">Double Ad:</span>
              <span className="result-value">${result.costPerUnit.double.toFixed(3)}</span>
            </div>
          )}
        </div>
      )}
    </form>
  )
}
