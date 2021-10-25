import React from "react"
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"
import GoogleMapReact from 'google-map-react';

import {
  EuiBadge,
  EuiButton,
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
  EuiImage
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



export default function OpportunityViewCard({ post, user}) {
  const [latLong, setAddress] = React.useState("")

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
         <EuiFlexGroup>
         <EuiFlexItem grow={3}>
                  <EuiCard
                      textAlign="left"
                      image={
                        <div>
                          <img
                            src="http://172.18.0.4:8080/4,06d512ad1d"
                          />
                        </div>
                      }
                    />
              </EuiFlexItem>
             <EuiFlexItem>
               <EuiPanel paddingSize="l">
                <EuiAvatar
                  size="xl"
                  name={"Anonymous"}
                  initialsLength={2}
                />
                <EuiText>
                  <p>
                    <EuiIcon type="alert" />{" "}
      
                  </p>
                  <p>
                    <EuiIcon type="number" />{" "}
                    { "No phone number added"}
                  </p>
                  <EuiHorizontalRule />
                  <p>
                    <EuiIcon type="quote" />{" "}
                    {"This user hasn't written a bio yet"}
                  </p>
                </EuiText>
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

