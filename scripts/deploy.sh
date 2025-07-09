#!/bin/bash

# Exit on error
set -e

echo "Starting deployment..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Deploy to ICP
echo "Deploying to ICP..."
dfx start --background
dfx deploy

echo "Deployment completed successfully!" 