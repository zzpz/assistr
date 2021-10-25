import React from "react"
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"
import GoogleMapReact from 'google-map-react';
import { connect } from "react-redux"
import { Actions as postActions } from "../../redux/opportunities"
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiLoadingSpinner,
  EuiHorizontalRule,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiLoadingChart,
  EuiPanel,
  EuiIcon,
  EuiAvatar,
  EuiTitle,
  EuiImage,
  EuiButton,
  EuiFlexGrid,
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

function OrgOpportunityView({
  isLoading,
  postsError,
  currentPost,
  fetchPostById,
  clearCurrentOpportunity
}) {
  // const { opportunity_id } = useParams()
  // console.log("HELLO");
  const opportunity_id = 1;


  const AnyReactComponent = ({ text }) => <div>{text}</div>;


  React.useEffect(() => {
    if (1) {
      fetchPostById({ opportunity_id: 1 })
    }

    return () => clearCurrentOpportunity()
  }, [opportunity_id, fetchPostById, clearCurrentOpportunity])

  if (isLoading) return <EuiLoadingSpinner size="xl" />
  if (!currentPost) return <EuiLoadingSpinner size="xl" />
  if (!currentPost?.title) return <NotFoundPage />

  const defaultProps = {
    center: {
      lat: 27.4843,
      lng: 152.9837
    },
    zoom: 11
  };


  const title = (
    <div>
      <EuiTitle><h1>{currentPost.title}</h1></EuiTitle>
      <EuiText>{currentPost.short_desc}</EuiText>
      <EuiHorizontalRule />
      <EuiText>{currentPost.long_desc}</EuiText>
      <EuiHorizontalRule />
      <EuiText>Location</EuiText>
      <EuiText>{currentPost.location}</EuiText>
    </div>
  )

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
                        <EuiButton iconType="arrowLeft" href="/org-profile/created0pportunities">My Opportunities</EuiButton>
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
                        <EuiPanel>
                            <EuiImage hasShadow
                            allowFullScreen
                            size="fillWidth"
                            src="https://source.unsplash.com/400x200/?Soap"/>
                        </EuiPanel>
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
                <EuiFlexGroup>
                    <EuiFlexItem><EuiPanel>{title}</EuiPanel></EuiFlexItem>
                    <EuiFlexItem><EuiPanel><GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyAmn1Hymc4MuHy1zyvQsnTz64Jl-BFOTaQ" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        <AnyReactComponent
                        lat={35.6761919}
                        lng={139.6503106}
                        text="My Marker"
                        />
                </GoogleMapReact></EuiPanel></EuiFlexItem>
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
)(OrgOpportunityView)




const ImageHolder = styled.div`
  min-width: 400px;
  min-height: 200px;

  & > img {
    z-index: 2;
  }
`
const CardContainer = styled.div`
  width: 85vw;
  padding: 10px;
`


