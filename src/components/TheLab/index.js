// components
import Layout from '../Layout'
import Autocomplete from '../Autocomplete'

const TheLab = () => {
  // new selection
  const optionSelected = item => {
    console.log(item)
  }

  return (
    <Layout
      withHeader
      withFooter={true}
      withSearch={false}
      withGameVersion={false}
      key={`layout-lab`}
    >
      <Autocomplete onSelect={optionSelected} />
    </Layout>
  )
}

export default TheLab
