import Type from '../../components/Type'
import { typeList } from '../../helpers'

export default function TypePage({ typeName }) {
  return <Type typeName={typeName} />
}

export async function getStaticPaths() {
  const paths = typeList.map(type => {
    return {
      params: {
        typeId: type.name,
      },
    }
  })
  // return static paths
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // optional
  // we can fetch the type data and pass as props to page
  // const res = await fetch(`https://pokeapi.co/api/v2/type/${params.typeId}`)
  // const typeData = await res.json()
  const typeName = params.typeId
  // Pass type data to the page via props
  return { props: { typeName } }
}
