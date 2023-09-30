import { Helmet } from 'react-helmet-async'

interface Props {
  title: string
}

export const HTMLTitle = (props: Props) => {
  const { title } = props

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}
