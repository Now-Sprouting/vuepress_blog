module.exports = {
  title: 'Now_Sprouting',
  // base:'/blog/',
  description: '你想获得的前端知识',  /* 相当与<meta>标签 */
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: '/vue.png' }], /* 增加一个自定义的 favicon(网页标签的图标) */
  ],
  themeConfig: {
    logo: '/1.jpg',  // 左上角logo
    nav: [ // 导航栏配置
      { text: '首页', link: '/' },
      {
        text: '技术文档', ariaLabel: 'Language Menu', items: [
          { text: 'HTML', link: '/HTML/' },
          { text: 'CSS', link: '/CSS/' },
          { text: 'JavaScript', link: '/JS/' },
          { text: 'React', link: '/React/' },
        //   { text: 'Vue', link: '/Vue/' },  
        //   { text: 'Vue3', link: '/Vue3/' },     
          { text: '浏览器原理', link: '/浏览器原理/' },     
          // { text: '邮箱', link: '15542456716@163.com' }
        ]
      },
      {
        text: '关于我',
        link: '/AboutMe/'
      }
    ],
    sidebar: {
      '/HTML/': [
        '',
        '1',
        '2',
        '3',
        '4'
      ],
      '/CSS/': [
        '',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
      ],
      '/JS/': [
        '',
        '1',
        '2',
        '3',
        '5',
        '6',       
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
      ],
      '/React/':[
        '',
        '1',
        '2',
        '3',
        // '4',
      ],
    //   '/Vue/': [
    //     '',
    //     '1',
    //     '2'
    //   ],
    //   '/Vue3/': [
    //     '',
    //     '1'
    //   ],
      '/浏览器原理/': [
        '1',
        '2',
        '3',
        '4'
      ],
      // '/PS/': [
      //   '',
      //   '1'     
      // ]
    }
    //  'auto', 侧边栏配置
    // sidebarDepyh: 2,
    // displayAllHeaders: true  默认值：false
  },

};