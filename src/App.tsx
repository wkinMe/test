import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [width, setWidth] = useState(10);
  const [length, setLength] = useState(10);
  const [materialId, setMaterialId] = useState(0);
  const [pipeId, setPipeId] = useState(0);
  const [strength, setStrength] = useState(0);

  return (
    <>
      <section>

      </section>
      <section>

      </section>
      <input type="number" />
      <input type="number" />
      <section>
        
      </section>
    </>
  )
}

export default App
