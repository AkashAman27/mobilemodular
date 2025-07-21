import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Clear existing data first
    await supabaseAdmin.from('state_locations').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    // Data that matches the existing states-data.ts structure exactly
    const stateLocationsData = [
      {
        state_id: 'alabama',
        name: 'Alabama',
        abbreviation: 'AL',
        locations: 6,
        phone: '(205) 555-0791',
        primary_city: 'Birmingham',
        coverage: 'Statewide',
        description: 'Serving Alabama with mobile modular buildings for education, construction, healthcare, and emergency response across all major cities and rural areas.',
        major_cities: ['Birmingham', 'Mobile', 'Huntsville', 'Montgomery', 'Tuscaloosa'],
        service_areas: ['Central Alabama', 'North Alabama', 'South Alabama', 'Mobile Bay Area', 'Tennessee Valley']
      },
      {
        state_id: 'alaska',
        name: 'Alaska',
        abbreviation: 'AK',
        locations: 2,
        phone: '(907) 555-0891',
        primary_city: 'Anchorage',
        coverage: 'Statewide',
        description: 'Providing specialized modular buildings designed for Alaska\'s extreme weather conditions and remote locations across the state.',
        major_cities: ['Anchorage', 'Fairbanks', 'Juneau', 'Wasilla', 'Kenai'],
        service_areas: ['South Central Alaska', 'Interior Alaska', 'Southeast Alaska', 'Western Alaska', 'North Slope']
      },
      {
        state_id: 'arizona',
        name: 'Arizona',
        abbreviation: 'AZ',
        locations: 10,
        phone: '(602) 555-0246',
        primary_city: 'Phoenix',
        coverage: 'Statewide',
        description: 'Delivering climate-controlled modular buildings across Arizona\'s desert regions, urban centers, and mountain communities.',
        major_cities: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale'],
        service_areas: ['Phoenix Metro', 'Southern Arizona', 'Northern Arizona', 'Flagstaff Region', 'Yuma County']
      },
      {
        state_id: 'arkansas',
        name: 'Arkansas',
        abbreviation: 'AR',
        locations: 4,
        phone: '(501) 555-0568',
        primary_city: 'Little Rock',
        coverage: 'Statewide',
        description: 'Serving Arkansas communities with portable classrooms, office buildings, and emergency response facilities throughout the Natural State.',
        major_cities: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro'],
        service_areas: ['Central Arkansas', 'Northwest Arkansas', 'Northeast Arkansas', 'Southwest Arkansas', 'Southeast Arkansas']
      },
      {
        state_id: 'california',
        name: 'California',
        abbreviation: 'CA',
        locations: 35,
        phone: '(323) 555-0123',
        primary_city: 'Los Angeles',
        coverage: 'Statewide',
        description: 'California\'s largest provider of modular buildings, serving from San Diego to San Francisco with comprehensive solutions for all industries.',
        major_cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'San Jose'],
        service_areas: ['Southern California', 'Bay Area', 'Central Valley', 'Northern California', 'Inland Empire']
      },
      {
        state_id: 'colorado',
        name: 'Colorado',
        abbreviation: 'CO',
        locations: 7,
        phone: '(303) 555-0357',
        primary_city: 'Denver',
        coverage: 'Statewide',
        description: 'Providing high-altitude tested modular buildings across Colorado\'s diverse terrain, from the Rocky Mountains to the eastern plains.',
        major_cities: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood'],
        service_areas: ['Front Range', 'Western Slope', 'San Luis Valley', 'Eastern Plains', 'Mountain Communities']
      },
      {
        state_id: 'connecticut',
        name: 'Connecticut',
        abbreviation: 'CT',
        locations: 4,
        phone: '(203) 555-0568',
        primary_city: 'Hartford',
        coverage: 'Statewide',
        description: 'Serving Connecticut with premium modular buildings for education, healthcare, and business needs across the Constitution State.',
        major_cities: ['Hartford', 'Bridgeport', 'New Haven', 'Stamford', 'Waterbury'],
        service_areas: ['Greater Hartford', 'Fairfield County', 'New Haven County', 'Litchfield County', 'Eastern Connecticut']
      },
      {
        state_id: 'delaware',
        name: 'Delaware',
        abbreviation: 'DE',
        locations: 2,
        phone: '(302) 555-0124',
        primary_city: 'Wilmington',
        coverage: 'Statewide',
        description: 'Providing modular building solutions throughout the First State, with quick delivery to all three counties.',
        major_cities: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna'],
        service_areas: ['New Castle County', 'Kent County', 'Sussex County', 'Delaware Beaches', 'Dover Metro']
      },
      {
        state_id: 'florida',
        name: 'Florida',
        abbreviation: 'FL',
        locations: 22,
        phone: '(305) 555-0789',
        primary_city: 'Miami',
        coverage: 'Statewide',
        description: 'Florida\'s premier modular building provider, serving from the Panhandle to the Keys with hurricane-rated buildings and rapid deployment.',
        major_cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale'],
        service_areas: ['South Florida', 'Central Florida', 'North Florida', 'Tampa Bay', 'Panhandle']
      },
      {
        state_id: 'georgia',
        name: 'Georgia',
        abbreviation: 'GA',
        locations: 12,
        phone: '(404) 555-0987',
        primary_city: 'Atlanta',
        coverage: 'Statewide',
        description: 'Serving the Peach State with comprehensive modular solutions from the mountains to the coast, including the greater Atlanta metropolitan area.',
        major_cities: ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens'],
        service_areas: ['Metro Atlanta', 'North Georgia', 'South Georgia', 'Coastal Georgia', 'Central Georgia']
      },
      {
        state_id: 'hawaii',
        name: 'Hawaii',
        abbreviation: 'HI',
        locations: 2,
        phone: '(808) 555-0902',
        primary_city: 'Honolulu',
        coverage: 'Statewide',
        description: 'Providing specialized island-delivery modular buildings across Hawaii, with salt-air resistant materials and inter-island shipping capabilities.',
        major_cities: ['Honolulu', 'Hilo', 'Kailua-Kona', 'Kaneohe', 'Waipahu'],
        service_areas: ['Oahu', 'Hawaii (Big Island)', 'Maui', 'Kauai', 'Molokai']
      },
      {
        state_id: 'idaho',
        name: 'Idaho',
        abbreviation: 'ID',
        locations: 3,
        phone: '(208) 555-0679',
        primary_city: 'Boise',
        coverage: 'Statewide',
        description: 'Serving Idaho with rugged modular buildings designed for mountain conditions, rural areas, and growing urban centers.',
        major_cities: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Pocatello'],
        service_areas: ['Treasure Valley', 'Eastern Idaho', 'North Idaho', 'Central Idaho', 'Magic Valley']
      },
      {
        state_id: 'illinois',
        name: 'Illinois',
        abbreviation: 'IL',
        locations: 15,
        phone: '(312) 555-0654',
        primary_city: 'Chicago',
        coverage: 'Statewide',
        description: 'Illinois\' leading modular building provider, serving Chicagoland and communities throughout the Prairie State with comprehensive solutions.',
        major_cities: ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville'],
        service_areas: ['Chicagoland', 'Northern Illinois', 'Central Illinois', 'Southern Illinois', 'Quad Cities']
      },
      {
        state_id: 'indiana',
        name: 'Indiana',
        abbreviation: 'IN',
        locations: 8,
        phone: '(317) 555-0802',
        primary_city: 'Indianapolis',
        coverage: 'Statewide',
        description: 'Providing modular buildings across the Hoosier State, from Indianapolis metro to rural communities, with focus on education and industrial applications.',
        major_cities: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel'],
        service_areas: ['Central Indiana', 'Northern Indiana', 'Southern Indiana', 'Northwest Indiana', 'Eastern Indiana']
      },
      {
        state_id: 'iowa',
        name: 'Iowa',
        abbreviation: 'IA',
        locations: 5,
        phone: '(515) 555-0780',
        primary_city: 'Des Moines',
        coverage: 'Statewide',
        description: 'Serving Iowa communities with reliable modular buildings for agriculture, education, and business needs across the Hawkeye State.',
        major_cities: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'],
        service_areas: ['Central Iowa', 'Eastern Iowa', 'Western Iowa', 'Northern Iowa', 'Southern Iowa']
      },
      {
        state_id: 'kansas',
        name: 'Kansas',
        abbreviation: 'KS',
        locations: 4,
        phone: '(316) 555-0679',
        primary_city: 'Wichita',
        coverage: 'Statewide',
        description: 'Delivering modular solutions across Kansas, built to withstand prairie weather and serve agricultural, industrial, and educational needs.',
        major_cities: ['Wichita', 'Overland Park', 'Kansas City', 'Topeka', 'Olathe'],
        service_areas: ['Kansas City Metro', 'South Central Kansas', 'Eastern Kansas', 'Western Kansas', 'North Central Kansas']
      },
      {
        state_id: 'kentucky',
        name: 'Kentucky',
        abbreviation: 'KY',
        locations: 6,
        phone: '(502) 555-0346',
        primary_city: 'Louisville',
        coverage: 'Statewide',
        description: 'Serving the Bluegrass State with modular buildings for coal industry, education, and healthcare from the Appalachians to the Mississippi.',
        major_cities: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington'],
        service_areas: ['Louisville Metro', 'Lexington Region', 'Eastern Kentucky', 'Western Kentucky', 'Northern Kentucky']
      },
      {
        state_id: 'louisiana',
        name: 'Louisiana',
        abbreviation: 'LA',
        locations: 5,
        phone: '(504) 555-0235',
        primary_city: 'New Orleans',
        coverage: 'Statewide',
        description: 'Providing hurricane-resistant modular buildings across Louisiana, specializing in oil & gas, education, and emergency response facilities.',
        major_cities: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles'],
        service_areas: ['Greater New Orleans', 'Baton Rouge Region', 'Acadiana', 'North Louisiana', 'Southwest Louisiana']
      },
      {
        state_id: 'maine',
        name: 'Maine',
        abbreviation: 'ME',
        locations: 3,
        phone: '(207) 555-0780',
        primary_city: 'Portland',
        coverage: 'Statewide',
        description: 'Serving Maine with cold-weather modular buildings designed for harsh winters, from coastal communities to inland forests.',
        major_cities: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn'],
        service_areas: ['Southern Maine', 'Central Maine', 'Down East', 'Western Mountains', 'Aroostook County']
      },
      {
        state_id: 'maryland',
        name: 'Maryland',
        abbreviation: 'MD',
        locations: 6,
        phone: '(410) 555-0346',
        primary_city: 'Baltimore',
        coverage: 'Statewide',
        description: 'Providing modular solutions throughout Maryland, from Baltimore and DC metro areas to the Eastern Shore and Western mountains.',
        major_cities: ['Baltimore', 'Columbia', 'Germantown', 'Silver Spring', 'Waldorf'],
        service_areas: ['Baltimore Metro', 'DC Metro Maryland', 'Eastern Shore', 'Western Maryland', 'Southern Maryland']
      },
      {
        state_id: 'massachusetts',
        name: 'Massachusetts',
        abbreviation: 'MA',
        locations: 7,
        phone: '(617) 555-0457',
        primary_city: 'Boston',
        coverage: 'Statewide',
        description: 'Serving the Bay State with premium modular buildings for education, healthcare, and business across metro Boston and beyond.',
        major_cities: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell'],
        service_areas: ['Greater Boston', 'Central Massachusetts', 'Western Massachusetts', 'Cape Cod', 'North Shore']
      },
      {
        state_id: 'michigan',
        name: 'Michigan',
        abbreviation: 'MI',
        locations: 14,
        phone: '(313) 555-0579',
        primary_city: 'Detroit',
        coverage: 'Statewide',
        description: 'Michigan\'s trusted modular building provider, serving both peninsulas with solutions for automotive, education, and industrial applications.',
        major_cities: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Lansing'],
        service_areas: ['Southeast Michigan', 'Grand Rapids Region', 'Upper Peninsula', 'Northern Michigan', 'Thumb Region']
      },
      {
        state_id: 'minnesota',
        name: 'Minnesota',
        abbreviation: 'MN',
        locations: 8,
        phone: '(612) 555-0891',
        primary_city: 'Minneapolis',
        coverage: 'Statewide',
        description: 'Providing winter-hardy modular buildings across Minnesota, from the Twin Cities to the Iron Range and agricultural regions.',
        major_cities: ['Minneapolis', 'Saint Paul', 'Rochester', 'Duluth', 'Bloomington'],
        service_areas: ['Twin Cities Metro', 'Southern Minnesota', 'Northern Minnesota', 'Central Minnesota', 'Western Minnesota']
      },
      {
        state_id: 'mississippi',
        name: 'Mississippi',
        abbreviation: 'MS',
        locations: 4,
        phone: '(601) 555-0124',
        primary_city: 'Jackson',
        coverage: 'Statewide',
        description: 'Serving Mississippi with modular buildings designed for hot, humid conditions and hurricane preparedness across the Magnolia State.',
        major_cities: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi'],
        service_areas: ['Central Mississippi', 'Gulf Coast', 'North Mississippi', 'Delta Region', 'Pine Belt']
      },
      {
        state_id: 'missouri',
        name: 'Missouri',
        abbreviation: 'MO',
        locations: 9,
        phone: '(314) 555-0124',
        primary_city: 'St. Louis',
        coverage: 'Statewide',
        description: 'Delivering modular solutions across Missouri, from St. Louis and Kansas City to rural communities throughout the Show-Me State.',
        major_cities: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence'],
        service_areas: ['St. Louis Metro', 'Kansas City Metro', 'Southwest Missouri', 'Central Missouri', 'Southeast Missouri']
      },
      {
        state_id: 'montana',
        name: 'Montana',
        abbreviation: 'MT',
        locations: 3,
        phone: '(406) 555-0457',
        primary_city: 'Billings',
        coverage: 'Statewide',
        description: 'Providing rugged modular buildings across Big Sky Country, designed for extreme weather and remote locations in mining and agriculture.',
        major_cities: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte'],
        service_areas: ['Eastern Montana', 'Western Montana', 'North Central Montana', 'Southwest Montana', 'Hi-Line']
      },
      {
        state_id: 'nebraska',
        name: 'Nebraska',
        abbreviation: 'NE',
        locations: 3,
        phone: '(402) 555-0902',
        primary_city: 'Omaha',
        coverage: 'Statewide',
        description: 'Serving Nebraska with sturdy modular buildings for agriculture, education, and industry from the Missouri River to the Colorado border.',
        major_cities: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'],
        service_areas: ['Eastern Nebraska', 'Lincoln Region', 'Central Nebraska', 'Western Nebraska', 'Panhandle']
      },
      {
        state_id: 'nevada',
        name: 'Nevada',
        abbreviation: 'NV',
        locations: 5,
        phone: '(702) 555-0579',
        primary_city: 'Las Vegas',
        coverage: 'Statewide',
        description: 'Providing desert-tested modular buildings across Nevada, serving mining, gaming, and construction industries in extreme heat conditions.',
        major_cities: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks'],
        service_areas: ['Las Vegas Valley', 'Northern Nevada', 'Rural Nevada', 'Carson City Region', 'Eastern Nevada']
      },
      {
        state_id: 'new-hampshire',
        name: 'New Hampshire',
        abbreviation: 'NH',
        locations: 2,
        phone: '(603) 555-0891',
        primary_city: 'Manchester',
        coverage: 'Statewide',
        description: 'Serving the Live Free or Die State with cold-weather modular buildings for education, business, and seasonal applications.',
        major_cities: ['Manchester', 'Nashua', 'Concord', 'Derry', 'Dover'],
        service_areas: ['Southern New Hampshire', 'Central New Hampshire', 'Seacoast', 'White Mountains', 'Monadnock Region']
      },
      {
        state_id: 'new-jersey',
        name: 'New Jersey',
        abbreviation: 'NJ',
        locations: 8,
        phone: '(201) 555-0679',
        primary_city: 'Newark',
        coverage: 'Statewide',
        description: 'Serving the Garden State with high-quality modular buildings for education, healthcare, and business throughout densely populated areas.',
        major_cities: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Edison'],
        service_areas: ['North Jersey', 'Central Jersey', 'South Jersey', 'Shore Region', 'Pine Barrens']
      },
      {
        state_id: 'new-mexico',
        name: 'New Mexico',
        abbreviation: 'NM',
        locations: 3,
        phone: '(505) 555-0780',
        primary_city: 'Albuquerque',
        coverage: 'Statewide',
        description: 'Delivering modular solutions across the Land of Enchantment, designed for high desert conditions and rural accessibility.',
        major_cities: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell'],
        service_areas: ['Central New Mexico', 'Northern New Mexico', 'Southern New Mexico', 'Eastern Plains', 'Four Corners']
      },
      {
        state_id: 'new-york',
        name: 'New York',
        abbreviation: 'NY',
        locations: 18,
        phone: '(212) 555-0321',
        primary_city: 'New York City',
        coverage: 'Statewide',
        description: 'New York\'s leading modular building provider, serving from NYC to upstate regions with comprehensive urban and rural solutions.',
        major_cities: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse'],
        service_areas: ['New York City', 'Long Island', 'Hudson Valley', 'Capital Region', 'Western New York', 'Central New York', 'North Country']
      },
      {
        state_id: 'north-carolina',
        name: 'North Carolina',
        abbreviation: 'NC',
        locations: 13,
        phone: '(704) 555-0468',
        primary_city: 'Charlotte',
        coverage: 'Statewide',
        description: 'Serving the Tar Heel State with modular buildings from the mountains to the coast, specializing in education, healthcare, and industrial applications.',
        major_cities: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem'],
        service_areas: ['Charlotte Metro', 'Research Triangle', 'Triad', 'Western North Carolina', 'Eastern North Carolina']
      },
      {
        state_id: 'north-dakota',
        name: 'North Dakota',
        abbreviation: 'ND',
        locations: 2,
        phone: '(701) 555-0235',
        primary_city: 'Fargo',
        coverage: 'Statewide',
        description: 'Providing modular buildings across North Dakota, designed for oil industry, agriculture, and extreme cold weather conditions.',
        major_cities: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo'],
        service_areas: ['Eastern North Dakota', 'Central North Dakota', 'Western North Dakota', 'Bakken Region', 'Red River Valley']
      },
      {
        state_id: 'ohio',
        name: 'Ohio',
        abbreviation: 'OH',
        locations: 16,
        phone: '(614) 555-0813',
        primary_city: 'Columbus',
        coverage: 'Statewide',
        description: 'Ohio\'s premier modular building provider, serving major metros and rural communities with solutions for all industries throughout the Buckeye State.',
        major_cities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'],
        service_areas: ['Central Ohio', 'Northeast Ohio', 'Southwest Ohio', 'Northwest Ohio', 'Southeast Ohio']
      },
      {
        state_id: 'oklahoma',
        name: 'Oklahoma',
        abbreviation: 'OK',
        locations: 5,
        phone: '(405) 555-0457',
        primary_city: 'Oklahoma City',
        coverage: 'Statewide',
        description: 'Serving Oklahoma with tornado-resistant modular buildings for oil & gas, education, and agriculture across the Sooner State.',
        major_cities: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Lawton'],
        service_areas: ['Central Oklahoma', 'Northeast Oklahoma', 'Southwest Oklahoma', 'Northwest Oklahoma', 'Southeast Oklahoma']
      },
      {
        state_id: 'oregon',
        name: 'Oregon',
        abbreviation: 'OR',
        locations: 6,
        phone: '(503) 555-0468',
        primary_city: 'Portland',
        coverage: 'Statewide',
        description: 'Providing sustainable modular buildings across Oregon, from the Pacific Coast to the high desert, with eco-friendly construction options.',
        major_cities: ['Portland', 'Eugene', 'Salem', 'Gresham', 'Hillsboro'],
        service_areas: ['Portland Metro', 'Willamette Valley', 'Southern Oregon', 'Central Oregon', 'Eastern Oregon', 'Oregon Coast']
      },
      {
        state_id: 'pennsylvania',
        name: 'Pennsylvania',
        abbreviation: 'PA',
        locations: 17,
        phone: '(215) 555-0357',
        primary_city: 'Philadelphia',
        coverage: 'Statewide',
        description: 'Pennsylvania\'s trusted modular building provider, serving from Philadelphia and Pittsburgh to rural communities across the Keystone State.',
        major_cities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading'],
        service_areas: ['Southeast Pennsylvania', 'Southwest Pennsylvania', 'Northeast Pennsylvania', 'Northwest Pennsylvania', 'Central Pennsylvania']
      },
      {
        state_id: 'rhode-island',
        name: 'Rhode Island',
        abbreviation: 'RI',
        locations: 2,
        phone: '(401) 555-0013',
        primary_city: 'Providence',
        coverage: 'Statewide',
        description: 'Serving the Ocean State with compact, efficient modular buildings designed for dense urban environments and coastal conditions.',
        major_cities: ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence'],
        service_areas: ['Providence Metro', 'Newport County', 'Washington County', 'Kent County', 'Bristol County']
      },
      {
        state_id: 'south-carolina',
        name: 'South Carolina',
        abbreviation: 'SC',
        locations: 5,
        phone: '(803) 555-0013',
        primary_city: 'Columbia',
        coverage: 'Statewide',
        description: 'Serving South Carolina with hurricane-rated modular buildings from the Blue Ridge Mountains to the Atlantic Coast.',
        major_cities: ['Columbia', 'Charleston', 'North Charleston', 'Mount Pleasant', 'Rock Hill'],
        service_areas: ['Midlands', 'Lowcountry', 'Upstate', 'Pee Dee', 'Grand Strand']
      },
      {
        state_id: 'south-dakota',
        name: 'South Dakota',
        abbreviation: 'SD',
        locations: 2,
        phone: '(605) 555-0346',
        primary_city: 'Sioux Falls',
        coverage: 'Statewide',
        description: 'Providing modular buildings across South Dakota, designed for agriculture, tourism, and extreme weather from the Black Hills to the prairie.',
        major_cities: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown'],
        service_areas: ['Eastern South Dakota', 'Black Hills Region', 'Central South Dakota', 'Northern South Dakota', 'Southern South Dakota']
      },
      {
        state_id: 'tennessee',
        name: 'Tennessee',
        abbreviation: 'TN',
        locations: 8,
        phone: '(615) 555-0246',
        primary_city: 'Nashville',
        coverage: 'Statewide',
        description: 'Serving Tennessee with modular buildings from the Smoky Mountains to the Mississippi River, specializing in music industry and education facilities.',
        major_cities: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville'],
        service_areas: ['Middle Tennessee', 'West Tennessee', 'East Tennessee', 'Upper Cumberland', 'Tennessee Valley']
      },
      {
        state_id: 'texas',
        name: 'Texas',
        abbreviation: 'TX',
        locations: 28,
        phone: '(713) 555-0456',
        primary_city: 'Houston',
        coverage: 'Statewide',
        description: 'Texas\' largest modular building provider, serving everything from oil fields to urban centers across the Lone Star State with comprehensive solutions.',
        major_cities: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth'],
        service_areas: ['East Texas', 'West Texas', 'South Texas', 'North Texas', 'Central Texas', 'Panhandle', 'Gulf Coast']
      },
      {
        state_id: 'utah',
        name: 'Utah',
        abbreviation: 'UT',
        locations: 4,
        phone: '(801) 555-0680',
        primary_city: 'Salt Lake City',
        coverage: 'Statewide',
        description: 'Serving Utah with high-altitude tested modular buildings designed for mountain conditions and rapid urban growth along the Wasatch Front.',
        major_cities: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem'],
        service_areas: ['Wasatch Front', 'Southern Utah', 'Eastern Utah', 'Northern Utah', 'Uinta Basin']
      },
      {
        state_id: 'vermont',
        name: 'Vermont',
        abbreviation: 'VT',
        locations: 2,
        phone: '(802) 555-0902',
        primary_city: 'Burlington',
        coverage: 'Statewide',
        description: 'Providing eco-friendly modular buildings across Vermont, designed for harsh winters and sustainable living in the Green Mountain State.',
        major_cities: ['Burlington', 'Essex', 'South Burlington', 'Colchester', 'Rutland'],
        service_areas: ['Northern Vermont', 'Central Vermont', 'Southern Vermont', 'Northeast Kingdom', 'Champlain Valley']
      },
      {
        state_id: 'virginia',
        name: 'Virginia',
        abbreviation: 'VA',
        locations: 9,
        phone: '(804) 555-0135',
        primary_city: 'Richmond',
        coverage: 'Statewide',
        description: 'Serving the Old Dominion with modular buildings from the Shenandoah Valley to the Chesapeake Bay, including major government and military installations.',
        major_cities: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News'],
        service_areas: ['Hampton Roads', 'Richmond Metro', 'Northern Virginia', 'Shenandoah Valley', 'Southwest Virginia']
      },
      {
        state_id: 'washington',
        name: 'Washington',
        abbreviation: 'WA',
        locations: 11,
        phone: '(206) 555-0791',
        primary_city: 'Seattle',
        coverage: 'Statewide',
        description: 'Providing rain-resistant modular buildings across Washington State, from the Pacific Coast to the Columbia River, with eco-friendly options.',
        major_cities: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue'],
        service_areas: ['Puget Sound', 'Eastern Washington', 'Southwest Washington', 'Olympic Peninsula', 'North Cascades']
      },
      {
        state_id: 'west-virginia',
        name: 'West Virginia',
        abbreviation: 'WV',
        locations: 3,
        phone: '(304) 555-0235',
        primary_city: 'Charleston',
        coverage: 'Statewide',
        description: 'Serving West Virginia with rugged modular buildings designed for mountainous terrain and mining industry applications throughout Appalachia.',
        major_cities: ['Charleston', 'Huntington', 'Parkersburg', 'Morgantown', 'Wheeling'],
        service_areas: ['Charleston Region', 'Eastern Panhandle', 'Northern West Virginia', 'Southern West Virginia', 'Western West Virginia']
      },
      {
        state_id: 'wisconsin',
        name: 'Wisconsin',
        abbreviation: 'WI',
        locations: 7,
        phone: '(414) 555-0913',
        primary_city: 'Milwaukee',
        coverage: 'Statewide',
        description: 'Providing cold-weather modular buildings across Wisconsin, from Lake Superior to the Mississippi River, specializing in dairy and manufacturing.',
        major_cities: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'],
        service_areas: ['Southeast Wisconsin', 'South Central Wisconsin', 'Northeast Wisconsin', 'Northwest Wisconsin', 'Western Wisconsin']
      },
      {
        state_id: 'wyoming',
        name: 'Wyoming',
        abbreviation: 'WY',
        locations: 2,
        phone: '(307) 555-0568',
        primary_city: 'Casper',
        coverage: 'Statewide',
        description: 'Serving Wyoming with extreme-weather modular buildings designed for oil, gas, and mining operations across the least populous state.',
        major_cities: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs'],
        service_areas: ['Eastern Wyoming', 'Central Wyoming', 'Western Wyoming', 'Powder River Basin', 'Wind River Region']
      }
    ]

    // Insert the data
    const { data, error } = await supabaseAdmin
      .from('state_locations')
      .insert(stateLocationsData)
      .select()

    if (error) {
      console.error('Error populating state location data:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'All 50 states populated with location data successfully',
      count: data.length
    })
    
  } catch (error) {
    console.error('Error in populate-location-data API:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}