#!/bin/bash

echo "Setting up Stock Data App..."

echo "Installing dependencies..."
npm install

echo "Creating environment file..."
if [ ! -f .env ]; then
    cp env.example .env
    echo "Created .env file. Please update it with your Google authentication credentials."
fi

echo "Creating placeholder assets..."
mkdir -p assets
mkdir -p google-services

echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your Google authentication credentials"
echo "2. Add google-services.json and GoogleService-Info.plist to google-services/ directory"
echo "3. Run 'npm start' to start the development server" 