import { default as HomePage } from './HomePage';
import conf from 'config/app'

export default class extends HomePage {

  changeValue(fieldname, value){
    this.context.actions.setData("home", { [fieldname]: value})
  }

  async requestGitHubData(username){
    const { githubURL } = conf.config
    const url = String(githubURL).replace("@username", username)
    const result = await this.context.actions.requestData(url)
    this.context.actions.setData("home",
      { "error": (result.error!==null), "repos": result.data||[] })
  }

}
