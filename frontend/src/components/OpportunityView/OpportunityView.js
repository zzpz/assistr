import React from "react"
import { connect } from "react-redux"
import { Actions as postActions } from "../../redux/opportunities"
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiLoadingSpinner
} from "@elastic/eui"
import { OpportunityViewCard, NotFoundPage, OpportunityHome } from "../../components"
import { useParams } from "react-router-dom"
import styled from "styled-components"

const StyledEuiPage = styled(EuiPage)`
  flex: 1;
  background: rgb(0,75,103);
background: linear-gradient(180deg, rgba(0,75,103,1) 21%, rgba(36,127,155,1) 74%, rgba(78,187,216,1) 99%);
`

function OpportunityView({
  isLoading,
  postsError,
  currentPost,
  fetchPostById,
  clearCurrentOpportunity
}) {
  const { opportunity_id } = useParams()

  React.useEffect(() => {
    if (opportunity_id) {
      fetchPostById({ opportunity_id })
    }

    return () => clearCurrentOpportunity()
  }, [opportunity_id, fetchPostById, clearCurrentOpportunity])

  if (isLoading) return <EuiLoadingSpinner size="xl" />
  if (!currentPost) return <EuiLoadingSpinner size="xl" />
  if (!currentPost?.title) return <NotFoundPage />

  console.log(currentPost);
  return (
    <StyledEuiPage>
      <EuiPageBody component="section">
        <EuiPageContent verticalPosition="center" horizontalPosition="center" paddingSize="none">
          <EuiPageContentBody>
            
            <OpportunityViewCard post={currentPost} opportunity_id={opportunity_id} />

          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </StyledEuiPage>
  )
}

export default connect(
  (state) => ({
    isLoading: state.posts.isLoading,
    postsError: state.posts.error,
    currentPost: state.posts.currentPost
  }),
  {
    fetchPostById: postActions.fetchPostById,
    clearCurrentOpportunity: postActions.clearCurrentOpportunity
  }
)(OpportunityView)

