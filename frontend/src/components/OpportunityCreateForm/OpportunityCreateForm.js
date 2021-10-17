import React from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Actions as postActions } from "../../redux/opportunities"

import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldNumber,
  EuiSuperSelect,
  EuiSpacer,
  EuiText,
  EuiTextArea
} from "@elastic/eui"
import validation from "../../utils/validation"
import { extractErrorMessages } from "../../utils/errors"

function OpportunityCreateForm ({ user, opportunityError, isLoading, createOpportunity }) {
  const [form, setForm] = React.useState({
    title: "",
    short_desc: "",
    long_desc: "",
    location: "",
  })
  const [errors, setErrors] = React.useState({})
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const navigate = useNavigate()
  const opportunityErrorList = extractErrorMessages(opportunityError)

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
    if (res?.success) {
      const opportunityId = res.id
      navigate(`/opportunities/${opportunityId}`)
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

        <EuiFormRow
          label="Short Description"
          helpText="A brief introduction to your opportunity"
          isInvalid={Boolean(errors.short_desc)}
          error={`Please enter a valid input.`}
        >
          <EuiTextArea
            name="short_desc"
            placeholder="A fun, exciting opportunity..."
            value={form.short_desc}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Long Description"
          helpText="A longer, more detailed introduction to your opportunity"
          isInvalid={Boolean(errors.long_desc)}
          error={`Please enter a valid input.`}
        >
          <EuiTextArea
            name="long_desc"
            placeholder="A fun, exciting opportunity..."
            value={form.long_desc}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Location"
          helpText="What do you want prospective employees to know about this opportunity?"
          error={`Please enter a valid input.`}
        >
          <EuiFieldText
            name="location"
            placeholder="Location of opportunity"
            value={form.location}
            onChange={(e) => onInputChange(e.target.name, e.target.value)}
          />
        </EuiFormRow>

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