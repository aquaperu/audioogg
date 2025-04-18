import { Body, ConsoleLogger, Controller, Get, Param, Post } from '@nestjs/common';
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
      console.log("la ruta donde se guardó el archivo oga",base)
      
      try {
      
        const inputOgxFile = base; // Reemplaza 'audio.ogx' con la ruta real de tu archivo .ogx
    
        try {
          // Ejemplo de uso:
          const inputFilePath = base; // Reemplaza con la ruta de tu archivo .oga
          const outputFilePath = audiomp3; // Reemplaza con la ruta donde guardar el archivo .mp3

          const joder = async()=>{ await convertOgaToMp3(inputFilePath, outputFilePath)
          
        }
        await joder()
          const uno = fs.readdirSync(path.join(process.cwd(),'/','dist/src'))
          console.log("lista de archivos incluido el mp3",uno)
          const contents = fs.readFileSync(audiomp3, {encoding: 'base64'});
          console.log("borrando los dos archivos")
          fs.unlinkSync(audiomp3)
          fs.unlinkSync(base)
          return {"mybase64":contents}

          /*const handleConvert = async () => {     
            try {
              /*const audioFilePath = base;
              const targetFormat = "mp3";
              const outputFilePath = audiomp3;
              await convertAndSaveAudio(audioFilePath, targetFormat, outputFilePath);
              console.log("Conversion successful!");
              //await convertOgxToMp3(inputOgxFile, audiomp3)
              //console.log("conversion realizada")
              const inputFilePath = base; // Reemplaza con la ruta de tu archivo .oga
              const outputFilePath = audiomp3; // Reemplaza con la ruta donde guardar el archivo .mp3

              convertOgaToMp3(inputFilePath, outputFilePath)
              .then(() => {
                console.log(`Archivo convertido exitosamente a ${outputFilePath}`);
              })
              .catch((error) => {
              console.error('La conversión falló:', error);
              });

            } catch (error) {
              console.error("Error occurred:", error);
              alert("Error occurred during conversion");
            }
          };*/
        
          //await handleConvert()

          //const base64String = audiomp3;
          //const uno = fs.readdirSync(base64String)
          //console.log("lista de archivos incluido el mp3",uno)
        
          //const contents = fs.readFileSync(base64String, {encoding: 'base64'});
        //var base64str = base64_encode('/opt/render/project/src/output.mp3');
        //console.log(base64str); 
        //return {"bybase64":"contents"}
        
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
   /*const uno = fs.readdirSync(path.join(process.cwd(),'/','dist/src'))
   console.log(uno)*/
   //const dos = fs.readdirSync()
   return `${path.join(process.cwd(),'/','dist/src',recursoAssets)}`
}

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

async function convertOgaToMp3(inputPath: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .audioCodec('libmp3lame') // Especifica el códec de audio MP3
      .on('start', function(commandLine) {
        console.log('Ejecutando comando FFmpeg:', commandLine);
      })
      .on('progress', function(progress) {
        console.log('Procesando:', progress.timemark);
      })
      .on('end', function() {
        console.log('¡Conversión completada!');
        resolve();
      })
      .on('error', function(err) {
        console.error('Ocurrió un error durante la conversión:', err);
        reject(err);
      })
      .run();
  });
}