'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.app = 'app/';
        this.source = './src/';
        this.sourceApp = this.source + this.app;		      
        this.output = './src/';
        this.dist = './dist/';
        this.tsOutputFile = 'app.js';
        this.tsOutputPath = this.output + this.app;
        this.allJavaScript = [this.sourceApp + '/**/*.js'];
        this.allTypeScript = this.sourceApp + '/**/*.ts';
        this.allHtml = [this.source + '/**/*.html', this.source + '/**/*.css', this.source + '/**/*.ico'];

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = this.typings + '/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;