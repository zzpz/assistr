import React from "react"
import { geocodeByAddress, getLatLng } from "react-places-autocomplete"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import {
  EuiBadge,
  EuiButton,
  EuiHorizontalRule,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiFlexGrid,
  EuiPanel,
  EuiIcon,
  EuiAvatar,
  EuiTitle,
  EuiImage
} from "@elastic/eui"
import styled from "styled-components"
import moment from "moment"
import koala from '../../assets/img/koala.jpg'

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

const ProfileCard = styled(EuiFlexItem)`
  align-items: center;
  justify-content: space-between;
`

const AnyReactComponent = ({ text }) => <div>{text}</div>;



export default function OpportunityViewCard({ post, opportunity_id, org}) {
  const [latLong, setAddress] = React.useState("")
  const [saved, setSaved] = React.useState(false);
  const [applied, setApplied] = React.useState(false);

  const defaultProps = {
    center: {
      lat: 27.4843,
      lng: 152.9837
    },
    zoom: 11
  };

  

  var yo = (
    <div>
    </div>
  )

  var orgTitle = ""

  if (opportunity_id == 1) {
    orgTitle = " DECO3801"
  }
  if (opportunity_id == 2) {
    orgTitle = " Vinnies"
  }
  if (opportunity_id == 3) {
    orgTitle = " Koala Sanctuary"
  }

  const handleApply = () => {
    setApplied((isOn) => !isOn);
    if (applied) {
      localStorage.setItem("applied", "false");
    } else {
      localStorage.setItem("applied", "true");

    }
  }

  const handleSave = () => {
    setSaved((isOn) => !isOn);
    if (saved) {
      localStorage.setItem("saved", "false");
    } else {
      localStorage.setItem("saved", "true");

    }
  }

 



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

    let result = await geocodeByAddress(post.location)
    .then(result => getLatLng(result[0]))
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

  const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: latLong.lat, lng: latLong.lng }}
    >
      {props.isMarkerShown && <Marker position={{ lat: latLong.lat, lng: latLong.lng }} />}
    </GoogleMap>
  ))

  return (
    <CardContainer>
         <EuiFlexGroup>
         <EuiFlexItem grow={3}>
                  <EuiCard
                      textAlign="left"
                      image={
                        <div>
                          <img
                            src={koala}
                          />
                        </div>
                      }
                    />
              </EuiFlexItem>
             <EuiFlexItem>
               <EuiPanel paddingSize="l">
                 
                   <EuiCard  href="/profiles/view/1">
                   <ProfileCard>
                   <EuiAvatar
                  size="xl"
                  name={""}
                  initialsLength={2}
                />
                <EuiHorizontalRule />
                <EuiText>
                  <p>
                    <EuiIcon type="user" />{orgTitle}
      
                  </p>
                  <p>
                    <EuiIcon type="number" />{" "}
                    {"0406062315"}
                  </p>
                  </EuiText>
                   </ProfileCard>
                     </EuiCard>
                
                <EuiHorizontalRule />
                <EuiFlexGrid columns={1}>
                <EuiFlexItem>
                  <EuiButton fullWidth href="/chat">Chat</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiButton isSelected={applied} fill={applied} fullWidth onClick={handleApply}>Apply</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                  {/* <EuiButton iconType="heart" fullWidth href="/profile" onClick={handleSave}>Save</EuiButton> */}
                  <EuiButton
                      isSelected={saved}
                      fill={saved}
                      iconType={saved ? 'starFilledSpace' : 'starPlusEmpty'}
                      onClick={handleSave}
                    >
                      Save
                    </EuiButton>
                </EuiFlexItem>
                </EuiFlexGrid>
                
               </EuiPanel>
              
              </EuiFlexItem>
         </EuiFlexGroup>
         <EuiFlexGroup>
             <EuiFlexItem><EuiPanel>{title}</EuiPanel></EuiFlexItem>
             <EuiFlexItem><EuiPanel>
             <MyMapComponent
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
              
        </EuiPanel></EuiFlexItem>
         </EuiFlexGroup>
     </CardContainer>
  )
}

