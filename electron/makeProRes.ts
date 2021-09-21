import { ProRes } from '../src/utils'
import { exec } from 'child_process';

const makeProRes = (filePath: string,  fileName: string, toPath: string, preset: ProRes) => {
  console.log('file path ' + filePath)
  exec(`ffmpeg -i '${filePath}' -vcodec prores_ks -profile:v 2 -qscale:v 9 -vendor ap10 -pix_fmt yuv422p10le -acodec pcm_s16le '${toPath}/${fileName}.mov'`, (error: any, data: any, getter: any) => {
    if (error) {
      console.log('error', error.message)
      return
    }
    if (getter) {
      console.log('getter', getter, 'data', data)
      return
    }
    console.log('data', data)
  })
  // const ffmpeg = require(`./lib${process.env.FLUENTFFMPEG_COV ? '-cov' : ''}/fluent-ffmpeg`);
  // const Ffmpeg = require(`fluent-ffmpeg`);
  // const command = new Ffmpeg();
  // command(file.path)
  //   // use the 'podcast' preset (located in /lib/presets/podcast.js)
  //   .preset('../presets/proRes422')
  //   // setup event handlers
  //   .on('start', () => {
  //     console.log(`starting file ${file.name}`)
  //   })
  //   .on('end', () => {
  //     console.log('file has been converted successfully')
  //   })
  //   .on('error', (err: any) => {
  //     console.log(`an error happened: ${err.message}`)
  //   })
  //   // save to file
  //   .save(to)
}

export default makeProRes