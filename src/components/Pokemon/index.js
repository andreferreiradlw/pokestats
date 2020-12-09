import { useRouter } from 'next/router'

export default function Homepage() {
  const router = useRouter()
  console.log(router.query)

  return (
    <main>
      <div>Selected Pokemon:</div>
      <div>{router.query.id}</div>
    </main>
  )
}
