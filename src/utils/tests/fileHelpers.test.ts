import { removeFileExtension, getFileExtension } from '../index'
// import { PROPRES_422, PROPRES_HQ, PROPRES_4444, PROPRES_LT, PROPRES_PROXY } from '../recipes'

describe('removeFileExtension', () => {
  it('should return an empty string', () => {
    const emptyFile = ''
    expect(removeFileExtension(emptyFile)).toEqual('')
  })
  it('should return file name without extension', () => {
    const fileName = 'mockFile.mp4'
    const expectedFile = 'mockFile'
    const newFileName = removeFileExtension(fileName)
    expect(newFileName).toEqual(expectedFile)
  })
  it('should return file name without extension when file has many "."', () => {
    const fileName = 'mock.F.i.le.mp4'
    const expectedFile = 'mock.F.i.le'
    const newFileName = removeFileExtension(fileName)
    expect(newFileName).toEqual(expectedFile)
  })
})

describe('getFileExtension', () => {
  it('should return file extension', () => {
    const fileName = 'mock.File.mp4'
    const expectedExtension = 'mp4'
    const newFileName = getFileExtension(fileName)
    expect(newFileName).toEqual(expectedExtension)
  })
  
})

// describe('getRecipe', () => {
//   it('Return ProRes Proxy', () => {
//     expect(getRecipe(ProRes.PROXY)).toEqual(PROPRES_PROXY)
//   })
//   it('Return ProRes LT', () => {
//     expect(getRecipe(ProRes.LT)).toEqual(PROPRES_LT)
//    })
//   it('Return ProRes 422', () => {
//     expect(getRecipe(ProRes.STANDARD)).toEqual(PROPRES_422)
//    })
//   it('Return ProRes HQ', () => {
//     expect(getRecipe(ProRes.HQ)).toEqual(PROPRES_HQ)
//   })
//   it('Return ProRes 4444', () => {
//     expect(getRecipe(ProRes.Quad4)).toEqual(PROPRES_4444)
//   })
// })

