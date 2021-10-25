import React from "react"
import { OpportunityCreate, NotFoundPage, OrgOpportunitiesStaticAfter, OpportunityHome, OpportunityView, OrgOpportunityApplicants, OrgOpportunityView } from ".."
import { Routes, Route } from "react-router-dom"

export default function OpportunityPage() {
  return (
    <>
      <Routes>
        <Route path="*" element={<OpportunityHome />} />
        <Route path="/create/" element={<OpportunityCreate />} />
        <Route path=":opportunity_id" element={<OpportunityView />} />
        {/* <Route path="/0rg/1" element={<OrgOpportunitiesStaticAfter />} /> */}
        <Route path="/org/:opportunity_id" element={<OrgOpportunityView />} />
        <Route path="/org/:opportunity_id/applicants" element={<OrgOpportunityApplicants />} />
      </Routes>
    </>
  )
}

