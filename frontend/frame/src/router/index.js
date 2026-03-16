import { createRouter, createWebHashHistory } from 'vue-router';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import Home from '../views/Home.vue';
import Category from '../views/Category.vue';
import Chat from '../views/Chat.vue';
import My from '../views/My.vue';

import Lesson from '../components/home/views/Lesson.vue';
import Article from '../components/home/views/Article.vue';
import Expand from '../components/home/views/Expand.vue';
import Question from '../components/home/views/Question.vue';
import afterSearch from '../components/home/views/afterSearch.vue';
import Search from '../components/home/views/Search.vue';

import Nav11 from '../components/category/views/Nav11.vue';
import Nav12 from '../components/category/views/Nav12.vue';
import Nav13 from '../components/category/views/Nav13.vue';
import Nav14 from '../components/category/views/Nav14.vue';
import Nav21 from '../components/category/views/Nav21.vue';
import Nav22 from '../components/category/views/Nav22.vue';
import Nav23 from '../components/category/views/Nav23.vue';
import Nav24 from '../components/category/views/Nav24.vue';
import Nav31 from '../components/category/views/Nav31.vue';
import Nav32 from '../components/category/views/Nav32.vue';
import Nav33 from '../components/category/views/Nav33.vue';
import Nav34 from '../components/category/views/Nav34.vue';

import Nav1 from '../components/category/components/Nav1.vue';
import Nav2 from '../components/category/components/Nav2.vue';
import Nav3 from '../components/category/components/Nav3.vue';

import articleDetail from '../components/article/views/articleDetail.vue';
import expandDetail from '../components/article/views/expandDetail.vue';
import a from '../components/a.vue';
import b from '../components/b.vue';

import Integral from '../views/Integral.vue';
import Study from '../views/Study.vue';
import Error from '../views/Error.vue';
import Dynamics from '../views/Dynamics.vue';
import Thumbs from '../views/Thumbs.vue';
import Browse from '../views/Browse.vue';
import Set from '../views/Set.vue';
import Publish from '../views/Publish.vue';
import Group from '../views/Group.vue';
import Launch from '../views/Launch.vue';
import PostDetail from '../views/PostDetail.vue';
import Choose from '../views/Choose.vue';
import Answer from '../views/Answer.vue';
import Challenge from '../views/Challenge.vue';
import Wrong from '../views/Wrong.vue';
import Rank from '../views/Rank.vue';


const routes = [
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/choose',
    name: 'Choose',
    component: Choose
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      showTabbar:true
    }
  },
  {
    path: '/afterSearch',
    name: 'afterSearch',
    component: afterSearch,
  },
  {
    path: '/Search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/lesson',
    name: 'Lesson',
    component: Lesson,
  },
  {
    path: '/article',
    name: 'Article',
    component: Article,
        
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: articleDetail
  },
  {
    path: '/expand/:id',
    name: 'expandDetail',
    component: expandDetail
  },
  {
    path: '/expand',
    name: 'Expand',
    component: Expand,
  },
  {
    path: '/question',
    name: 'Question',
    component: Question,
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta:{
      showTabbar:true
    },
    redirect: '/Nav1',
    children:[
      {
        path: '/Nav1',
        name: 'Nav1',
        meta: {
          title: '课程',
        },
        component: Nav1,
        redirect: '/Nav11',
        children: [
          {
            path: '/Nav11',
            name: 'Nav11',
            component: Nav11
          },
          {
            path: '/Nav12',
            name: 'Nav12',
            component: Nav12
          },
          {
            path: '/Nav13',
            name: 'Nav13',
            component: Nav13
          },
          {
            path: '/Nav14',
            name: 'Nav14',
            component: Nav14
          },
        ]
      },
      {
        path: '/Nav2',
        name: 'Nav2',
        meta: {
          title: '文章',
        },
        component: Nav2,
        redirect: '/Nav21',
        children: [
          {
            path: '/Nav21',
            name: 'Nav21',
            component: Nav21
          },
          {
            path: '/Nav22',
            name: 'Nav22',
            component: Nav22
          },
          {
            path: '/Nav23',
            name: 'Nav23',
            component: Nav23
          },
          {
            path: '/Nav24',
            name: 'Nav24',
            component: Nav24
          },
        ]
      },
      {
        path: '/Nav3',
        name: 'Nav3',
        meta: {
          title: '动态',
        },
        component: Nav3,
        redirect: '/Nav31',
        children: [
          {
            path: '/Nav31',
            name: 'Nav31',
            component: Nav31
          },
          {
            path: '/Nav32',
            name: 'Nav32',
            component: Nav32
          },
          {
            path: '/Nav33',
            name: 'Nav33',
            component: Nav33
          },
          {
            path: '/Nav34',
            name: 'Nav34',
            component: Nav34
          },
        ]
      },
    ]
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta:{
      showTabbar:true
    }
  },
  {
    path: '/my',
    name: 'My',
    component: My,
    meta:{
      showTabbar:true
    }
  },
  {
    path: '/a/:id',
    name: 'a',
    component: a,
  },
  {
    path: '/b',
    name: 'b',
    component: b,
  },
  {
    path: '/integral',
    name: 'Integral',
    component: Integral
  },
  {
    path: '/study',
    name: 'Study',
    component: Study
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  },
  {
    path: '/dynamics',
    name: 'Dynamics',
    component: Dynamics
  },
  {
    path: '/thumbs',
    name: 'Thumbs',
    component: Thumbs
  },
  {
    path: '/browse',
    name: 'Browse',
    component: Browse
  },
  {
    path: '/set',
    name: 'Set',
    component: Set
  },
  {
    path: '/publish',
    name: 'Publish',
    component: Publish
  },
  {
    path: '/group',
    name: 'Group',
    component: Group
  },
  {
    path: '/launch',
    name: 'Launch',
    component: Launch
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: PostDetail
  },
    {
    path: '/choose',
    name: 'Choose',
    component: Choose
  },
  {
    path: '/answer:id',
    name: 'Answer',
    component: Answer,
  },
  {
    path: '/challenge:id',
    name: 'Challenge',
    component: Challenge,
  },
  {
    path: '/wrong:id',
    name: 'Wrong',
    component: Wrong,
  },
  {
    path: '/rank:id',
    name: 'Rank',
    component: Rank,
  },
];


const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
