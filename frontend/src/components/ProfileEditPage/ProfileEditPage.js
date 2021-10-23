import React from "react"
import OrgProfileEdit from "../OrgProfileEdit/OrgProfileEdit"
import { Routes, Route } from "react-router-dom"

export default function ProfileEditPage() {
  return (
    <>
      <Routes>
        <Route path="/edit-profile/org" element={<OrgProfileEdit />} />
        <Route path="/edit-profile/volunteer" element={<OrgProfileEdit />} />
      </Routes>
    </>
  )
}

