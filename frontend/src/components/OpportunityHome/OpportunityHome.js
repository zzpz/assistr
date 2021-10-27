import React from "react"
import { connect } from "react-redux"
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiText,
  EuiFieldText,
  EuiButton,
  EuiFlexItem,
  EuiFlexGroup,
  EuiPanel,
  EuiCard
} from "@elastic/eui"
import { OpportunityCreateForm } from ".."
import styled from "styled-components"
import koala from '../../assets/img/koala.jpg'
import buddiesDay from '../../assets/img/buddiesDay.jpg'

import { OrgOpportunityViewCard, NotFoundPage } from "../../components"


const StyledEuiPage = styled(EuiPage)`
  flex: 1;
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

const CardContainer = styled.div`
  width: 85vw;
  padding: 20px;
`

function OpportunityHome({ user }) {
  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <EuiPageContent verticalPosition="center" horizontalPosition="center" paddingSize="none">
          <EuiPageContentBody>
            <CardContainer>
              <EuiFlexGroup justifyContent="spaceAround">
                <EuiFlexItem grow={1} style={{ maxWidth: 300 }}>
                  <EuiCard
                        href="opportunities/1"
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
                        description="Example of a card's description. Stick to one or two sentences."
                        footer={
                          <EuiFlexGroup justifyContent="flexEnd">
                            <EuiFlexItem grow={false}>
                              <EuiButton href="opportunities/1">Go for it</EuiButton>
                            </EuiFlexItem>
                          </EuiFlexGroup>
                        }
                  />

                </EuiFlexItem>
                <EuiFlexItem grow={1} style={{ maxWidth: 300 }}>
                  <EuiCard
                        href="opportunities/1"
                        textAlign="left"
                        image={
                          <div>
                            <img
                                src={buddiesDay}
                                alt="Nature"
                                />
                          </div>
                        }
                        title="Buddies Day"
                        description="Example of a card's description. Stick to one or two sentences."
                        footer={
                          <EuiFlexGroup justifyContent="flexEnd">
                            <EuiFlexItem grow={false}>
                              <EuiButton href="opportunities/2">Go for it</EuiButton>
                            </EuiFlexItem>
                          </EuiFlexGroup>
                        }
                  />

                </EuiFlexItem>
                <EuiFlexItem grow={1} style={{ maxWidth: 300 }}>
                  <EuiCard
                        href="opportunities/1"
                        textAlign="left"
                        image={
                          <div>
                            <img
                                src={koala}
                                alt="Nature"
                                />
                          </div>
                        }
                        title="Feeding Koalas"
                        description="Example of a card's description. Stick to one or two sentences."
                        footer={
                          <EuiFlexGroup justifyContent="flexEnd">
                            <EuiFlexItem grow={false}>
                              <EuiButton href="opportunities/3">Go for it</EuiButton>
                            </EuiFlexItem>
                          </EuiFlexGroup>
                        }
                  />

                </EuiFlexItem>
              
              
              </EuiFlexGroup>
            

            </CardContainer>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  )
}

export default connect((state) => ({ user: state.auth.user }))(OpportunityHome)

