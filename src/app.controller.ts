import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs'
import * as path from 'path';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
var ffmpeg = require('fluent-ffmpeg')

  ffmpeg.setFfmpegPath(ffmpegPath)
  import { Buffer } from "buffer";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("myogg1")
  getHello(): string {
    
    return this.appService.getHello();
  }
  @Post('myogg')
  async agregaRegistro(@Body() cuerpo:any){
    //lista las carpetas
    const res = cuerpo.base64 
    const base = fixPathAudio("filteName.oga")
    const audiomp3 = fixPathAudio("audio.mp3")
    
    //base64 to oga
    try {  
      await fs.promises.writeFile(base , Buffer.from(res, 'base64'));//genera el archivo oga  
      console.log({status: 'success' });
      console.log("la ruta donde se guardó",path.join(process.cwd(),"/dist/src") )
      const uno = fs.readdirSync(path.join(process.cwd(),'/','dist/src'))
      console.log("lista de archivos",uno)
    } catch (error) {
      console.log('ERROR WRITE FILE : ', error);
    }
     
    //oga to mp3
    
    try {
      
      const inputOgxFile = base; // Reemplaza 'audio.ogx' con la ruta real de tu archivo .ogx
  
      try {
        await convertOgxToMp3(inputOgxFile, audiomp3);
        //console.log(`Archivo convertido guardado en: ${audiomp3}`);
        //const uno = fs.readdirSync(path.join(process.cwd(),'/','dist/src'))
        //console.log(uno)
        
      } catch (error) {
        console.error('La conversión falló:', error);
      }
    } catch (error) {
      console.log('ERROR READ FILE : ', error);
    }  
    
    //mp3 to base64
    
    /*const base64String = audiomp3;
    const contents = fs.readFileSync(base64String, {encoding: 'base64'});
    //borrara los dos archivos
    console.log("borrando los dos archivos")
    fs.unlinkSync(audiomp3)
    fs.unlinkSync(base)
    console.log({"bybase64":contents})
*/
    return {"bybase64":"contents"}
  
  }
}

async function convertOgxToMp3(inputFilePath: string, outputFilePath: string): Promise<void> {
  var outStream = fs.createWriteStream(outputFilePath);

ffmpeg()
.input(inputFilePath)
.audioQuality(96)
.toFormat("mp3")
.on('error', error => console.log(`Encoding Error: ${error.message}`))
.on('exit', () => console.log('Audio recorder exited'))
.on('close', () => console.log('Audio recorder closed'))
.on('end', () => console.log('Audio Transcoding succeeded !'))
.pipe(outStream, { end: true });
  
}


export const fixPathAudio = (recursoAssets:string)=>{
   console.log(`Starting directory: ${process.cwd()}`);
   const uno = fs.readdirSync(path.join(process.cwd(),'/','dist/src'))
   console.log(uno)
   //const dos = fs.readdirSync()
   return `${path.join(process.cwd(),'/','dist/src',recursoAssets)}`
}