const CONFIG = {
  HEO_HOME_POST_TWO_COLS: true,
  HEO_LOADING_COVER: true,

  HEO_HOME_BANNER_ENABLE: true,

  HEO_SITE_CREATE_TIME: '2026-5-10',

  HEO_NOTICE_BAR: [
    { title: '欢迎来到公司教学平台', url: 'https://blog.tangly1024.com' },
    { title: '让赣锋成为消费电子产品能源的主要提供者', url: 'https://docs.tangly1024.com' }
  ],

  HEO_HERO_REVERSE: false,
  HEO_HERO_BODY_REVERSE: false,

  //HEO_HERO_TITLE_1: '分享公司最新案例',
  //HEO_HERO_TITLE_2: '思维与认知',
  HEO_HERO_TITLE_LINK: 'https://notion-next-19dt.top/',

  HEO_HERO_ICONS_ENABLE: false,
  HEO_HERO_BACKGROUND_IMAGE: '/images/heo/8015c16f210710fd996da7d0c3d9a0a7.jpg',
  HEO_HERO_TEXT_COLOR: '#ffffff',
  HEO_HERO_COVER_TITLE: '分享公司最新案例思维与认知',

  HEO_HERO_ICON_SWITCH: false,
  HEO_HERO_ICON_SLIDER: false,
  HEO_HERO_ICON_SHOW: false,
  HEO_HERO_ICONS: false,

  HEO_HERO_CATEGORY_1: { title: '必看', url: '/tag/必看' },
  HEO_HERO_CATEGORY_2: { title: '热门文章', url: '/tag/热门文章' },
  HEO_HERO_CATEGORY_3: { title: '公司文化', url: '/tag/公司文化' },

  HEO_HERO_RECOMMEND_POST_TAG: '推荐',
  HEO_HERO_RECOMMEND_POST_COUNT: 1,
  HEO_HERO_RECOMMEND_COVER_SCALE: 1.4,
  HEO_HERO_RECOMMEND_POST_SORT_BY_UPDATE_TIME: false,
  HEO_HERO_RECOMMEND_COVER: '/images/heo/52dbbb528a707449caa7b315be3a0baa.jpg',
  HEO_HERO_RECOMMEND_COVER_ENABLE: true,

  HEO_INFOCARD_GREETINGS: [
    '你好！我是',
    '🔍 分享与热心帮助',
    '🤝 专修交互与设计',
    '🏃 脚踏实地行动派'
  ],

  HEO_INFO_CARD_URL1: '/about',
  HEO_INFO_CARD_ICON1: 'fas fa-user',
  HEO_INFO_CARD_URL2: 'https://github.com/tangly1024',
  HEO_INFO_CARD_ICON2: 'fab fa-github',
  HEO_INFO_CARD_URL3: 'https://www.tangly1024.com',

  HEO_GROUP_ICONS: [
    {
      title_1: 'AfterEffect',
      img_1: '/images/heo/20239df3f66615b532ce571eac6d14ff21cf072602.webp',
      color_1: '#989bf8',
      title_2: 'Sketch',
      img_2: '/images/heo/2023e0ded7b724a39f12d59c3dc8fbdc7cbe074202.webp',
      color_2: '#ffffff'
    }
  ],

  HEO_POST_COUNT_TITLE: '文章数:',
  HEO_SITE_TIME_TITLE: '建站天数:',
  HEO_SITE_VISIT_TITLE: '访问量:',
  HEO_SITE_VISITOR_TITLE: '访客数:',

  HEO_MENU_INDEX: true,
  HEO_MENU_CATEGORY: true,
  HEO_MENU_TAG: true,
  HEO_MENU_ARCHIVE: true,
  HEO_MENU_SEARCH: true,

  HEO_POST_LIST_COVER: true,
  HEO_POST_LIST_COVER_HOVER_ENLARGE: false,
  HEO_POST_LIST_COVER_DEFAULT: true,
  HEO_POST_LIST_SUMMARY: true,
  HEO_POST_LIST_PREVIEW: false,
  HEO_POST_LIST_IMG_CROSSOVER: true,

  HEO_ARTICLE_ADJACENT: true,
  HEO_ARTICLE_COPYRIGHT: true,
  HEO_ARTICLE_NOT_BY_AI: false,
  HEO_ARTICLE_RECOMMEND: true,

  HEO_WIDGET_LATEST_POSTS: true,
  HEO_WIDGET_ANALYTICS: false,
  HEO_WIDGET_TO_TOP: true,
  HEO_WIDGET_TO_COMMENT: true,
  HEO_WIDGET_DARK_MODE: true,
  HEO_WIDGET_TOC: true,

  // =====================
  // ✅ 最终生效 CSS
  // =====================
  HEO_CUSTOM_CSS: `
    .today-card-cover {
      content: url('/images/heo/52dbbb528a707449caa7b315be3a0baa.jpg') !important;
    }
    .right-sidebar .sticky {
      display: none !important;
    }
  `,

}
export default CONFIG
