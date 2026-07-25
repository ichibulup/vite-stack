import { Navigate, Route, Routes } from 'react-router'
import { SignInPage, SignUpPage } from '../../pages/auth'

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="sign-in" replace />} />
    </Routes>
  )
}
