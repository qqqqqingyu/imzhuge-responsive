# 嗨皮诸葛响应式开发
## 关于运行项目
通过`yarn serve`运行项目。如果报错
```
Error: error:0308010C:digital envelope routines::unsupported
```
可能是版本问题。node版本高于16，项目的版本不高于16。如果不变版本，用在命令行先修改环境变量：
```
$env:NODE_OPTIONS="--openssl-legacy-provider"
```
再用`yarn serve`即可运行。
项目写完后，用`npm run build`打包。
<br>原版readme见下文。
# mark

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
