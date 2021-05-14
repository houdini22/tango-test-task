import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions, selectors } from '../../reducers/characters'

const { loadList, setFilter, setItemsPerPage, setPage } = actions
const { getCharacters, getIsLoading, getPage, getPagination } = selectors

class CharactersManagerBase extends React.Component {
  componentDidMount() {
    const { loadList } = this.props

    loadList()
  }

  setFilter(name, value) {
    const { setFilter } = this.props

    setFilter(name, value)
  }

  setItemsPerPage(itemsPerPage) {
    const { setItemsPerPage } = this.props

    setItemsPerPage(itemsPerPage)
  }

  setPage(page) {
    const { setPage } = this.props

    setPage(page)
  }

  render() {
    const { children, characters, isLoading, page, pagination } = this.props

    const renderProps = {
      characters,
      isLoading,
      page,
      pagination,
      setFilter: this.setFilter.bind(this),
      setItemsPerPage: this.setItemsPerPage.bind(this),
      setPage: this.setPage.bind(this),
    }

    return children(renderProps)
  }
}

const mapStateToProps = (state) => ({
  characters: getCharacters(state),
  isLoading: getIsLoading(state),
  page: getPage(state),
  pagination: getPagination(state),
})

const CharactersManager = connect(mapStateToProps, (dispatch) => {
  return bindActionCreators(
    {
      loadList,
      setFilter,
      setItemsPerPage,
      setPage,
    },
    dispatch,
  )
})(CharactersManagerBase)

export { CharactersManager }
export default { CharactersManager }
