// components
import Layout from '../Layout'

const TheLab = () => {
  return (
    <Layout
      withHeader
      withFooter={true}
      withSearch={false}
      withGameVersion={false}
      key={`layout-lab`}
    ></Layout>
  )
}

export default TheLab
