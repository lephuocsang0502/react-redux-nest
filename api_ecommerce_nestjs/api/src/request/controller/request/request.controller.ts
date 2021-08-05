import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { UserIsAuthorGuard } from 'src/request/guards/user-is-author.guard';
import { RequestEntry } from 'src/request/model/request-entry.interface';
import { RequestService } from 'src/request/service/request/request.service';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';
import { Image } from 'src/request/model/image.interface';
import { join } from 'path';
import { Res } from '@nestjs/common';

export const REQUEST_ENTRIES_URL ='http://localhost:3000/api/request-entries';


export const storage = {
    storage: diskStorage({
        destination: './uploads/resquest-entry-images', 
        filename: (req, file, cb) => {     
          const fileName :string = path.parse(file.originalname).name.replace(/\s/g,'')+ uuidv4();
          const extension:string = path.parse(file.originalname).ext;
          cb(null, `${fileName}${extension}`)
          }
      })         

}

@Controller('request-entries')
export class RequestController {

    constructor(private requestService:RequestService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body()requestEntry:RequestEntry , @Request() req):Observable<RequestEntry>{
        const user =req.user;
        return  this.requestService.create(user,requestEntry);
    }

    // @Post('getByCondition')
    // findRequestEntries(@Body() body :any) {
    //     const condition = body.condition || {};
    //     return this.requestService.findByCondition(condition);
    // }
    @UseGuards(JwtAuthGuard)
    @Get('')
    index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        limit = limit > 100 ? 100 : limit;
        

        return this.requestService.paginateAll({
            limit: Number(limit),
            page: Number(page),
            route: REQUEST_ENTRIES_URL
        })
    }

    @Get('user/:user')
    indexByUser(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Param('user') userId: number
    ) {
        limit = limit > 100 ? 100 : limit;

        return this.requestService.paginateByUser({
            limit: Number(limit),
            page: Number(page),
            route:REQUEST_ENTRIES_URL  + '/user/' + userId 
        }, Number(userId))
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<RequestEntry> {
        return this.requestService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
    @Put(':id')
    updateOne(@Param('id') id: number, @Body() requestEntry: RequestEntry): Observable<RequestEntry> {
        return this.requestService.updateOne(Number(id), requestEntry);
    }

    @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: number): Observable<any> {
        return this.requestService.deleteOne(id);
    }



    @UseGuards(JwtAuthGuard)
    @Post('image/upload')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(@UploadedFile()file ,@Request() req): Observable<Image>{
        return of(file);
     
    }
    @Get('image/:imagename')
    findImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/resquest-entry-images/' + imagename)));
    }
}
