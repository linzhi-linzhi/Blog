# electron-egg

[electron-egg](https://gitee.com/dromara/electron-egg)

## 配置环境

### 1. VS 编辑器构建环境

安装时选择 "使用 C++ 的桌面开发" 工作负载，并勾选以下组件：

- MSVC v143 - VS 2022 C++ x64/x86 生成工具
- Windows 10/11 SDK
- C++ CMake 工具

> 如果遇到 `Error: Could not find any Visual Studio installation to use` 错误，则属于上述环境配置问题。

### 2. better-sqlite3 数据库依赖

使用 better-sqlite3 数据库需要安装 node-gyp 和 python3：

```bash
# 官网安装 Python 3.10+
# 全局安装 node-gyp
npm i node-gyp -g

# 安装构建工具
npm install --save-dev @electron/rebuild
npm i better-sqlite3
npm run re-sqlite
```

### 3. 依赖版本对应关系

如果依赖安装冲突，请检查以下版本对应关系：

| electron 版本 | node.js 版本 | better-sqlite3 版本 |
|--------------|--------------|---------------------|
| v^39.2.6     | v22.21.1     | v12.5.0             |
| v^31.7.6     | v20.16.0     | v11.7.0             |
| v21.4.4      | v16.20.0     | v8.6.0              |