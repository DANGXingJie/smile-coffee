//windi.config.ts
export default {
  preflight: false,
  prefixer: false,
  extract: {
    // 忽略部分文件夹
    exclude: ['node_modules', '.git', 'dist'],
  },
  corePlugins: {
    // 禁用掉在小程序环境中不可能用到的 plugins
    container: false,
  },
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        btnBg: '#FF902A',
        secondary: '#333333',
        firstGray: '#B5B5B5',
        secondGray: '#FF902A',
        failColor: '#E6E6E6',
        successColor: '#FDEEF1',
        successText: '#F07373',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
}
