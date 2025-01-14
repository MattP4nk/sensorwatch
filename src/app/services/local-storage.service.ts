import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  set(key: string, value: string) {
    if (typeof window !== 'undefined'){
      window.localStorage.setItem(key, value);
    }
      
  }

  get(key: string): string|null {
    
    if (typeof window !== 'undefined'){
      return window.localStorage.getItem(key);
    }
    return null;
  }

  remove(key: string) {
    if (typeof window !== 'undefined'){
      window.localStorage.removeItem(key);
    }
  }
}

