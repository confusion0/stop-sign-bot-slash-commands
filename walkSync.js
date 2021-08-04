const fs = require('fs');
const path = require('path');

var walkSync = function(dir, filelist) {
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory() && file != "subcommands") {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      if(file.endsWith('.js'))
        filelist.push(path.join(dir, file));
      }
    });
    return filelist;
};

module.exports = walkSync