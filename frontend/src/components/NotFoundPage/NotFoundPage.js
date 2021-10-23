import React from "react"
import { useNavigate } from "react-router-dom"
import { EuiEmptyPrompt, EuiButton } from "@elastic/eui"

export default function NotFoundPage({
  notFoundItem = "Page",
}) {
  const navigate = useNavigate()

  return (
    <EuiEmptyPrompt
      iconType="editorStrike"
      title={<h2>{notFoundItem} Not Found</h2>}
      actions={
        <EuiButton color="primary" fill onClick={() => navigate(-1)}>
          Go Back
        </EuiButton>
      }
    />
  )
}