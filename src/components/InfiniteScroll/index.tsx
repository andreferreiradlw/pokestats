import { useState, useEffect, useRef } from 'react';
// helpers
import { fadeInUpVariant } from '@/helpers';
// types
import type { Pokemon } from '@/types';
// components
import Box, { BoxProps } from '@/components/Box';
import Loading from '@/components/Loading';
import PokemonBox from './PokemonBox';

export interface InfiniteScrollProps extends BoxProps {
  pokemonList: Pokemon[];
  itemsPerPage?: number;
  dark?: boolean;
}

export default function InfiniteScroll({
  pokemonList,
  dark,
  itemsPerPage = 35,
  flexdirection = 'row',
  flexalign = 'flex-start',
  flexwrap = 'wrap',
  ...rest
}: InfiniteScrollProps): JSX.Element {
  // current page state
  const [currPage, setCurrPage] = useState(1);
  // y state
  const [prevY, setPrevY] = useState(1);
  // show list state
  const [showList, setShowList] = useState<Pokemon[]>([]);

  // pokemon observer ref
  let observer = useRef(null);
  // node state for observer
  const [node, setNode] = useState<IntersectionObserver | null>(null);

  const handleObserver = entitites => {
    // entity data
    const { isIntersecting, boundingClientRect, intersectionRatio } = entitites[0];

    if (isIntersecting && intersectionRatio === 1 && boundingClientRect.y > prevY) {
      // set new y state
      // remove 50 pixels as redundancy
      setPrevY(boundingClientRect.y - 100);
      // change page
      setCurrPage(currPage + 1);
    }
  };

  const sliceNewPage = (page: number, listUpdated: boolean): void => {
    // slice new page from pokemon array
    const newPage = pokemonList.slice(
      page === 1 ? 0 : (page - 1) * itemsPerPage,
      page * itemsPerPage,
    );
    // update show list with sliced array
    listUpdated ? setShowList([...newPage]) : setShowList([...showList, ...newPage]);
  };

  // pokemon list effect
  useEffect(() => {
    // reset showList
    setShowList([]);
    // reset prevY
    setPrevY(0);
    // page management
    if (currPage !== 1) {
      // if page is not 1, change it and will trigger new slice
      setCurrPage(1);
    } else {
      // page is already 1, with showList reset we can slice a new first page
      sliceNewPage(currPage, true);
    }
  }, [pokemonList]);

  // observer effect
  useEffect(() => {
    // only start the observer if showList has length
    // otherwise it will start an infinite loop
    // since the node will always be visible
    if (showList.length > 0) {
      // https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
      // observer options
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      };
      // make sure previous observer is disconnected
      if (observer.current) observer.current.disconnect();
      // create new observer
      observer.current = new window.IntersectionObserver(handleObserver, options);
      // observer.current can be mutated so create a variable
      const { current: currentObserver } = observer;
      // if node exists, observe
      if (node) currentObserver.observe(node);
      // disconnect when component unmounts
      return () => currentObserver.disconnect();
    }
  }, [node, currPage]);

  // page effect
  useEffect(() => {
    // page has been changed so slice it into showList
    sliceNewPage(currPage, false);
  }, [currPage]);

  return (
    <>
      <Box
        flexdirection={flexdirection}
        flexalign={flexalign}
        flexwrap={flexwrap}
        flexjustify="center"
        flexgap="1em"
        {...rest}
      >
        {showList?.map(currPokemon => (
          <PokemonBox
            dark={dark}
            key={`infinite-scroll-${currPokemon.id}`}
            pokemon={currPokemon}
            whileHover="hover"
            whileTap="tap"
            variants={fadeInUpVariant}
          />
        ))}
      </Box>
      {showList.length > 0 && pokemonList.length !== showList?.length && (
        <Loading flexheight="100px" $iconWidth="5%" flexpadding="1rem 0" ref={setNode} />
      )}
    </>
  );
}
