import Pokemon from '../../components/Pokemon'

export default Pokemon

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: '1' } }],
    // Enable statically generating additional pages
    fallback: true,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  return {
    props: {}, // will be passed to the page component as props
  }
}
