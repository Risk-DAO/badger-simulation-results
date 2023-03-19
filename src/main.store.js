import { makeAutoObservable, runInAction } from "mobx"
import axios from "axios"

const queryDict = {}
window.location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})

class MainStore {
  loading = true
  imageList = []
  entity =  queryDict.entity 
  repo = queryDict.repo
  dir = queryDict.dir || ""
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
    const {data: allFiles} = await axios.get(`https://api.github.com/repos/${this.entity}/${this.repo}/git/trees/main?recursive=1`);
    const results = allFiles.tree
      .filter(x=> x.path.indexOf(this.dir) > - 1 && x.path.indexOf('.jpg') > -1)
      .filter(x=> {

        if(this.dir.length == 0){
          return x.path.indexOf('/') == -1
        }
        return true
      })
      .map(({path})=> path.replace(this.dir, ''))
      debugger
      console.log({results})
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
      .sort((a, b)=> {
        return parseFloat(a) - parseFloat(b);
      })
  }
}

export default new MainStore()