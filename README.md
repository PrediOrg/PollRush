# PollRush

A decentralized polling platform with full-chain support on the Internet Computer (IC) blockchain.

frontend : https://k6rio-pyaaa-aaaai-atk2q-cai.icp0.io/

## Overview

PollRush is a modern, decentralized voting platform that enables users to create, participate in, and manage polls with blockchain transparency and security. Built on the Internet Computer Protocol (ICP), it provides a seamless Web3 experience with traditional web usability.

## Features

- **Decentralized Voting**: All polls and votes are stored on the IC blockchain
- **Internet Identity Integration**: Secure authentication without passwords
- **Real-time Results**: Live poll results with beautiful visualizations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Multi-language Support**: Currently supports English interface
- **Token Integration**: Built-in token system for governance and rewards

## Tech Stack

- **Frontend**: React 18, TypeScript, Material-UI, Vite
- **Backend**: Rust, Internet Computer (IC) Canisters
- **Authentication**: Internet Identity, Plug Wallet
- **Blockchain**: Internet Computer Protocol (ICP)
- **Deployment**: DFX SDK

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [DFX SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/) (latest version)
- [Rust](https://rustup.rs/) (for backend development)
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/PollRush.git
cd PollRush
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Setup DFX Identity

```bash
# Create a new identity (if you don't have one)
dfx identity new pollrush
dfx identity use pollrush

# Check your identity
dfx identity whoami
```

## Deployment

### Frontend-Only Deployment (Current)

For now, we're deploying only the frontend to test the user interface:

```bash
# Make the script executable
chmod +x deploy-frontend-standalone.sh

# Deploy frontend to IC mainnet
./deploy-frontend-standalone.sh
```

The script will:
1. Check network connectivity to IC
2. Install frontend dependencies
3. Build the React application
4. Create a frontend canister (if it doesn't exist)
5. Deploy to IC mainnet
6. Provide access URLs

### Full Stack Deployment (Coming Soon)

Once the backend is ready, use the full deployment script:

```bash
# This will be available after backend completion
./deploy.sh
```

## Development

### Local Development

```bash
# Start local IC replica
dfx start --background

# Deploy locally (when backend is ready)
dfx deploy

# Start frontend development server
cd frontend
npm run dev
```

### Frontend Development

```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

PollRush/
├── backend/                 # Rust backend canisters
│   ├── pollrush/           # Main polling canister
│   ├── pps_token/          # Token management canister
│   └── dfx.json            # Backend DFX configuration
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── declarations/           # Generated canister declarations
├── scripts/                # Deployment and utility scripts
├── deploy-frontend-standalone.sh  # Frontend-only deployment
├── deploy.sh              # Full stack deployment (coming soon)
└── dfx.json               # Main DFX configuration


## Available Scripts

### Frontend Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Deployment Scripts

- `./deploy-frontend-standalone.sh` - Deploy frontend only
- `./deploy.sh` - Full stack deployment (coming soon)

## Troubleshooting

### Common Issues

1. **DFX Identity Issues**
   ```bash
   # Check current identity
   dfx identity whoami
   
   # Switch to default identity if needed
   dfx identity use default

# Test IC network connectivity
dfx ping ic

# Clear node modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install

2. 3.
   Canister Permission Issues
   
   - Ensure you're using the correct DFX identity
   - Check that your identity has sufficient ICP for deployment
   - Verify canister ownership
### Getting Help
- Check the Internet Computer Documentation
- Visit the DFX SDK Documentation
- Join the IC Developer Community
## Contributing
We welcome contributions! Please follow these steps:

1. 1.
   Fork the repository
2. 2.
   Create a feature branch ( git checkout -b feature/amazing-feature )
3. 3.
   Commit your changes ( git commit -m 'Add some amazing feature' )
4. 4.
   Push to the branch ( git push origin feature/amazing-feature )
5. 5.
   Open a Pull Request
### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure code passes linting and type checking
## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
If you encounter any issues or have questions:

- Open an issue on GitHub
- Contact the development team
- Check the troubleshooting section above
## Roadmap
### Current Phase: Frontend Development
- ✅ Basic UI components
- ✅ Routing and navigation
- ✅ Responsive design
- ✅ Frontend deployment pipeline
- 🔄 Internet Identity integration
- 🔄 Wallet connectivity
### Next Phase: Backend Integration
- ⏳ Rust canister development
- ⏳ Poll creation and management
- ⏳ Voting mechanism
- ⏳ Token integration
- ⏳ Full stack deployment
### Future Enhancements
- 📋 Advanced poll types
- 📋 Governance features
- 📋 Analytics dashboard
- 📋 Mobile app
- 📋 Multi-language support