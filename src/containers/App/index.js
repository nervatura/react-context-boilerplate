import { default as App } from "./App";
import request from './request';
import config from 'config/app'

export default class extends App {

  constructor(props) {
    super(props);

    this.state = props.data || config.data
    this.actions = {
      setData: this.setData.bind(this),
      requestData: this.requestData.bind(this)
    }

  }

  setData(key, data) {
    if(key && this.state[key] && typeof data === "object" && data !== null){
      this.setState({ [key]: Object.assign(this.state[key], data) })
    } else if(key){
      this.setState({ [key]: data })
    }
  }

  async requestData(requestURL, options) {
    try {
      this.actions.setData("request", true)
      const result = await request(requestURL, options)
      this.actions.setData("request", false)
      return { error: null, data: result }
    } catch (err) {
      this.actions.setData("request", false)
      return { error: err, data: null }
    }
  }

}