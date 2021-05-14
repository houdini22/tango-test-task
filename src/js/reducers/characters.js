import axios from 'axios'

export const LOAD_LIST = 'characters::load_list'
export const SET_IS_LOADING = 'characters::set_is_loading'
export const SET_CHARACTERS = 'characters::set_characters'
export const SET_FILTER = 'characters::set_filter'
export const SET_ITEMS_PER_PAGE = 'characters::set_items_per_page'
export const SET_PAGE = 'characters::set_page'
export const SET_PAGINATION = 'characters::set_pagination'

const parseQuery = (queryString) => {
  const query = {}
  const pairs = (queryString[0] === '?'
    ? queryString.substr(1)
    : queryString
  ).split('&')
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }
  return query
}

const parsePagination = (str) => {
  const result = {}
  const split = str.split(',')

  split.forEach((_str) => {
    let [url, rel] = _str.split(';')

    url = url.replace('>', '').replace('<', '')
    const found = rel.match(/rel\=\"(.*)\"/i)
    result[found[1]] = parseQuery(url.split('?')[1])['page']
  })

  return result
}

// actions

const loadList = () => async (dispatch, getState) => {
  return new Promise((resolve) => {
    const state = getState()
    const {
      characters: { itemsPerPage, page },
    } = state

    dispatch(setIsLoading(true))

    return axios
      .get(
        `https://anapioficeandfire.com/api/characters/?pageSize=${itemsPerPage}&page=${page}`,
      )
      .then((response) => {
        resolve(response['data'])
        dispatch(setIsLoading(false))
        dispatch(setCharacters(response['data']))
        dispatch(setPagination(parsePagination(response['headers']['link'])))

        return response['data']
      })
      .catch(() => {
        dispatch(setIsLoading(false))
      })
  })
}

const setIsLoading = (value) => (dispatch) => {
  dispatch({ type: SET_IS_LOADING, payload: value })
}

const setCharacters = (value) => (dispatch) => {
  dispatch({ type: SET_CHARACTERS, payload: value })
}

const setFilter = (name, value) => (dispatch) => {
  dispatch({ type: SET_FILTER, payload: { name, value } })
}

const setItemsPerPage = (value) => (dispatch) => {
  dispatch({ type: SET_ITEMS_PER_PAGE, payload: value })
  dispatch(loadList())
}

const setPage = (value) => (dispatch) => {
  dispatch({ type: SET_PAGE, payload: value })
  dispatch(loadList())
}

const setPagination = (value) => (dispatch) => {
  dispatch({ type: SET_PAGINATION, payload: value })
}

export const actions = {
  loadList,
  setFilter,
  setItemsPerPage,
  setPage,
}

// action handlers

const ACTION_HANDLERS = {
  [SET_CHARACTERS]: (state, { payload }) => {
    return {
      ...state,
      characters: [...payload],
    }
  },
  [SET_IS_LOADING]: (state, { payload }) => {
    return {
      ...state,
      isLoading: payload,
    }
  },
  [SET_FILTER]: (state, { payload: { name, value } }) => {
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: value,
      },
    }
  },
  [SET_ITEMS_PER_PAGE]: (state, { payload: value }) => {
    return {
      ...state,
      itemsPerPage: value,
    }
  },
  [SET_PAGE]: (state, { payload: value }) => {
    return {
      ...state,
      page: value,
    }
  },
  [SET_PAGINATION]: (state, { payload: value }) => {
    return {
      ...state,
      pagination: value,
    }
  },
}

// reducers

const initialState = {
  characters: [],
  isLoading: false,
  filters: {},
  page: 1,
  itemsPerPage: 10,
  pagination: {},
}

export default function userReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['characters']
const getFilters = (state) => getState(state)['filters']
const getCharacters = (state) =>
  getState(state)['characters'].filter((character) => {
    const filters = getFilters(state)
    const results = []

    Object.keys(filters).forEach((key) => {
      if (key === 'name') {
        results.push(
          character['name']
            .toLowerCase()
            .startsWith(filters[key].toLowerCase()),
        )
      } else if (key === 'gender') {
        if (filters[key] === 'unknown') {
          results.push(character['gender'] === '')
        } else if (filters[key]) {
          results.push(character['gender'].toLowerCase() === filters[key])
        }
      }
    })

    for (let i = 0; i < results.length; i += 1) {
      if (!results[i]) {
        return false
      }
    }

    return true
  })
const getIsLoading = (state) => getState(state)['isLoading']
const getPage = (state) => getState(state)['page']
const getPagination = (state) => getState(state)['pagination']

export const selectors = {
  getState,
  getCharacters,
  getIsLoading,
  getPage,
  getPagination,
}
