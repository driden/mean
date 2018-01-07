(
    function (global) {
        const packages = {
            app: {
                main: './bootstrap.js',
                defaultExtension: 'js'
            }
        }

        const map = {
            '@angular': 'lib/@angular',
            'rxjs': 'lib/rxjs'
        }

        const ngPackageNames = [
            'common',
            'compiler',
            'core',
            'forms',
            'http',
            'router',
            'platform-browser',
            'platform-browser-dynamic'
        ]

        ngPackageNames.forEach(function (pkgName) {
            packages['@angular/' + pkgName] = {
                main: '/bundles/' + pkgName + '.umd.js',
                defaultExtension: 'js'
            }
        })

        System.config({
            defaultJSExtension: true,
            transpiler: null,
            packages: packages,
            map: map
        })
    }
)(this)