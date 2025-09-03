import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadFromStorage } from './authSlice'

function LoadAuth() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadFromStorage())
  }, [dispatch])

  return null
}

export default LoadAuth
