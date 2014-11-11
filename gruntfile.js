module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    clean: ["dist", '.tmp'],
    
    copy: {
      main:{
        expand: true,
        cwd: 'app/',
        
      }
    },
  });
};