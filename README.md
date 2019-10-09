# node web server

基于 Node Express 打造开箱即用的 web server。

## 基础

- Docker
- Typescript
- Node
- Express
- TypeORM
- MySQL
- Passport
- Redis
- MQ

## 启动

### 环境设置

1. 安装 Docker
2. 安装 nvm
   1. 使用 nvm 安装 node
3. 安装 yarn

### 使用 Docker 启动所需要的环境

```shell
yarn start:docker:env
```

包含

- mysql 8
- redis

### 新开一个 shell 开启 web 开发进程

> 由于在 docker 环境中运行 node 开发很慢，所以把 node 的开发环境分出来

```shell
yarn start
```

## TODO
