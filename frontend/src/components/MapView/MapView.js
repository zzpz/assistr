import React from 'react'
import GoogleMapReact from 'google-map-react'
import '../../assets/css/map.css'

import {
    EuiBadge,
    EuiButton,
    EuiCard,
    EuiFlexGroup,
    EuiFlexItem,
    EuiText,
    EuiSpacer,
    EuiLoadingChart,
    EuiPanel,
    EuiIcon
  } from "@elastic/eui"

const LocationPin = ({ text }) => (
    <div className="pin">
      <EuiIcon icon="annotation" className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  )

const MapView = ({ location, zoomLevel }) => (
    <div className="map">
  
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={35.6761919}
            lng={139.6503106}
            text="Toowong Village, Sherwood Road, Toowong QLD, Australia"
          />
        </GoogleMapReact>
      </div>
    </div>
)

export default MapView