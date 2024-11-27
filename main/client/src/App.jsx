import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
