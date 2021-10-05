import React from "react"
import {
  EuiAvatar,
  EuiIcon,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  // EuiHeaderLinks,
  EuiHeaderLink,
} from "@elastic/eui"
import { Link } from "react-router-dom"
import loginIcon from "../../assets/img/logo.svg"
import styled from "styled-components"

const LogoSection = styled(EuiHeaderLink)`
  padding: 0 2rem;
`
const MainLogo = styled(EuiIcon)`
  margin-bottom: 4px;
`


export default function Navbar({ user, ...props }) {

  return (
    <EuiHeader style={props.style || {}}>
      <EuiHeaderSection>
        <EuiHeaderSectionItem border="right">
          {/* <EuiHeaderLinks aria-label="app navigation links">
            <EuiHeaderLink iconType="tear" href="#">
              Find Cleaners
            </EuiHeaderLink>

            <EuiHeaderLink iconType="tag" href="#">
              Find Jobs
            </EuiHeaderLink>

            <EuiHeaderLink iconType="help" href="#">
              Help
            </EuiHeaderLink>
          </EuiHeaderLinks> */}
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
      <EuiHeaderSectionItem>
          <LogoSection href="/">
            <MainLogo type={loginIcon} size="xxxl" />
          </LogoSection>
        </EuiHeaderSectionItem>

      <EuiHeaderSection className="userAvatar">
        <EuiHeaderSectionItemButton aria-label="User avatar">
          {user?.profile ? (
            <EuiAvatar size="l" name={user.profile.full_name} imageUrl={user.profile.image} />
          ) : (
            <Link to="/login">  
              <EuiAvatar size="l" color="#1E90FF" name="user" imageUrl={loginIcon} />  
            </Link> 
          )}
        </EuiHeaderSectionItemButton>
      </EuiHeaderSection>
    </EuiHeader>
  )
}

