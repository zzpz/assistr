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
  EuiButton,
  EuiText,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiFlexGroup,
  EuiFlexItem
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
const ProfileCard = styled(EuiFlexItem)`
  align-items: center;
  justify-content: center;
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


function ProfilePage({ user }) {
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
                    
                  <EuiKeyPadMenuItem isSelected label="Me" href="#">
                      <EuiIcon type="user" size="l" />
                  </EuiKeyPadMenuItem>

                  <EuiKeyPadMenuItem label="Saved" href="/profile/saved">
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

            <StyledEuiPageContentBody>
                <EuiFlexGroup direction="column">
                  <EuiFlexItem>
                    <EuiButton href="edit-profile">Edit Profile</EuiButton>
                  </EuiFlexItem>
                  <ProfileCard>
                    <EuiAvatar
                    size="xl"
                    name={user.first || user.username || "Anonymous"}
                    initialsLength={2}
                    imageUrl={user.image}
                    />
                  
                    <EuiText>
                    <p>
                        <EuiIcon type="user" />{" "}
                        {user.first || user.org_name}
                    </p>
                    <p>
                        <EuiIcon type="number" />{" "}
                        {user.phone ? user.phone : "No phone number added"}
                    </p>
                    <p>
                        <EuiIcon type="clock" /> Member since {moment(user.created_at).format("MM-DD-YYYY")}
                    </p>
                    <EuiHorizontalRule />
                    <p className="bio">
                        <EuiIcon type="quote" />{" "}
                        {user.bio ? user.bio : "This user hasn't written a bio yet"}
                    </p>
                    </EuiText>
                  </ProfileCard>
                </EuiFlexGroup>    
              </StyledEuiPageContentBody>
            </StyledProfileSubsection>

            </EuiFlexItem>

          </EuiFlexGroup>
            
        </ProfileContainer>
        
      </EuiPageBody>
    </StyledEuiPage>
  )
}

export default connect((state) => ({ user: state.auth.user }))(ProfilePage)

