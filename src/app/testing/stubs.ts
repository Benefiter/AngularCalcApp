import { IndividualConfig } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IAppState } from '../store';

export const toastrServiceMock = {
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
  remove: (id: number) => {},
};

export const storeMock = {
  dispatch: jasmine.createSpy('dispatch'),
  select: () => new Observable<IAppState>(),
  subscribe: jasmine.createSpy('subscribe'),
};

export const dndServiceMock = {
  dropTarget: jasmine.createSpy('dropTarget'),
  dragSource: jasmine.createSpy('dragSource')
};
