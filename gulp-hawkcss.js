'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var fs = require('fs');
var path = require('path');


module.exports = function (options) {

  return through.obj(function (file, enc, cb) {

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }


    var HawkCss = {

      init: function (data) {

        this.get_all_css = /<link rel="stylesheet" href="[\w\d\/]*\w*\d*[^main|^bases|^common|^reset].css" \/>/ig;

        this.get_css_content_url = /[\w\d\.]+\/[\w\d]*\.{1}css/gi;

        this.get_combo_url = /<!-- css:start -->([\w\W]*)<!-- css:end -->/gi;


        this.ROOT = __dirname;


        this.cdn_host = 'http://hawk.baidu.com/??';

        

        return this.procss();
      },
      procss: function () {
        var that = this;

        var file_content = file.contents.toString();
        var arr = file_content.match(that.get_all_css);


        var css_file_arr = [];
        var css_file_str = that.cdn_host;
        

        arr.forEach(function (v,k) {

          var re_sub = /[\w\d\.]+\/[\w\d]*\.{1}css/gi;

          css_file_arr.push(v.match(that.get_css_content_url));

        });

        Array.prototype.unique = function() {
          var res = [];
          var json = {};
          for(var i = 0; i < this.length; i++){
            if(!json[this[i]]){
              res.push(this[i]);
              json[this[i]] = 1;
            }
          }
          return res;
        }
      
        css_file_arr = css_file_arr.unique();
        css_file_arr.forEach(function (v, k) {

          if (k < css_file_arr.length - 1) {
            css_file_str += v+',';        
          } else {
            css_file_str += v;
          }
        });

        var data_build = file_content.replace(that.get_all_css, '');

        var build  = data_build.replace(that.get_combo_url,function ($0, $1) {

          $1 = '<link rel="stylesheet" href="'+css_file_str+'" />';

          return $1;

        });

        return build;
      }

    };


    var content = HawkCss.init(file.contents.toString());
      //todo: 转换代码


      file.contents = new Buffer(content);

      this.push(file);

      cb();
    });
};