import * as fs from 'fs'


export const raceFiles = (file: string | string[]): Promise<string> =>{
    return new Promise((resolve,reject)=>{
        if(Array.isArray(file)){
            let filesTries = file.map(item=>{
                return {path:item,access:tryFile(item)}
            })
            let successFiles = filesTries.filter(item => {
                return item.access
            })
            if(successFiles.length>0){
                resolve(successFiles[0].path)
            }else{
                reject()
            }
        }else{
           if(tryFile(file)){
               resolve(file)
           }else{
               reject()
           }
        }
    })
}

const tryFile = (path) =>{
    try{
        fs.accessSync(path)
        return true
    }catch(err){
        return false
    }
}