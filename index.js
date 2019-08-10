const express=require('express')
const bodyParser=require('body-parser')
const busboy=require('connect-busboy')
const fs=require('fs')
const path=require('path')
// const multer =require('multer')
const app= express()
const port=process.env.PORT||3000
app.use(busboy({
	highWaterMark:2*1024*1024
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.get('/cool',(req,res)=>{
	res.send('hello bbe')
})
app.post('/uploadfile',(req,res)=>{
	req.pipe(req.busboy)
	req.busboy.on('file',(fieldname,file,filename)=>{
		console.log('Upload of '+filename+' started')
		//creating write stream
		console.log(file)
		const fstream=fs.createWriteStream(path.join('uploads/',filename))

		//pipe it through
		file.pipe(fstream)

		//finish upload
		fstream.on('close',()=>{
			console.log('upload of '+filename+'finished')
			res.send('file uploaded ')
		})
	})
})

app.listen(port,()=>{
	console.log('Server started on port '+port)
})