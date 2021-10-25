import React from "react"
import { connect } from "react-redux"
import { Actions as postActions } from "../../redux/opportunities"
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiLoadingSpinner,
  EuiFlexItem,
  EuiFlexGrid,
  EuiButton,
  EuiText,
  EuiPanel,
  EuiFlexGroup,
  EuiAvatar,
  EuiButtonIcon
} from "@elastic/eui"
import { OrgOpportunityViewCard, NotFoundPage, OpportunityHome } from "../../components"
import { useParams } from "react-router-dom"
import styled from "styled-components"

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
  background: rgb(0,75,103);
background: linear-gradient(180deg, rgba(0,75,103,1) 21%, rgba(36,127,155,1) 74%, rgba(78,187,216,1) 99%);
`

const CardContainer = styled.div`
  width: 85vw;
  padding: 10px;
`
// const timeout = document.getElementsByClassName('showApplicant')
// setTimeout(hideElement, 100) //milliseconds until timeout//
// function hideElement() {
//     console.log("CUH")
// }


function OrgOpportunityApplicants({
  isLoading,
  postsError,
  currentPost,
  fetchPostById,
  clearCurrentOpportunity
}) {
  const { opportunity_id } = useParams()
  const [show, setShow] = React.useState(true)

  React.useEffect(() => {
    if (opportunity_id) {
      fetchPostById({ opportunity_id })
    }

    return () => clearCurrentOpportunity()
  }, [opportunity_id, fetchPostById, clearCurrentOpportunity])

  if (isLoading) return <EuiLoadingSpinner size="xl" />
  if (!currentPost) return <EuiLoadingSpinner size="xl" />
  if (!currentPost?.title) return <NotFoundPage />

  console.log(currentPost)
  
  const handleClick = () => {
    localStorage.setItem("visited_applicants", "true");
  }

  if (localStorage.getItem("visited_applicants") == "true") {

  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <EuiPageContent verticalPosition="center" horizontalPosition="center" paddingSize="none">
          <EuiPageContentBody>
            <CardContainer>
            <EuiFlexGroup >
                <EuiFlexItem grow={3}>
                    <EuiPanel>
                        <EuiFlexGroup justifyContent="spaceBetween">
                        <EuiFlexItem grow={false}>
                            <EuiButton iconType="arrowLeft" href="/org-profile/CreatedOpportunities/num=1" onClick={handleClick}>My Opportunities</EuiButton>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiButton>Switch to Volunteer View</EuiButton>
                        </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiPanel>
                </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                    <EuiFlexItem grow={3}>
                            <EuiFlexGroup direction="column">
                                <EuiFlexItem>
                                    <EuiPanel className="showApplicant">
                                        <EuiFlexGroup alignItems="center">
                                            <EuiFlexItem>
                                                <EuiAvatar
                                                    size="xl"
                                                    name={"Anonymous"}
                                                    initialsLength={2}/>
                                            </EuiFlexItem>
                                            <EuiFlexItem>
                                                <EuiButtonIcon display="base" size="l" iconType="user" />
                                            </EuiFlexItem>
                                            <EuiFlexItem>
                                                <EuiButtonIcon display="base" size="l" iconType="check" />
                                            </EuiFlexItem>
                                        </EuiFlexGroup>
                                    </EuiPanel>
                                </EuiFlexItem>
                                <EuiFlexItem>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem alignItems="spaceAround"> 
                    <EuiPanel paddingSize="l" alignItems="spaceAround">
                        <EuiFlexGrid columns={1}>
                        <EuiFlexItem alignItems="spaceAround" justifyContent="spaceBetween"> 
                        <EuiText padding="5px" textAlign="center">Manage This Opportunity</EuiText>
                        
                        </EuiFlexItem> 
                        <EuiFlexItem alignItems="spaceAround" justifyContent="spaceBetween"> 
                            <EuiButton href="/opportunities/org/1/applicants">View Applicants</EuiButton>
                        
                        </EuiFlexItem> 
                        <EuiFlexItem alignItems="spaceAround" justifyContent="spaceBetween"> 
                            <EuiButton>Edit Item</EuiButton>
                        
                        </EuiFlexItem> 
                        </EuiFlexGrid>
                    
                    </EuiPanel>
                    </EuiFlexItem>
                </EuiFlexGroup>
               
            </CardContainer>

          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  )
    
  }

  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <EuiPageContent verticalPosition="center" horizontalPosition="center" paddingSize="none">
          <EuiPageContentBody>
            <CardContainer>
            <EuiFlexGroup >
                <EuiFlexItem grow={3}>
                    <EuiPanel>
                        <EuiFlexGroup justifyContent="spaceBetween">
                        <EuiFlexItem grow={false}>
                            <EuiButton iconType="arrowLeft" href="/org-profile/CreatedOpportunities/num=1" onClick={handleClick}>My Opportunities</EuiButton>
                        </EuiFlexItem>
                        <EuiFlexItem grow={false}>
                            <EuiButton>Switch to Volunteer View</EuiButton>
                        </EuiFlexItem>
                        </EuiFlexGroup>
                    </EuiPanel>
                </EuiFlexItem>
                </EuiFlexGroup>
                <EuiFlexGroup>
                    <EuiFlexItem grow={3}>
                            <EuiFlexGroup direction="column">
                                <EuiFlexItem>
                                    {show}
                                </EuiFlexItem>
                                <EuiFlexItem>
                                </EuiFlexItem>
                            </EuiFlexGroup>
                    </EuiFlexItem>
                    <EuiFlexItem alignItems="spaceAround"> 
                    <EuiPanel paddingSize="l" alignItems="spaceAround">
                        <EuiFlexGrid columns={1}>
                        <EuiFlexItem alignItems="spaceAround" justifyContent="spaceBetween"> 
                        <EuiText padding="5px" textAlign="center">Manage This Opportunity</EuiText>
                        
                        </EuiFlexItem> 
                        <EuiFlexItem alignItems="spaceAround" justifyContent="spaceBetween"> 
                            <EuiButton href="/opportunities/org/1/applicants">View Applicants</EuiButton>
                        
                        </EuiFlexItem> 
                        <EuiFlexItem alignItems="spaceAround" justifyContent="spaceBetween"> 
                            <EuiButton>Edit Item</EuiButton>
                        
                        </EuiFlexItem> 
                        </EuiFlexGrid>
                    
                    </EuiPanel>
                    </EuiFlexItem>
                </EuiFlexGroup>
               
            </CardContainer>

          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  )
}

export default connect(
  (state) => ({
    isLoading: state.posts.isLoading,
    postsError: state.posts.error,
    currentPost: state.posts.currentPost
  }),
  {
    fetchPostById: postActions.fetchPostById,
    clearCurrentOpportunity: postActions.clearCurrentOpportunity
  }
)(OrgOpportunityApplicants)

