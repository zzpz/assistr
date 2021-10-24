import React from "react"
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"
import GoogleMapReact from 'google-map-react';

import {
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
import styled from "styled-components"
import moment from "moment"

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

const AnyReactComponent = ({ text }) => <div>{text}</div>;



export default function OrgOpportunityViewCard({ post, user}) {
  const [latLong, setAddress] = React.useState("")

  const image = (
    <ImageHolder>
      
    </ImageHolder>
  )

  const defaultProps = {
    center: {
      lat: 27.4843,
      lng: 152.9837
    },
    zoom: 11
  };

  const title = (
      <div>
        <EuiTitle><h1>{post.title}</h1></EuiTitle>
        <EuiText>{post.short_desc}</EuiText>
        <EuiHorizontalRule />
        <EuiText>{post.long_desc}</EuiText>
        <EuiHorizontalRule />
        <EuiText>Location</EuiText>
        <EuiText>{post.location}</EuiText>
      </div>
  )

  const setLatLong = async () => {

    let result = await geocodeByAddress('Tokyo, Japan')
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) => setAddress({ lat, lng }));
  }
  setLatLong()
  console.log(latLong)

  console.log(latLong.lng)

  const location = {
    address: post.location,
    lat: latLong.lat,
    lng: latLong.lng,
  }


  return (
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
        

    // <EuiCard
    //   display="plain"
    //   textAlign="left"
    //   image={image}
    //   title={title}
    //   description={post.description}
    //   footer={footer}
    // />
  )
}

