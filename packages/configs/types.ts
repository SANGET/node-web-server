import { SignOptions, Secret, SignCallback } from "jsonwebtoken";

export interface JwtOptions {
  options?: SignOptions;
  callback?: SignCallback;
  secretOrPrivateKey: string | Buffer;
  // secretOrPrivateKey: Secret | string | Buffer;
  headerAuthKey: string;
  exp: number;
}

export interface NWSBaseConfig {
  Port: number;
  JwtOptions: JwtOptions;
}

export interface AdminAppConfig extends NWSBaseConfig {

}

export interface ClientAppConfig extends NWSBaseConfig {

}

export interface BussnessAppConfig extends NWSBaseConfig {

}

export interface NWSConfig {
  AdminAppConfig?: AdminAppConfig;
  ClientAppConfig?: ClientAppConfig;
  BussnessAppConfig?: BussnessAppConfig;
}