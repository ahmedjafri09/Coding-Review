import API from 'src/libs/axios'
const tokenVerification = async () => {
  try {
    const res = await API.get('/auth/me')
    res?.user && localStorage.setItem('user', JSON.stringify(res.user))
    return res
  } catch (error) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return false
  }
}

export default tokenVerification
