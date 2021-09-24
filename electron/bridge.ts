import { contextBridge, ipcRenderer, remote } from 'electron'
import { ProRes, removeFileExtension, getRecipe, getPresetNumber } from '../src/utils'
// import makeProRes from './makeProRes'
import { exec } from 'child_process'
import FfmpegCommand from 'fluent-ffmpeg'

interface DialogResult {
  canceled: boolean,
  filePaths: string[]
}
 
export interface ConvertStatus {
  progress?: number
  hasEnded: boolean
  isComplete: boolean
  hasStarted: boolean
  errorMessage: string
}

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

  convert: (
    filePath: string,
    fileName: string,
    toPath: string,
    preset: ProRes,
    callBack: (feedback: object) => void
  ) => {
    const cleanName = removeFileExtension(fileName)
    const recipe = getRecipe(preset)
    exec(
      `ffmpeg -i '${filePath}' ${recipe} '${toPath}/${cleanName}.mov'`,
      (error: any, data: any, getter: any) => {
        if (error) {
          return console.log('error', error.message)
        }
        if (getter) {
          console.log('getter', getter, 'data', data)
        }

        callBack({ data, getter, error })
      }
    )
  },
  /**
   * This function will return a thumbnail
   * @param filePath
   * @param toPath
   */
  thumbNail: (filePath: string, toPath: string) => {
    FfmpegCommand(filePath)
      // setup event handlers
      .on('filenames', function (filenames) {
        console.log('screenshots are ' + filenames.join(', '))
      })
      .on('end', function () {
        console.log('screenshots were saved')
      })
      .on('error', function (err) {
        console.log('an error happened: ' + err.message)
      })
      // take 2 screenshots at predefined timemarks and size
      .takeScreenshots(
        { count: 2, timemarks: ['00:00:02.000', '6'], size: '1280x720' },
        toPath
      )
  },
  makeProRes: (filePath: string, fileName: string, toPath: string, preset: ProRes, index: number, makeUpdate: (index: number, update: ConvertStatus) => void) => {
    const cleanName = removeFileExtension(fileName)
    FfmpegCommand(filePath)
      .videoCodec('prores_ks')
      .audioCodec('pcm_s16le')
      .outputOptions([`-profile:v ${getPresetNumber(preset)}`, '-qscale:v 9', '-vendor ap10', '-pix_fmt yuv422p10le'])
      .on('start', function (filenames) {
        const update: ConvertStatus = {
          progress: undefined,
          hasEnded: false,
          errorMessage: '',
          hasStarted: true,
          isComplete: false
        }
        makeUpdate(index, update)
      })
      .on('progress', function (info) {
        const update: ConvertStatus = {
          progress: info.percent,
          hasEnded: false,
          errorMessage: '',
          hasStarted: true,
          isComplete: false
        }
        makeUpdate(index, update)
        // console.log('progress ' + info.percent + '%');
      })
      .on('end', function () {
        const update: ConvertStatus = {
          progress: undefined,
          hasEnded: true,
          errorMessage: '',
          hasStarted: true,
          isComplete: true
        }
        makeUpdate(index, update)
        // console.log('File has completed')
      })
      .on('error', function (err) {
        const message = 'an error happened: ' + err.message
        const update: ConvertStatus = {
          progress: undefined,
          hasEnded: false,
          errorMessage: message,
          hasStarted: true,
          isComplete: false
        }
        makeUpdate(index, update)
        // console.log('an error happened: ' + err.message)
      })
      .save(`${toPath}/${cleanName}.mov`);
  },
  /**
   *
   * @param channel
   * @param callback
   */
  getFolder: async () => {
    
    return new Promise<DialogResult>((resolve, reject) => {
      const result = remote.dialog.showOpenDialog({properties: ['openDirectory']})

      result.then((results) => {
        resolve(results)
      })

      result.catch((err) => {
        reject(err)
      })
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
