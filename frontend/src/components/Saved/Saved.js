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
  EuiButton,
  EuiButtonIcon,
  EuiCard
} from "@elastic/eui"
import moment from "moment"
import styled from "styled-components"
import koala from '../../assets/img/koala.jpg'

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
  background-color: #FF5733;
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

const cardFooterContent = (
    <EuiFlexGroup justifyContent="spaceAround">
      <EuiFlexItem grow={false}>
        <EuiButton href="/opportunities/1">View</EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton href="/chat">Chat</EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton  onClick={refreshPage}>Unsave</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
);

const cardCreateContent = (
    <EuiFlexGroup justifyContent="center">
      <EuiFlexItem grow={false}>
        <EuiButtonIcon iconSize="l" iconType="plusInCircleFilled"/>
      </EuiFlexItem>
    </EuiFlexGroup>
);

const date = new Date().toDateString();

function refreshPage() {
  localStorage.setItem("saved", "false")
  window.location.reload(false);
}

var opportunity = (
  <div>
    <EuiFlexItem grow={3}>
            <StyledProfileSubsection verticalPosition="center" horizontalPosition="center">
                <EuiText> You havent saved any opportunities yet</EuiText>
                <StyledStartButton margin="5px" fill href="/opportunities"> Get Started
                </StyledStartButton>
            </StyledProfileSubsection>

            </EuiFlexItem>
  </div>
)

if (localStorage.getItem("saved") == "true") {
  opportunity = (
    <EuiCard
      textAlign="left"
      image={
        <div>
          <img
            src={koala}
            alt="Nature"
          />
        </div>
      }
      title="Bloom Festival"
      description={date}
      footer={cardFooterContent}
    />
  )
  
}

function Saved({ user }) {
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
                    
                  <EuiKeyPadMenuItem label="Me" href="/profile">
                      <EuiIcon type="user" size="l" />
                  </EuiKeyPadMenuItem>

                  <EuiKeyPadMenuItem isSelected label="Saved" href="/profile/saved">
                      <EuiIcon type="heart" size="l" />
                  </EuiKeyPadMenuItem>

                  <EuiKeyPadMenuItem label="Opportunities" href="/profile/myopportunities">
                      <EuiIcon type="accessibility" size="l" />
                  </EuiKeyPadMenuItem>
                </StyledKeyPadMenu>
                
              </StyledProfileSubsection1>

            </EuiFlexItem>
            <EuiFlexItem grow={3}>
            <StyledProfileSubsection verticalPosition="center" horizontalPosition="center">
                <EuiText> <h3>Saved</h3></EuiText>
                <EuiFlexGroup direction="column">
                    <EuiFlexItem grow={1}>
                        {opportunity}
                    </EuiFlexItem>
                    
                </EuiFlexGroup>
            </StyledProfileSubsection>

            </EuiFlexItem>

          </EuiFlexGroup>
            
        </ProfileContainer>
        
      </EuiPageBody>
    </StyledEuiPage>
  )
}

export default connect((state) => ({ user: state.auth.user }))(Saved)

