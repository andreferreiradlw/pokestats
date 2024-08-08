import { useState, useEffect, useRef, useCallback } from 'react';
// helpers
import { fadeInUpVariant } from '@/helpers';
// types
import type { Pokemon } from '@/types';
// components
import Loading from '@/components/Loading';
import PokemonBox from '@/components/PokemonBox';
import { Grid, GridProps } from '@mui/material';

export interface InfiniteScrollProps extends GridProps {
  pokemonList: Pokemon[];
  itemsPerPage?: number;
}

const InfiniteScroll = ({
  pokemonList,
  itemsPerPage = 35,
  ...rest
}: InfiniteScrollProps): JSX.Element => {
  // Combined state for managing current page, previous Y position, and the list to show
  const [state, setState] = useState({
    currPage: 1,
    prevY: 1,
    showList: [] as Pokemon[],
  });

  // Ref to store the IntersectionObserver instance
  const observer = useRef<IntersectionObserver | null>(null);

  // Ref for the loading component (target node for the IntersectionObserver)
  const nodeRef = useRef<HTMLDivElement | null>(null);

  // Function to slice the pokemon list based on the current page
  const sliceNewPage = useCallback(
    (page: number): Pokemon[] =>
      pokemonList.slice(page === 1 ? 0 : (page - 1) * itemsPerPage, page * itemsPerPage),
    [itemsPerPage, pokemonList],
  );

  // Callback for IntersectionObserver when the target element is in view
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const { isIntersecting, boundingClientRect, intersectionRatio } = entries[0];

      if (isIntersecting && intersectionRatio === 1 && boundingClientRect.y > state.prevY) {
        setState(prevState => ({
          ...prevState,
          prevY: boundingClientRect.y - 100, // Update previous Y position to prevent repeated triggers
          currPage: prevState.currPage + 1, // Increment page to load more items
        }));
      }
    },
    [state.prevY],
  );

  // Effect to reset the list and page when the pokemonList changes
  useEffect(() => {
    setState({
      currPage: 1,
      prevY: 0,
      showList: sliceNewPage(1), // Load the first page
    });
  }, [pokemonList, sliceNewPage]);

  // Effect to set up the IntersectionObserver when the list has items
  useEffect(() => {
    if (state.showList.length > 0 && state.showList.length < pokemonList.length) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      };
      if (observer.current) observer.current.disconnect(); // Disconnect any previous observer
      observer.current = new IntersectionObserver(handleObserver, options); // Create a new observer
      if (nodeRef.current) observer.current.observe(nodeRef.current); // Observe the target node
      return () => observer.current?.disconnect(); // Cleanup on component unmount
    }
  }, [state.showList.length, handleObserver, pokemonList.length]);

  // Effect to load more items when the current page changes
  useEffect(() => {
    if (state.currPage > 1) {
      setState(prevState => ({
        ...prevState,
        showList: [...prevState.showList, ...sliceNewPage(state.currPage)], // Append new items to the list
      }));
    }
  }, [state.currPage, sliceNewPage]);

  return (
    <>
      <Grid
        flexDirection="row"
        alignItems="flex-start"
        flexWrap="wrap"
        justifyContent="center"
        gap="1.5em"
        {...rest}
      >
        {state.showList.map(currPokemon => (
          <PokemonBox
            key={`infinite-scroll-${currPokemon.id}`}
            pokemonName={currPokemon.name}
            pokemonId={currPokemon.id}
            whileHover="hover"
            whileTap="tap"
            variants={fadeInUpVariant}
          />
        ))}
      </Grid>
      {/* Render the Loading component only if there are more items to load */}
      {state.showList.length > 0 && state.showList.length < pokemonList.length && (
        <Loading flexheight="100px" $iconWidth="5%" flexpadding="1em 0" ref={nodeRef} />
      )}
    </>
  );
};

export default InfiniteScroll;
