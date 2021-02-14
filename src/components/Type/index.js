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
import TypeIcon from './TypeIcon'
import Tabs from './Tabs'
// styles
import { PageHeading } from '../BaseStyles'

export default function Type({ typeName }) {
  // router
  const router = useRouter()
  // dispatch
  const dispatch = useDispatch()
  // type selector
  const typeInfo = useSelector(state => state.type)
  // data
  const { name, names, damage_relations } = typeInfo.data

  useEffect(() => {
    // reset data on unmount
    return () => {
      dispatch(cleanData())
    }
  }, [])

  // fetch type data
  useEffect(() => {
    const validType = typeList.filter(type => type.name === typeName)
    // check if router query is valid
    if (validType.length) {
      // fetch new pokemon data
      dispatch(fetchTypeData(typeName))
    } else {
      router.push('/404', router.asPath)
    }
  }, [typeName])

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
      withGameVersion={false}
      key={`layout-type`}
    >
      <AnimatePresence exitBeforeEnter>
        {typeInfo.isLoading && (
          <Loading
            passKey={`loading-type-${typeName}`}
            key={`loading-type-${typeName}`}
            text={`Loading ${removeDash(typeName)} Type`}
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
            key={`type-${typeName}`}
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
                  justify={{ xxs: 'center', md: 'flex-start' }}
                  align={{ xxs: 'center', md: 'flex-start' }}
                  sizes={{ xxs: 12, lg: 8 }}
                >
                  <TypeInfo
                    margin={{ xxs: '0 0 2rem', lg: '0' }}
                    padding={{ xxs: '0', md: '0 1rem 0 0' }}
                    info={typeInfo.data}
                  />
                  <TypeRelations
                    margin={{ xxs: '0 0 2rem', lg: '0' }}
                    padding={{ xxs: '0', md: '0 0 0 1rem', lg: '0 1rem' }}
                    relations={damage_relations}
                  />
                </Box>
              </Box>
              <TypeIcon
                sizes={{ xxs: 12, lg: 4 }}
                typeName={name}
                otherNames={names}
              />
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
