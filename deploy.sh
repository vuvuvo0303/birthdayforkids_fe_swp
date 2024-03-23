echo "Building app..."
npm run build

echo "Deploy files to server..."
scp -r dist/* root@152.42.220.117:/var/www/html/
echo "Done!"