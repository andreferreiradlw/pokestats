import Type from '../../components/Type'
import { typeList } from '../../helpers'

export default function TypePage({ typeName }) {
  return <Type typeName={typeName} />
}

export async function getServerSideProps({ params }) {
  const typeName = params.typeId

  return { props: { typeName } }
}
