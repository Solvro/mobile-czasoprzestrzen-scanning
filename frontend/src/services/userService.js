const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:1337/',
    timeout: 1000,
});

export async function authorizeUser(username, password) {
  var headers = {
    'Content-Type': 'application/json',
  }
    try {
      var data = {
        "email":"test@test.com",
        "password": "test"
      }
        const token = await instance.post(`/login`, data, {headers: headers});
        console.log(token);
        return token.data.access;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
    // if(username === "test" && password === "test"){
    //   return true;
    // }
}

const fakeAuth = {
      isAuthenticated: false,
      authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 1000)
      },
      signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 1000)
      }
    }

  export default fakeAuth;