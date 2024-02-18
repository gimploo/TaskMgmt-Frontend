import { InjectionToken } from "@angular/core";
import { AuthService } from "./auth.service";

export const TOKEN_NAME = 
  new InjectionToken<string>('authToken');