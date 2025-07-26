#!/bin/bash

echo "🚀 独立前端部署到 ICP 主网..."

# 检查网络连接
echo "🔍 检查网络连接..."
dfx ping ic
if [ $? -ne 0 ]; then
    echo "❌ 无法连接到 ICP 主网"
    exit 1
fi

# 构建前端应用
echo "🏗️ 构建前端应用..."
cd frontend

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建项目
echo "🔨 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 前端构建失败"
    exit 1
fi

cd ..

# 创建前端 canister（如果不存在）
echo "📋 创建前端 canister..."
dfx canister create pollrush_frontend --network ic 2>/dev/null || echo "Canister already exists"

# 部署前端到 IC 主网
echo "🚀 部署前端到 IC 主网..."
dfx canister install pollrush_frontend --mode=upgrade --network ic

if [ $? -eq 0 ]; then
    echo "✅ 前端部署成功！"
    
    # 获取前端 Canister ID
    FRONTEND_CANISTER_ID=$(dfx canister id pollrush_frontend --network ic)
    echo "📱 前端 Canister ID: $FRONTEND_CANISTER_ID"
    echo "🌐 访问地址: https://$FRONTEND_CANISTER_ID.ic0.app"
    echo "🌐 备用地址: https://$FRONTEND_CANISTER_ID.icp0.io"
else
    echo "❌ 前端部署失败"
    exit 1
fi