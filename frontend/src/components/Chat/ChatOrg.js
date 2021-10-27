import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Talk from 'talkjs';
import axios from 'axios'
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

class ChatOrg extends Component {

    constructor(props) {
        super(props);
        
        this.inbox = undefined;
        this.state = {
            org: {
                data: {}
            },
            volunteer: {
                data: {}
            }
        }
    }

    getOrgData = async () => {
        try {
            const {data} = await axios.get('http://localhost:8000/api/profiles/1');
            return data;
        } catch (err) {
            console.log(err.message);
        }
    }

    getUserData = async () => {
        try {
            const {data} = await axios.get('http://localhost:8000/api/profiles/2');
            return data;
        } catch (err) {
            console.log(err.message);
        }
    }

    

    async componentDidMount() {
        const orgData = await this.getOrgData();
        const userData = await this.getUserData();
        this.setState(
            {org: {
                data: orgData
            },
            volunteer: {
                data: userData
            }
        }
        );

    

        // Promise can be `then`ed multiple times
        Talk.ready
            .then(() => {
                const other = new Talk.User({
                    id: "12345231",
                    name: this.state.volunteer.data.first,
                    email: "george@looney.net",
                    photoUrl: "https://talkjs.com/docs/img/george.jpg",
                    // welcomeMessage: "Hey there! How are you? :-)"
                });
                const me = new Talk.User({
                    id: "54321",
                    name: this.state.org.data.org_name,
                    email: "ronald@teflon.com",
                    photoUrl: "https://talkjs.com/docs/img/ronald.jpg",
                    // welcomeMessage: "Hey there! Love to chat :-)"
                });

                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: "tDuskhK4",
                        me: me
                    });
                }


                // You control the ID of a conversation. oneOnOneId is a helper method that generates
                // a unique conversation ID for a given pair of users. 
                const conversationId = Talk.oneOnOneId(me, other);
            
                const conversation = window.talkSession.getOrCreateConversation(conversationId);
                conversation.setParticipant(me);
                conversation.setParticipant(other);
            
                this.inbox = window.talkSession.createInbox({
                    selected: conversation
                });
                this.inbox.mount(this.container);

            })
            .catch(e => console.error(e));
    }

    componentWillUnmount() {
        if (this.inbox) {
            this.inbox.destroy();
        }
    }

    render() {
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
                                  <EuiButton iconType="arrowLeft" href="/org-profile/CreatedOpportunities/num=1" >My Opportunities</EuiButton>
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
                                        <span>
                                          <div style={{height: '500px'}} ref={c => this.container = c}>Loading...</div>
                                        </span>
                                          
                                      </EuiFlexItem>
                                      <EuiFlexItem>
                                      </EuiFlexItem>
                                  </EuiFlexGroup>
                          </EuiFlexItem>
                         
                      </EuiFlexGroup>
                     
                  </CardContainer>
      
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </StyledEuiPage>
        
            );
    }
}

export default ChatOrg;