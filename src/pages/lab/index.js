import TheLab from '../../components/TheLab'

export default function LabPage() {
  return <TheLab />
}

export async function getServerSideProps() {
  return { props: {} }
}
