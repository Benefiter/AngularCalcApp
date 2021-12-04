import { IndividualConfig } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IAppState } from '../store';

export const toastrService = {
    success: (
      message?: string,
      title?: string,
      override?: Partial<IndividualConfig>
    ) => {},
    error: (
      message?: string,
      title?: string,
      override?: Partial<IndividualConfig>
    ) => {},
    info: (
        message?: string,
        title?: string,
        override?: Partial<IndividualConfig>
      ) => {},
    };

export const storeMock = {
    dispatch: jasmine.createSpy('dispatch'),
    select: () => new Observable<IAppState>(),
    subscribe: jasmine.createSpy('subscribe'),
  };
