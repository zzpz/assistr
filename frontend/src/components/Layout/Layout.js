import React from "react"
import { Helmet } from "react-helmet"
import { Navbar } from "../../components"
import styled, { ThemeProvider } from "styled-components"
import euiVars from "@elastic/eui/dist/eui_theme_light.json"
import "@elastic/eui/dist/eui_theme_light.css"
import "../../assets/css/fonts.css"
import "../../assets/css/override.css"

const customTheme = {
  ...euiVars,
  euiTitleColor: "dodgerblue",
  euiColorPrimary: "dodgerblue",
}

const StyledLayout = styled.div`
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  background: rgb(0,75,103);
  background: linear-gradient(180deg, rgba(0,75,103,1) 21%, rgba(36,127,155,1) 74%, rgba(78,187,216,1) 99%);
  display: flex;
  flex-direction: column;
`

const StyledMain = styled.main`
  min-height: calc(100vh - ${(props) => props.theme.euiHeaderHeight} - 1px);
  display: flex;
  flex-direction: column;

  & h1 {
    color: ${(props) => props.theme.euiTitleColor};
  }
`

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>assistr.</title>
        <link rel="canonical" href="https://assistr.com.au" />
      </Helmet>
      <ThemeProvider theme={customTheme}>
        <StyledLayout>
          <Navbar />
          <StyledMain>{children}</StyledMain>
        </StyledLayout>
      </ThemeProvider>
    </React.Fragment>
  )
}

