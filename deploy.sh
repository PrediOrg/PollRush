#!/bin/bash

# 启动本地 ICP 网络
dfx start --clean --background

# 部署后端 canisters
cd backend
dfx deploy

# 构建前端
cd ../frontend
npm run build

# 部署前端到本地网络
dfx canister create pollrush_assets
dfx build pollrush_assets
dfx canister install pollrush_assets

echo "Deployment completed! You can access the application at:"
echo "http://localhost:4943/?canisterId=$(dfx canister id pollrush_assets)" 