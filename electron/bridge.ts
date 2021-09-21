import { contextBridge, ipcRenderer } from 'electron'
import { ProRes, removeFileExtension, getRecipe } from '../src/utils'
// import makeProRes from './makeProRes'
import { exec } from 'child_process';

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */

  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },

  convert: (filePath: string, fileName: string, toPath: string, preset: ProRes, callBack: (feedback: object)=>void) => {
    const cleanName = removeFileExtension(fileName)
    const recipe = getRecipe(preset)
    exec(`ffmpeg -i '${filePath}' ${recipe} '${toPath}/${cleanName}.mov'`, (error: any, data: any, getter: any) => {
      if (error) {
       return console.log('error', error.message) 
      }
      if (getter) {
      console.log('getter', getter, 'data', data)
      }
      
      callBack({data, getter, error})
    })
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },
}

contextBridge.exposeInMainWorld('Main', api)
