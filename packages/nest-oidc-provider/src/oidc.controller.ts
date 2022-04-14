import { All, Controller, Injectable, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { OidcService } from './oidc.service';

@Injectable()
@Controller('oidc')
export class OidcController {
  path: string = '/oidc';
  callback: (req: Request, res: Response) => void;

  constructor(private oidcService: OidcService) {
    this.callback = this.oidcService.callback();
    const path = this.oidcService.getPath();
    path && (this.path = path);
  }

  @All('/*')
  mountedOidc(@Req() req: Request, @Res() res: Response) {
    req.url = req.originalUrl.replace(this.path, '');

    return this.callback(req, res);
  }
}
