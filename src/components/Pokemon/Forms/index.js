import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
// components
import Loading from '../../Loading'
import Box from '../../Box'
//helpers
import { removeDash } from '../../../helpers/typography'
import { fadeInUpVariant } from '../../../helpers/animations'
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
    <Box align={{ xxs: 'center', lg: 'flex-start' }} {...rest}>
      <SectionTitle>Forms</SectionTitle>
      <AnimatePresence exitBeforeEnter>
        {pokemonBio.isLoading && (
          <Loading height="251px" iconWidth="15%" key="pokemon-forms" />
        )}
        {!pokemonBio.isLoading && (
          <Table
            initial="hidden"
            animate="show"
            variants={fadeInUpVariant}
            key={`pokemon-forms-table`}
          >
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
        )}
      </AnimatePresence>
    </Box>
  )
}
