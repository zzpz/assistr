import React from "react"
import { connect } from "react-redux"
import {
  EuiAvatar,
  EuiHorizontalRule,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiText,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton
} from "@elastic/eui"
import moment from "moment"
import styled from "styled-components"

const StyledEuiPage = styled(EuiPage)`
  
  display: flex;
  flex-direction: horizontal;
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
const StyledEuiPageContentBody = styled(EuiPageContentBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 2000px;

  & h2 {
    margin-bottom: 1rem;
  }
`
const StyledProfileSubsection = styled(EuiPageContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px;
  min-width: 500px;
  min-height: 500px;
`
const StyledKeyPadMenu = styled(EuiKeyPadMenu)`
  display: flex;
  flex-direction: vertical;
  justify-content: center;
  align-items: center;
  width: 150px;
  height 300px;
  flex: 2;
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: horizontal;
  align-self: center;
  align-items: center;
`
const StyledProfileSubsection1 = styled(EuiPageContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin: 50px;
  align-self: left;
`
const StyledStartButton = styled(EuiButton)`
  border-radius: 10px;
  margin-top: 18px;
`


function OrgOpportunities({ user }) {
  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <StyledEuiPageHeader>
          <EuiPageHeaderSection>
          </EuiPageHeaderSection>
        </StyledEuiPageHeader>
        <ProfileContainer>
          <EuiFlexGroup>
            <EuiFlexItem grow={1}>
              <StyledProfileSubsection1 verticalPosition="center" horizontalPosition="center">
                <EuiText>My Profile</EuiText>
                <StyledKeyPadMenu>
                    
                  <EuiKeyPadMenuItem label="Me" href="#">
                      <EuiIcon type="user" size="l" />
                  </EuiKeyPadMenuItem>

                  <EuiKeyPadMenuItem label="Saved" href="profile/opportunities">
                      <EuiIcon type="heart" size="l" />
                  </EuiKeyPadMenuItem>

                  <EuiKeyPadMenuItem isSelected label="Opportunities" href="/opportunities/create">
                      <EuiIcon type="accessibility" size="l" />
                  </EuiKeyPadMenuItem>
                </StyledKeyPadMenu>
                
              </StyledProfileSubsection1>

            </EuiFlexItem>
            <EuiFlexItem grow={3}>
            <StyledProfileSubsection verticalPosition="center" horizontalPosition="center">
                <EuiText> Start by creating your first listing!</EuiText>
                <StyledStartButton margin="5px" fill href="/opportunities/create"> Get Started
                </StyledStartButton>
            </StyledProfileSubsection>

            </EuiFlexItem>

          </EuiFlexGroup>
            
        </ProfileContainer>
        
      </EuiPageBody>
    </StyledEuiPage>
  )
}

export default connect((state) => ({ user: state.auth.user }))(OrgOpportunities)

