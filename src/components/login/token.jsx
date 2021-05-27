const URL_API = '' //process.env.REACT_APP_URL_SERVER

const VerifyToken = async () => {
  const loggedUserJSON = window.localStorage.getItem('jwt');

  let token = ''
  let username = ''
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    username = user.username

    if (token) {
      const response = await fetch(`${URL_API}/api/login/token-verify`, {
        method: 'POST',
        body: new URLSearchParams({token})
      });
      if (response.ok) {
         return {isValid:true, username: username}
      }else{
        return {isValid:false, username: username}
      }
    }
  }else{
    return {isValid:false, username: username}
  }
}

export default VerifyToken;