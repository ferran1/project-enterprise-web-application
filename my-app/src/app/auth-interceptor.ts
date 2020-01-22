import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {FbSessionService} from "./services/session/fb-session.service";
import {Injectable} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {SpringSessionService} from "./services/session/spring-session.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: SpringSessionService, private route: ActivatedRoute) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let url = this.route.snapshot['_routerState'].url;
    // return next.handle(req);
    if (url.includes("/homepage")) {
      return next.handle(req);
    } else if (this.sessionService.getToken() == null || undefined) {
      const token = this.sessionService.getToken();
      if (token) {
        const cloned = req.clone({setHeaders: {Authorization: token}, withCredentials: true});
        return next.handle(cloned);
      } else return next.handle(req);

    }
  }
}
