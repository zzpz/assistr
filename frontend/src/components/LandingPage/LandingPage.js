import React from "react"
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,

  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiButton
} from "@elastic/eui"
import styled from "styled-components"

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
  background: rgb(0,75,103);
  background: linear-gradient(180deg, rgba(0,75,103,1) 21%, rgba(36,127,155,1) 74%, rgba(78,187,216,1) 99%);
`

const StyledEuiPageContent = styled(EuiPanel)`
  border-radius: 50%;
  min-width: 100%;
  min-height: 100%;
`

export default function LandingPage(props) {
  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <EuiFlexGroup>
          <EuiFlexItem>
            <div class="card-wrap">
              <div class="card-header one">
                <i class="fas fa-code"></i>
              </div>
              <div class="card-content">
                <h1 class="card-title">Are you an Organisation?</h1>
                <p class="card-text">Sign-Up or find out more information</p>
                <EuiButton class="card-btn" href="/registration/org">Organisation</EuiButton>
            </div>
            </div>
          </EuiFlexItem>
          <EuiFlexItem>
            <div class="card-wrap">
              <div class="card-header two">
                <i class="fas fa-code"></i>
              </div>
              <div class="card-content">
                <h1 class="card-title">Looking to get involved?</h1>
                <p class="card-text">Click here to get started today</p>
                <EuiButton class="card-btn" href="/registration">Volunteer</EuiButton>
            </div>
            </div>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageBody>
    </StyledEuiPage>
  )
}

