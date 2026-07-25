import { Navigate, Route, Routes } from 'react-router'
import DemoPage from '../../pages/demo'
import HomePage from '../../pages/home'
import AuthRoutes from '../auth'

export default function SharedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
