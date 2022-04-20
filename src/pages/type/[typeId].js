import Type from '../../components/Type'

export default function TypePage({ typeName }) {
  return <Type typeName={typeName} />
}

export async function getServerSideProps({ params }) {
  const typeName = params.typeId

  return { props: { typeName } }
}
