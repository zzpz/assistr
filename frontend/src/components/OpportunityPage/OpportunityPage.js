import React from "react"
import { OpportunityHome, NotFoundPage } from ".."
import { Routes, Route } from "react-router-dom"

export default function OpportunityPage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<OpportunityHome />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

