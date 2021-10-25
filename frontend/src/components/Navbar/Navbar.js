import React from "react"
import { connect } from "react-redux"
import { Actions as authActions } from "../../redux/auth"
import {
  EuiAvatar,
  EuiIcon,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiPopover,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink
} from "@elastic/eui"
import { Link, useNavigate } from "react-router-dom"
import loginIcon from "../../assets/img/icon.svg"
import styled from "styled-components"
import logoIconAsReactSVGComponent from "../IconHacks/login"

const LogoSection = styled(EuiHeaderSection)`
  padding: 0 0;
`
const MainLogo = styled(EuiIcon)`
  margin-bottom: 4px;
`

const AvatarMenu = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 300px;

  & .avatar-actions {
    margin-left: 2rem;
  }
`

function Navbar({ auth, logUserOut, ...props }) {
  const [avatarMenuOpen, setAvatarMenuOpen] = React.useState(false)
  const navigate = useNavigate() 

  const toggleAvatarMenu = () => setAvatarMenuOpen(!avatarMenuOpen)

  const closeAvatarMenu = () => setAvatarMenuOpen(false)

  const handleLogout = () => {
    closeAvatarMenu()
    logUserOut()
    navigate("/")
  }

  const avatarButton = (
    <EuiHeaderSectionItemButton
      aria-label="User avatar"
      onClick={() => auth?.user && toggleAvatarMenu()}
    >
      {auth?.user ? (
        <EuiAvatar
          size="l"
          name={auth.user.first || auth.user.last || "Anonymous"}  
          initialsLength={2}
          imageUrl={auth.user.image}
        />
      ) : (
        <Link to="/login">
          <EuiAvatar size="l" color="#1E90FF" name="user" imageUrl={loginIcon} />
        </Link>
      )}
    </EuiHeaderSectionItemButton>
  )

  const renderAvatarMenu = () => {
    if (!auth?.user) return null

    return (
      <AvatarMenu>
        <EuiAvatar
          size="xl"
          name={auth.user.first || auth.user.last || "Anonymous"}  
          initialsLength={2}
          imageUrl={auth.user.image}
        />
        <EuiFlexGroup direction="column" className="avatar-actions">
          <EuiFlexItem grow={1}>
            <p>
              {auth.user.first} - {auth.user.last}
            </p>
          </EuiFlexItem>

          <EuiFlexItem grow={1}>
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem grow={1}>
                <Link to="/profile">Profile</Link>
              </EuiFlexItem>
              <EuiFlexItem grow={1}>
                <EuiLink onClick={() => handleLogout()}>Log out</EuiLink>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </AvatarMenu>
    )
  }

  return (
    <EuiHeader style={props.style || {}}>
      <EuiHeaderSection>
        <EuiHeaderSectionItem border="right">
          <LogoSection href="/">
            <EuiIcon type={logoIconAsReactSVGComponent} color="#1E90FF" size="l" /> 
          </LogoSection>
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLinks aria-label="app navigation links">

            <EuiHeaderLink iconType="tag" onClick={() => navigate("/opportunities")}>  
              Find Opportunities
            </EuiHeaderLink>

            <EuiHeaderLink iconType="help" href="#">
              Help
            </EuiHeaderLink>
          </EuiHeaderLinks>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>

      <EuiHeaderSection>
        <EuiPopover
          id="avatar-menu"
          isOpen={avatarMenuOpen}
          closePopover={closeAvatarMenu}
          anchorPosition="downRight"
          button={avatarButton}
          panelPaddingSize="l"
        >
          {renderAvatarMenu()}
        </EuiPopover>
      </EuiHeaderSection>
    </EuiHeader>
  )
}

export default connect((state) => ({ auth: state.auth }), {
  logUserOut: authActions.logUserOut
})(Navbar)

