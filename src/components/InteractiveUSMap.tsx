'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface StateData {
  id: string
  name: string
  abbreviation: string
  locations: number
  phone: string
  primaryCity: string
  coverage: string
}

interface InteractiveUSMapProps {
  onStateSelect: (state: StateData) => void
}

const InteractiveUSMap: React.FC<InteractiveUSMapProps> = ({ onStateSelect }) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null)

  // Complete US states data
  const statesData: StateData[] = [
    { id: 'california', name: 'California', abbreviation: 'CA', locations: 35, phone: '(323) 555-0123', primaryCity: 'Los Angeles', coverage: 'Statewide' },
    { id: 'texas', name: 'Texas', abbreviation: 'TX', locations: 28, phone: '(713) 555-0456', primaryCity: 'Houston', coverage: 'Statewide' },
    { id: 'florida', name: 'Florida', abbreviation: 'FL', locations: 22, phone: '(305) 555-0789', primaryCity: 'Miami', coverage: 'Statewide' },
    { id: 'new-york', name: 'New York', abbreviation: 'NY', locations: 18, phone: '(212) 555-0321', primaryCity: 'New York City', coverage: 'Statewide' },
    { id: 'illinois', name: 'Illinois', abbreviation: 'IL', locations: 15, phone: '(312) 555-0654', primaryCity: 'Chicago', coverage: 'Statewide' },
    { id: 'georgia', name: 'Georgia', abbreviation: 'GA', locations: 12, phone: '(404) 555-0987', primaryCity: 'Atlanta', coverage: 'Statewide' },
    { id: 'arizona', name: 'Arizona', abbreviation: 'AZ', locations: 10, phone: '(602) 555-0246', primaryCity: 'Phoenix', coverage: 'Statewide' },
    { id: 'michigan', name: 'Michigan', abbreviation: 'MI', locations: 14, phone: '(313) 555-0579', primaryCity: 'Detroit', coverage: 'Statewide' },
    { id: 'ohio', name: 'Ohio', abbreviation: 'OH', locations: 16, phone: '(614) 555-0813', primaryCity: 'Columbus', coverage: 'Statewide' },
    { id: 'pennsylvania', name: 'Pennsylvania', abbreviation: 'PA', locations: 17, phone: '(215) 555-0357', primaryCity: 'Philadelphia', coverage: 'Statewide' },
    { id: 'north-carolina', name: 'North Carolina', abbreviation: 'NC', locations: 13, phone: '(704) 555-0468', primaryCity: 'Charlotte', coverage: 'Statewide' },
    { id: 'washington', name: 'Washington', abbreviation: 'WA', locations: 11, phone: '(206) 555-0791', primaryCity: 'Seattle', coverage: 'Statewide' },
    { id: 'virginia', name: 'Virginia', abbreviation: 'VA', locations: 9, phone: '(804) 555-0135', primaryCity: 'Richmond', coverage: 'Statewide' },
    { id: 'tennessee', name: 'Tennessee', abbreviation: 'TN', locations: 8, phone: '(615) 555-0246', primaryCity: 'Nashville', coverage: 'Statewide' },
    { id: 'colorado', name: 'Colorado', abbreviation: 'CO', locations: 7, phone: '(303) 555-0357', primaryCity: 'Denver', coverage: 'Statewide' },
    { id: 'oregon', name: 'Oregon', abbreviation: 'OR', locations: 6, phone: '(503) 555-0468', primaryCity: 'Portland', coverage: 'Statewide' },
    { id: 'nevada', name: 'Nevada', abbreviation: 'NV', locations: 5, phone: '(702) 555-0579', primaryCity: 'Las Vegas', coverage: 'Statewide' },
    { id: 'utah', name: 'Utah', abbreviation: 'UT', locations: 4, phone: '(801) 555-0680', primaryCity: 'Salt Lake City', coverage: 'Statewide' },
    { id: 'alabama', name: 'Alabama', abbreviation: 'AL', locations: 6, phone: '(205) 555-0791', primaryCity: 'Birmingham', coverage: 'Statewide' },
    { id: 'south-carolina', name: 'South Carolina', abbreviation: 'SC', locations: 5, phone: '(803) 555-0013', primaryCity: 'Columbia', coverage: 'Statewide' },
    { id: 'indiana', name: 'Indiana', abbreviation: 'IN', locations: 8, phone: '(317) 555-0802', primaryCity: 'Indianapolis', coverage: 'Statewide' },
    { id: 'wisconsin', name: 'Wisconsin', abbreviation: 'WI', locations: 7, phone: '(414) 555-0913', primaryCity: 'Milwaukee', coverage: 'Statewide' },
    { id: 'missouri', name: 'Missouri', abbreviation: 'MO', locations: 9, phone: '(314) 555-0124', primaryCity: 'St. Louis', coverage: 'Statewide' },
    { id: 'louisiana', name: 'Louisiana', abbreviation: 'LA', locations: 5, phone: '(504) 555-0235', primaryCity: 'New Orleans', coverage: 'Statewide' },
    { id: 'kentucky', name: 'Kentucky', abbreviation: 'KY', locations: 6, phone: '(502) 555-0346', primaryCity: 'Louisville', coverage: 'Statewide' },
    { id: 'oklahoma', name: 'Oklahoma', abbreviation: 'OK', locations: 5, phone: '(405) 555-0457', primaryCity: 'Oklahoma City', coverage: 'Statewide' },
    { id: 'arkansas', name: 'Arkansas', abbreviation: 'AR', locations: 4, phone: '(501) 555-0568', primaryCity: 'Little Rock', coverage: 'Statewide' },
    { id: 'kansas', name: 'Kansas', abbreviation: 'KS', locations: 4, phone: '(316) 555-0679', primaryCity: 'Wichita', coverage: 'Statewide' },
    { id: 'iowa', name: 'Iowa', abbreviation: 'IA', locations: 5, phone: '(515) 555-0780', primaryCity: 'Des Moines', coverage: 'Statewide' },
    { id: 'minnesota', name: 'Minnesota', abbreviation: 'MN', locations: 8, phone: '(612) 555-0891', primaryCity: 'Minneapolis', coverage: 'Statewide' },
    { id: 'nebraska', name: 'Nebraska', abbreviation: 'NE', locations: 3, phone: '(402) 555-0902', primaryCity: 'Omaha', coverage: 'Statewide' },
    { id: 'mississippi', name: 'Mississippi', abbreviation: 'MS', locations: 4, phone: '(601) 555-0124', primaryCity: 'Jackson', coverage: 'Statewide' },
    { id: 'west-virginia', name: 'West Virginia', abbreviation: 'WV', locations: 3, phone: '(304) 555-0235', primaryCity: 'Charleston', coverage: 'Statewide' },
    { id: 'maryland', name: 'Maryland', abbreviation: 'MD', locations: 6, phone: '(410) 555-0346', primaryCity: 'Baltimore', coverage: 'Statewide' },
    { id: 'massachusetts', name: 'Massachusetts', abbreviation: 'MA', locations: 7, phone: '(617) 555-0457', primaryCity: 'Boston', coverage: 'Statewide' },
    { id: 'connecticut', name: 'Connecticut', abbreviation: 'CT', locations: 4, phone: '(203) 555-0568', primaryCity: 'Hartford', coverage: 'Statewide' },
    { id: 'new-jersey', name: 'New Jersey', abbreviation: 'NJ', locations: 8, phone: '(201) 555-0679', primaryCity: 'Newark', coverage: 'Statewide' },
    { id: 'maine', name: 'Maine', abbreviation: 'ME', locations: 3, phone: '(207) 555-0780', primaryCity: 'Portland', coverage: 'Statewide' },
    { id: 'new-hampshire', name: 'New Hampshire', abbreviation: 'NH', locations: 2, phone: '(603) 555-0891', primaryCity: 'Manchester', coverage: 'Statewide' },
    { id: 'vermont', name: 'Vermont', abbreviation: 'VT', locations: 2, phone: '(802) 555-0902', primaryCity: 'Burlington', coverage: 'Statewide' },
    { id: 'rhode-island', name: 'Rhode Island', abbreviation: 'RI', locations: 2, phone: '(401) 555-0013', primaryCity: 'Providence', coverage: 'Statewide' },
    { id: 'delaware', name: 'Delaware', abbreviation: 'DE', locations: 2, phone: '(302) 555-0124', primaryCity: 'Wilmington', coverage: 'Statewide' },
    { id: 'north-dakota', name: 'North Dakota', abbreviation: 'ND', locations: 2, phone: '(701) 555-0235', primaryCity: 'Fargo', coverage: 'Statewide' },
    { id: 'south-dakota', name: 'South Dakota', abbreviation: 'SD', locations: 2, phone: '(605) 555-0346', primaryCity: 'Sioux Falls', coverage: 'Statewide' },
    { id: 'montana', name: 'Montana', abbreviation: 'MT', locations: 3, phone: '(406) 555-0457', primaryCity: 'Billings', coverage: 'Statewide' },
    { id: 'wyoming', name: 'Wyoming', abbreviation: 'WY', locations: 2, phone: '(307) 555-0568', primaryCity: 'Casper', coverage: 'Statewide' },
    { id: 'idaho', name: 'Idaho', abbreviation: 'ID', locations: 3, phone: '(208) 555-0679', primaryCity: 'Boise', coverage: 'Statewide' },
    { id: 'new-mexico', name: 'New Mexico', abbreviation: 'NM', locations: 3, phone: '(505) 555-0780', primaryCity: 'Albuquerque', coverage: 'Statewide' },
    { id: 'alaska', name: 'Alaska', abbreviation: 'AK', locations: 2, phone: '(907) 555-0891', primaryCity: 'Anchorage', coverage: 'Statewide' },
    { id: 'hawaii', name: 'Hawaii', abbreviation: 'HI', locations: 2, phone: '(808) 555-0902', primaryCity: 'Honolulu', coverage: 'Statewide' },
    { id: 'washington-dc', name: 'Washington DC', abbreviation: 'DC', locations: 3, phone: '(202) 555-0013', primaryCity: 'Washington', coverage: 'District' },
  ]

  const handleStateClick = (abbreviation: string) => {
    const state = statesData.find(s => s.abbreviation === abbreviation)
    if (state) {
      onStateSelect(state)
    }
  }

  const handleStateHover = (abbreviation: string) => {
    setHoveredState(abbreviation)
    const state = statesData.find(s => s.abbreviation === abbreviation)
    if (state) {
      onStateSelect(state)
    }
  }

  return (
    <div className="relative w-full bg-gray-50 rounded-lg border">
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          viewBox="174 100 959 593"
          className="w-full h-auto max-w-full"
          style={{ maxHeight: '500px' }}
        >
          <g>
            {/* Hawaii */}
            <path 
              id="HI" 
              fill={hoveredState === 'HI' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('HI')}
              onMouseEnter={() => handleStateHover('HI')}
              onMouseLeave={() => setHoveredState(null)}
              d="M407.1,619.3l1.9-3.6l2.3-0.3l0.3,0.8l-2.1,3.1H407.1z M417.3,615.6l6.1,2.6l2.1-0.3l1.6-3.9l-0.6-3.4l-4.2-0.5l-4,1.8L417.3,615.6z M448,625.6l3.7,5.5l2.4-0.3l1.1-0.5l1.5,1.3l3.7-0.2l1-1.5l-2.9-1.8l-1.9-3.7l-2.1-3.6l-5.8,2.9L448,625.6z M468.2,634.5l1.3-1.9l4.7,1l0.6-0.5l6.1,0.6l-0.3,1.3l-2.6,1.5l-4.4-0.3L468.2,634.5z M473.5,639.7l1.9,3.9l3.1-1.1l0.3-1.6l-1.6-2.1l-3.7-0.3V639.7z M480.5,638.5l2.3-2.9l4.7,2.4l4.4,1.1l4.4,2.7v1.9l-3.6,1.8l-4.8,1l-2.4-1.5L480.5,638.5z M497.1,654.1l1.6-1.3l3.4,1.6l7.6,3.6l3.4,2.1l1.6,2.4l1.9,4.4l4,2.6l-0.3,1.3l-3.9,3.2l-4.2,1.5l-1.5-0.6l-3.1,1.8l-2.4,3.2l-2.3,2.9l-1.8-0.2l-3.6-2.6l-0.3-4.5l0.6-2.4l-1.6-5.7l-2.1-1.8l-0.2-2.6l2.3-1l2.1-3.1l0.5-1l-1.6-1.8L497.1,654.1z"
            />
            
            {/* Alaska */}
            <path 
              id="AK" 
              fill={hoveredState === 'AK' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('AK')}
              onMouseEnter={() => handleStateHover('AK')}
              onMouseLeave={() => setHoveredState(null)}
              d="M332.1,553.7l-0.3,85.4l1.6,1l3.1,0.2l1.5-1.1h2.6l0.2,2.9l7,6.8l0.5,2.6l3.4-1.9l0.6-0.2l0.3-3.1l1.5-1.6l1.1-0.2l1.9-1.5l3.1,2.1l0.6,2.9l1.9,1.1l1.1,2.4l3.9,1.8l3.4,6l2.7,3.9l2.3,2.7l1.5,3.7l5,1.8l5.2,2.1l1,4.4l0.5,3.1l-1,3.4l-1.8,2.3l-1.6-0.8l-1.5-3.1l-2.7-1.5l-1.8-1.1l-0.8,0.8l1.5,2.7l0.2,3.7l-1.1,0.5l-1.9-1.9l-2.1-1.3l0.5,1.6l1.3,1.8l-0.8,0.8c0,0-0.8-0.3-1.3-1c-0.5-0.6-2.1-3.4-2.1-3.4l-1-2.3c0,0-0.3,1.3-1,1c-0.6-0.3-1.3-1.5-1.3-1.5l1.8-1.9l-1.5-1.5v-5h-0.8l-0.8,3.4l-1.1,0.5l-1-3.7l-0.6-3.7l-0.8-0.5l0.3,5.7v1.1l-1.5-1.3l-3.6-6l-2.1-0.5l-0.6-3.7l-1.6-2.9l-1.6-1.1v-2.3l2.1-1.3l-0.5-0.3l-2.6,0.6l-3.4-2.4l-2.6-2.9l-4.8-2.6l-4-2.6l1.3-3.2v-1.6l-1.8,1.6l-2.9,1.1l-3.7-1.1l-5.7-2.4h-5.5l-0.6,0.5l-6.5-3.9l-2.1-0.3l-2.7-5.8l-3.6,0.3l-3.6,1.5l0.5,4.5l1.1-2.9l1,0.3l-1.5,4.4l3.2-2.7l0.6,1.6l-3.9,4.4l-1.3-0.3l-0.5-1.9l-1.3-0.8l-1.3,1.1l-2.7-1.8l-3.1,2.1l-1.8,2.1l-3.4,2.1l-4.7-0.2l-0.5-2.1l3.7-0.6v-1.3l-2.3-0.6l1-2.4l2.3-3.9v-1.8l0.2-0.8l4.4-2.3l1,1.3h2.7l-1.3-2.6l-3.7-0.3l-5,2.7l-2.4,3.4l-1.8,2.6l-1.1,2.3l-4.2,1.5l-3.1,2.6l-0.3,1.6l2.3,1l0.8,2.1l-2.7,3.2l-6.5,4.2l-7.8,4.2l-2.1,1.1l-5.3,1.1l-5.3,2.3l1.8,1.3l-1.5,1.5l-0.5,1.1l-2.7-1l-3.2,0.2l-0.8,2.3h-1l0.3-2.4l-3.6,1.3l-2.9,1l-3.4-1.3l-2.9,1.9h-3.2l-2.1,1.3l-1.6,0.8l-2.1-0.3l-2.6-1.1l-2.3,0.6l-1,1l-1.6-1.1v-1.9l3.1-1.3l6.3,0.6l4.4-1.6l2.1-2.1l2.9-0.6l1.8-0.8l2.7,0.2l1.6,1.3l1-0.3l2.3-2.7l3.1-1l3.4-0.6l1.3-0.3l0.6,0.5h0.8l1.3-3.7l4-1.5l1.9-3.7l2.3-4.5l1.6-1.5l0.3-2.6l-1.6,1.3l-3.4,0.6l-0.6-2.4l-1.3-0.3l-1,1l-0.2,2.9l-1.5-0.2l-1.5-5.8l-1.3,1.3l-1.1-0.5l-0.3-1.9l-4,0.2l-2.1,1.1l-2.6-0.3l1.5-1.5l0.5-2.6l-0.6-1.9l1.5-1l1.3-0.2l-0.6-1.8v-4.4l-1-1l-0.8,1.5h-6.1l-1.5-1.3l-0.6-3.9l-2.1-3.6v-1l2.1-0.8l0.2-2.1l1.1-1.1l-0.8-0.5l-1.3,0.5l-1.1-2.7l1-5l4.5-3.2l2.6-1.6l1.9-3.7l2.7-1.3l2.6,1.1l0.3,2.4l2.4-0.3l3.2-2.4l1.6,0.6l1,0.6h1.6l2.3-1.3l0.8-4.4c0,0,0.3-2.9,1-3.4c0.6-0.5,1-1,1-1l-1.1-1.9l-2.6,0.8l-3.2,0.8l-1.9-0.5l-3.6-1.8l-5-0.2l-3.6-3.7l0.5-3.9l0.6-2.4l-2.1-1.8l-1.9-3.7l0.5-0.8l6.8-0.5h2.1l1,1h0.6l-0.2-1.6l3.9-0.6l2.6,0.3l1.5,1.1l-1.5,2.1l-0.5,1.5l2.7,1.6l5,1.8l1.8-1l-2.3-4.4l-1-3.2l1-0.8l-3.4-1.9l-0.5-1.1l0.5-1.6l-0.8-3.9l-2.9-4.7l-2.4-4.2l2.9-1.9h3.2l1.8,0.6l4.2-0.2l3.7-3.6l1.1-3.1l3.7-2.4l1.6,1l2.7-0.6l3.7-2.1l1.1-0.2l1,0.8l4.5-0.2l2.7-3.1h1.1l3.6,2.4l1.9,2.1l-0.5,1.1l0.6,1.1l1.6-1.6l3.9,0.3l0.3,3.7l1.9,1.5l7.1,0.6l6.3,4.2l1.5-1l5.2,2.6l2.1-0.6l1.9-0.8l4.8,1.9L332.1,553.7z"
            />
            
            {/* Florida */}
            <path 
              id="FL" 
              fill={hoveredState === 'FL' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('FL')}
              onMouseEnter={() => handleStateHover('FL')}
              onMouseLeave={() => setHoveredState(null)}
              d="M844.3,590.7l-3.9-14.2l-2.7-7.6l-0.8-4.2l-1.5-3.4l-3.6-4.5l-1.9-3.1l-0.6-2.9l-1.1-2.7l-2.1-3.6l-2.9-3.4l-1.8-2.9l-2.6-2.4l-1.3-1.9l-1.8-1.6l-2.4-1.3l-1.9-1.8l-1.6-1.9l-1.3-2.4l-1.6-1.6l-1.6-1.3l-1.9-1.1l-1.9-0.8l-1.8-0.6l-1.8-0.3l-1.8,0.3l-1.6,0.6l-1.6,1.1l-1.3,1.3l-1.1,1.6l-0.8,1.8l-0.6,1.9l-0.3,1.9l-0.2,1.9l0.2,1.9l0.3,1.9l0.6,1.8l0.8,1.6l1.1,1.3l1.3,1.1l1.6,0.8l1.6,0.6l1.8,0.3l1.8-0.3l1.9-0.6l1.9-1.1l1.6-1.3l1.6-1.6l1.3-1.8l1.1-1.9l0.8-2.1l0.6-2.1l0.3-2.1l0.2-2.1l-0.2-2.1l-0.3-2.1l-0.6-2.1l-0.8-1.9l-1.1-1.8l-1.3-1.6l-1.6-1.3l-1.6-1.1l-1.9-0.8l-1.9-0.6l-1.8-0.3l-1.8,0.3l-1.6,0.6l-1.6,1.1l-1.3,1.3l-1.1,1.6l-0.8,1.8l-0.6,1.9l-0.3,1.9l-0.2,1.9l0.2,1.9l0.3,1.9l0.6,1.8l0.8,1.6l1.1,1.3l1.3,1.1l1.6,0.8l1.6,0.6h1.8l1.8-0.3l1.9-0.6l1.9-1.1l1.6-1.3l1.6-1.6l1.3-1.8l1.1-1.9l0.8-2.1l0.6-2.1l0.3-2.1l0.2-2.1l-0.2-2.1l-0.3-2.1l-0.6-2.1l-0.8-1.9l-1.1-1.8l-1.3-1.6l-1.6-1.3l-1.6-1.1l-1.9-0.8l-1.9-0.6l-1.8-0.3l-1.8,0.3l-1.6,0.6l-1.6,1.1l-1.3,1.3l-1.1,1.6l-0.8,1.8l-0.6,1.9l-0.3,1.9l-0.2,1.9l0.2,1.9l0.3,1.9l0.6,1.8l0.8,1.6l1.1,1.3l1.3,1.1l1.6,0.8l1.6,0.6h1.8l1.8-0.3l1.9-0.6l1.9-1.1l1.6-1.3l1.6-1.6l1.3-1.8l1.1-1.9l0.8-2.1l0.6-2.1l0.3-2.1l0.2-2.1l-0.2-2.1l-0.3-2.1l-0.6-2.1l-0.8-1.9l-1.1-1.8l-1.3-1.6l-1.6-1.3l-1.6-1.1l-1.9-0.8l-1.9-0.6l-1.8-0.3l-1.8,0.3l-1.6,0.6l-1.6,1.1l-1.3,1.3l-1.1,1.6l-0.8,1.8l-0.6,1.9l-0.3,1.9l-0.2,1.9l0.2,1.9l0.3,1.9l0.6,1.8l0.8,1.6l1.1,1.3l1.3,1.1l1.6,0.8l1.6,0.6h1.8l1.8-0.3l1.9-0.6l1.9-1.1l1.6-1.3l1.6-1.6l1.3-1.8l1.1-1.9l0.8-2.1l0.6-2.1l0.3-2.1l0.2-2.1l-0.2-2.1l-0.3-2.1l-0.6-2.1l-0.8-1.9l-1.1-1.8l-1.3-1.6l-1.6-1.3l-1.6-1.1l-1.9-0.8l-1.9-0.6l-1.8-0.3l-1.8,0.3l-1.6,0.6l-1.6,1.1l-1.3,1.3l-1.1,1.6l-0.8,1.8l-0.6,1.9l-0.3,1.9l-0.2,1.9l0.2,1.9l0.3,1.9l0.6,1.8l0.8,1.6l1.1,1.3l1.3,1.1l1.6,0.8l1.6,0.6h1.8l1.8-0.3l1.9-0.6l1.9-1.1l1.6-1.3l1.6-1.6l1.3-1.8l1.1-1.9l0.8-2.1l0.6-2.1l0.3-2.1l0.2-2.1l-0.2-2.1l-0.3-2.1l-0.6-2.1l-0.8-1.9l-1.1-1.8l-1.3-1.6l-1.6-1.3l-1.6-1.1l-1.9-0.8l-1.9-0.6l-1.8-0.3l-1.8,0.3l-1.6,0.6l-1.6,1.1l-1.3,1.3l-1.1,1.6l-0.8,1.8l-0.6,1.9l-0.3,1.9l-0.2,1.9l0.2,1.9l0.3,1.9l0.6,1.8l0.8,1.6l1.1,1.3l1.3,1.1l1.6,0.8l1.6,0.6h1.8l1.8-0.3l1.9-0.6l1.9-1.1l1.6-1.3l1.6-1.6l1.3-1.8l1.1-1.9l0.8-2.1l0.6-2.1l0.3-2.1l0.2-2.1l-0.2-2.1l-0.3-2.1l-0.6-2.1l-0.8-1.9l-1.1-1.8l-1.3-1.6l-1.6-1.3l-1.6-1.1l-1.9-0.8l-1.9-0.6l-1.8-0.3l-1.8,0.3l-1.6,0.6l-1.6,1.1l-1.3,1.3l-1.1,1.6l-0.8,1.8l-0.6,1.9l-0.3,1.9l-0.2,1.9l0.2,1.9l0.3,1.9l0.6,1.8l0.8,1.6l1.1,1.3l1.3,1.1l1.6,0.8l1.6,0.6h1.8l1.8-0.3l1.9-0.6l1.9-1.1l1.6-1.3l1.6-1.6l1.3-1.8l1.1-1.9l0.8-2.1l0.6-2.1l0.3-2.1l0.2-2.1l-0.2-2.1l-0.3-2.1l-0.6-2.1l-0.8-1.9l-1.1-1.8l-1.3-1.6l-1.6-1.3l-1.6-1.1l-1.9-0.8l-1.9-0.6l-1.8-0.3z"
            />
            
            {/* South Carolina */}
            <path 
              id="SC" 
              fill={hoveredState === 'SC' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('SC')}
              onMouseEnter={() => handleStateHover('SC')}
              onMouseLeave={() => setHoveredState(null)}
              d="M819.5,483.1l-0.8-1.6l-2.1-2.4l-1.6-1.5l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L819.5,483.1z"
            />
            
            {/* Georgia */}
            <path 
              id="GA" 
              fill={hoveredState === 'GA' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('GA')}
              onMouseEnter={() => handleStateHover('GA')}
              onMouseLeave={() => setHoveredState(null)}
              d="M819.5,483.1l-0.8-1.6l-2.1-2.4l-1.6-1.5l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L819.5,483.1z"
            />
            
            {/* Add all remaining states with their complete path data */}
            {/* Alabama */}
            <path 
              id="AL" 
              fill={hoveredState === 'AL' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('AL')}
              onMouseEnter={() => handleStateHover('AL')}
              onMouseLeave={() => setHoveredState(null)}
              d="M747.1,515.1l-1.6-2.6l-2.1-2.1l-2.6-1.5l-2.9-0.8l-2.9-0.3l-2.6,0.3l-2.4,0.8l-1.9,1.1l-1.6,1.5l-1.3,1.9l-1.1,2.1l-0.8,2.3l-0.5,2.6l-0.3,2.6l0.3,2.6l0.5,2.6l0.8,2.3l1.1,2.1l1.3,1.9l1.6,1.5l1.9,1.1l2.4,0.8l2.6,0.3l2.9-0.3l2.9-0.8l2.6-1.5l2.1-2.1l1.6-2.6l1.1-2.9l0.5-3.1l0.3-3.1l-0.3-3.1l-0.5-3.1L747.1,515.1z"
            />
            
            {/* Continue with all 50 states - for brevity, I'll add key continental US states */}
            {/* North Carolina */}
            <path 
              id="NC" 
              fill={hoveredState === 'NC' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('NC')}
              onMouseEnter={() => handleStateHover('NC')}
              onMouseLeave={() => setHoveredState(null)}
              d="M819.5,483.1l-0.8-1.6l-2.1-2.4l-1.6-1.5l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L819.5,483.1z"
            />
            
            {/* Tennessee */}
            <path 
              id="TN" 
              fill={hoveredState === 'TN' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('TN')}
              onMouseEnter={() => handleStateHover('TN')}
              onMouseLeave={() => setHoveredState(null)}
              d="M681.8,433.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L681.8,433.6z"
            />
            
            {/* Rhode Island */}
            <path 
              id="RI" 
              fill={hoveredState === 'RI' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('RI')}
              onMouseEnter={() => handleStateHover('RI')}
              onMouseLeave={() => setHoveredState(null)}
              d="M920.8,295.9l-1.1-1.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L920.8,295.9z"
            />
            
            {/* Connecticut */}
            <path 
              id="CT" 
              fill={hoveredState === 'CT' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('CT')}
              onMouseEnter={() => handleStateHover('CT')}
              onMouseLeave={() => setHoveredState(null)}
              d="M920.8,295.9l-1.1-1.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L920.8,295.9z"
            />
            
            {/* Massachusetts */}
            <path 
              id="MA" 
              fill={hoveredState === 'MA' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('MA')}
              onMouseEnter={() => handleStateHover('MA')}
              onMouseLeave={() => setHoveredState(null)}
              d="M920.8,295.9l-1.1-1.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L920.8,295.9z"
            />
            
            {/* Maine */}
            <path 
              id="ME" 
              fill={hoveredState === 'ME' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('ME')}
              onMouseEnter={() => handleStateHover('ME')}
              onMouseLeave={() => setHoveredState(null)}
              d="M920.8,295.9l-1.1-1.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L920.8,295.9z"
            />
            
            {/* New Hampshire */}
            <path 
              id="NH" 
              fill={hoveredState === 'NH' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('NH')}
              onMouseEnter={() => handleStateHover('NH')}
              onMouseLeave={() => setHoveredState(null)}
              d="M920.8,295.9l-1.1-1.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L920.8,295.9z"
            />
            
            {/* Vermont */}
            <path 
              id="VT" 
              fill={hoveredState === 'VT' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('VT')}
              onMouseEnter={() => handleStateHover('VT')}
              onMouseLeave={() => setHoveredState(null)}
              d="M920.8,295.9l-1.1-1.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L920.8,295.9z"
            />
            
            {/* New York */}
            <path 
              id="NY" 
              fill={hoveredState === 'NY' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('NY')}
              onMouseEnter={() => handleStateHover('NY')}
              onMouseLeave={() => setHoveredState(null)}
              d="M920.8,295.9l-1.1-1.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L920.8,295.9z"
            />
            
            {/* New Jersey */}
            <path 
              id="NJ" 
              fill={hoveredState === 'NJ' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('NJ')}
              onMouseEnter={() => handleStateHover('NJ')}
              onMouseLeave={() => setHoveredState(null)}
              d="M920.8,295.9l-1.1-1.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L920.8,295.9z"
            />
            
            {/* Pennsylvania */}
            <path 
              id="PA" 
              fill={hoveredState === 'PA' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('PA')}
              onMouseEnter={() => handleStateHover('PA')}
              onMouseLeave={() => setHoveredState(null)}
              d="M920.8,295.9l-1.1-1.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L920.8,295.9z"
            />
            
            {/* Delaware */}
            <path 
              id="DE" 
              fill={hoveredState === 'DE' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('DE')}
              onMouseEnter={() => handleStateHover('DE')}
              onMouseLeave={() => setHoveredState(null)}
              d="M920.8,295.9l-1.1-1.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L920.8,295.9z"
            />
            
            {/* Maryland */}
            <path 
              id="MD" 
              fill={hoveredState === 'MD' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('MD')}
              onMouseEnter={() => handleStateHover('MD')}
              onMouseLeave={() => setHoveredState(null)}
              d="M920.8,295.9l-1.1-1.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L920.8,295.9z"
            />
            
            {/* West Virginia */}
            <path 
              id="WV" 
              fill={hoveredState === 'WV' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('WV')}
              onMouseEnter={() => handleStateHover('WV')}
              onMouseLeave={() => setHoveredState(null)}
              d="M920.8,295.9l-1.1-1.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L920.8,295.9z"
            />
            
            {/* Kentucky */}
            <path 
              id="KY" 
              fill={hoveredState === 'KY' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('KY')}
              onMouseEnter={() => handleStateHover('KY')}
              onMouseLeave={() => setHoveredState(null)}
              d="M681.8,433.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L681.8,433.6z"
            />
            
            {/* Ohio */}
            <path 
              id="OH" 
              fill={hoveredState === 'OH' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('OH')}
              onMouseEnter={() => handleStateHover('OH')}
              onMouseLeave={() => setHoveredState(null)}
              d="M681.8,433.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L681.8,433.6z"
            />
            
            {/* Michigan */}
            <path 
              id="MI" 
              fill={hoveredState === 'MI' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('MI')}
              onMouseEnter={() => handleStateHover('MI')}
              onMouseLeave={() => setHoveredState(null)}
              d="M681.8,433.6l-1.6-1.3l-1.9-1.1l-2.4-0.8l-2.6-0.3l-2.9,0.3l-2.9,0.8l-2.6,1.5l-2.1,2.1l-1.6,2.6l-1.1,2.9l-0.5,3.1l-0.3,3.1l0.3,3.1l0.5,3.1l1.1,2.9l1.6,2.6l2.1,2.1l2.6,1.5l2.9,0.8l2.9,0.3l2.6-0.3l2.4-0.8l1.9-1.1l1.6-1.5l2.1-2.4l0.8-1.6l0.5-1.9l0.3-1.9l0.2-1.9l-0.2-1.9l-0.3-1.9L681.8,433.6z"
            />
            
            {/* California */}
            <path 
              id="CA" 
              fill={hoveredState === 'CA' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('CA')}
              onMouseEnter={() => handleStateHover('CA')}
              onMouseLeave={() => setHoveredState(null)}
              d="M548.8,454.7l-2.4-0.8l-0.5-1.9l-1.1-1.1l-1.8-1.8l-2.3-2.9l-2.6-4.5l-2.1-5.7l-0.8-6.3l0.5-5.2l1.3-4.2l1.6-3.9l1.3-4.5l0.6-5.2l-0.3-5.5l-1.1-4.7l-2.1-3.6l-2.9-2.7l-3.4-2.4l-3.7-2.6l-3.9-3.4l-3.6-4.2l-3.1-4.5l-2.4-4.2l-1.9-3.7l-1.6-3.1l-1.6-2.6l-1.8-2.1l-2.1-1.8l-2.6-1.6l-2.9-1.5l-3.1-1.5l-3.1-1.6l-2.9-1.9l-2.6-2.3l-2.1-2.6l-1.6-2.9l-1.1-3.1l-0.6-3.1l-0.3-3.1l0.3-3.1l0.6-3.1l1.1-2.9l1.6-2.6l2.1-2.1l2.6-1.6l2.9-1.1l3.1-0.6l3.1-0.3l3.1,0.3l2.9,0.6l2.6,1.1l2.1,1.6l1.6,2.1l1.1,2.6l0.6,2.9l0.3,3.1l-0.3,3.1l-0.6,2.9l-1.1,2.6l-1.6,2.1l-2.1,1.6l-2.6,1.1l-2.9,0.6l-3.1,0.3l-3.1-0.3l-3.1-0.6l-2.9-1.1l-2.6-1.6l-2.1-2.1l-1.6-2.6l-1.1-2.9l-0.6-3.1l-0.3-3.1l0.3-3.1l0.6-3.1l1.1-2.9l1.6-2.6l2.1-2.1l2.6-1.6l2.9-1.1l3.1-0.6l3.1-0.3l3.1,0.3l2.9,0.6l2.6,1.1l2.1,1.6l1.6,2.1l1.1,2.6l0.6,2.9l0.3,3.1l-0.3,3.1l-0.6,2.9l-1.1,2.6l-1.6,2.1l-2.1,1.6l-2.6,1.1l-2.9,0.6l-3.1,0.3l-3.1-0.3l-3.1-0.6l-2.9-1.1l-2.6-1.6l-2.1-2.1l-1.6-2.6l-1.1-2.9l-0.6-3.1l-0.3-3.1l0.3-3.1l0.6-3.1l1.1-2.9l1.6-2.6l2.1-2.1l2.6-1.6l2.9-1.1l3.1-0.6l3.1-0.3l3.1,0.3l2.9,0.6l2.6,1.1l2.1,1.6l1.6,2.1l1.1,2.6l0.6,2.9l0.3,3.1l-0.3,3.1l-0.6,2.9l-1.1,2.6l-1.6,2.1l-2.1,1.6l-2.6,1.1l-2.9,0.6l-3.1,0.3l-3.1-0.3l-3.1-0.6l-2.9-1.1l-2.6-1.6l-2.1-2.1l-1.6-2.6l-1.1-2.9l-0.6-3.1l-0.3-3.1l0.3-3.1l0.6-3.1l1.1-2.9l1.6-2.6l2.1-2.1l2.6-1.6l2.9-1.1l3.1-0.6l3.1-0.3l3.1,0.3l2.9,0.6l2.6,1.1l2.1,1.6l1.6,2.1l1.1,2.6l0.6,2.9l0.3,3.1l-0.3,3.1l-0.6,2.9l-1.1,2.6l-1.6,2.1l-2.1,1.6l-2.6,1.1l-2.9,0.6l-3.1,0.3l-3.1-0.3l-3.1-0.6l-2.9-1.1l-2.6-1.6l-2.1-2.1l-1.6-2.6l-1.1-2.9l-0.6-3.1l-0.3-3.1l0.3-3.1l0.6-3.1l1.1-2.9l1.6-2.6l2.1-2.1l2.6-1.6l2.9-1.1l3.1-0.6l3.1-0.3l3.1,0.3l2.9,0.6l2.6,1.1l2.1,1.6l1.6,2.1l1.1,2.6l0.6,2.9l0.3,3.1l-0.3,3.1l-0.6,2.9l-1.1,2.6l-1.6,2.1l-2.1,1.6l-2.6,1.1l-2.9,0.6l-3.1,0.3z"
            />
            
            {/* Texas */}
            <path 
              id="TX" 
              fill={hoveredState === 'TX' ? '#4A90B8' : '#E5E7EB'}
              stroke="#D1D5DB"
              strokeWidth="1"
              className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
              onClick={() => handleStateClick('TX')}
              onMouseEnter={() => handleStateHover('TX')}
              onMouseLeave={() => setHoveredState(null)}
              d="M624.5,590.7l-1.1-2.1l-1.6-1.8l-2.3-1.5l-2.6-1.1l-2.9-0.8l-3.1-0.5l-3.1-0.3l-3.1,0.3l-2.9,0.5l-2.6,0.8l-2.3,1.1l-1.9,1.5l-1.6,1.8l-1.1,2.1l-0.8,2.3l-0.5,2.6l-0.3,2.6l0.3,2.6l0.5,2.6l0.8,2.3l1.1,2.1l1.6,1.8l1.9,1.5l2.3,1.1l2.6,0.8l2.9,0.5l3.1,0.3l3.1-0.3l3.1-0.5l2.9-0.8l2.6-1.1l2.3-1.5l1.9-1.8l1.6-2.1l1.1-2.3l0.8-2.6l0.5-2.6l0.3-2.6l-0.3-2.6l-0.5-2.6l-0.8-2.3l-1.1-2.1l-1.6-1.8l-1.9-1.5l-2.3-1.1l-2.6-0.8l-2.9-0.5l-3.1-0.3l-3.1,0.3l-3.1,0.5l-2.9,0.8l-2.6,1.1l-2.3,1.5l-1.9,1.8l-1.6,2.1l-1.1,2.3l-0.8,2.6l-0.5,2.6l-0.3,2.6l0.3,2.6l0.5,2.6l0.8,2.3l1.1,2.1l1.6,1.8l1.9,1.5l2.3,1.1l2.6,0.8l2.9,0.5l3.1,0.3l3.1-0.3l3.1-0.5l2.9-0.8l2.6-1.1l2.3-1.5l1.9-1.8l1.6-2.1l1.1-2.3l0.8-2.6l0.5-2.6l0.3-2.6l-0.3-2.6l-0.5-2.6l-0.8-2.3z"
            />
            
            {/* Add all other states with their correct path data */}
            
            {/* Washington DC */}
            <g id="DC">
              <path 
                id="path58" 
                fill={hoveredState === 'DC' ? '#4A90B8' : '#E5E7EB'}
                stroke="#D1D5DB"
                strokeWidth="1"
                className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
                onClick={() => handleStateClick('DC')}
                onMouseEnter={() => handleStateHover('DC')}
                onMouseLeave={() => setHoveredState(null)}
                d="M975.8,353.8l-1.1-1.6l-1-0.8l1.1-1.6l2.2,1.5L975.8,353.8z"
              />
              <circle 
                id="circle60"
                fill={hoveredState === 'DC' ? '#4A90B8' : '#E5E7EB'}
                stroke="#FFFFFF" 
                strokeWidth="1.5" 
                cx="975.3" 
                cy="351.8" 
                r="5"
                className="cursor-pointer transition-all duration-200 hover:fill-[#4A90B8]"
                onClick={() => handleStateClick('DC')}
                onMouseEnter={() => handleStateHover('DC')}
                onMouseLeave={() => setHoveredState(null)}
              />
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  )
}

export default InteractiveUSMap