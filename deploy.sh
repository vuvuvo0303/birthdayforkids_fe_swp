echo "Building app..."
npm run build

echo "Deploy files to server..."
scp -r dist/* root@165.22.51.191:/var/www/html/
echo "Done!"