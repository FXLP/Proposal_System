
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      // const { username } = config.body
      // const token = tokens[username]
      const token = tokens['admin']
      console.log('token:' + token.token)
      // const { username, password } = config.body
      // const token = tokens['admin']
      // console.log('username:' + username)
      // console.log('password:' + password)
      // axios
      //   .post('http://localhost:7788/api' + '/login', Qs.stringify({
      //     id: 1,
      //     password: password
      //   }), {
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded'
      //     }
      //   })
      //   .then(res => {
      //     console.log('response code:' + res.data.code)
      //     if (res.data.code !== 0) {
      //       return {
      //         code: 60204,
      //         message: 'Account and password are incorrect.'
      //       }
      //     } else {
      //       return {
      //         code: 20000,
      //         data: token
      //       }
      //     }
      //   })
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
