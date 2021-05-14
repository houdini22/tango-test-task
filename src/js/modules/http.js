import axios from 'axios'
import { actions as commonActions } from '../reducers/common'
import { store } from '../../index'
import config from '../config/index'

const { setConnectionErrorModalVisible } = commonActions

const instance = axios.create({
  baseURL: config['api']['baseURL'],
  timeout: config['api']['timeout'],
})

instance.interceptors.response.use(undefined, (error) => {
  if (error.message === 'Network Error') {
    store.dispatch(setConnectionErrorModalVisible(true))
  }
  return Promise.reject(error)
})

const setAuthToken = (token) => {
  instance.defaults.headers.common['X-SESSION-TOKEN'] = token
}

const processAPIerrorResponseToFormErrors = (response) => {
  return {}
}

export default instance
export { setAuthToken, instance as http, processAPIerrorResponseToFormErrors }
