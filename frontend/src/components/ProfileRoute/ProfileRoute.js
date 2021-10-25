import React from "react"
import {
  EuiGlobalToastList, 
  EuiLoadingSpinner,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle
} from "@elastic/eui"
import { LoginPage } from ".."
import { OrgProfileEdit, VolunteerProfileEdit } from ".."
import { connect } from "react-redux"
import styled from "styled-components"



const StyledEuiPage = styled(EuiPage)`
  flex: 1;
  background: rgb(0,75,103);
background: linear-gradient(180deg, rgba(0,75,103,1) 21%, rgba(36,127,155,1) 74%, rgba(78,187,216,1) 99%);
`
const StyledEuiPageHeader = styled(EuiPageHeader)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;

  & h1 {
    font-size: 3.5rem;
  }
`


function ProfileRoute({
  user,
  userLoaded,
  isAuthenticated,
  component: Component,
  redirectTitle = `Access Denied`,
  redirectMessage = `Authenticated users only. Login here or create a new account to view that page.`,
  ...props
}) {
  const [toasts, setToasts] = React.useState([
    {
      id: "auth-redirect-toast",
      title: redirectTitle,
      color: "warning",
      iconType: "alert",
      toastLifeTimeMs: 15000,
      text: <p>{redirectMessage}</p>
    }
  ])
  // if (!userLoaded) return <EuiLoadingSpinner size="xl" />
  const isAuthed = isAuthenticated && Boolean(user?.user_id)
  const isOrg = localStorage.getItem("is_org")
  // console.log(isOrg)
  if (!isAuthed) {
    return (
      <>
        {/* <LoginPage /> */}
        <EuiGlobalToastList
          toasts={toasts}
          dismissToast={() => setToasts([])}
          toastLifeTimeMs={15000}
          side="right"
          className="auth-toast-list"
        />
      </>
    )
  }

  if (isOrg == "true") {
    
    return <OrgProfileEdit />

  }

  return <VolunteerProfileEdit />
}

export default connect((state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  userLoaded: state.auth.userLoaded
}))(ProfileRoute)

