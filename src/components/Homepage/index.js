import { useSelector } from 'react-redux'
import Autocomplete from './Autocomplete'

export default function Homepage() {
  const loadingStatus = useSelector((state) => state.home.loading)

  return (
    <>
      {loadingStatus ? (
        <div>Loading!</div>
      ) : (
        <main>
          <Autocomplete />
        </main>
      )}
    </>
  )
}
