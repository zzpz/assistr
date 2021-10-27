import React from "react"
import { connect } from "react-redux"
import { Actions as postActions } from "../../redux/opportunities"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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
    EuiFlexItem,
    EuiPanel

    
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
  
// const timeout = document.getElementsByClassName('showApplicant')
// setTimeout(hideElement, 100) //milliseconds until timeout//
// function hideElement() {
//     console.log("CUH")
// }


function VolunteerProfileView({}) {

  const navigate = useNavigate()

 
  const [show, setShow] = React.useState(true)
  const [volunteer, setVolunteer] = React.useState("")
  const [acceptFilled, setAccept] = React.useState(false)

  const getUserData = async () => {
    try {
        const {data} = await axios.get('http://localhost:8000/api/profiles/2');
        setVolunteer(data)
        return data;
    } catch (err) {
        console.log(err.message);
    }
  }

  

  React.useEffect(() => {
    const vol = getUserData();
    console.log(volunteer)
    return vol;
  }, [])


  const handleClick = () => {
    localStorage.setItem("visited_applicants", "true");
  }

  

  // const vol = getUserData();
  // setVolunteer(vol)

  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <StyledEuiPageHeader>
          <EuiPageHeaderSection>
          </EuiPageHeaderSection>
        </StyledEuiPageHeader>
        <ProfileContainer>
          <EuiFlexGroup direction="column">
          <EuiFlexItem grow={3}>
                    <EuiPanel>
                        <EuiFlexGroup justifyContent="spaceBetween">
                        <EuiFlexItem grow={false}>
                            <EuiButton iconType="arrowLeft" onClick={() => navigate(-1)}>Back</EuiButton>
                        </EuiFlexItem>
                        
                        </EuiFlexGroup>
                    </EuiPanel>
                </EuiFlexItem>
           
            <EuiFlexItem grow={3}>
            <StyledProfileSubsection verticalPosition="center" horizontalPosition="center">

            <StyledEuiPageContentBody>
                <EuiFlexGroup direction="column">
                  
                  <ProfileCard>
                    <EuiAvatar
                    size="xl"
                    name={volunteer.first || "Anonymous"}
                    initialsLength={2}
                    imageUrl={volunteer.first}
                    />
                  
                    <EuiText>
                    <p>
                        <EuiIcon type="user" />{" "}
                        {volunteer.first || volunteer.org_name}
                    </p>
                    <p>
                        <EuiIcon type="number" />{" "}
                        {volunteer.phone ? volunteer.phone : "No phone number added"}
                    </p>
                    <p>
                        <EuiIcon type="clock" /> Member since {moment(volunteer.created_at).format("MM-DD-YYYY")}
                    </p>
                    <EuiHorizontalRule />
                    <p className="bio">
                        <EuiIcon type="quote" />{" "}
                        {volunteer.bio ? volunteer.bio : "This user hasn't written a bio yet"}
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

export default VolunteerProfileView;

