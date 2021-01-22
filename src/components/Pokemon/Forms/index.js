import { useSelector } from 'react-redux'
// components
import Loading from '../../Loading'
import Box from '../../Box'
//helpers
import { removeDash } from '../.././../helpers/typography'
// styles
import { SectionTitle, Table, Numbered } from '../../BaseStyles'

export default function Forms({ ...rest }) {
  // biology
  const pokemonBio = useSelector(state => state.pokemon.biology)
  // data
  const {
    forms_switchable,
    varieties,
    has_gender_differences,
  } = pokemonBio.data

  // forms
  const currForms = forms =>
    forms.map((form, i) => (
      <Numbered key={`${form.pokemon.name}-${i}`}>
        {`${forms.length > 1 ? `${++i}. ` : ``}${removeDash(
          form.pokemon.name
        )}`}
        {form.is_default && <span>{` ( default )`}</span>}
      </Numbered>
    ))

  return (
    <>
      {pokemonBio.isLoading ? (
        <Loading />
      ) : (
        <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
          <SectionTitle>Forms</SectionTitle>
          <Table forwardedAs="table" align="flex-start">
            <tbody>
              <tr>
                <th>Alternative Forms</th>
                <td>{forms_switchable ? 'Yes' : 'None'}</td>
              </tr>
              <tr>
                <th>Varieties</th>
                <td>{currForms(varieties)}</td>
              </tr>
              <tr>
                <th>Gender Differences</th>
                <td>{has_gender_differences ? 'Yes' : 'None'}</td>
              </tr>
            </tbody>
          </Table>
        </Box>
      )}
    </>
  )
}
