const postcss = require('postcss');
const sprites = require('postcss-sprites');


module.exports = {
	plugins: [
		require('postcss-will-change'),
		require('postcss-sprites')({
			stylesheetPath: './css/', //path of output css file
			spritePath: './img/', //path of image files from input css file
			retina: true,
			spritesmith: {
				padding: 10,
				algorithm: 'top-down'
			},
			hooks: {
				onUpdateRule: function(rule, token, image) {
					var backgroundSizeX = (image.spriteWidth / image.coords.width) * 100;
					var backgroundSizeY = (image.spriteHeight / image.coords.height) * 100;
					var backgroundPositionX = (image.coords.x / (image.spriteWidth - image.coords.width)) * 100;
					var backgroundPositionY = (image.coords.y / (image.spriteHeight - image.coords.height)) * 100;

					backgroundSizeX = isNaN(backgroundSizeX) ? 0 : backgroundSizeX;
					backgroundSizeY = isNaN(backgroundSizeY) ? 0 : backgroundSizeY;
					backgroundPositionX = isNaN(backgroundPositionX) ? 0 : backgroundPositionX;
					backgroundPositionY = isNaN(backgroundPositionY) ? 0 : backgroundPositionY;

					var backgroundImage = postcss.decl({
						prop: 'background-image',
						value: 'url(' + image.spriteUrl + ')'
					});

					var backgroundSize = postcss.decl({
						prop: 'background-size',
						value: backgroundSizeX + '% ' + backgroundSizeY + '%'
					});

					var backgroundPosition = postcss.decl({
						prop: 'background-position',
						value: backgroundPositionX + '% ' + backgroundPositionY + '%'
					});

					rule.insertAfter(token, backgroundImage);
					rule.insertAfter(backgroundImage, backgroundPosition);
					rule.insertAfter(backgroundPosition, backgroundSize);
				}
			}
		}),
		require('postcss-simple-vars'),
		require('postcss-nested'),
		require('postcss-flexbugs-fixes'),
		require('postcss-cssnext')(
			{
				browsers: ['> 0.01%']
			}
		),
		require('postcss-import'),
		require('stylefmt')
	]
}
