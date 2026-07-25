import { BrowserRouter } from 'react-router'
import SharedRoutes from './routes/shared'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <SharedRoutes />
    </BrowserRouter>
  )
}

export default App
