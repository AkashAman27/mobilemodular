import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import PortableClassrooms from '../page'

interface LocationParams {
  location: string[]
}

interface Props {
  params: LocationParams
}

// Generate metadata for location-specific pages
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = params
  
  if (!location || location.length === 0) {
    return notFound()
  }

  let locationName = ''
  let pageTitle = ''
  
  if (location.length === 1) {
    // State page: /solutions/portable-classrooms/alabama
    const stateName = location[0].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    locationName = stateName
    pageTitle = `Portable Classrooms in ${stateName} | Aman Modular Buildings`
  } else if (location.length === 2) {
    // City page: /solutions/portable-classrooms/california/los-angeles
    const stateName = location[0].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    const cityName = location[1].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    locationName = `${cityName}, ${stateName}`
    pageTitle = `Portable Classrooms in ${cityName}, ${stateName} | Aman Modular Buildings`
  }

  return {
    title: pageTitle,
    description: `Portable classrooms and educational facilities in ${locationName}. Modular classroom buildings for schools, universities, and training centers.`,
    keywords: `portable classrooms ${locationName}, modular classrooms ${locationName}, educational buildings ${locationName}`,
    openGraph: {
      title: pageTitle,
      description: `Portable classrooms and educational facilities in ${locationName}`,
      type: 'website',
    }
  }
}

export default function LocationSpecificPortableClassrooms({ params }: Props) {
  const { location } = params
  
  if (!location || location.length === 0) {
    return notFound()
  }

  let locationName = ''
  let locationType: 'state' | 'city' = 'state'
  let stateName = ''
  
  if (location.length === 1) {
    // State page
    stateName = location[0].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    locationName = stateName
    locationType = 'state'
  } else if (location.length === 2) {
    // City page
    stateName = location[0].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    const cityName = location[1].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    locationName = cityName
    locationType = 'city'
  } else {
    return notFound()
  }

  // Pass location information as props to the base component
  const locationProps = {
    locationName,
    locationType,
    stateName: locationType === 'city' ? stateName : undefined
  }

  return <PortableClassrooms {...locationProps} />
}