import { Injectable } from '@angular/core';
import { api, EndPointsKeys } from '../configs/axios.config';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  async get<T>(endpoint: EndPointsKeys) {
    return await api.get<T>(`${endpoint}`);
  }

  async getById<T>(endpoint: EndPointsKeys, id: string) {
    return await api.get<T>(`${endpoint}/${id}`);
  }

  async delete<T>(endpoint: EndPointsKeys, id: string) {
    return await api.delete<T>(`${endpoint}/${id}`);
  }

  async post<T>(endpoint: EndPointsKeys, arg: T) {
    return await api.post<T>(endpoint, arg);
  }

  async put<RT, BT>(endpoint: EndPointsKeys, id: string, arg: BT) {
    return await api.put<RT>(`${endpoint}/${id}`, arg);
  }
}
