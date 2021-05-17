import { Injectable } from '@nestjs/common';
import { storage } from 'firebase-admin';
import { v4 as uuid } from 'uuid';
import * as sharp from 'sharp'
import {decode} from "base64-arraybuffer";

@Injectable()
export class ContentService {
    private async getBucket() {return storage().bucket()} 
    async addImage(imageBuffer : Buffer, folders = ["images"]) {


        var newBuffer = null

        try {
          newBuffer =  await sharp(imageBuffer).png().toBuffer()
          const metadata = {
              metadata: {
                firebaseStorageDownloadTokens: uuid()
              },
              contentType: 'image/webp',
              cacheControl: 'public, max-age=31536000',
          };
          const folderPath = (folders.length)? folders.join("/") + "/" : ""
          const filename = `${folderPath}${uuid()}.webp`
          const file = (await this.getBucket()).file(filename);
          const savedFile = await file.save(newBuffer, metadata);

          const url = await file.getSignedUrl({
            action: 'read',
            expires: '03-17-2545'
          })
          return {
              tempLink: url[0],
              storeInDB: filename
          }
        } catch (error) {
            console.log(error)
            return false;
        }


        // await (await this.getBucket()).upload(newBuffer)[0]
    }

    async addImage64(base64:string, folders = ["images"]) {
        console.log(decode)
      const imageBuffer = await decode(base64)
      var nodeBuffer = Buffer.alloc(imageBuffer.byteLength);
      var view = new Uint8Array(imageBuffer);
      for (var i = 0; i < nodeBuffer.length; ++i) {
          nodeBuffer[i] = view[i];
      }
      return await this.addImage(nodeBuffer, folders);
    }

    async checkIfExistByPath(path : string) {
      const file = await this.findImage(path);
      return this.checkIfExist(file);
    }

    async checkIfExist(file) {
      try {
        if (file.metadata.error) {
          return false;
        }
      } catch (error) {
          return false;          
      }
      return true;
    }

    async findImage(path : string) {
      const file = (await this.getBucket()).file(path)
      await file.exists();
      return file;
    }

    async replaceImage(initialPath : string, newBuffer : Buffer, folders = ["images"]) {
      const result = await this.deleteImage(initialPath)
      const {error} = result;
      if (!error) {
        return await this.addImage(newBuffer, folders)
      }
      return false;
    }

    async replaceImage64(initialPath : string, base64Data : string, folders = ["images"]) {
      const result = await this.deleteImage(initialPath)
      const {error, errorContent} = result;
      console.log(errorContent)
      if (!error) {
        return await this.addImage64(base64Data, folders)
      }
      return false;
    }

    async deleteImage(path : string) {
      const file = await this.findImage(path)

      if (await this.checkIfExist(file)) {
        try {
          await file.delete()
          return {error : false, path : path}

        } catch (error) {
          return {error : true, errorContent : error}
        } 
      }
      else {
        return {error : true, errorContent : file.metadata.error}
      }
    }

    async readImage(name : string) {
          const [signedUrl] = await (await this.getBucket()).file(name).getSignedUrl({
            action: 'read',
            expires: '03-17-2545'
          });
          return signedUrl;
    }
}
