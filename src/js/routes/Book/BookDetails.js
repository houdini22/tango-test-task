import React from 'react'
import { Card, Col, LoadingOverlay, Row } from '../../components'
import axios from 'axios'
import { formatDateTime } from '../../helpers/date-time'

class BookDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      book: null,
      isLoading: false,
    }
  }

  componentDidMount() {
    const { bookId } = this.props

    this.setState({ isLoading: true }, () => {
      axios
        .get(`https://anapioficeandfire.com/api/books/${bookId}`)
        .then((response) => {
          this.setState({ book: response['data'], isLoading: false })
        })
    })
  }

  render() {
    const { book, isLoading } = this.state

    return (
      <Card>
        <Row>
          <Col xs={3}>Name</Col>
          <Col xs={9}>{book?.name}</Col>
        </Row>

        <Row>
          <Col xs={3}>ISBN</Col>
          <Col xs={9}>{book?.isbn}</Col>
        </Row>

        <Row>
          <Col xs={3}>Number of pages</Col>
          <Col xs={9}>{book?.numberOfPages}</Col>
        </Row>

        <Row>
          <Col xs={3}>Release date</Col>
          <Col xs={9}>{formatDateTime(book?.release)}</Col>
        </Row>

        {isLoading && <LoadingOverlay />}
      </Card>
    )
  }
}

export { BookDetails }
export default { BookDetails }
