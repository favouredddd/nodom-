module.exports = function(grunt) {
	//初始化grunt 配置
	grunt.initConfig({
		//获取package.json的信息
		pkg: grunt.file.readJSON('package.json'),
		//concat插件的配置信息
		// concat: {
		//     options:{
		//         stripBanners:true, //合并时允许输出头部信息
		//         banner:'/*!<%= pkg.name %> - <%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */'
		//     },
		//     cssConcat:{
		//         src:['src/css/css1.css','src/css/css2.css'],
		//         dest:'src/css/concat/<%= pkg.name %> - <%= pkg.version %>.css' //dest 是目的地输出
		//     },
		//     jsConcat:{
		//         src:'src/js/*.js',
		//         dest:'src/js/concat/<%=pkg.name %> - <%= pkg.version %>.js'
		//     }
		// },
		// //压缩css
		// cssmin: {
		// 	options: {
		// 		stripBanners: true, //合并时允许输出头部信息
		// 		banner: '/*!<%= pkg.name %> - <%= pkg.version %>-' + '<%=grunt.template.today("yyyy-mm-dd") %> */\n'
		// 	},
		// 	build: {
		// 		src: 'index.css', //压缩是要压缩合并了的
		// 		dest: 'index.min.css' //dest 是目的地输出
		// 	}
		// },
		// uglify: {
		// 	options: {
		// 		stripBanners: true, //合并时允许输出头部信息
		// 		banner: '/*!<%= pkg.name %> - <%= pkg.version %>-' + '<%=grunt.template.today("yyyy-mm-dd") %> */\n'
		// 	},
		// 	build: {
		// 		// src: 'rejs/nodom-full.js', //压缩是要压缩合并了的
		// 		// dest: 'rejs/nodom-full.min.js',
		// 		src: 'rejs/down.js', //压缩是要压缩合并了的
		// 		dest: 'rejs/down.min.js'
		// 		// src: 'rejs/index.js',
		// 		// dest: 'rejs/index.min.js'
		// 		// src: 'rejs/index1.js',
		// 		// dest: 'rejs/index1.min.js'
		// 	}
		// },
		imagemin: {
			/* 压缩图片大小 */
			dist: {
				options: {
					optimizationLevel: 3 //定义 PNG 图片优化水平
				},
				files: [
					{
						expand: true,
						cwd: 'img/',
						src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
						dest: 'img/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
					}
				]
			}
		}
		// jshint:{
		//     options:{
		//         jshintrc:'.jshint'
		//     },
		//     build:['Gruntfile.js','src/js/*js']
		// },

		// csslint:{
		//     options:{
		//         csslintrc:'.csslint'
		//     },
		//     build:['src/css/*.css']

		// },
		// //watch自动化
		// watch:{
		//     build:{
		//         files:['src/js/*.js','src/css/*.css'],
		//         tasks:['jshint','csslint','concat','cssmin','uglify'],
		//         options:{spawn:false}
		//     }
		// }
	})
	//告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-concat')
	grunt.loadNpmTasks('grunt-contrib-cssmin')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-contrib-jshint')
	grunt.loadNpmTasks('grunt-contrib-csslint')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-imagemin')
	//告诉grunt当我们在终端输入grunt时需要做些什么
	grunt.registerInitTask('default', ['imagemin']) //先进行语法检查，如果没有问题，再合并，再压缩
}
