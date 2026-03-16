import axios from 'axios';

const API_BASE_URL = 'http://203.195.66.65:3001'; 
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // 添加请求拦截器
  api.interceptors.request.use(
    function(config) {
      const token = localStorage.getItem('Authorization');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
export async function article(query) {
    try {
        const response = await axios.get(`${API_BASE_URL}/article`);
        const articles = response.data; // 获取所有文章数据

        if (query) {
            // 如果有查询条件，进行模糊查找
            const filteredArticles = articles.filter(article =>
                article.title.toLowerCase().includes(query.toLowerCase())
            );
            return filteredArticles;
        } else {
            // 如果没有查询条件，直接返回所有文章
            return articles;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export async function expand(query) {
    try {
        const response = await axios.get(`${API_BASE_URL}/expand`);
        const expands = response.data; // 获取所有扩展数据

        if (query) {
            // 如果有查询条件，进行模糊查找
            const filteredExpands = expands.filter(expand =>
                expand.title.toLowerCase().includes(query.toLowerCase())
            );
            return filteredExpands;
        } else {
            // 如果没有查询条件，直接返回所有扩展数据
            return expands;
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function post() {
    try {
        const response = await axios.get(`${API_BASE_URL}/post`);
        const expands = response.data; // 获取所有扩展数据
        return expands;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function comments() {
    try {
        const response = await axios.get(`${API_BASE_URL}/comment`);
        const expands = response.data; 
        return expands;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function group() {
    try {
        const response = await axios.get(`${API_BASE_URL}/group`);
        const expands = response.data; 
        return expands;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function guess() {
    try {
        const response = await axios.get(`${API_BASE_URL}/guess`);
        const expands = response.data; 
        return expands;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
//一个用户的群组列表
export async function allgroup() {
    try {
        const response = await axios.get(`${API_BASE_URL}/group/member`);
        let expands = response.data;
        const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token not found in localStorage');
          }
            const userid= await GetID({
            token: token,
            });
            const id= userid.data.userId
            const filteredData = expands.filter(item => parseInt(item.userid) === id);
            return filteredData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
export async function historygroup() {
    try {
        const response = await axios.get(`${API_BASE_URL}/history/group`);
        const expands = response.data;
        return expands;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function historyarticle() {
    try {
        const response = await axios.get(`${API_BASE_URL}/history/article`);
        const expands = response.data;
        return expands;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function postlike() {
    try {
        const response = await axios.get(`${API_BASE_URL}/postlike`);
        let expands = response.data;
        const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token not found in localStorage');
          }
            const userid= await GetID({
            token: token,
            });
            const id= userid.data.userId
            const filteredData = expands.filter(item => parseInt(item.userid) === id);
            return filteredData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function postclick() {
    try {
        const response = await axios.get(`${API_BASE_URL}/post/click`);
        let expands = response.data;
        const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token not found in localStorage');
          }
            const userid= await GetID({
            token: token,
            });
            const id= userid.data.userId
            const filteredData = expands.filter(item => parseInt(item.userid) === id);
            return filteredData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export const fetchGroups = (credentials) => {
    return api.post('/group/member', credentials);
};

export const addComment = (credentials) => {
    return api.post('/comment', credentials);
};

export const addPost = (credentials) => {
    return api.post('/post', credentials);
};

export const createGroup = (credentials) => {
    return api.post('/group', credentials);
};
export const addHistoryGroup = (credentials) => {
    return api.post('/history/group', credentials);
};
export const addHistoryArticle = (credentials) => {
    return api.post('/history/article', credentials);
};
export const JoinGroup = (credentials) => {
    return api.post('/group/member', credentials);
};
export const addtext = (credentials) => {
    return api.post('/user/detail', credentials);
};
export const GetID = (credentials) => {
    return api.post('/user/id', credentials);
};

export const AddPoint = (credentials) => {
    return api.post('/point', credentials);
};

export const PostAddLike = (credentials) => {
    return api.post('/postlike', credentials);
};

export const PostCancelLike = (credentials) => {
    return api.post('/postlike/unlike', credentials);
};

export const PostAddClick = (credentials) => {
    return api.post('/post/click', credentials);
};
export async function user() {
    try {
        const response = await axios.get(`${API_BASE_URL}/`);
        const expands = response.data; 
        return expands;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export async function getArticleById(articleId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/article`);
        const articles = response.data; // 获取所有文章数据
        const selectedArticle = articles.find(article => article.id === parseInt(articleId)); // 根据文章ID找到对应的文章

        if (selectedArticle) {
            return selectedArticle;
        } else {
            throw new Error(`Article with ID ${articleId} not found.`);
        }
    } catch (error) {
        console.error(`Error fetching article with ID ${articleId}:`, error);
        throw error;
    }
}
export async function getExpandById(articleId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/expand`);
        const articles = response.data; // 获取所有文章数据
        const selectedArticle = articles.find(article => article.id === parseInt(articleId)); // 根据文章ID找到对应的文章

        if (selectedArticle) {
            return selectedArticle;
        } else {
            throw new Error(`Article with ID ${articleId} not found.`);
        }
    } catch (error) {
        console.error(`Error fetching article with ID ${articleId}:`, error);
        throw error;
    }
}

export async function getPostById(articleId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/post`);
        const articles = response.data; // 获取所有文章数据
        const selectedArticle = articles.find(article => article.id === parseInt(articleId)); // 根据文章ID找到对应的文章

        if (selectedArticle) {
            return selectedArticle;
        } else {
            throw new Error(`Article with ID ${articleId} not found.`);
        }
    } catch (error) {
        console.error(`Error fetching article with ID ${articleId}:`, error);
        throw error;
    }
}
    // 登录用户
export const loginUser = (credentials) => {
    return api.post('/login', credentials);
};
    
    // 获取用户列表
export const getUsers = () => {
    return api.get('/');
};
  
    export const getUsername = () => {
      return localStorage.getItem('username') || '';
    };
  
    // 注册新用户
    export const registerUser = (userDetails) => {
      return api.post('/register', userDetails);
    };
  
  
    export const sendWrongAnswer = (wrongAnswer) => {
      return api.post('/wrong', wrongAnswer);
    };
    export const sendRank = (wrongAnswer) => {
        return api.post('/ranking', wrongAnswer);
      };

    export const postIdentity = (data) => {
      return api.post('/choose', data);
    };

    export const getQuestions = () => {
        return api.get('/answer').data.filter(questions => questions.source === '三年级' && questions.name === '题库1');
    };

    export async function getQuestionById(articleId) {
        try {
            const response = await axios.get(`${API_BASE_URL}/answer`);
            const articles = response.data; // 获取所有文章数据
            const selectedArticle = articles.find(article => article.id === parseInt(articleId)); // 根据文章ID找到对应的文章

            if (selectedArticle) {
                return selectedArticle;
            } else {
                throw new Error(`Article with ID ${articleId} not found.`);
            }
        } catch (error) {
            console.error(`Error fetching article with ID ${articleId}:`, error);
            throw error;
        }
    }

    export async function fetchQuestionsForThirdGrade(choose) {
        try {
          const response = await axios.get('http://203.195.66.65:3001/answer');
          const questions = response.data.filter(questions => questions.source === '三年级' && questions.name === choose);
          return questions;
        } catch (error) {
          console.error('Failed to fetch questions:', error);
          throw error;
        }
      }

      export async function fetchRankings(sortType) {
        try {
          const response = await axios.get('http://203.195.66.65:3001/ranking');
          const data = response.data;
          const sortedData = data.sort((a, b) => {
            if (sortType === 'rightRate') {
              return b.rightRate - a.rightRate; // 按准确率降序
            } else {
              return b.answerCount - a.answerCount; // 按答题数降序
            }
          });
          return sortedData;
        } catch (error) {
          console.error('Failed to fetch rankings:', error);
          throw error;
        }
      }
export const FetchQuestions = (token) => {
        return api.get(`/wrong/${token}`).then(response => {
          const wrongData = response.data;

          const displayedIds = new Set();

          // 确保每个题目只出现一次
          const questions = wrongData.map(wrongAnswer => {
            if (!displayedIds.has(wrongAnswer.id)) {
              displayedIds.add(wrongAnswer.id);
              return wrongAnswer;
            }
          }).filter(question => question); // 过滤掉 undefined 项

          // 返回最终的数据
          return questions;
        }).catch(error => {
          console.error('Failed to fetch questions:', error);
          throw error; // 抛出错误以便调用者处理
        });
      };

      export const FetchData = (token) => {
        return api.get(`/ranking/${token}`).then(response => {
          const wrongData = response.data;

          const displayedIds = new Set();

          // 确保每个题目只出现一次
          const questions = wrongData.map(wrongAnswer => {
            if (!displayedIds.has(wrongAnswer.id)) {
              displayedIds.add(wrongAnswer.id);
              return wrongAnswer;
            }
          }).filter(question => question); // 过滤掉 undefined 项

          // 返回最终的数据
          return questions;
        }).catch(error => {
          console.error('Failed to fetch questions:', error);
          throw error; // 抛出错误以便调用者处理
        });
      };

      export const changeKey = (credentials) => {
            return api.post('/changekey', credentials);
        };
        export const checkKey = (credentials) => {
            return api.post('/checkkey', credentials);
        };

  export default api;
  