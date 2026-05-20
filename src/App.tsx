import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Archive,
  ArrowUpDown,
  Award,
  Bell,
  BookOpen,
  Bookmark,
  Box,
  Brush,
  Camera,
  ChevronDown,
  Cloud,
  Code,
  Clock,
  Crown,
  Download,
  Eye,
  FileText,
  Grid,
  Heart,
  Home,
  ImageIcon,
  Layers,
  LayoutGrid,
  Menu,
  MessageSquare,
  Monitor,
  Moon,
  MoreHorizontal,
  Palette,
  PanelLeft,
  Play,
  Plus,
  Search,
  Settings,
  Share2,
  Sparkles,
  Star,
  Sun,
  Trash2,
  Type,
  Users,
  Video,
  Wand2,
  X,
} from 'lucide-react';
import {
  AppShell,
  Badge,
  BrandMark,
  CardSurface,
  GhostButton,
  IconButton,
  MobileDrawer,
  Overlay,
  PanelSurface,
  PrimaryButton,
  ProgressBar,
  RowButton,
  SearchInput,
  SecondaryButton,
  SidebarHeader,
  SidebarShell,
  StrongBadge,
  TabButton,
  WorkspaceFrame,
  WorkspaceHeader,
} from './components/ui';

type Language = 'ja' | 'en';
type ThemeMode = 'light' | 'dark' | 'system';
type TabId = 'home' | 'apps' | 'files' | 'projects' | 'learn';
type Tone =
  | 'violet'
  | 'orange'
  | 'pink'
  | 'blue'
  | 'red'
  | 'fuchsia'
  | 'teal'
  | 'emerald'
  | 'indigo'
  | 'amber'
  | 'purple';

const TEMPLATE_ID = 'official-app-creative-suite';
const THEME_STORAGE_KEY = 'melius-official-app-creative-suite-theme';
const LANGUAGE_STORAGE_KEY = 'melius-official-app-creative-suite-language';

const COPY = {
  en: {
    metaTitle: 'Orbit Canvas Creative Suite',
    appName: 'Orbit Canvas',
    appSubtitle: 'Creative Suite',
    search: 'Search...',
    searchLabel: 'Search creative workspace',
    install: 'Install App',
    newProject: 'New Project',
    openSidebar: 'Open navigation',
    closeSidebar: 'Close navigation',
    collapseSidebar: 'Toggle sidebar',
    cloud: 'Cloud storage',
    messages: 'Messages',
    notifications: 'Notifications',
    userName: 'Jordan Lee',
    plan: 'Pro',
    theme: {
      label: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
    language: {
      label: 'Language',
      ja: 'JA',
      en: 'EN',
    },
    tabs: {
      home: 'Home',
      apps: 'Apps',
      files: 'Files',
      projects: 'Projects',
      learn: 'Learn',
    },
    sidebar: {
      home: { title: 'Home' },
      apps: { title: 'Apps', badge: '2', children: ['All Apps', 'Recent', 'Updates', 'Installed'] },
      files: { title: 'Files', children: ['Recent', 'Shared with me', 'Favorites', 'Trash'] },
      projects: { title: 'Projects', badge: '4', children: ['Active Projects', 'Archived', 'Templates'] },
      learn: { title: 'Learn', children: ['Tutorials', 'Courses', 'Webinars', 'Resources'] },
      community: { title: 'Community', children: ['Explore', 'Following', 'Challenges', 'Events'] },
      resources: { title: 'Resources', children: ['Stock Photos', 'Fonts', 'Icons', 'Templates'] },
      settings: 'Settings',
    },
    heroes: {
      home: {
        badge: 'Live workspace',
        title: 'Creative Operations Overview',
        body: 'Monitor app rollout, shared assets, project delivery, and enablement progress from one controlled workspace.',
        primary: 'Review plan',
        secondary: 'Audit activity',
      },
      apps: {
        title: 'Application Portfolio',
        body: 'Review installed tools, rollout status, update queues, and ownership across the production suite.',
        primary: 'Install desktop app',
      },
      files: {
        title: 'Asset Library',
        body: 'Track shared files, ownership, storage scope, and recent changes across every active workspace.',
        primary: 'Upload files',
        secondary: 'Cloud storage',
      },
      projects: {
        title: 'Project Delivery',
        body: 'Manage active initiatives, deadlines, project health, and collaborator workload from one view.',
        primary: 'New project',
      },
      learn: {
        title: 'Team Enablement',
        body: 'Coordinate training paths, completion status, and guided learning for production teams.',
        primary: 'Upgrade seats',
      },
    },
    sections: {
      recentApps: 'Recent Apps',
      recentFiles: 'Recent Files',
      activeProjects: 'Active Projects',
      community: 'Community Highlights',
      newReleases: 'New Releases',
      allApps: 'All Apps',
      allFiles: 'All Files',
      templates: 'Project Templates',
      featuredTutorials: 'Featured Tutorials',
      popularCourses: 'Popular Courses',
      learningPaths: 'Learning Paths',
    },
    actions: {
      viewAll: 'View All',
      explore: 'Explore',
      open: 'Open',
      install: 'Install',
      continueInstall: 'Continue Install',
      filter: 'Filter',
      sort: 'Sort',
      useTemplate: 'Use Template',
      watchNow: 'Watch Now',
      continueLearning: 'Continue Learning',
      startLearning: 'Start Learning',
      createProject: 'Create New Project',
      startFromTemplate: 'Start a new creative project from scratch or use a template.',
    },
    filters: {
      allCategories: 'All Categories',
      creative: 'Creative',
      video: 'Video',
      web: 'Web',
      threeD: '3D',
      allFiles: 'All Files',
      recent: 'Recent',
      shared: 'Shared',
      favorites: 'Favorites',
      trash: 'Trash',
      allProjects: 'All Projects',
      archived: 'Archived',
      courses: 'Courses',
      tips: 'Tips & Tricks',
      trending: 'Trending',
      saved: 'Saved',
    },
    labels: {
      installation: 'Installation',
      progress: 'Progress',
      sharedWith: 'Shared with',
      people: 'people',
      due: 'Due',
      members: 'members',
      files: 'files',
      by: 'by',
      views: 'views',
      completed: 'completed',
      notStarted: 'Not started',
      popular: 'Popular',
      featured: 'Featured',
      new: 'New',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      name: 'Name',
      app: 'App',
      size: 'Size',
      modified: 'Modified',
    },
  },
  ja: {
    metaTitle: 'Orbit Canvas クリエイティブスイート',
    appName: 'Orbit Canvas',
    appSubtitle: 'クリエイティブスイート',
    search: '検索...',
    searchLabel: 'クリエイティブワークスペースを検索',
    install: 'アプリをインストール',
    newProject: '新規プロジェクト',
    openSidebar: 'ナビゲーションを開く',
    closeSidebar: 'ナビゲーションを閉じる',
    collapseSidebar: 'サイドバーを切り替え',
    cloud: 'クラウドストレージ',
    messages: 'メッセージ',
    notifications: '通知',
    userName: 'Jordan Lee',
    plan: 'Pro',
    theme: {
      label: '表示テーマ',
      light: 'ライト',
      dark: 'ダーク',
      system: '自動',
    },
    language: {
      label: '言語',
      ja: 'JA',
      en: 'EN',
    },
    tabs: {
      home: 'ホーム',
      apps: 'アプリ',
      files: 'ファイル',
      projects: 'プロジェクト',
      learn: '学習',
    },
    sidebar: {
      home: { title: 'ホーム' },
      apps: { title: 'アプリ', badge: '2', children: ['すべてのアプリ', '最近使用', 'アップデート', 'インストール済み'] },
      files: { title: 'ファイル', children: ['最近', '共有された項目', 'お気に入り', 'ゴミ箱'] },
      projects: { title: 'プロジェクト', badge: '4', children: ['進行中', 'アーカイブ', 'テンプレート'] },
      learn: { title: '学習', children: ['チュートリアル', 'コース', 'ウェビナー', 'リソース'] },
      community: { title: 'コミュニティ', children: ['探索', 'フォロー中', 'チャレンジ', 'イベント'] },
      resources: { title: '素材', children: ['ストック写真', 'フォント', 'アイコン', 'テンプレート'] },
      settings: '設定',
    },
    heroes: {
      home: {
        badge: '稼働中ワークスペース',
        title: '制作オペレーション概要',
        body: 'アプリ展開、共有アセット、プロジェクト進行、学習状況を1つの管理画面で確認できます。',
        primary: 'プラン確認',
        secondary: '活動ログ',
      },
      apps: {
        title: 'アプリケーション管理',
        body: '導入済みツール、展開状況、更新待ち、担当範囲を制作チーム単位で管理します。',
        primary: 'デスクトップ版を導入',
      },
      files: {
        title: 'アセットライブラリ',
        body: '共有ファイル、所有者、ストレージ範囲、直近の変更をワークスペース横断で追跡します。',
        primary: 'ファイルをアップロード',
        secondary: 'クラウドストレージ',
      },
      projects: {
        title: 'プロジェクト進行管理',
        body: '進行中案件、期限、健全性、共同作業者の負荷を一画面で管理します。',
        primary: '新規プロジェクト',
      },
      learn: {
        title: 'チーム育成',
        body: '制作チーム向けの学習パス、完了状況、ガイド付きトレーニングを整理します。',
        primary: '席数をアップグレード',
      },
    },
    sections: {
      recentApps: '最近使用したアプリ',
      recentFiles: '最近のファイル',
      activeProjects: '進行中プロジェクト',
      community: 'コミュニティハイライト',
      newReleases: '新リリース',
      allApps: 'すべてのアプリ',
      allFiles: 'すべてのファイル',
      templates: 'プロジェクトテンプレート',
      featuredTutorials: '注目チュートリアル',
      popularCourses: '人気コース',
      learningPaths: 'ラーニングパス',
    },
    actions: {
      viewAll: 'すべて見る',
      explore: '探索する',
      open: '開く',
      install: 'インストール',
      continueInstall: 'インストールを続ける',
      filter: '絞り込み',
      sort: '並び替え',
      useTemplate: 'テンプレートを使う',
      watchNow: '今すぐ見る',
      continueLearning: '学習を続ける',
      startLearning: '学習を開始',
      createProject: '新しいプロジェクトを作成',
      startFromTemplate: 'ゼロから始めるか、テンプレートから制作プロジェクトを開始できます。',
    },
    filters: {
      allCategories: 'すべてのカテゴリ',
      creative: '制作',
      video: '動画',
      web: 'Web',
      threeD: '3D',
      allFiles: 'すべてのファイル',
      recent: '最近',
      shared: '共有',
      favorites: 'お気に入り',
      trash: 'ゴミ箱',
      allProjects: 'すべてのプロジェクト',
      archived: 'アーカイブ',
      courses: 'コース',
      tips: 'コツ',
      trending: 'トレンド',
      saved: '保存済み',
    },
    labels: {
      installation: 'インストール',
      progress: '進捗',
      sharedWith: '共有先',
      people: '人',
      due: '期限',
      members: 'メンバー',
      files: 'ファイル',
      by: '講師',
      views: '回視聴',
      completed: '完了',
      notStarted: '未開始',
      popular: '人気',
      featured: '注目',
      new: '新着',
      beginner: '初級',
      intermediate: '中級',
      advanced: '上級',
      name: '名前',
      app: 'アプリ',
      size: 'サイズ',
      modified: '更新',
    },
  },
} as const;

type AppCopy = (typeof COPY)[Language];

const sidebarItems: Array<{
  id: keyof typeof COPY.en.sidebar;
  icon: LucideIcon;
  hasChildren?: boolean;
}> = [
  { id: 'home', icon: Home },
  { id: 'apps', icon: Grid, hasChildren: true },
  { id: 'files', icon: FileText, hasChildren: true },
  { id: 'projects', icon: Layers, hasChildren: true },
  { id: 'learn', icon: BookOpen, hasChildren: true },
  { id: 'community', icon: Users, hasChildren: true },
  { id: 'resources', icon: Bookmark, hasChildren: true },
];

const tabs: TabId[] = ['home', 'apps', 'files', 'projects', 'learn'];

const apps: Array<{
  id: string;
  name: string;
  icon: LucideIcon;
  tone: Tone;
  category: string;
  recent: boolean;
  isNew: boolean;
  progress: number;
  description: Record<Language, string>;
}> = [
  {
    id: 'pixel-forge',
    name: 'PixelForge',
    icon: ImageIcon,
    tone: 'violet',
    category: 'Creative',
    recent: true,
    isNew: false,
    progress: 100,
    description: {
      en: 'Advanced image editing and layered composition.',
      ja: '高度な画像編集とレイヤー合成。',
    },
  },
  {
    id: 'vector-room',
    name: 'VectorRoom',
    icon: Brush,
    tone: 'orange',
    category: 'Creative',
    recent: true,
    isNew: false,
    progress: 100,
    description: {
      en: 'Precise vector drawing for brand systems.',
      ja: 'ブランド制作向けの精密なベクター描画。',
    },
  },
  {
    id: 'frame-studio',
    name: 'FrameStudio',
    icon: Video,
    tone: 'pink',
    category: 'Video',
    recent: true,
    isNew: false,
    progress: 100,
    description: {
      en: 'Cinematic editing, timeline review, and delivery.',
      ja: '映像編集、タイムライン確認、納品管理。',
    },
  },
  {
    id: 'motion-lab',
    name: 'MotionLab',
    icon: Sparkles,
    tone: 'blue',
    category: 'Video',
    recent: false,
    isNew: false,
    progress: 100,
    description: {
      en: 'Motion graphics, transitions, and visual effects.',
      ja: 'モーショングラフィック、遷移、視覚効果。',
    },
  },
  {
    id: 'page-line',
    name: 'PageLine',
    icon: Layers,
    tone: 'red',
    category: 'Creative',
    recent: false,
    isNew: false,
    progress: 100,
    description: {
      en: 'Editorial layout tools for campaigns and catalogs.',
      ja: 'キャンペーンやカタログ向けの紙面設計ツール。',
    },
  },
  {
    id: 'ux-map',
    name: 'UXMap',
    icon: LayoutGrid,
    tone: 'fuchsia',
    category: 'Design',
    recent: false,
    isNew: true,
    progress: 84,
    description: {
      en: 'User flows, wireframes, and interactive prototypes.',
      ja: 'ユーザーフロー、ワイヤー、インタラクティブ試作。',
    },
  },
  {
    id: 'photo-field',
    name: 'PhotoField',
    icon: Camera,
    tone: 'teal',
    category: 'Photography',
    recent: false,
    isNew: false,
    progress: 100,
    description: {
      en: 'Photo selection, grading, and production libraries.',
      ja: '写真選定、色調整、制作ライブラリ管理。',
    },
  },
  {
    id: 'web-canvas',
    name: 'WebCanvas',
    icon: Code,
    tone: 'emerald',
    category: 'Web',
    recent: false,
    isNew: true,
    progress: 72,
    description: {
      en: 'Landing screens, components, and web handoff.',
      ja: 'LP画面、コンポーネント、Web引き継ぎ。',
    },
  },
  {
    id: 'model-space',
    name: 'ModelSpace',
    icon: Box,
    tone: 'indigo',
    category: '3D',
    recent: false,
    isNew: true,
    progress: 61,
    description: {
      en: '3D model staging, material preview, and renders.',
      ja: '3Dモデル配置、素材プレビュー、レンダー。',
    },
  },
  {
    id: 'type-foundry',
    name: 'TypeFoundry',
    icon: Type,
    tone: 'amber',
    category: 'Typography',
    recent: false,
    isNew: false,
    progress: 100,
    description: {
      en: 'Typography pairing, specimen pages, and tokens.',
      ja: '書体組み合わせ、見本ページ、トークン管理。',
    },
  },
  {
    id: 'chroma-kit',
    name: 'ChromaKit',
    icon: Palette,
    tone: 'purple',
    category: 'Design',
    recent: false,
    isNew: false,
    progress: 100,
    description: {
      en: 'Color palettes, accessibility checks, and exports.',
      ja: '配色、アクセシビリティ確認、書き出し。',
    },
  },
];

const recentFiles: Array<{
  id: string;
  name: string;
  app: string;
  modified: Record<Language, string>;
  icon: LucideIcon;
  tone: Tone;
  shared: boolean;
  size: string;
  collaborators: number;
}> = [
  {
    id: 'brand-refresh',
    name: 'Brand Refresh.pxf',
    app: 'PixelForge',
    modified: { en: '2 hours ago', ja: '2時間前' },
    icon: ImageIcon,
    tone: 'violet',
    shared: true,
    size: '24.5 MB',
    collaborators: 3,
  },
  {
    id: 'symbol-system',
    name: 'Symbol System.vec',
    app: 'VectorRoom',
    modified: { en: 'Yesterday', ja: '昨日' },
    icon: Brush,
    tone: 'orange',
    shared: true,
    size: '8.2 MB',
    collaborators: 2,
  },
  {
    id: 'launch-film',
    name: 'Launch Film.frm',
    app: 'FrameStudio',
    modified: { en: '3 days ago', ja: '3日前' },
    icon: Video,
    tone: 'pink',
    shared: false,
    size: '1.2 GB',
    collaborators: 0,
  },
  {
    id: 'interface-motion',
    name: 'Interface Motion.mtn',
    app: 'MotionLab',
    modified: { en: 'Last week', ja: '先週' },
    icon: Sparkles,
    tone: 'blue',
    shared: true,
    size: '345 MB',
    collaborators: 4,
  },
  {
    id: 'catalog-layout',
    name: 'Catalog Layout.pgl',
    app: 'PageLine',
    modified: { en: '2 weeks ago', ja: '2週間前' },
    icon: Layers,
    tone: 'red',
    shared: false,
    size: '42.8 MB',
    collaborators: 0,
  },
  {
    id: 'mobile-system',
    name: 'Mobile System.uxm',
    app: 'UXMap',
    modified: { en: '3 weeks ago', ja: '3週間前' },
    icon: LayoutGrid,
    tone: 'fuchsia',
    shared: true,
    size: '18.3 MB',
    collaborators: 5,
  },
  {
    id: 'product-shoot',
    name: 'Product Shoot.phf',
    app: 'PhotoField',
    modified: { en: 'Last month', ja: '先月' },
    icon: Camera,
    tone: 'teal',
    shared: false,
    size: '156 MB',
    collaborators: 0,
  },
];

const projects: Array<{
  id: string;
  name: string;
  description: Record<Language, string>;
  progress: number;
  dueDate: Record<Language, string>;
  members: number;
  files: number;
}> = [
  {
    id: 'website-system',
    name: 'Website System',
    description: {
      en: 'Complete redesign of the public site and product pages.',
      ja: '公開サイトと製品ページの全面リデザイン。',
    },
    progress: 75,
    dueDate: { en: 'June 15', ja: '6月15日' },
    members: 4,
    files: 23,
  },
  {
    id: 'mobile-launch',
    name: 'Mobile Launch',
    description: {
      en: 'Design assets and review flows for a new mobile app.',
      ja: '新しいモバイルアプリ向けの制作物と確認導線。',
    },
    progress: 60,
    dueDate: { en: 'July 30', ja: '7月30日' },
    members: 6,
    files: 42,
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity',
    description: {
      en: 'New visual guidelines, patterns, and launch assets.',
      ja: '新しいビジュアル規定、パターン、ローンチ素材。',
    },
    progress: 90,
    dueDate: { en: 'May 25', ja: '5月25日' },
    members: 3,
    files: 18,
  },
  {
    id: 'summer-campaign',
    name: 'Summer Campaign',
    description: {
      en: 'Seasonal promotion materials across paid and organic channels.',
      ja: '広告と自社チャネル向けの季節キャンペーン素材。',
    },
    progress: 40,
    dueDate: { en: 'August 10', ja: '8月10日' },
    members: 5,
    files: 31,
  },
];

const communityPosts: Array<{
  id: string;
  title: Record<Language, string>;
  author: string;
  likes: number;
  comments: number;
  tone: Tone;
  time: Record<Language, string>;
}> = [
  {
    id: 'minimal-symbols',
    title: { en: 'Minimal Symbol Set', ja: 'ミニマルシンボル集' },
    author: 'Ari Morgan',
    likes: 342,
    comments: 28,
    tone: 'violet',
    time: { en: '2 days ago', ja: '2日前' },
  },
  {
    id: 'character-concept',
    title: { en: '3D Character Concept', ja: '3Dキャラクター案' },
    author: 'Priya Shah',
    likes: 518,
    comments: 47,
    tone: 'indigo',
    time: { en: '1 week ago', ja: '1週間前' },
  },
  {
    id: 'dashboard-redesign',
    title: { en: 'UI Dashboard Redesign', ja: 'UIダッシュボード刷新' },
    author: 'Theo Wright',
    likes: 276,
    comments: 32,
    tone: 'teal',
    time: { en: '3 days ago', ja: '3日前' },
  },
  {
    id: 'photo-system',
    title: { en: 'Product Photo System', ja: '商品撮影システム' },
    author: 'Olivia Chen',
    likes: 189,
    comments: 15,
    tone: 'orange',
    time: { en: '5 days ago', ja: '5日前' },
  },
];

const tutorials: Array<{
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  duration: string;
  level: keyof typeof COPY.en.labels;
  instructor: string;
  category: string;
  views: string;
  tone: Tone;
}> = [
  {
    id: 'digital-illustration',
    title: { en: 'Mastering Digital Illustration', ja: 'デジタルイラスト実践' },
    description: {
      en: 'Advanced techniques for expressive campaign artwork.',
      ja: 'キャンペーンアート向けの表現技法を学びます。',
    },
    duration: '1h 45m',
    level: 'advanced',
    instructor: 'Sarah Chen',
    category: 'Illustration',
    views: '24K',
    tone: 'purple',
  },
  {
    id: 'ux-fundamentals',
    title: { en: 'UI/UX Design Fundamentals', ja: 'UI/UXデザイン基礎' },
    description: {
      en: 'Essential principles for intuitive interface design.',
      ja: '迷わず使えるUI設計の原則を整理します。',
    },
    duration: '2h 20m',
    level: 'intermediate',
    instructor: 'Michael Ruiz',
    category: 'Design',
    views: '56K',
    tone: 'blue',
  },
  {
    id: 'video-masterclass',
    title: { en: 'Video Editing Masterclass', ja: '動画編集マスタークラス' },
    description: {
      en: 'Professional rhythm, transitions, and review workflows.',
      ja: 'プロ向けの編集リズム、遷移、確認フロー。',
    },
    duration: '3h 10m',
    level: 'advanced',
    instructor: 'James Wilson',
    category: 'Video',
    views: '32K',
    tone: 'pink',
  },
  {
    id: 'type-essentials',
    title: { en: 'Typography Essentials', ja: 'タイポグラフィ基礎' },
    description: {
      en: 'Create effective type systems for brand and product work.',
      ja: 'ブランドとプロダクトに効く文字システムを作ります。',
    },
    duration: '1h 30m',
    level: 'beginner',
    instructor: 'Emma Park',
    category: 'Typography',
    views: '18K',
    tone: 'amber',
  },
  {
    id: 'color-theory',
    title: { en: 'Color Theory for Designers', ja: 'デザイナーの色彩理論' },
    description: {
      en: 'Color relationships, contrast, and production palettes.',
      ja: '色の関係、コントラスト、実務用パレット。',
    },
    duration: '2h 05m',
    level: 'intermediate',
    instructor: 'David Kim',
    category: 'Design',
    views: '41K',
    tone: 'teal',
  },
];

const projectTemplates: Array<{
  id: string;
  title: string;
  description: Record<Language, string>;
  tone: Tone;
  badge: 'popular' | 'new' | 'featured';
}> = [
  {
    id: 'brand-template',
    title: 'Brand Identity',
    description: { en: 'Complete brand design package', ja: 'ブランド設計一式' },
    tone: 'blue' as Tone,
    badge: 'popular',
  },
  {
    id: 'campaign-template',
    title: 'Marketing Campaign',
    description: { en: 'Multi-channel marketing assets', ja: '複数チャネル向け制作素材' },
    tone: 'orange' as Tone,
    badge: 'new',
  },
  {
    id: 'website-template',
    title: 'Website Redesign',
    description: { en: 'Complete website design workflow', ja: 'Webサイト刷新ワークフロー' },
    tone: 'emerald' as Tone,
    badge: 'featured',
  },
  {
    id: 'launch-template',
    title: 'Product Launch',
    description: { en: 'Product launch campaign assets', ja: '製品ローンチ用キャンペーン素材' },
    tone: 'pink' as Tone,
    badge: 'popular',
  },
];

function getPreviewParam(keys: string[]) {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new URLSearchParams(window.location.search);

  for (const key of keys) {
    const value = params.get(key);

    if (value) {
      return value;
    }
  }

  return null;
}

function getInitialLanguage(): Language {
  const requested = getPreviewParam(['locale', 'lang', 'language', 'melius_locale']);

  if (requested === 'ja' || requested === 'en') {
    return requested;
  }

  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (stored === 'ja' || stored === 'en') {
      return stored;
    }
  } catch {
    return 'en';
  }

  return window.navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en';
}

function getInitialTheme(): ThemeMode {
  const requested = getPreviewParam(['theme', 'themeMode', 'colorScheme', 'melius_theme']);

  if (requested === 'light' || requested === 'dark' || requested === 'system') {
    return requested;
  }

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    return 'system';
  }

  const preference = document.documentElement.dataset.themePreference;
  return preference === 'light' || preference === 'dark' || preference === 'system' ? preference : 'system';
}

function resolveTheme(mode: ThemeMode) {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return mode;
}

function applyTheme(mode: ThemeMode) {
  const resolved = resolveTheme(mode);
  const root = document.documentElement;

  root.classList.toggle('dark', resolved === 'dark');
  root.dataset.theme = resolved;
  root.dataset.themePreference = mode;
  root.style.colorScheme = resolved;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // Theme persistence is optional for this visual starter.
  }
}

function applyLanguage(language: Language, title: string) {
  document.documentElement.lang = language;
  document.title = title;

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Language persistence is optional for this visual starter.
  }
}

function ToneIcon({ tone, icon: Icon }: { tone: Tone; icon: LucideIcon }) {
  switch (tone) {
    case 'violet':
      return (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-zinc-200 text-zinc-700 dark:bg-zinc-300/[0.14] dark:text-zinc-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      );
    case 'orange':
      return (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-300/[0.12] dark:text-amber-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      );
    case 'pink':
      return (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-stone-200 text-stone-700 dark:bg-stone-300/[0.12] dark:text-stone-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      );
    case 'blue':
      return (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-800 dark:bg-zinc-300/[0.12] dark:text-zinc-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      );
    case 'red':
      return (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-300/[0.12] dark:text-rose-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      );
    case 'fuchsia':
      return (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-300/[0.12] dark:text-zinc-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      );
    case 'teal':
      return (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-300/[0.14] dark:text-emerald-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      );
    case 'emerald':
      return (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-300/[0.12] dark:text-emerald-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      );
    case 'indigo':
      return (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-neutral-100 text-neutral-800 dark:bg-neutral-300/[0.12] dark:text-neutral-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      );
    case 'amber':
      return (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-yellow-100 text-yellow-800 dark:bg-yellow-300/[0.12] dark:text-yellow-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      );
    case 'purple':
    default:
      return (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-300/[0.12] dark:text-zinc-200">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      );
  }
}

function MiniToneBlock({ tone }: { tone: Tone }) {
  switch (tone) {
    case 'orange':
      return <span className="block h-full w-full bg-gradient-to-br from-amber-200 via-stone-400 to-zinc-700" />;
    case 'pink':
      return <span className="block h-full w-full bg-gradient-to-br from-stone-200 via-zinc-400 to-zinc-800" />;
    case 'blue':
      return <span className="block h-full w-full bg-gradient-to-br from-zinc-200 via-zinc-700 to-neutral-950" />;
    case 'teal':
      return <span className="block h-full w-full bg-gradient-to-br from-stone-200 via-emerald-800 to-neutral-950" />;
    case 'emerald':
      return <span className="block h-full w-full bg-gradient-to-br from-emerald-100 via-green-800 to-neutral-950" />;
    case 'indigo':
      return <span className="block h-full w-full bg-gradient-to-br from-neutral-200 via-stone-700 to-neutral-950" />;
    case 'amber':
      return <span className="block h-full w-full bg-gradient-to-br from-yellow-200 via-amber-600 to-zinc-800" />;
    case 'purple':
      return <span className="block h-full w-full bg-gradient-to-br from-stone-300 via-zinc-700 to-neutral-950" />;
    case 'red':
      return <span className="block h-full w-full bg-gradient-to-br from-rose-200 via-rose-700 to-zinc-900" />;
    case 'fuchsia':
      return <span className="block h-full w-full bg-gradient-to-br from-zinc-200 via-stone-600 to-neutral-950" />;
    case 'violet':
    default:
      return <span className="block h-full w-full bg-gradient-to-br from-zinc-200 via-zinc-800 to-neutral-950" />;
  }
}

function LanguageSwitcher({
  copy,
  language,
  onLanguageChange,
}: {
  copy: AppCopy;
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  return (
    <div
      data-melius-ui-id="language-switcher"
      data-melius-ui-role="control"
      aria-label={copy.language.label}
      className="hidden h-9 items-center rounded-lg border border-zinc-950/[0.08] bg-white/[0.70] p-1 text-xs font-black text-zinc-600 backdrop-blur dark:border-white/[0.10] dark:bg-white/[0.06] dark:text-zinc-300 sm:inline-flex"
    >
      <LanguageOptionButton selected={language === 'ja'} label={copy.language.ja} onClick={() => onLanguageChange('ja')} />
      <LanguageOptionButton selected={language === 'en'} label={copy.language.en} onClick={() => onLanguageChange('en')} />
    </div>
  );
}

function LanguageOptionButton({ selected, label, onClick }: { selected: boolean; label: string; onClick: () => void }) {
  if (selected) {
    return (
      <button
        type="button"
        aria-pressed="true"
        onClick={onClick}
        className="h-7 min-w-8 rounded-md bg-zinc-950 px-2.5 text-white dark:bg-white dark:text-zinc-950"
      >
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed="false"
      onClick={onClick}
      className="h-7 min-w-8 rounded-md px-2.5 transition-colors hover:bg-zinc-950/[0.06] hover:text-zinc-950 dark:hover:bg-white/[0.10] dark:hover:text-white"
    >
      {label}
    </button>
  );
}

function ThemeSwitcher({
  copy,
  theme,
  onThemeChange,
}: {
  copy: AppCopy;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}) {
  return (
    <div
      data-melius-ui-id="theme-switcher"
      data-melius-ui-role="control"
      aria-label={copy.theme.label}
      className="hidden h-9 items-center rounded-lg border border-zinc-950/[0.08] bg-white/[0.70] p-1 text-xs font-black text-zinc-600 backdrop-blur dark:border-white/[0.10] dark:bg-white/[0.06] dark:text-zinc-300 lg:inline-flex"
    >
      <ThemeOptionButton selected={theme === 'light'} label={copy.theme.light} onClick={() => onThemeChange('light')} icon={Sun} />
      <ThemeOptionButton selected={theme === 'system'} label={copy.theme.system} onClick={() => onThemeChange('system')} icon={Monitor} />
      <ThemeOptionButton selected={theme === 'dark'} label={copy.theme.dark} onClick={() => onThemeChange('dark')} icon={Moon} />
    </div>
  );
}

function ThemeOptionButton({
  selected,
  label,
  onClick,
  icon: Icon,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
  icon: LucideIcon;
}) {
  if (selected) {
    return (
      <button
        type="button"
        aria-pressed="true"
        title={label}
        onClick={onClick}
        className="inline-flex h-7 min-w-8 items-center justify-center gap-1.5 rounded-md bg-zinc-950 px-2.5 text-white dark:bg-white dark:text-zinc-950"
      >
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden xl:inline">{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed="false"
      title={label}
      onClick={onClick}
      className="inline-flex h-7 min-w-8 items-center justify-center gap-1.5 rounded-md px-2.5 transition-colors hover:bg-zinc-950/[0.06] hover:text-zinc-950 dark:hover:bg-white/[0.10] dark:hover:text-white"
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="hidden xl:inline">{label}</span>
    </button>
  );
}

function SidebarContent({
  copy,
  expandedItems,
  idPrefix,
  onToggleExpanded,
  onCloseMobile,
}: {
  copy: AppCopy;
  expandedItems: Record<string, boolean>;
  idPrefix: 'desktop-nav' | 'mobile-nav';
  onToggleExpanded: (id: string) => void;
  onCloseMobile?: () => void;
}) {
  return (
    <>
      <SidebarHeader data-melius-ui-id={`${idPrefix}-brand`} data-melius-ui-role="navigation">
        <BrandMark>
          <Wand2 className="h-5 w-5" aria-hidden="true" />
        </BrandMark>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-black text-zinc-950 dark:text-white">{copy.appName}</div>
          <div className="truncate text-xs font-semibold text-zinc-500 dark:text-zinc-400">{copy.appSubtitle}</div>
        </div>
        {onCloseMobile ? (
          <IconButton dataId={`${idPrefix}-close`} roleName="button" label={copy.closeSidebar} onClick={onCloseMobile}>
            <X className="h-5 w-5" aria-hidden="true" />
          </IconButton>
        ) : null}
      </SidebarHeader>

      <div className="px-3 py-3">
        <SearchInput
          dataId={`${idPrefix}-search`}
          roleName="search"
          label={copy.searchLabel}
          type="search"
          placeholder={copy.search}
          icon={<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />}
        />
      </div>

      <nav data-melius-ui-id={`${idPrefix}-navigation`} data-melius-ui-role="navigation" className="thin-scrollbar min-h-0 flex-1 overflow-y-auto px-3 pb-3">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const sidebarCopy = copy.sidebar[item.id] as {
              title: string;
              badge?: string;
              children?: readonly string[];
            };
            const Icon = item.icon;
            const selected = item.id === 'home';
            const children = sidebarCopy.children ?? [];
            const badge = sidebarCopy.badge;
            const title = sidebarCopy.title;

            return (
              <div key={item.id}>
                <RowButton
                  dataId={`${idPrefix}-${item.id}`}
                  roleName="navigation-item"
                  selected={selected}
                  onClick={() => {
                    if (children.length > 0) {
                      onToggleExpanded(item.id);
                    }
                  }}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{title}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    {badge ? <Badge>{badge}</Badge> : null}
                    {children.length > 0 ? (
                      <ChevronDown
                        className={expandedItems[item.id] ? 'h-4 w-4 rotate-180 transition-transform' : 'h-4 w-4 transition-transform'}
                        aria-hidden="true"
                      />
                    ) : null}
                  </span>
                </RowButton>

                {children.length > 0 && expandedItems[item.id] ? (
                  <div
                    data-melius-ui-id={`${idPrefix}-${item.id}-children`}
                    data-melius-ui-role="navigation-group"
                    className="ml-5 mt-1 space-y-1 border-l border-zinc-950/[0.08] pl-3 dark:border-white/[0.10]"
                  >
                    {children.map((child, childIndex) => (
                      <button
                        key={child}
                        type="button"
                        data-melius-ui-id={`${idPrefix}-${item.id}-child-${childIndex + 1}`}
                        data-melius-ui-role="navigation-item"
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-zinc-500 transition-colors hover:bg-zinc-950/[0.05] hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/[0.09] dark:hover:text-white"
                      >
                        {child}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </nav>

      <div data-melius-ui-id={`${idPrefix}-account`} data-melius-ui-role="account" className="border-t border-zinc-950/[0.08] p-3 dark:border-white/[0.08]">
        <div className="space-y-1">
          <RowButton dataId={`${idPrefix}-settings`} roleName="button">
            <span className="flex items-center gap-3">
              <Settings className="h-5 w-5" aria-hidden="true" />
              {copy.sidebar.settings}
            </span>
          </RowButton>
          <RowButton dataId={`${idPrefix}-user-plan`} roleName="account">
            <span className="flex min-w-0 items-center gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-gradient-to-br from-zinc-950 to-stone-700 text-xs font-black text-white">
                JL
              </span>
              <span className="truncate">{copy.userName}</span>
            </span>
            <Badge>{copy.plan}</Badge>
          </RowButton>
        </div>
      </div>
    </>
  );
}

function GradientHero({
  variant,
  language,
  badge,
  title,
  body,
  primary,
  secondary,
}: {
  variant: TabId;
  language: Language;
  badge?: string;
  title: string;
  body: string;
  primary: string;
  secondary?: string;
}) {
  if (variant === 'apps') {
    return (
      <HeroFrame variant={variant} language={language} className="bg-gradient-to-r from-neutral-950 via-zinc-900 to-stone-800" badge={badge} title={title} body={body} primary={primary} secondary={secondary} />
    );
  }

  if (variant === 'files') {
    return (
      <HeroFrame variant={variant} language={language} className="bg-gradient-to-r from-neutral-950 via-emerald-950 to-stone-900" badge={badge} title={title} body={body} primary={primary} secondary={secondary} />
    );
  }

  if (variant === 'projects') {
    return (
      <HeroFrame variant={variant} language={language} className="bg-gradient-to-r from-neutral-950 via-stone-900 to-zinc-800" badge={badge} title={title} body={body} primary={primary} secondary={secondary} />
    );
  }

  if (variant === 'learn') {
    return (
      <HeroFrame variant={variant} language={language} className="bg-gradient-to-r from-neutral-950 via-green-950 to-stone-800" badge={badge} title={title} body={body} primary={primary} secondary={secondary} />
    );
  }

  return (
    <HeroFrame variant={variant} language={language} className="bg-gradient-to-r from-neutral-950 via-zinc-900 to-emerald-950" badge={badge} title={title} body={body} primary={primary} secondary={secondary} showGlobe />
  );
}

function getHeroMetrics(variant: TabId): Array<{ label: Record<Language, string>; value: string }> {
  switch (variant) {
    case 'apps':
      return [
        { label: { en: 'Installed', ja: '導入済み' }, value: '9' },
        { label: { en: 'Pending updates', ja: '更新待ち' }, value: '2' },
        { label: { en: 'Rollout', ja: '展開率' }, value: '96%' },
      ];
    case 'files':
      return [
        { label: { en: 'Shared files', ja: '共有ファイル' }, value: '68' },
        { label: { en: 'Storage used', ja: '使用容量' }, value: '1.8TB' },
        { label: { en: 'Recent changes', ja: '直近変更' }, value: '24' },
      ];
    case 'projects':
      return [
        { label: { en: 'On track', ja: '順調' }, value: '3' },
        { label: { en: 'Due this week', ja: '今週期限' }, value: '2' },
        { label: { en: 'Team load', ja: '稼働率' }, value: '82%' },
      ];
    case 'learn':
      return [
        { label: { en: 'Learning paths', ja: '学習パス' }, value: '3' },
        { label: { en: 'Completion', ja: '完了率' }, value: '30%' },
        { label: { en: 'Saved courses', ja: '保存コース' }, value: '12' },
      ];
    case 'home':
    default:
      return [
        { label: { en: 'Active projects', ja: '進行中案件' }, value: '4' },
        { label: { en: 'Installed apps', ja: '導入アプリ' }, value: '9' },
        { label: { en: 'Shared assets', ja: '共有アセット' }, value: '68' },
      ];
  }
}

function HeroFrame({
  variant,
  language,
  className,
  badge,
  title,
  body,
  primary,
  secondary,
  showGlobe,
}: {
  variant: TabId;
  language: Language;
  className: string;
  badge?: string;
  title: string;
  body: string;
  primary: string;
  secondary?: string;
  showGlobe?: boolean;
}) {
  const metrics = getHeroMetrics(variant);

  return (
    <section
      data-melius-ui-id="workspace-hero"
      data-melius-ui-role="hero"
      className={`${className} hero-panel overflow-hidden rounded-lg border border-white/[0.10] p-5 text-white shadow-xl shadow-zinc-950/10 sm:p-6`}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] lg:items-center">
        <div className="max-w-3xl space-y-3">
          {badge ? <StrongBadge>{badge}</StrongBadge> : null}
          <h2 data-melius-ui-id="hero-title" data-melius-ui-role="heading" className="text-2xl font-black leading-tight tracking-normal sm:text-3xl">
            {title}
          </h2>
          <p data-melius-ui-id="hero-body" data-melius-ui-role="text" className="max-w-2xl text-sm font-medium leading-6 text-white/[0.76]">
            {body}
          </p>
          <div data-melius-ui-id="hero-actions" data-melius-ui-role="actions" className="flex flex-wrap gap-2">
            <button
              type="button"
              data-melius-ui-id="hero-primary-action"
              data-melius-ui-role="button"
              className="inline-flex min-h-9 items-center justify-center rounded-lg bg-white px-3.5 py-2 text-sm font-black text-zinc-900 transition hover:bg-white/[0.90]"
            >
              {primary}
            </button>
            {secondary ? (
              <button
                type="button"
                data-melius-ui-id="hero-secondary-action"
                data-melius-ui-role="button"
                className="inline-flex min-h-9 items-center justify-center rounded-lg border border-white/[0.45] bg-white/[0.04] px-3.5 py-2 text-sm font-black text-white backdrop-blur transition hover:bg-white/[0.10]"
              >
                {secondary}
              </button>
            ) : null}
          </div>
        </div>
        <div data-melius-ui-id="hero-status-panel" data-melius-ui-role="status" className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {showGlobe ? (
            <div data-melius-ui-id="hero-orbit-globe" data-melius-ui-role="visual" className="hidden min-h-24 items-center justify-between rounded-lg border border-white/[0.12] bg-white/[0.06] px-4 py-3 backdrop-blur lg:flex">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/[0.58]">
                {language === 'ja' ? '運用マップ' : 'Orbit map'}
              </span>
              <div className="orbit-globe relative h-20 w-20 rounded-full bg-white/[0.08]">
                <span className="absolute inset-2 rounded-full border border-white/[0.22]" />
                <span className="absolute inset-4 rounded-full border border-white/[0.28]" />
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.22]" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/[0.22]" />
                <span className="absolute inset-8 rounded-full bg-white/[0.64]" />
              </div>
            </div>
          ) : null}
          {metrics.map((metric, index) => (
            <div key={metric.label.en} data-melius-ui-id={`hero-metric-${index + 1}`} data-melius-ui-role="metric" className="rounded-lg border border-white/[0.12] bg-white/[0.06] px-4 py-3 backdrop-blur">
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-white/[0.52]">{metric.label[language]}</div>
              <div className="mt-1 text-2xl font-black leading-none">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ title, action, actionId }: { title: string; action?: string; actionId?: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-xl font-black tracking-normal text-zinc-950 dark:text-white">{title}</h2>
      {action ? (
        <GhostButton dataId={actionId ?? 'section-action'} roleName="button">
          {action}
        </GhostButton>
      ) : null}
    </div>
  );
}

function AppCard({
  app,
  copy,
  language,
  context,
}: {
  app: (typeof apps)[number];
  copy: AppCopy;
  language: Language;
  context: string;
}) {
  const uiId = `${context}-${app.id}`;

  return (
    <CardSurface data-melius-ui-id={`app-card-${uiId}`} data-melius-ui-role="card">
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <ToneIcon tone={app.tone} icon={app.icon} />
          {app.isNew ? <Badge>{copy.labels.new}</Badge> : <IconButton dataId={`favorite-${uiId}`} roleName="button" label="Favorite"><Star className="h-4 w-4" aria-hidden="true" /></IconButton>}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-black text-zinc-950 dark:text-white">{app.name}</h3>
          <p className="mt-1 min-h-10 text-sm font-medium leading-5 text-zinc-500 dark:text-zinc-400">
            {app.description[language]}
          </p>
        </div>
        {app.progress < 100 ? (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-500 dark:text-zinc-400">
              <span>{copy.labels.installation}</span>
              <span>{app.progress}%</span>
            </div>
            <ProgressBar dataId={`install-progress-${uiId}`} value={app.progress} />
          </div>
        ) : null}
        <div className="mt-4">
          <SecondaryButton dataId={`open-app-${uiId}`} roleName="button">
            {app.progress < 100 ? copy.actions.continueInstall : copy.actions.open}
          </SecondaryButton>
        </div>
      </div>
    </CardSurface>
  );
}

function FileRow({ file, copy, language }: { file: (typeof recentFiles)[number]; copy: AppCopy; language: Language }) {
  return (
    <div
      data-melius-ui-id={`file-row-${file.id}`}
      data-melius-ui-role="list-item"
      className="grid gap-3 p-4 transition-colors hover:bg-zinc-950/[0.035] dark:hover:bg-white/[0.045] md:grid-cols-12 md:items-center"
    >
      <div className="flex min-w-0 items-center gap-3 md:col-span-6">
        <ToneIcon tone={file.tone} icon={file.icon} />
        <div className="min-w-0">
          <div className="truncate font-black text-zinc-950 dark:text-white">{file.name}</div>
          {file.shared ? (
            <div className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <Users className="h-3 w-3" aria-hidden="true" />
              {copy.labels.sharedWith} {file.collaborators} {copy.labels.people}
            </div>
          ) : null}
        </div>
      </div>
      <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 md:col-span-2">{file.app}</div>
      <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 md:col-span-2">{file.size}</div>
      <div className="flex items-center justify-between gap-3 text-sm font-semibold text-zinc-600 dark:text-zinc-300 md:col-span-2">
        <span>{file.modified[language]}</span>
        <span className="flex items-center gap-1">
          <IconButton dataId={`share-file-${file.id}`} roleName="button" label="Share">
            <Share2 className="h-4 w-4" aria-hidden="true" />
          </IconButton>
          <IconButton dataId={`file-options-${file.id}`} roleName="button" label="Options">
            <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
          </IconButton>
        </span>
      </div>
    </div>
  );
}

function CompactFileRow({ file, copy, language }: { file: (typeof recentFiles)[number]; copy: AppCopy; language: Language }) {
  return (
    <div
      data-melius-ui-id={`recent-file-${file.id}`}
      data-melius-ui-role="list-item"
      className="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-zinc-950/[0.035] dark:hover:bg-white/[0.045]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <ToneIcon tone={file.tone} icon={file.icon} />
        <div className="min-w-0">
          <div className="truncate font-black text-zinc-950 dark:text-white">{file.name}</div>
          <div className="truncate text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {file.app} / {file.modified[language]}
          </div>
        </div>
      </div>
      <div className="hidden shrink-0 items-center gap-2 sm:flex">
        {file.shared ? (
          <Badge>
            <Users className="h-3 w-3" aria-hidden="true" />
            {file.collaborators}
          </Badge>
        ) : null}
        <GhostButton dataId={`compact-open-${file.id}`} roleName="button">
          {copy.actions.open}
        </GhostButton>
      </div>
    </div>
  );
}

function ProjectRow({ project, copy, language }: { project: (typeof projects)[number]; copy: AppCopy; language: Language }) {
  return (
    <div data-melius-ui-id={`project-row-${project.id}`} data-melius-ui-role="list-item" className="p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-black text-zinc-950 dark:text-white">{project.name}</h3>
        <Badge>
          {copy.labels.due} {project.dueDate[language]}
        </Badge>
      </div>
      <p className="text-sm font-medium leading-5 text-zinc-500 dark:text-zinc-400">{project.description[language]}</p>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between text-sm font-semibold text-zinc-600 dark:text-zinc-300">
          <span>{copy.labels.progress}</span>
          <span>{project.progress}%</span>
        </div>
        <ProgressBar dataId={`project-progress-${project.id}`} value={project.progress} />
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
        <span className="inline-flex items-center gap-1">
          <Users className="h-4 w-4" aria-hidden="true" />
          {project.members} {copy.labels.members}
        </span>
        <span className="inline-flex items-center gap-1">
          <FileText className="h-4 w-4" aria-hidden="true" />
          {project.files} {copy.labels.files}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, copy, language }: { project: (typeof projects)[number]; copy: AppCopy; language: Language }) {
  return (
    <CardSurface data-melius-ui-id={`project-card-${project.id}`} data-melius-ui-role="card">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-zinc-950 dark:text-white">{project.name}</h3>
            <p className="mt-1 text-sm font-medium leading-5 text-zinc-500 dark:text-zinc-400">{project.description[language]}</p>
          </div>
          <Badge>{project.dueDate[language]}</Badge>
        </div>
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            <span>{copy.labels.progress}</span>
            <span>{project.progress}%</span>
          </div>
          <ProgressBar dataId={`project-card-progress-${project.id}`} value={project.progress} />
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1">
            <Users className="h-4 w-4" aria-hidden="true" />
            {project.members} {copy.labels.members}
          </span>
          <span className="inline-flex items-center gap-1">
            <FileText className="h-4 w-4" aria-hidden="true" />
            {project.files} {copy.labels.files}
          </span>
        </div>
        <div className="mt-5 flex gap-2">
          <SecondaryButton dataId={`open-project-${project.id}`} roleName="button">
            {copy.actions.open}
          </SecondaryButton>
          <IconButton dataId={`share-project-${project.id}`} roleName="button" label="Share">
            <Share2 className="h-4 w-4" aria-hidden="true" />
          </IconButton>
        </div>
      </div>
    </CardSurface>
  );
}

function FilterRail({ children, dataId }: { children: ReactNode; dataId: string }) {
  return (
    <div data-melius-ui-id={dataId} data-melius-ui-role="filter-group" className="flex flex-wrap gap-3">
      {children}
    </div>
  );
}

function HomeContent({ copy, language }: { copy: AppCopy; language: Language }) {
  return (
    <div className="space-y-6">
      <GradientHero
        variant="home"
        language={language}
        badge={copy.heroes.home.badge}
        title={copy.heroes.home.title}
        body={copy.heroes.home.body}
        primary={copy.heroes.home.primary}
        secondary={copy.heroes.home.secondary}
      />

      <section data-melius-ui-id="recent-apps-section" data-melius-ui-role="section" className="space-y-4">
        <SectionTitle title={copy.sections.recentApps} action={copy.actions.viewAll} actionId="recent-apps-view-all" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {apps.filter((app) => app.recent).map((app) => (
            <AppCard key={app.id} app={app} copy={copy} language={language} context="recent" />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <section data-melius-ui-id="recent-files-section" data-melius-ui-role="section" className="space-y-4">
          <SectionTitle title={copy.sections.recentFiles} action={copy.actions.viewAll} actionId="recent-files-view-all" />
          <PanelSurface>
            <div className="divide-y divide-zinc-950/[0.08] dark:divide-white/[0.08]">
              {recentFiles.slice(0, 4).map((file) => (
                <CompactFileRow key={file.id} file={file} copy={copy} language={language} />
              ))}
            </div>
          </PanelSurface>
        </section>

        <section data-melius-ui-id="active-projects-section" data-melius-ui-role="section" className="space-y-4">
          <SectionTitle title={copy.sections.activeProjects} action={copy.actions.viewAll} actionId="active-projects-view-all" />
          <PanelSurface>
            <div className="divide-y divide-zinc-950/[0.08] dark:divide-white/[0.08]">
              {projects.slice(0, 3).map((project) => (
                <ProjectRow key={project.id} project={project} copy={copy} language={language} />
              ))}
            </div>
          </PanelSurface>
        </section>
      </div>

      <section data-melius-ui-id="community-section" data-melius-ui-role="section" className="space-y-4">
        <SectionTitle title={copy.sections.community} action={copy.actions.explore} actionId="community-explore-action" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {communityPosts.map((post) => (
            <CardSurface key={post.id} data-melius-ui-id={`community-card-${post.id}`} data-melius-ui-role="card">
              <div className="aspect-[4/3] overflow-hidden">
                <MiniToneBlock tone={post.tone} />
              </div>
              <div className="p-4">
                <h3 className="font-black text-zinc-950 dark:text-white">{post.title[language]}</h3>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {copy.labels.by} {post.author}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-rose-600 dark:text-rose-300" aria-hidden="true" />
                    {post.likes}
                    <MessageSquare className="ml-2 h-4 w-4 text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
                    {post.comments}
                  </span>
                  <span>{post.time[language]}</span>
                </div>
              </div>
            </CardSurface>
          ))}
        </div>
      </section>
    </div>
  );
}

function AppsContent({ copy, language }: { copy: AppCopy; language: Language }) {
  return (
    <div className="space-y-6">
      <GradientHero variant="apps" language={language} title={copy.heroes.apps.title} body={copy.heroes.apps.body} primary={copy.heroes.apps.primary} />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <FilterRail dataId="app-category-filters">
          <SecondaryButton dataId="filter-apps-all" roleName="filter">{copy.filters.allCategories}</SecondaryButton>
          <SecondaryButton dataId="filter-apps-creative" roleName="filter">{copy.filters.creative}</SecondaryButton>
          <SecondaryButton dataId="filter-apps-video" roleName="filter">{copy.filters.video}</SecondaryButton>
          <SecondaryButton dataId="filter-apps-web" roleName="filter">{copy.filters.web}</SecondaryButton>
          <SecondaryButton dataId="filter-apps-3d" roleName="filter">{copy.filters.threeD}</SecondaryButton>
        </FilterRail>
        <div className="min-w-[220px] lg:ml-auto">
          <SearchInput
            dataId="apps-search"
            roleName="search"
            label={copy.searchLabel}
            type="search"
            placeholder={copy.search}
            icon={<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />}
          />
        </div>
      </div>

      <section data-melius-ui-id="new-releases-section" data-melius-ui-role="section" className="space-y-4">
        <SectionTitle title={copy.sections.newReleases} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {apps.filter((app) => app.isNew).map((app) => (
            <AppCard key={app.id} app={app} copy={copy} language={language} context="new-release" />
          ))}
        </div>
      </section>

      <section data-melius-ui-id="all-apps-section" data-melius-ui-role="section" className="space-y-4">
        <SectionTitle title={copy.sections.allApps} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {apps.map((app) => (
            <AppCard key={app.id} app={app} copy={copy} language={language} context="all-apps" />
          ))}
        </div>
      </section>
    </div>
  );
}

function FilesContent({ copy, language }: { copy: AppCopy; language: Language }) {
  return (
    <div className="space-y-6">
      <GradientHero
        variant="files"
        language={language}
        title={copy.heroes.files.title}
        body={copy.heroes.files.body}
        primary={copy.heroes.files.primary}
        secondary={copy.heroes.files.secondary}
      />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <FilterRail dataId="file-filters">
          <SecondaryButton dataId="filter-files-all" roleName="filter"><FileText className="h-4 w-4" />{copy.filters.allFiles}</SecondaryButton>
          <SecondaryButton dataId="filter-files-recent" roleName="filter"><Archive className="h-4 w-4" />{copy.filters.recent}</SecondaryButton>
          <SecondaryButton dataId="filter-files-shared" roleName="filter"><Users className="h-4 w-4" />{copy.filters.shared}</SecondaryButton>
          <SecondaryButton dataId="filter-files-favorites" roleName="filter"><Star className="h-4 w-4" />{copy.filters.favorites}</SecondaryButton>
          <SecondaryButton dataId="filter-files-trash" roleName="filter"><Trash2 className="h-4 w-4" />{copy.filters.trash}</SecondaryButton>
        </FilterRail>
        <div className="min-w-[220px] lg:ml-auto">
          <SearchInput
            dataId="files-search"
            roleName="search"
            label={copy.searchLabel}
            type="search"
            placeholder={copy.search}
            icon={<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />}
          />
        </div>
      </div>

      <section data-melius-ui-id="all-files-section" data-melius-ui-role="section" className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-black tracking-normal text-zinc-950 dark:text-white">{copy.sections.allFiles}</h2>
          <div className="flex gap-2">
            <SecondaryButton dataId="files-filter-action" roleName="button"><PanelLeft className="h-4 w-4" />{copy.actions.filter}</SecondaryButton>
            <SecondaryButton dataId="files-sort-action" roleName="button"><ArrowUpDown className="h-4 w-4" />{copy.actions.sort}</SecondaryButton>
          </div>
        </div>
        <PanelSurface>
          <div className="hidden grid-cols-12 bg-zinc-950/[0.045] p-3 text-sm font-black text-zinc-600 dark:bg-white/[0.055] dark:text-zinc-300 md:grid">
            <div className="col-span-6">{copy.labels.name}</div>
            <div className="col-span-2">{copy.labels.app}</div>
            <div className="col-span-2">{copy.labels.size}</div>
            <div className="col-span-2">{copy.labels.modified}</div>
          </div>
          <div className="divide-y divide-zinc-950/[0.08] dark:divide-white/[0.08]">
            {recentFiles.map((file) => (
              <FileRow key={file.id} file={file} copy={copy} language={language} />
            ))}
          </div>
        </PanelSurface>
      </section>
    </div>
  );
}

function ProjectsContent({ copy, language }: { copy: AppCopy; language: Language }) {
  return (
    <div className="space-y-6">
      <GradientHero variant="projects" language={language} title={copy.heroes.projects.title} body={copy.heroes.projects.body} primary={copy.heroes.projects.primary} />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <FilterRail dataId="project-filters">
          <SecondaryButton dataId="filter-projects-all" roleName="filter"><Layers className="h-4 w-4" />{copy.filters.allProjects}</SecondaryButton>
          <SecondaryButton dataId="filter-projects-recent" roleName="filter"><Archive className="h-4 w-4" />{copy.filters.recent}</SecondaryButton>
          <SecondaryButton dataId="filter-projects-shared" roleName="filter"><Users className="h-4 w-4" />{copy.filters.shared}</SecondaryButton>
          <SecondaryButton dataId="filter-projects-archived" roleName="filter"><Archive className="h-4 w-4" />{copy.filters.archived}</SecondaryButton>
        </FilterRail>
        <div className="min-w-[220px] lg:ml-auto">
          <SearchInput
            dataId="projects-search"
            roleName="search"
            label={copy.searchLabel}
            type="search"
            placeholder={copy.search}
            icon={<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />}
          />
        </div>
      </div>

      <section data-melius-ui-id="project-cards-section" data-melius-ui-role="section" className="space-y-4">
        <SectionTitle title={copy.sections.activeProjects} />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 2xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} copy={copy} language={language} />
          ))}
          <CardSurface data-melius-ui-id="project-create-card" data-melius-ui-role="card">
            <div className="flex h-full min-h-[260px] flex-col items-center justify-center p-8 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-zinc-950/[0.06] text-zinc-700 dark:bg-white/[0.10] dark:text-zinc-200">
                <Plus className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-black text-zinc-950 dark:text-white">{copy.actions.createProject}</h3>
              <p className="mt-2 max-w-xs text-sm font-medium leading-5 text-zinc-500 dark:text-zinc-400">{copy.actions.startFromTemplate}</p>
              <div className="mt-5">
                <PrimaryButton dataId="create-project-action" roleName="button">{copy.newProject}</PrimaryButton>
              </div>
            </div>
          </CardSurface>
        </div>
      </section>

      <section data-melius-ui-id="project-templates-section" data-melius-ui-role="section" className="space-y-4">
        <SectionTitle title={copy.sections.templates} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {projectTemplates.map((template) => (
            <CardSurface key={template.id} data-melius-ui-id={template.id} data-melius-ui-role="card">
              <div className="relative aspect-video overflow-hidden p-5 text-white">
                <div className="absolute inset-0">
                  <MiniToneBlock tone={template.tone} />
                </div>
                <div className="relative">
                  <h3 className="text-lg font-black">{template.title}</h3>
                  <p className="mt-1 text-sm font-medium text-white/[0.78]">{template.description[language]}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <Badge>{copy.labels[template.badge]}</Badge>
                <GhostButton dataId={`use-${template.id}`} roleName="button">{copy.actions.useTemplate}</GhostButton>
              </div>
            </CardSurface>
          ))}
        </div>
      </section>
    </div>
  );
}

function LearnContent({ copy, language }: { copy: AppCopy; language: Language }) {
  return (
    <div className="space-y-6">
      <GradientHero variant="learn" language={language} title={copy.heroes.learn.title} body={copy.heroes.learn.body} primary={copy.heroes.learn.primary} />
      <FilterRail dataId="learn-filters">
        <SecondaryButton dataId="filter-tutorials-all" roleName="filter"><Play className="h-4 w-4" />{copy.sections.featuredTutorials}</SecondaryButton>
        <SecondaryButton dataId="filter-courses" roleName="filter"><BookOpen className="h-4 w-4" />{copy.filters.courses}</SecondaryButton>
        <SecondaryButton dataId="filter-tips" roleName="filter"><Sparkles className="h-4 w-4" />{copy.filters.tips}</SecondaryButton>
        <SecondaryButton dataId="filter-trending" roleName="filter"><Award className="h-4 w-4" />{copy.filters.trending}</SecondaryButton>
        <SecondaryButton dataId="filter-saved" roleName="filter"><Bookmark className="h-4 w-4" />{copy.filters.saved}</SecondaryButton>
      </FilterRail>

      <section data-melius-ui-id="featured-tutorials-section" data-melius-ui-role="section" className="space-y-4">
        <SectionTitle title={copy.sections.featuredTutorials} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {tutorials.slice(0, 3).map((tutorial) => (
            <CardSurface key={tutorial.id} data-melius-ui-id={`tutorial-card-${tutorial.id}`} data-melius-ui-role="card">
              <div className="relative aspect-video overflow-hidden">
                <MiniToneBlock tone={tutorial.tone} />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/[0.86] text-zinc-950 shadow-lg shadow-black/15">
                    <Play className="h-6 w-6" aria-hidden="true" />
                  </span>
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                  <StrongBadge>{tutorial.category}</StrongBadge>
                  <h3 className="mt-2 text-lg font-black">{tutorial.title[language]}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium leading-5 text-zinc-500 dark:text-zinc-400">{tutorial.description[language]}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-zinc-950 text-xs font-black text-white dark:bg-white dark:text-zinc-950">
                      {tutorial.instructor.charAt(0)}
                    </span>
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{tutorial.instructor}</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {tutorial.duration}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-950/[0.08] p-4 dark:border-white/[0.08]">
                <Badge>{copy.labels[tutorial.level]}</Badge>
                <span className="flex items-center gap-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  {tutorial.views} {copy.labels.views}
                </span>
              </div>
            </CardSurface>
          ))}
        </div>
      </section>

      <section data-melius-ui-id="popular-courses-section" data-melius-ui-role="section" className="space-y-4">
        <SectionTitle title={copy.sections.popularCourses} action={copy.actions.viewAll} actionId="popular-courses-view-all" />
        <PanelSurface>
          <div className="divide-y divide-zinc-950/[0.08] dark:divide-white/[0.08]">
            {tutorials.slice(3, 5).map((tutorial) => (
              <div key={tutorial.id} data-melius-ui-id={`course-row-${tutorial.id}`} data-melius-ui-role="list-item" className="grid gap-3 p-4 md:grid-cols-[5rem_minmax(0,1fr)_auto] md:items-center">
                <div className="h-20 w-20 overflow-hidden rounded-lg">
                  <MiniToneBlock tone={tutorial.tone} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-zinc-950 dark:text-white">{tutorial.title[language]}</h3>
                  <p className="mt-1 text-sm font-medium leading-5 text-zinc-500 dark:text-zinc-400">{tutorial.description[language]}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge>{copy.labels[tutorial.level]}</Badge>
                    <Badge>{tutorial.duration}</Badge>
                    <Badge>{tutorial.views} {copy.labels.views}</Badge>
                  </div>
                </div>
                <GhostButton dataId={`watch-${tutorial.id}`} roleName="button">{copy.actions.watchNow}</GhostButton>
              </div>
            ))}
          </div>
        </PanelSurface>
      </section>

      <section data-melius-ui-id="learning-paths-section" data-melius-ui-role="section" className="space-y-4">
        <SectionTitle title={copy.sections.learningPaths} />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {[
            { id: 'path-ux', title: 'UI/UX Design Fundamentals', level: 'beginner' as const, progress: 30 },
            { id: 'path-illustration', title: 'Digital Illustration Mastery', level: 'intermediate' as const, progress: 0 },
            { id: 'path-motion', title: 'Motion Graphics & Animation', level: 'advanced' as const, progress: 0 },
          ].map((path) => (
            <CardSurface key={path.id} data-melius-ui-id={path.id} data-melius-ui-role="card">
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <Badge>{copy.labels[path.level]}</Badge>
                  <Award className="h-5 w-5 text-amber-500" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-black text-zinc-950 dark:text-white">{path.title}</h3>
                <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {language === 'ja' ? '制作ワークフローに合わせて段階的に学べます。' : 'A staged path that matches real production workflows.'}
                </p>
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                    <span>{path.progress > 0 ? `${path.progress}% ${copy.labels.completed}` : copy.labels.notStarted}</span>
                    <span>4.8</span>
                  </div>
                  <ProgressBar dataId={`${path.id}-progress`} value={path.progress} />
                </div>
                <div className="mt-5">
                  <SecondaryButton dataId={`${path.id}-action`} roleName="button">
                    {path.progress > 0 ? copy.actions.continueLearning : copy.actions.startLearning}
                  </SecondaryButton>
                </div>
              </div>
            </CardSurface>
          ))}
        </div>
      </section>
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const copy = useMemo(() => COPY[language], [language]);

  useEffect(() => {
    applyLanguage(language, copy.metaTitle);
  }, [copy.metaTitle, language]);

  useEffect(() => {
    applyTheme(theme);

    if (theme !== 'system') {
      return undefined;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => applyTheme('system');
    media.addEventListener('change', handleChange);

    return () => media.removeEventListener('change', handleChange);
  }, [theme]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'apps':
        return <AppsContent copy={copy} language={language} />;
      case 'files':
        return <FilesContent copy={copy} language={language} />;
      case 'projects':
        return <ProjectsContent copy={copy} language={language} />;
      case 'learn':
        return <LearnContent copy={copy} language={language} />;
      case 'home':
      default:
        return <HomeContent copy={copy} language={language} />;
    }
  };

  return (
    <AppShell data-melius-ui-id={`${TEMPLATE_ID}-shell`} data-melius-ui-role="app">
      {mobileMenuOpen ? (
        <Overlay data-melius-ui-id="mobile-menu-overlay" data-melius-ui-role="overlay" onClick={() => setMobileMenuOpen(false)}>
          <span className="sr-only">{copy.closeSidebar}</span>
        </Overlay>
      ) : null}
      {mobileMenuOpen ? (
        <MobileDrawer data-melius-ui-id="mobile-sidebar" data-melius-ui-role="navigation">
          <SidebarContent
            copy={copy}
            expandedItems={expandedItems}
            idPrefix="mobile-nav"
            onToggleExpanded={toggleExpanded}
            onCloseMobile={() => setMobileMenuOpen(false)}
          />
        </MobileDrawer>
      ) : null}

      <WorkspaceFrame data-melius-ui-id="creative-suite-workspace" data-melius-ui-role="workspace">
        {sidebarOpen ? (
          <SidebarShell data-melius-ui-id="desktop-sidebar" data-melius-ui-role="navigation">
            <SidebarContent copy={copy} expandedItems={expandedItems} idPrefix="desktop-nav" onToggleExpanded={toggleExpanded} />
          </SidebarShell>
        ) : null}

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <WorkspaceHeader data-melius-ui-id="workspace-header" data-melius-ui-role="header">
            <span className="md:hidden">
              <IconButton dataId="mobile-menu-open" roleName="button" label={copy.openSidebar} onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" aria-hidden="true" />
              </IconButton>
            </span>
            <span className="hidden md:inline-flex">
              <IconButton dataId="desktop-sidebar-toggle" roleName="button" label={copy.collapseSidebar} onClick={() => setSidebarOpen((value) => !value)}>
                <PanelLeft className="h-5 w-5" aria-hidden="true" />
              </IconButton>
            </span>
            <div className="min-w-0 flex-1">
              <h1 data-melius-ui-id="workspace-title" data-melius-ui-role="heading" className="truncate text-lg font-black text-zinc-950 dark:text-white sm:text-xl">
                {copy.appName} {copy.appSubtitle}
              </h1>
            </div>
            <ThemeSwitcher copy={copy} theme={theme} onThemeChange={setTheme} />
            <LanguageSwitcher copy={copy} language={language} onLanguageChange={setLanguage} />
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <IconButton dataId="cloud-storage-action" roleName="button" label={copy.cloud}>
                <Cloud className="h-5 w-5" aria-hidden="true" />
              </IconButton>
              <IconButton dataId="messages-action" roleName="button" label={copy.messages}>
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
              </IconButton>
              <span className="relative">
                <IconButton dataId="notifications-action" roleName="button" label={copy.notifications}>
                  <Bell className="h-5 w-5" aria-hidden="true" />
                </IconButton>
                <span className="absolute -right-0.5 -top-0.5 grid h-5 w-5 place-items-center rounded-full bg-rose-600 text-[10px] font-black text-white dark:bg-rose-500">
                  5
                </span>
              </span>
              <span data-melius-ui-id="header-avatar" data-melius-ui-role="avatar" className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-zinc-950 bg-gradient-to-br from-zinc-950 to-stone-700 text-xs font-black text-white dark:border-white">
                JL
              </span>
            </div>
          </WorkspaceHeader>

          <main data-melius-ui-id="workspace-main" data-melius-ui-role="main" className="thin-scrollbar min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
            <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div
                data-melius-ui-id="workspace-tabs"
                data-melius-ui-role="tabs"
                className="grid w-full grid-cols-5 rounded-lg bg-zinc-950/[0.06] p-1 dark:bg-white/[0.08] lg:max-w-[620px]"
              >
                {tabs.map((tab) => (
                  <TabButton
                    key={tab}
                    dataId={`tab-${tab}`}
                    roleName="tab"
                    selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                  >
                    {copy.tabs[tab]}
                  </TabButton>
                ))}
              </div>
              <div data-melius-ui-id="workspace-primary-actions" data-melius-ui-role="actions" className="hidden gap-2 lg:flex">
                <SecondaryButton dataId="install-app-action" roleName="button">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {copy.install}
                </SecondaryButton>
                <PrimaryButton dataId="new-project-action" roleName="button">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  {copy.newProject}
                </PrimaryButton>
              </div>
            </div>
            <div className="content-rise">{renderContent()}</div>
          </main>
        </div>
      </WorkspaceFrame>
    </AppShell>
  );
}

export default App;
