import React from 'react'
import {
  Card,
  Col,
  Row,
  Select,
  TextField,
  Typography,
} from '../../../components'

class CharactersFilters extends React.Component {
  render() {
    const { setFilter } = this.props

    return (
      <>
        <Typography.Container>
          <h1>Filters</h1>
        </Typography.Container>

        <Row>
          <Col xs={3}>Gender</Col>
          <Col xs={9}>
            <Select
              placeholder
              options={[
                {
                  label: 'male',
                  value: 'male',
                },
                {
                  label: 'female',
                  value: 'female',
                },
                {
                  label: 'unknown',
                  value: 'unknown',
                },
              ]}
              onChange={(e) => {
                setFilter('gender', e.target.value)
              }}
            ></Select>
          </Col>
        </Row>

        <Row>
          <Col xs={3}>Name</Col>
          <Col xs={9}>
            <TextField
              name="name"
              onChange={(e) => {
                setFilter('name', e.target.value)
              }}
            />
          </Col>
        </Row>
      </>
    )
  }
}

export { CharactersFilters }
export default { CharactersFilters }
