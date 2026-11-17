import { combineEpics, ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

import {
  fetchServicesRequest,
  fetchServicesSuccess,
  fetchServicesFailure,
  fetchDetailsRequest,
  fetchDetailsSuccess,
  fetchDetailsFailure,
} from "./servicesSlice";

const API = "http://localhost:7070/api/services";

const fetchServicesEpic = (action$) =>
  action$.pipe(
    ofType(fetchServicesRequest.type),

    switchMap(() =>
      ajax.getJSON(API).pipe(
        map((data) => fetchServicesSuccess(data)),

        catchError(() =>
          of(fetchServicesFailure("Ошибка загрузки услуг"))
        )
      )
    )
  );
  
  const fetchDetailsEpic = (action$) =>
  action$.pipe(
    ofType(fetchDetailsRequest.type),

    switchMap((action) =>
      ajax.getJSON(`${API}/${action.payload}`).pipe(
        map((data) => fetchDetailsSuccess(data)),

        catchError(() =>
          of(fetchDetailsFailure("Ошибка загрузки деталей"))
        )
      )
    )
  );

  export const rootEpic = combineEpics(
  fetchServicesEpic,
  fetchDetailsEpic
);