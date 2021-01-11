import { useState, useEffect, useRef } from 'react'
// components
import Loading from '../Loading'
import PokemonBox from './PokemonBox'

// styles
import { Container, List } from './StyledInfiniteScroll'

export default function InfiniteScroll({
  pokemonList,
  itemsPerPage = 98,
  light,
  ...rest
}) {
  // current page state
  const [currPage, setCurrPage] = useState(0)
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
    const { isIntersecting, boundingClientRect } = entitites[0]

    if (isIntersecting && boundingClientRect.y >= prevY) {
      // set new y state
      // remove 50 pixels as redundancy
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
    // make sure previous observer is disconnected
    if (observer.current) observer.current.disconnect()
    // create new observer
    observer.current = new window.IntersectionObserver(handleObserver, options)
    // observer.current can be mutated so create a variable
    const { current: currentObserver } = observer
    // if node exists, observe
    if (node) currentObserver.observe(node)
    // disconnect when component unmounts
    return () => currentObserver.disconnect()
  }, [node, currPage])

  useEffect(() => {
    // slice new page from pokemon array
    const newPage = pokemonList.slice(
      currPage === 1 ? 0 : (currPage - 1) * itemsPerPage,
      currPage * itemsPerPage
    )
    // update show list with sliced array
    setShowList([...showList, ...newPage])
  }, [currPage])

  return (
    <Container light={light} {...rest}>
      <List
        withGutter
        constrained
        margin="2rem 0"
        direction="row"
        align="flex-start"
        flexWrap="wrap"
      >
        {showList.map((currPokemon, i) => (
          <PokemonBox key={i} light={light} pokemon={currPokemon} />
        ))}
      </List>
      {pokemonList.length !== showList.length && <Loading ref={setNode} />}
    </Container>
  )
}
