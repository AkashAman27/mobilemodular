// Comprehensive US locations for navigation dropdown
export interface StateLocation {
  state: string
  stateName: string
  cities: Array<{
    name: string
    href: string
  }>
}

export const stateLocations: StateLocation[] = [
  {
    state: 'AK',
    stateName: 'Alaska',
    cities: [
      { name: 'Anchorage', href: '/locations/alaska/anchorage' },
      { name: 'Fairbanks', href: '/locations/alaska/fairbanks' },
      { name: 'Juneau', href: '/locations/alaska/juneau' }
    ]
  },
  {
    state: 'AL',
    stateName: 'Alabama',
    cities: [
      { name: 'Mobile', href: '/locations/alabama/mobile' },
      { name: 'Montgomery', href: '/locations/alabama/montgomery' },
      { name: 'Birmingham', href: '/locations/alabama/birmingham' },
      { name: 'Huntsville', href: '/locations/alabama/huntsville' },
      { name: 'Theodore', href: '/locations/alabama/theodore' }
    ]
  },
  {
    state: 'AR',
    stateName: 'Arkansas',
    cities: [
      { name: 'Little Rock', href: '/locations/arkansas/little-rock' },
      { name: 'Fort Smith', href: '/locations/arkansas/fort-smith' },
      { name: 'Fayetteville', href: '/locations/arkansas/fayetteville' }
    ]
  },
  {
    state: 'AZ',
    stateName: 'Arizona',
    cities: [
      { name: 'Phoenix', href: '/locations/arizona/phoenix' },
      { name: 'Tucson', href: '/locations/arizona/tucson' },
      { name: 'Mesa', href: '/locations/arizona/mesa' },
      { name: 'Scottsdale', href: '/locations/arizona/scottsdale' }
    ]
  },
  {
    state: 'CA',
    stateName: 'California',
    cities: [
      { name: 'Los Angeles', href: '/locations/california/los-angeles' },
      { name: 'San Francisco', href: '/locations/california/san-francisco' },
      { name: 'San Diego', href: '/locations/california/san-diego' },
      { name: 'Sacramento', href: '/locations/california/sacramento' },
      { name: 'San Jose', href: '/locations/california/san-jose' },
      { name: 'Fresno', href: '/locations/california/fresno' }
    ]
  },
  {
    state: 'CO',
    stateName: 'Colorado',
    cities: [
      { name: 'Denver', href: '/locations/colorado/denver' },
      { name: 'Colorado Springs', href: '/locations/colorado/colorado-springs' },
      { name: 'Aurora', href: '/locations/colorado/aurora' },
      { name: 'Fort Collins', href: '/locations/colorado/fort-collins' }
    ]
  },
  {
    state: 'CT',
    stateName: 'Connecticut',
    cities: [
      { name: 'Hartford', href: '/locations/connecticut/hartford' },
      { name: 'New Haven', href: '/locations/connecticut/new-haven' },
      { name: 'Bridgeport', href: '/locations/connecticut/bridgeport' }
    ]
  },
  {
    state: 'DE',
    stateName: 'Delaware',
    cities: [
      { name: 'Wilmington', href: '/locations/delaware/wilmington' },
      { name: 'Dover', href: '/locations/delaware/dover' },
      { name: 'Newark', href: '/locations/delaware/newark' }
    ]
  },
  {
    state: 'FL',
    stateName: 'Florida',
    cities: [
      { name: 'Miami', href: '/locations/florida/miami' },
      { name: 'Orlando', href: '/locations/florida/orlando' },
      { name: 'Tampa', href: '/locations/florida/tampa' },
      { name: 'Jacksonville', href: '/locations/florida/jacksonville' },
      { name: 'Fort Lauderdale', href: '/locations/florida/fort-lauderdale' },
      { name: 'Tallahassee', href: '/locations/florida/tallahassee' }
    ]
  },
  {
    state: 'GA',
    stateName: 'Georgia',
    cities: [
      { name: 'Atlanta', href: '/locations/georgia/atlanta' },
      { name: 'Augusta', href: '/locations/georgia/augusta' },
      { name: 'Columbus', href: '/locations/georgia/columbus' },
      { name: 'Savannah', href: '/locations/georgia/savannah' }
    ]
  },
  {
    state: 'HI',
    stateName: 'Hawaii',
    cities: [
      { name: 'Honolulu', href: '/locations/hawaii/honolulu' },
      { name: 'Hilo', href: '/locations/hawaii/hilo' },
      { name: 'Kailua', href: '/locations/hawaii/kailua' }
    ]
  },
  {
    state: 'IA',
    stateName: 'Iowa',
    cities: [
      { name: 'Des Moines', href: '/locations/iowa/des-moines' },
      { name: 'Cedar Rapids', href: '/locations/iowa/cedar-rapids' },
      { name: 'Davenport', href: '/locations/iowa/davenport' }
    ]
  },
  {
    state: 'ID',
    stateName: 'Idaho',
    cities: [
      { name: 'Boise', href: '/locations/idaho/boise' },
      { name: 'Meridian', href: '/locations/idaho/meridian' },
      { name: 'Nampa', href: '/locations/idaho/nampa' }
    ]
  },
  {
    state: 'IL',
    stateName: 'Illinois',
    cities: [
      { name: 'Chicago', href: '/locations/illinois/chicago' },
      { name: 'Aurora', href: '/locations/illinois/aurora' },
      { name: 'Rockford', href: '/locations/illinois/rockford' },
      { name: 'Joliet', href: '/locations/illinois/joliet' },
      { name: 'Springfield', href: '/locations/illinois/springfield' }
    ]
  },
  {
    state: 'IN',
    stateName: 'Indiana',
    cities: [
      { name: 'Indianapolis', href: '/locations/indiana/indianapolis' },
      { name: 'Fort Wayne', href: '/locations/indiana/fort-wayne' },
      { name: 'Evansville', href: '/locations/indiana/evansville' }
    ]
  },
  {
    state: 'KS',
    stateName: 'Kansas',
    cities: [
      { name: 'Wichita', href: '/locations/kansas/wichita' },
      { name: 'Overland Park', href: '/locations/kansas/overland-park' },
      { name: 'Kansas City', href: '/locations/kansas/kansas-city' }
    ]
  },
  {
    state: 'KY',
    stateName: 'Kentucky',
    cities: [
      { name: 'Louisville', href: '/locations/kentucky/louisville' },
      { name: 'Lexington', href: '/locations/kentucky/lexington' },
      { name: 'Bowling Green', href: '/locations/kentucky/bowling-green' }
    ]
  },
  {
    state: 'LA',
    stateName: 'Louisiana',
    cities: [
      { name: 'New Orleans', href: '/locations/louisiana/new-orleans' },
      { name: 'Baton Rouge', href: '/locations/louisiana/baton-rouge' },
      { name: 'Shreveport', href: '/locations/louisiana/shreveport' }
    ]
  },
  {
    state: 'MA',
    stateName: 'Massachusetts',
    cities: [
      { name: 'Boston', href: '/locations/massachusetts/boston' },
      { name: 'Worcester', href: '/locations/massachusetts/worcester' },
      { name: 'Springfield', href: '/locations/massachusetts/springfield' }
    ]
  },
  {
    state: 'MD',
    stateName: 'Maryland',
    cities: [
      { name: 'Baltimore', href: '/locations/maryland/baltimore' },
      { name: 'Frederick', href: '/locations/maryland/frederick' },
      { name: 'Rockville', href: '/locations/maryland/rockville' }
    ]
  },
  {
    state: 'ME',
    stateName: 'Maine',
    cities: [
      { name: 'Portland', href: '/locations/maine/portland' },
      { name: 'Lewiston', href: '/locations/maine/lewiston' },
      { name: 'Bangor', href: '/locations/maine/bangor' }
    ]
  },
  {
    state: 'MI',
    stateName: 'Michigan',
    cities: [
      { name: 'Detroit', href: '/locations/michigan/detroit' },
      { name: 'Grand Rapids', href: '/locations/michigan/grand-rapids' },
      { name: 'Warren', href: '/locations/michigan/warren' },
      { name: 'Sterling Heights', href: '/locations/michigan/sterling-heights' }
    ]
  },
  {
    state: 'MN',
    stateName: 'Minnesota',
    cities: [
      { name: 'Minneapolis', href: '/locations/minnesota/minneapolis' },
      { name: 'Saint Paul', href: '/locations/minnesota/saint-paul' },
      { name: 'Rochester', href: '/locations/minnesota/rochester' }
    ]
  },
  {
    state: 'MO',
    stateName: 'Missouri',
    cities: [
      { name: 'Kansas City', href: '/locations/missouri/kansas-city' },
      { name: 'Saint Louis', href: '/locations/missouri/saint-louis' },
      { name: 'Springfield', href: '/locations/missouri/springfield' }
    ]
  },
  {
    state: 'MS',
    stateName: 'Mississippi',
    cities: [
      { name: 'Jackson', href: '/locations/mississippi/jackson' },
      { name: 'Gulfport', href: '/locations/mississippi/gulfport' },
      { name: 'Southaven', href: '/locations/mississippi/southaven' }
    ]
  },
  {
    state: 'MT',
    stateName: 'Montana',
    cities: [
      { name: 'Billings', href: '/locations/montana/billings' },
      { name: 'Missoula', href: '/locations/montana/missoula' },
      { name: 'Great Falls', href: '/locations/montana/great-falls' }
    ]
  },
  {
    state: 'NC',
    stateName: 'North Carolina',
    cities: [
      { name: 'Charlotte', href: '/locations/north-carolina/charlotte' },
      { name: 'Raleigh', href: '/locations/north-carolina/raleigh' },
      { name: 'Greensboro', href: '/locations/north-carolina/greensboro' },
      { name: 'Durham', href: '/locations/north-carolina/durham' }
    ]
  },
  {
    state: 'ND',
    stateName: 'North Dakota',
    cities: [
      { name: 'Fargo', href: '/locations/north-dakota/fargo' },
      { name: 'Bismarck', href: '/locations/north-dakota/bismarck' },
      { name: 'Grand Forks', href: '/locations/north-dakota/grand-forks' }
    ]
  },
  {
    state: 'NE',
    stateName: 'Nebraska',
    cities: [
      { name: 'Omaha', href: '/locations/nebraska/omaha' },
      { name: 'Lincoln', href: '/locations/nebraska/lincoln' },
      { name: 'Bellevue', href: '/locations/nebraska/bellevue' }
    ]
  },
  {
    state: 'NH',
    stateName: 'New Hampshire',
    cities: [
      { name: 'Manchester', href: '/locations/new-hampshire/manchester' },
      { name: 'Nashua', href: '/locations/new-hampshire/nashua' },
      { name: 'Concord', href: '/locations/new-hampshire/concord' }
    ]
  },
  {
    state: 'NJ',
    stateName: 'New Jersey',
    cities: [
      { name: 'Newark', href: '/locations/new-jersey/newark' },
      { name: 'Jersey City', href: '/locations/new-jersey/jersey-city' },
      { name: 'Paterson', href: '/locations/new-jersey/paterson' }
    ]
  },
  {
    state: 'NM',
    stateName: 'New Mexico',
    cities: [
      { name: 'Albuquerque', href: '/locations/new-mexico/albuquerque' },
      { name: 'Las Cruces', href: '/locations/new-mexico/las-cruces' },
      { name: 'Rio Rancho', href: '/locations/new-mexico/rio-rancho' }
    ]
  },
  {
    state: 'NV',
    stateName: 'Nevada',
    cities: [
      { name: 'Las Vegas', href: '/locations/nevada/las-vegas' },
      { name: 'Henderson', href: '/locations/nevada/henderson' },
      { name: 'Reno', href: '/locations/nevada/reno' }
    ]
  },
  {
    state: 'NY',
    stateName: 'New York',
    cities: [
      { name: 'New York City', href: '/locations/new-york/new-york-city' },
      { name: 'Brooklyn', href: '/locations/new-york/brooklyn' },
      { name: 'Queens', href: '/locations/new-york/queens' },
      { name: 'Buffalo', href: '/locations/new-york/buffalo' },
      { name: 'Rochester', href: '/locations/new-york/rochester' },
      { name: 'Syracuse', href: '/locations/new-york/syracuse' }
    ]
  },
  {
    state: 'OH',
    stateName: 'Ohio',
    cities: [
      { name: 'Columbus', href: '/locations/ohio/columbus' },
      { name: 'Cleveland', href: '/locations/ohio/cleveland' },
      { name: 'Cincinnati', href: '/locations/ohio/cincinnati' },
      { name: 'Toledo', href: '/locations/ohio/toledo' }
    ]
  },
  {
    state: 'OK',
    stateName: 'Oklahoma',
    cities: [
      { name: 'Oklahoma City', href: '/locations/oklahoma/oklahoma-city' },
      { name: 'Tulsa', href: '/locations/oklahoma/tulsa' },
      { name: 'Norman', href: '/locations/oklahoma/norman' }
    ]
  },
  {
    state: 'OR',
    stateName: 'Oregon',
    cities: [
      { name: 'Portland', href: '/locations/oregon/portland' },
      { name: 'Salem', href: '/locations/oregon/salem' },
      { name: 'Eugene', href: '/locations/oregon/eugene' }
    ]
  },
  {
    state: 'PA',
    stateName: 'Pennsylvania',
    cities: [
      { name: 'Philadelphia', href: '/locations/pennsylvania/philadelphia' },
      { name: 'Pittsburgh', href: '/locations/pennsylvania/pittsburgh' },
      { name: 'Allentown', href: '/locations/pennsylvania/allentown' },
      { name: 'Erie', href: '/locations/pennsylvania/erie' }
    ]
  },
  {
    state: 'RI',
    stateName: 'Rhode Island',
    cities: [
      { name: 'Providence', href: '/locations/rhode-island/providence' },
      { name: 'Warwick', href: '/locations/rhode-island/warwick' },
      { name: 'Cranston', href: '/locations/rhode-island/cranston' }
    ]
  },
  {
    state: 'SC',
    stateName: 'South Carolina',
    cities: [
      { name: 'Columbia', href: '/locations/south-carolina/columbia' },
      { name: 'Charleston', href: '/locations/south-carolina/charleston' },
      { name: 'North Charleston', href: '/locations/south-carolina/north-charleston' }
    ]
  },
  {
    state: 'SD',
    stateName: 'South Dakota',
    cities: [
      { name: 'Sioux Falls', href: '/locations/south-dakota/sioux-falls' },
      { name: 'Rapid City', href: '/locations/south-dakota/rapid-city' },
      { name: 'Aberdeen', href: '/locations/south-dakota/aberdeen' }
    ]
  },
  {
    state: 'TN',
    stateName: 'Tennessee',
    cities: [
      { name: 'Nashville', href: '/locations/tennessee/nashville' },
      { name: 'Memphis', href: '/locations/tennessee/memphis' },
      { name: 'Knoxville', href: '/locations/tennessee/knoxville' },
      { name: 'Chattanooga', href: '/locations/tennessee/chattanooga' }
    ]
  },
  {
    state: 'TX',
    stateName: 'Texas',
    cities: [
      { name: 'Houston', href: '/locations/texas/houston' },
      { name: 'San Antonio', href: '/locations/texas/san-antonio' },
      { name: 'Dallas', href: '/locations/texas/dallas' },
      { name: 'Austin', href: '/locations/texas/austin' },
      { name: 'Fort Worth', href: '/locations/texas/fort-worth' },
      { name: 'El Paso', href: '/locations/texas/el-paso' }
    ]
  },
  {
    state: 'UT',
    stateName: 'Utah',
    cities: [
      { name: 'Salt Lake City', href: '/locations/utah/salt-lake-city' },
      { name: 'West Valley City', href: '/locations/utah/west-valley-city' },
      { name: 'Provo', href: '/locations/utah/provo' }
    ]
  },
  {
    state: 'VA',
    stateName: 'Virginia',
    cities: [
      { name: 'Virginia Beach', href: '/locations/virginia/virginia-beach' },
      { name: 'Norfolk', href: '/locations/virginia/norfolk' },
      { name: 'Chesapeake', href: '/locations/virginia/chesapeake' },
      { name: 'Richmond', href: '/locations/virginia/richmond' }
    ]
  },
  {
    state: 'VT',
    stateName: 'Vermont',
    cities: [
      { name: 'Burlington', href: '/locations/vermont/burlington' },
      { name: 'Essex', href: '/locations/vermont/essex' },
      { name: 'South Burlington', href: '/locations/vermont/south-burlington' }
    ]
  },
  {
    state: 'WA',
    stateName: 'Washington',
    cities: [
      { name: 'Seattle', href: '/locations/washington/seattle' },
      { name: 'Spokane', href: '/locations/washington/spokane' },
      { name: 'Tacoma', href: '/locations/washington/tacoma' },
      { name: 'Vancouver', href: '/locations/washington/vancouver' }
    ]
  },
  {
    state: 'WI',
    stateName: 'Wisconsin',
    cities: [
      { name: 'Milwaukee', href: '/locations/wisconsin/milwaukee' },
      { name: 'Madison', href: '/locations/wisconsin/madison' },
      { name: 'Green Bay', href: '/locations/wisconsin/green-bay' }
    ]
  },
  {
    state: 'WV',
    stateName: 'West Virginia',
    cities: [
      { name: 'Charleston', href: '/locations/west-virginia/charleston' },
      { name: 'Huntington', href: '/locations/west-virginia/huntington' },
      { name: 'Parkersburg', href: '/locations/west-virginia/parkersburg' }
    ]
  },
  {
    state: 'WY',
    stateName: 'Wyoming',
    cities: [
      { name: 'Cheyenne', href: '/locations/wyoming/cheyenne' },
      { name: 'Casper', href: '/locations/wyoming/casper' },
      { name: 'Laramie', href: '/locations/wyoming/laramie' }
    ]
  }
]