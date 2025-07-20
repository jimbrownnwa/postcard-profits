import React from 'react'
import CalculatorForm from './components/CalculatorForm'

export default function App() {
  return (
    <div style={{
      padding: '2rem', 
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '100vh',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        width: '100%',
        marginBottom: '2rem'
      }}>Postcard Profits</h1>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%',
        alignItems: 'center'
      }}>
        <CalculatorForm />
      </div>
    </div>
  )
}
