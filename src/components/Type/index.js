import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
// actions
import { fetchTypeData, cleanData } from './typeSlice'
//helpers
import { typeList, removeDash, pageContainerVariant } from '../../helpers'
// components
import Layout, { MainContainer } from '../Layout'
import Loading from '../Loading'

export default function Type() {
  // router
  const router = useRouter()
  // dispatch
  const dispatch = useDispatch()
  // type selector
  const typeInfo = useSelector(state => state.type)
  // type data
  const { name } = typeInfo.data

  useEffect(() => {
    // reset data on unmount
    return () => {
      dispatch(cleanData())
    }
  }, [])

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

  return (
    <Layout
      withHeader
      withFooter
      withMain={true}
      key={`layout-type-${router.query.typeName}`}
    >
      <AnimatePresence exitBeforeEnter>
        {typeInfo.isLoading && (
          <Loading
            passKey={`loading-type-${router.query.typeName}`}
            key={`loading-type-${router.query.typeName}`}
            text={
              router.query.typeName &&
              `Loading ${removeDash(router.query.typeName)} Type`
            }
          />
        )}
        {!typeInfo.isLoading && (
          <MainContainer
            constrained
            withGutter
            initial="hidden"
            animate="visible"
            exit="fade"
            variants={pageContainerVariant}
            key={`type-${router.query.typeName}`}
          >
            <span>Type Page {name}</span>
          </MainContainer>
        )}
      </AnimatePresence>
    </Layout>
  )
}
