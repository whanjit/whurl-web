export class Storages {
  save(cname, cvalue) {
    let message = JSON.stringify(cvalue)
    localStorage.setItem(cname, message)
  }

  load(cname) {
    let temp = localStorage.getItem(cname)
    //if(temp === undefined)return undefined
    if (temp !== undefined && temp !== '') 
      return JSON.parse(temp)
    else return undefined
  }

  remove(cname) {
    localStorage.removeItem(cname)
  }
}

export const storage = new Storages()
export default storage