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
// import { EuiFieldText } from "@elastic/eui/src/components/form/field_text/field_text"
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
  height: 50vh;
  padding: 10px;
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
                        textAlign="left"
                        image={
                          <div>
                            <img
                              src="http://172.19.0.4:8080/1,01d2a24f1e"
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
                <EuiFlexItem href="/" grow={1} style={{ maxWidth: 300 }}>
                  <EuiCard
                        textAlign="left"
                        image={
                          <div>
                            <img
                              src="http://172.19.0.4:8080/1,01d2a24f1e"
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
                        textAlign="left"
                        image={
                          <div>
                            <img
                              src="http://172.19.0.4:8080/1,01d2a24f1e"
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
              <EuiFlexGroup>

              </EuiFlexGroup>

            </CardContainer>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  )
}

export default connect((state) => ({ user: state.auth.user }))(OpportunityHome)

