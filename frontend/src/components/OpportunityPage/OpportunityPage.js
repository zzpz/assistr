import React from "react"
import { OpportunityCreate, NotFoundPage, OpportunityHome, OpportunityView } from ".."
import { Routes, Route } from "react-router-dom"

export default function OpportunityPage() {
  return (
    <>
      <Routes>
        <Route path="*" element={<OpportunityHome />} />
        <Route path="/create/" element={<OpportunityCreate />} />
        <Route path=":opportunity_id" element={<OpportunityView />} />
      </Routes>
    </>
  )
}

