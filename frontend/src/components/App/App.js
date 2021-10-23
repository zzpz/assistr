import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { 
  OpportunityPage,
  LandingPage, 
  Layout, 
  LoginPage, 
  NotFoundPage, 
  ProfilePage, 
  ProtectedRoute,
  OrgRoute,
  RegistrationPage,
  OrgRegistrationPage,
  OrgProfileEdit,
  ProfileRoute,
  OrgProfilePage,
  OrgOpportunities
} from "../../components"

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
              path="/opportunities/*"
              element={<OrgRoute component={OpportunityPage} />}
            />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProtectedRoute component={ProfilePage} />} />  
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/registration/org" element={<OrgRegistrationPage />} />
          <Route
              path="/edit-profile/*"
              element={<ProfileRoute component={OrgProfileEdit} />}
            />
          <Route path="/org-profile" element={<OrgProfilePage />} />
          <Route path="/org-profile/createdOpportunities" element={<OrgOpportunities />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}