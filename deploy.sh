VERSION=$(date -I)

echo "Deploying new version ${VERSION} to gh-pages branch"

hugo -v --cleanDestinationDir

cd public

git add -u && git add .

git commit -m "Deployed version ${VERSION}"

git push -u origin gh-pages

cd ..
