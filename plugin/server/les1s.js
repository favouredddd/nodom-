const fs = require( 'fs' )      // 引入 fs 文件读写模块
const less = require( 'less' )  // 引入 less 模块
const path = require( 'path' )  // 引入 path 路径模块

const srcPath = path.join(__dirname, 'main.less')
const distPath = path.join(__dirname, 'main.css')

// readFile 第二个参数，可以指定编码类型
// 指定编码类型后，得到的数据会自动转换
fs.readFile( srcPath, 'utf8', ( err, data ) => {
    // data.toString()
    if( err ) {
        throw err
    }
    less.render( data, ( err, css ) => {
        if( err ) {
            throw err
        }
        fs.writeFile( distPath, css.css, ( err ) => {
            if ( err ) {
                throw err
            }
            console.log( 'success' )
        })

    })

});