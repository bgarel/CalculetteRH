'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        //Got tired of scrolling through all the comments so removed them
        //Don't hurt me AC :-)
        this.source = './src/';
        this.sourceApp = this.source + 'app/';
		this.output = './wwwroot/';
        this.tsOutputPath = this.output + '/app/';
        this.allJavaScript = [this.sourceApp + '/**/*.js'];
        this.allTypeScript = this.sourceApp + '/**/*.ts';
        this.allHtml = [this.source + '/**/*.html', this.source + '/**/*.css', this.source + '/**/*.ico'];

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = this.typings + '/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;