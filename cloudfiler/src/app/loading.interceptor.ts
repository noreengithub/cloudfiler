import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from './services/loader.service';
import { DialogModalService } from './services/dialog-modal.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private totalRequests = 0;

  constructor(
    private loadingService: LoaderService,
    private dialogModalService : DialogModalService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        let errorMsg = '';
        console.log(errorMsg);
         
        this.dialogModalService.confirm('SomethingWrong','Something went wrong.','','', 'Ok','')
          .then((confirmed) => { 
            console.log('User confirmed:', confirmed)
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
          return throwError(errorMsg);
        }
      ),
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}

