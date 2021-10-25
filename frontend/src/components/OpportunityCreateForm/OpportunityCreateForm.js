import React from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Actions as postActions } from "../../redux/opportunities"
import PlacesAutoComplete from "react-places-autocomplete"

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldNumber,
  EuiSuperSelect,
  EuiSpacer,
  EuiText,
  EuiTextArea,
  EuiFilePicker,
  EuiDatePicker,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui"
import validation from "../../utils/validation"
import { extractErrorMessages } from "../../utils/errors"
import styled from "styled-components"
import moment from "moment"


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
  width: 520px;
`


function OpportunityCreateForm ({ user, opportunityError, isLoading, createOpportunity }) {
  const [form, setForm] = React.useState({
    title: "",
    short_desc: "",
    long_desc: "",
    location: "",
  })
  const [errors, setErrors] = React.useState({})
  const [address, setAddress] = React.useState("")
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const [startDate, setStartDate] = React.useState(moment());

  const navigate = useNavigate()

  const handleDateChange = (date) => {
    setStartDate(date);
  }
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
    setForm((form) => ({ ...form, ['location']: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // validate inputs before submitting
    Object.keys(form).forEach((label) => validateInput(label, form[label]))

    // if any input hasn't been entered in, return early
    if (!Object.values(form).every((value) => Boolean(value))) {
      setErrors((errors) => ({ ...errors, form: `You must fill out all fields.` }))
      return
    }

    setHasSubmitted(true)

    const res = await createOpportunity({
      title: form.title,
      short_desc: form.short_desc,
      long_desc: form.long_desc,
      location: form.location

    })
    if (res?.data) {
      const opportunityId = res.data.id
      navigate(`/opportunities/org/${opportunityId}`)
      // redirect user to new cleaning job post
    }
  }

  return (
    <>
      <EuiForm
        component="form"
        onSubmit={handleSubmit}
        isInvalid={Boolean(errors.form)}
        error={errors.form}
      >
        <EuiFlexGroup style={{maxWidth: 600}}>
          <EuiFlexItem>

            <EuiFormRow
              label="Title"
              helpText="Title of your Volunteering Opportunity"
              isInvalid={Boolean(errors.title)}
              error={`Please enter a valid name.`}
            >
              <EuiFieldText
                name="title"
                value={form.title}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            </EuiFormRow>
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiFormRow label="Select a date">
              <EuiDatePicker selected={startDate} onChange={handleDateChange} />
            </EuiFormRow> 
          </EuiFlexItem>


        </EuiFlexGroup>

        <EuiFlexGroup style={{maxWidth: 600}}>
          <EuiFlexItem>
            <EuiFormRow
              label="Short Description"
              helpText="A brief introduction to your opportunity"
              isInvalid={Boolean(errors.short_desc)}
              error={`Please enter a valid input.`}
            >
              <EuiTextArea
                style={{minWidth: 520}}
                name="short_desc"
                placeholder="A fun, exciting opportunity..."
                value={form.short_desc}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiFlexGroup style={{maxWidth: 600}}>
          <EuiFlexItem>
            <EuiFormRow
              label="Long Description"
              helpText="A longer, more detailed introduction to your opportunity"
              isInvalid={Boolean(errors.long_desc)}
              error={`Please enter a valid input.`}
            >
              <EuiTextArea
                style={{minWidth: 520}}
                name="long_desc"
                placeholder="A fun, exciting opportunity..."
                value={form.long_desc}
                onChange={(e) => onInputChange(e.target.name, e.target.value)}
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiFlexGroup style={{maxWidth: 600}}>
          <EuiFlexItem>
            <EuiFormRow
              style={{minWidth: 520}}
              label="Location"
              helpText="Start typing to search for a locationz"
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
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiFlexGroup style={{maxWidth: 600}}>
          <EuiFlexItem>
            <EuiFormRow
              label="Images"
              helpText="Use Images to help people see what you're all about!"
              isInvalid={Boolean(errors.long_desc)}
              error={`Please enter a valid input.`}
            >
              <EuiFilePicker
                name="image"
                placeholder="A fun, exciting opportunity..."
              />
            </EuiFormRow>
          </EuiFlexItem>
        </EuiFlexGroup>

        

        

        

        <EuiSpacer />

        <EuiButton type="submit" isLoading={isLoading} fill>
          Publish Opportunity
        </EuiButton>
      </EuiForm>
    </>
  )
}


export default connect(state => ({
  user: state.auth.user,
  opportunityError: state.posts.error,
  isLoading: state.posts.isLoading,
}), {
  createOpportunity: postActions.createPost
})(OpportunityCreateForm)