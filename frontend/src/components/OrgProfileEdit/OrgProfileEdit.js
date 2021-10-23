import React from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Actions as authActions } from "../../redux/auth"
import PlacesAutoComplete from "react-places-autocomplete"

import {
  EuiPage,
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldNumber,
  EuiSuperSelect,
  EuiSpacer,
  EuiText,
  EuiTextArea, 
  EuiPageHeader,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeaderSection,
  EuiTitle
} from "@elastic/eui"
import validation from "../../utils/validation"
import styled from "styled-components"

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
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
const StyledLocationSearch = styled.div`
  border-bottom: honeydew;
  border-left: honeydew;
  border-right: honeydew;
  border-top: 1px solid #e6e6e6;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  position: absolute;
  z-index: 1000;
  border-radius: 0 0 2px 2px;
  background-color: white;
  width: 240px;
`

function OrgProfileEdit ({ user, opportunityError, isLoading, updateProfile }) {
  const [form, setForm] = React.useState({
    org_name: "",
    org_loc: "",
    phone: "",
    bio: "",
  })
  const [errors, setErrors] = React.useState({})
  const [address, setAddress] = React.useState("")
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const navigate = useNavigate()
  // const opportunityErrorList = extractErrorMessages(opportunityError)

  const validateInput = (label, value) => {
    // grab validation function and run it on input if it exists
    // if it doesn't exists, just assume the input is valid
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true
    // set an error if the validation function did NOT return true
    setErrors((errors) => ({ ...errors, [label]: !isValid }))
  }

  const onInputChange = (label, value) => {
    // validateInput(label, value)

    setForm((form) => ({ ...form, [label]: value }))
  }
  const handleAddressChange = (value) => {
    setAddress(value);
  }


  const handleAddressSelect = (value) => {
    setAddress(value);
    setForm((form) => ({ ...form, ['org_loc']: value }))
  }

  const handleSubmit = async (e) => {
    console.log("BRO WHAT")

    e.preventDefault()

    // validate inputs before submitting
    Object.keys(form).forEach((label) => validateInput(label, form[label]))



    setHasSubmitted(true)


    const res = await updateProfile({
      org_name: form.org_name,
      org_loc: form.org_loc,
      phone: form.phone,
      bio: form.bio

    })
    console.log("BROO")
    console.log(res)
    if (res?.data) {
      console.log("YAY")

      navigate(`/profile`)
      // redirect user to new cleaning job post
    }
  }

  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
          <StyledEuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Edit Org Profile</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
          </StyledEuiPageHeader>
          <EuiPageContent verticalPosition="center" horizontalPosition="center">
            <EuiPageContentBody>
              <EuiForm
                component="form"
                onSubmit={handleSubmit}
                isInvalid={Boolean(errors.form)}
                error={errors.form}
              >
                <EuiFormRow
                  label="Organisation Name"
                  error={`Please enter a valid name.`}
                >
                  <EuiFieldText
                    name="org_name"
                    placeholder="First"
                    value={form.first}
                    onChange={(e) => onInputChange(e.target.name, e.target.value)}
                  />
                </EuiFormRow>

                <EuiFormRow
                  label="Location"
                  error={`Please enter a valid name.`}
                >
                  <div>
                    <PlacesAutoComplete value = {address} onChange={handleAddressChange} onSelect={handleAddressSelect}>
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          <input {...getInputProps({ 
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                          })} />

                          <StyledLocationSearch className="autocomplete-dropdown-container">
                            {loading ? <div>...loading</div> : null}
                            {suggestions.map((suggestion) => {
                              return <div {...getSuggestionItemProps(suggestion)}>{suggestion.description}</div>
                            })}
                          </StyledLocationSearch>
                        </div>)}
                    </PlacesAutoComplete>
                  </div>
                </EuiFormRow>

                <EuiFormRow
                  label="Bio"
                  helpText="A short description of yourself"
                  isInvalid={Boolean(errors.bio)}
                  error={`Please enter a valid input.`}
                >
                  <EuiTextArea
                    name="bio"
                    placeholder="I am a ..."
                    value={form.bio}
                    onChange={(e) => onInputChange(e.target.name, e.target.value)}
                  />
                </EuiFormRow>

                <EuiFormRow
                  label="Phone"
                  helpText="Phone Number"
                  error={`Please enter a valid input.`}
                >
                  <EuiFieldText
                    name="phone"
                    placeholder="#"
                    value={form.phone}
                    onChange={(e) => onInputChange(e.target.name, e.target.value)}
                  />
                </EuiFormRow>

                <EuiSpacer />

                <EuiButton type="submit" isLoading={isLoading} fill>
                  Update Profile
                </EuiButton>
              </EuiForm>
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </StyledEuiPage>
      
  )
}


export default connect(state => ({
  user: state.auth.user,
  authError: state.auth.error,
  isLoading: state.auth.isLoading,
}), {
  updateProfile: authActions.updateOrgFromToken
})(OrgProfileEdit)
