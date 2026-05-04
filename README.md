# Flyxxxxx 首页

## 快速开始

```bash
npm install
npm run dev     # 本地预览
npm run build   # 编译生产版
```

## 📁 图片清单（共 13 张）

| 文件名 | 用途 | 建议分辨率 |
|--------|------|------------|
| `logo.png` | 品牌 Logo | 64×64 |
| `ai.webp` | 中心AI球体图 | 200×200 |
| `earth.webp` | 首屏地球贴图 | 3600×1800（2:1 等距圆柱投影）|
| `apps-wall.webp` | 流媒体墙背景 | 5006×1025 |
| `1.png` ~ `4.png` | 4个平台设备图 | 800×600 |
| `5.png` ~ `9.png` | 5个环绕APP图标 | 128×128 |

## 配置

所有配置在 `src/App.jsx` 顶部的 `CONFIG` 对象。

## Nginx 部署

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
location ~* \.(webp|png|jpg|jpeg|svg|ico)$ {
  expires 30d;
  add_header Cache-Control "public, immutable";
}
```
