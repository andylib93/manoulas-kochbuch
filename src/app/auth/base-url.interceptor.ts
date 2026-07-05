import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.startsWith('/')) {
        const url = `${environment.baseUrl}${req.url}`;
        const clonedRequest = req.clone({ url });
        return next(clonedRequest);
    }

    return next(req);
};
