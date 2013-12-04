module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.initConfig({
		mochaTest:{
			test: {
				options: {
					reporter: 'spec',
					globals:{
						expect: true
					}
				},
				src: ['test/*.js']
			},
			coverage: {
				options: {
					reporter: 'html-cov',
					quiet: true
				},
				src: ['test/*.js'],
				dest: 'coverage.html'
			}
		}
	});

	grunt.registerTask('test', 'mochaTest');
}