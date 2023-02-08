import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor() {}
  private readonly path: string = 'localhost:8080';

  async getItems() {
    try {
      const response = await axios.get(this.path + '/items');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
