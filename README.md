# Experiment 2

![alt tag](thumb.jpg)

## Sine Waves 2
Sine waves applied to a circle geometry in THREE.js. Using a similar method to experiment #1, A sine wave is applied around the circumference of the geometry using the distances between the vertices creating a warped effect around the centre vertex. Again, using the two variables  *size* and *magnitude* to allow us to manipulate the vertical deviation and wave length.

## Initial setup
- `npm install --global gulp-cli` : Install gulp globally
- `npm i` Install dependencies

## Building for development
- `gulp dev` : Build files will be output to the '.tmp' directory.

## Building for production
- `gulp build` : Build files will be output to the 'deploy' directory.

## Pushing a new release
- `gulp build` : Compile local changes
- `git add .` : Stage changes
- `git commit -m"change description"` : comment on your changes
- `git tag -a v1.0.0 -m "Change description"` : Add a new tagged release
- `git push --follow-tags` : Push staged changes and tags
