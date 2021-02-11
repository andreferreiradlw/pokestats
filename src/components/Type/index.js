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
import Box from '../Box'
import TypeInfo from './Info'
import TypeRelations from './Relations'
import Tabs from './Tabs'
// styles
import { PageHeading } from '../BaseStyles'

export default function Type() {
  // router
  const router = useRouter()
  // dispatch
  const dispatch = useDispatch()
  // type selector
  const typeInfo = useSelector(state => state.type)
  // data
  const { name, damage_relations } = typeInfo.data

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
      withFooter={!typeInfo.isLoading}
      withMain={false}
      key={`layout-type`}
    >
      <AnimatePresence exitBeforeEnter>
        {typeInfo.isLoading && router.query.typeName && (
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
            justify="flex-start"
            align="flex-start"
            constrained
            withGutter
            initial="hidden"
            animate="visible"
            exit="fade"
            variants={pageContainerVariant}
            key={`type-${router.query.typeName}`}
          >
            <Box
              as="section"
              direction={{ xxs: 'column-reverse', lg: 'row' }}
              align="flex-start"
              justify="flex-start"
              margin="1rem 0"
            >
              <Box
                justify={{ xxs: 'center', lg: 'flex-start' }}
                align={{ xxs: 'center', lg: 'flex-start' }}
              >
                <PageHeading>{removeDash(name)}</PageHeading>
                <Box
                  direction={{ xxs: 'column', md: 'row' }}
                  sizes={{ xxs: 12, lg: 8 }}
                >
                  <TypeInfo info={typeInfo.data} />
                  <TypeRelations relations={damage_relations} />
                </Box>
              </Box>
              <Box sizes={{ xxs: 12, lg: 4 }}>Icon</Box>
            </Box>
            <Box
              as="section"
              align="flex-start"
              justify="flex-start"
              margin="1rem 0"
            >
              <Tabs sizes={12} margin="0 0 2rem" />
            </Box>
          </MainContainer>
        )}
      </AnimatePresence>
    </Layout>
  )
}
