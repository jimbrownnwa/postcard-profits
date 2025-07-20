import React, { useState } from 'react'
import { calculateProfit } from '../utils/calculateProfit'

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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3>Ad Sales</h3>
      <label>
        Standard Ads Sold:
        <input type="number" name="standardAds" value={getDisplayValue('standardAds')} onChange={handleChange} />
      </label>
      <label>
        Price Per Standard Ad:
        <input type="number" name="pricePerStandard" value={getDisplayValue('pricePerStandard')} onChange={handleChange} />
      </label>

      <label>
        Half Ads Sold:
        <input type="number" name="halfAds" value={getDisplayValue('halfAds')} onChange={handleChange} />
      </label>
      <label>
        Price Per Half Ad:
        <input type="number" name="pricePerHalf" value={getDisplayValue('pricePerHalf')} onChange={handleChange} />
      </label>

      <label>
        Double Ads Sold:
        <input type="number" name="doubleAds" value={getDisplayValue('doubleAds')} onChange={handleChange} />
      </label>
      <label>
        Price Per Double Ad:
        <input type="number" name="pricePerDouble" value={getDisplayValue('pricePerDouble')} onChange={handleChange} />
      </label>

      <h3>Design & Delivery</h3>
      <label>
        Design Cost:
        <input type="number" name="designCost" value={getDisplayValue('designCost')} onChange={handleChange} />
      </label>

      <label>
        Delivery Option:
        <select name="deliveryOption" value={formData.deliveryOption} onChange={handleChange}>
          <option value="bundled">Full Service (Bundled)</option>
          <option value="separate">Print & Postage Separate</option>
        </select>
      </label>

      {formData.deliveryOption === 'bundled' ? (
        <label>
          Bundled Print + Postage Cost:
          <input type="number" name="bundledCost" value={getDisplayValue('bundledCost')} onChange={handleChange} />
        </label>
      ) : (
        <>
          <label>
            EDDM Volume:
            <select name="eddmVolume" value={formData.eddmVolume} onChange={handleChange}>
              <option value={1000}>1,000</option>
              <option value={1500}>1,500</option>
              <option value={2500}>2,500</option>
              <option value={5000}>5,000</option>
              <option value={10000}>10,000</option>
            </select>
          </label>

          <label>
            EDDM Card Size:
            <select name="eddmSize" value={formData.eddmSize} onChange={handleChange}>
              <option value="6x11">6x11</option>
              <option value="6.5x9">6.5x9</option>
              <option value="6.5x12">6.5x12</option>
              <option value="8.5x11">8.5x11</option>
              <option value="9x12">9x12</option>
            </select>
          </label>
        </>
      )}

      <button type="submit">Calculate Profit</button>

      {result && (
        <div>
          <h3>Results</h3>
          <p><strong>Revenue:</strong> ${result.totalRevenue.toFixed(2)}</p>
          <p><strong>Postage Cost:</strong> ${result.postageCost.toFixed(2)}</p>
          <p><strong>Print Cost:</strong> ${result.printCost.toFixed(2)}</p>
          <p><strong>Total Cost:</strong> ${result.totalCost.toFixed(2)}</p>
          <p><strong>Profit:</strong> ${result.profit.toFixed(2)}</p>
          <p><strong>Break Even Price per Standard Ad:</strong> {result.breakEvenPrice !== null ? `$${result.breakEvenPrice.toFixed(2)}` : 'N/A'}</p>

          <h4>Cost per Unit to Advertiser</h4>
          {formData.standardAds > 0 && (
            <p><strong>Standard Ad:</strong> ${result.costPerUnit.standard.toFixed(3)}</p>
          )}
          {formData.halfAds > 0 && (
            <p><strong>Half Ad:</strong> ${result.costPerUnit.half.toFixed(3)}</p>
          )}
          {formData.doubleAds > 0 && (
            <p><strong>Double Ad:</strong> ${result.costPerUnit.double.toFixed(3)}</p>
          )}
        </div>
      )}
    </form>
  )
}
