import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import OfficeBuildings from '../page'

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
    // State page: /solutions/office-buildings/alabama
    const stateName = location[0].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    locationName = stateName
    pageTitle = `Office Buildings in ${stateName} | Aman Modular Buildings`
  } else if (location.length === 2) {
    // City page: /solutions/office-buildings/california/los-angeles
    const stateName = location[0].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    const cityName = location[1].split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    locationName = `${cityName}, ${stateName}`
    pageTitle = `Office Buildings in ${cityName}, ${stateName} | Aman Modular Buildings`
  }

  return {
    title: pageTitle,
    description: `Professional office buildings and workspace solutions in ${locationName}. Portable offices, mobile offices, and modular office buildings for rent.`,
    keywords: `office buildings ${locationName}, portable offices ${locationName}, mobile offices ${locationName}, modular buildings ${locationName}`,
    openGraph: {
      title: pageTitle,
      description: `Professional office buildings and workspace solutions in ${locationName}`,
      type: 'website',
    }
  }
}

export default function LocationSpecificOfficeBuildings({ params }: Props) {
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

  return <OfficeBuildings {...locationProps} />
}