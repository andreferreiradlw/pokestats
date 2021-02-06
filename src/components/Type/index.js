import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
// actions
import { fetchTypeData, cleanData } from './typeSlice'
//helpers
import { typeList } from '../../helpers'

export default function Type() {
  // router
  const router = useRouter()
  // dispatch
  const dispatch = useDispatch()
  // type selector
  const typeInfo = useSelector(state => state.type)
  // type data
  const { name } = typeInfo.data

  // fetch type data
  useEffect(() => {
    if (router.query.typeName) {
      // check if router query is valid
      if (typeList.includes(router.query.typeName)) {
        // fetch new pokemon data
        dispatch(fetchTypeData(router.query.typeName))
      } else {
        router.push('/404', router.asPath)
      }
    }
  }, [router.query])

  // error handling
  useEffect(() => {
    if (typeInfo.error.status !== 'OK') {
      router.push('/404', router.asPath)
    }
  }, [typeInfo.error])

  return <div>Type Page {name && name}</div>
}
