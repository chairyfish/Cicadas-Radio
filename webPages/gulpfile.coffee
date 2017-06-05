gulp = require 'gulp'
coffee = require 'gulp-coffee'
less = require 'gulp-less'

coffeeDir = 'src/coffee'
lessDir = 'src/less'
jsDir = 'dist/js'
cssDir = 'dist/css'

compliceCoffee = ->
  gulp.src coffeeDir + '/*.coffee'
    .pipe coffee {bare: true}
    .pipe gulp.dest jsDir
gulp.task 'complice-coffee',compliceCoffee

compliceLess = ->
  gulp.src lessDir + '/*.less'
    .pipe less()
    .pipe gulp.dest cssDir
gulp.task 'complice-less',compliceLess

gulp.task 'watch',->
  gulp.watch lessDir + '/*.less',['complice-less']
  gulp.watch coffeeDir + '/*.coffee',['complice-coffee']

gulp.task 'default', ['complice-less','complice-coffee','watch']
