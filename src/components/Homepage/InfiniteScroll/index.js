import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
// components
import Loading from '../../Loading'
import PokemonBox from './PokemonBox'

// styles
import { Container, List } from './StyledInfiniteScroll'

export default function InfiniteScroll({ ...rest }) {
  //pokemon list
  const pokemonList = useSelector(state => state.home.pokemon)
  // items per page
  const itemsPerPage = 40

  // current page state
  const [currPage, setCurrPage] = useState(1)
  // loading state
  const [isLoading, setLoading] = useState(false)
  // y state
  const [prevY, setPrevY] = useState(0)
  // show list state
  const [showList, setShowList] = useState([])

  // pokemon observer ref
  let observer = useRef(null)
  // node state for observer
  const [node, setNode] = useState(null)

  function handleObserver(entitites) {
    // entity data
    // console.log(entitites[0])
    const { isIntersecting, boundingClientRect } = entitites[0]

    if (isIntersecting && boundingClientRect.y >= prevY) {
      console.log('trigger new page!', boundingClientRect.y, prevY)
      // start loading
      setLoading(true)
      // set new y state
      // remove about 50 pixels as redundancy
      setPrevY(boundingClientRect.y - 50)
      // change page
      setCurrPage(currPage + 1)
    }
  }

  useEffect(() => {
    // https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
    // observer options
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    }
    // disconnect from previous node
    if (observer.current) observer.current.disconnect()
    // create observer for new node
    observer.current = new window.IntersectionObserver(handleObserver, options)

    const { current: currentObserver } = observer
    // if node exists, observer
    if (node) currentObserver.observe(node)

    return () => currentObserver.disconnect()
  }, [node])

  useEffect(() => {
    // slice pokemon array
    const slice = pokemonList.slice(
      currPage === 1 ? 0 : (currPage - 1) * itemsPerPage,
      currPage * itemsPerPage
    )
    // update show list with sliced array
    setShowList([...showList, ...slice])
    // stop loading
    setLoading(false)
  }, [currPage])

  return (
    <Container {...rest}>
      <List
        withGutter
        constrained
        margin="2rem 0"
        direction="row"
        align="flex-start"
        flexWrap="wrap"
      >
        {showList.map((currPokemon, i) => (
          <PokemonBox key={i} pokemon={currPokemon} ref={setNode} />
        ))}
      </List>
      {isLoading && pokemonList.length !== showList.length && <Loading />}
    </Container>
  )
}
