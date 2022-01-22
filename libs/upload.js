import multer from 'multer'

//Storage file inside media of the project
// const upload = multer({
//   dest: 'media/'
// })
//almacena los archivos en memoria como si fuera un buffer
const storage = multer.memoryStorage()
const upload = multer({
  storage
})

export { upload }
