import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs'
import * as path from 'path';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
var ffmpeg = require('fluent-ffmpeg')

  ffmpeg.setFfmpegPath(ffmpegPath)
  import { Buffer } from "buffer";

  const { convertAndSaveAudio } = require("light-audio-converter");

  

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("myogg1")
  getHello(): string {
    const uno = fs.readdirSync(path.join(process.cwd()))
  const dos = fs.readdirSync(path.join(process.cwd(),'/','dist'))
  const tres = fs.readdirSync(path.join(process.cwd(),'/','dist/src'))
  const cuatro = fs.readdirSync(path.join(process.cwd(),'/','src'))
  
  console.log("en la raiz",uno)
  console.log("en dist",dos)
  console.log("en dist_src",tres)
  console.log("en src",cuatro)

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
      console.log("la ruta donde se guardó el archivo oga",path.join(process.cwd(),"/dist/src") )
      
      try {
      
        const inputOgxFile = base; // Reemplaza 'audio.ogx' con la ruta real de tu archivo .ogx
    
        try {
          const handleConvert = async () => {     
            try {
              const audioFilePath = base;
              const targetFormat = "mp3";
              const outputFilePath = audiomp3;
              await convertAndSaveAudio(audioFilePath, targetFormat, outputFilePath);
              console.log("Conversion successful!");
            } catch (error) {
              console.error("Error occurred:", error);
              alert("Error occurred during conversion");
            }
          };
        
          //return handleConvert

          const base64String = audiomp3;
        console.log(base64String)
        const contents = fs.readFileSync(base64String, {encoding: 'base64'});
         return {"bybase64":contents}
        
        /*const audioFilePath = base;
          const targetFormat = "mp3";
          const outputFilePath = audiomp3;
          convertAndSaveAudio(audioFilePath, targetFormat, outputFilePath)
          .then((result) => {
          console.log("Conversion successful!");
          console.log("Output File:", result.data);
          
          }).then(()=>{
            const uno = fs.readdirSync(path.join(process.cwd(),'/','dist/src'))
      console.log("lista de archivos incluido el mp3",uno)
          
    })
          .catch((error) => {
          console.error("Error occurred:", error);
          });
          */
          
          //await convertOgxToMp3(inputOgxFile, audiomp3);
          //console.log(`Archivo convertido guardado en: ${audiomp3}`);
          //const uno = fs.readdirSync(path.join(process.cwd(),'/','dist/src'))
          //console.log("debe aparecer el mp3",uno)
         
        } catch (error) {
          console.error('La conversión falló:', error);
        }
      } catch (error) {
        console.log('ERROR READ FILE : ', error);
      }  
    
    } catch (error) {
      console.log('ERROR WRITE FILE : ', error);
    }
    
     
    //oga to mp3
    
    
    
    //mp3 to base64
    
    //const base64String = audiomp3;
    //console.log(base64String)
    //const contents = fs.readFileSync(base64String, {encoding: 'base64'});
    /*//borrara los dos archivos
    console.log("borrando los dos archivos")
    fs.unlinkSync(audiomp3)
    fs.unlinkSync(base)
    console.log({"bybase64":contents})
*/
    //return {"bybase64":"contents"}
  
  }
}

async function convertOgxToMp3(inputFilePath: string, outputFilePath: string): Promise<void> {
  var outStream = fs.createWriteStream('./output.mp3');
  


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
   /*const uno = fs.readdirSync(path.join(process.cwd(),'/','dist/src'))
   console.log(uno)*/
   //const dos = fs.readdirSync()
   return `${path.join(process.cwd(),'/','dist/src',recursoAssets)}`
}

