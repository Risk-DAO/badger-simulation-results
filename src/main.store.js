import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"

class MainStore {
  loading = true
  imageList = []
  constructor () {
    makeAutoObservable(this)
    this.fetchData()
  }

  fetchData = async ()=> {
    this.loading = true
    await this.getCachedFiles()
    runInAction(()=> this.loading = false)
  }

  getCachedFiles = async () => {
    const {data: allFiles} = await axios.get('https://api.github.com/repos/Risk-DAO/badger-simulation-results/git/trees/main?recursive=1');
    const results = allFiles.tree
      .filter(x=> x.path.indexOf('public/results') > - 1 && x.path.indexOf('.jpg') > -1)
      .map(({path})=> path.replace('public/results/', ''))
    runInAction(()=> this.imageList = results)
  }


  getListByParamPosition = (location) => {
    if (!this.imageList.length){
      return []
    }
    return [...new Set(this.imageList
      .map(imgName => {
        const name = imgName.replace(".jpg", "")
        const param = name.split("+")[location]
        const [,val] = param.split("-")
        return val
      }))]
      .sort()
  }
}

export default new MainStore()