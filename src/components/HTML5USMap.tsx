'use client'

import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { statesData, type StateData } from '@/data/states-data'

interface HTML5USMapProps {
  onStateSelect?: (state: StateData) => void
}

const HTML5USMap: React.FC<HTML5USMapProps> = ({ onStateSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Function to handle state clicks
    const handleStateClick = (stateAbbr: string) => {
      const state = statesData.find(s => s.abbreviation === stateAbbr)
      if (state) {
        if (onStateSelect) {
          onStateSelect(state)
        }
        router.push(`/locations/${state.id}`)
      }
    }

    // Custom map configuration
    const customMapData = {
      main_settings: {
        width: "responsive",
        background_color: "#FFFFFF",
        background_transparent: "yes",
        popups: "detect",
        
        // State styling to match our design
        state_description: "Click to view locations",
        state_color: "#E5E7EB", // Light gray
        state_hover_color: "#4A90B8", // Steel blue
        state_url: "",
        border_size: 1.5,
        border_color: "#ffffff",
        all_states_inactive: "no",
        all_states_zoomable: "no",
        
        // Hide location markers
        all_locations_hidden: "yes",
        
        // Labels
        label_color: "#1B365D",
        label_hover_color: "#ffffff", 
        label_size: 14,
        label_font: "Inter, sans-serif",
        hide_labels: "no",
       
        // Zoom settings
        manual_zoom: "no",
        back_image: "no",
        arrow_box: "no",
        initial_back: "no",
        initial_zoom: -1,
        
        // Popup settings
        popup_color: "#1B365D",
        popup_opacity: 0.95,
        popup_shadow: 2,
        popup_corners: 8,
        popup_font: "14px Inter, sans-serif",
        popup_nocss: "no",
        
        // Advanced settings
        div: "usmap",
        auto_load: "no", // We'll load it manually
        rotate: "0",
        url_new_tab: "no",
        fade_time: 0.2,
        link_text: "View Locations",
        
        // Enable click handling
        all_states_clickable: "yes",
        location_opacity: 1
      },
      state_specific: {} as Record<string, any>,
      locations: {},
      labels: {}
    }

    // Configure each state
    statesData.forEach(state => {
      customMapData.state_specific[state.abbreviation] = {
        name: state.name,
        description: `<div style="text-align: center; padding: 10px;">
          <strong>${state.name}</strong><br/>
          <span style="font-size: 12px; color: #666;">${state.locations} locations available</span><br/>
          <span style="font-size: 12px;">${state.phone}</span><br/>
          <span style="font-size: 11px; color: #888;">Click to view details</span>
        </div>`,
        color: "#E5E7EB",
        hover_color: "#4A90B8",
        url: `/locations/${state.id}`, // Direct navigation URL
        inactive: "no"
      }
    })

    // Load the map scripts dynamically
    const loadMapScripts = async () => {
      try {
        // Set the custom map data globally
        (window as any).simplemaps_usmap_mapdata = customMapData

        // Load usmap.js
        const script = document.createElement('script')
        script.src = '/usmap.js'
        script.onload = () => {
          // Initialize the map after the script loads
          if ((window as any).simplemaps_usmap && (window as any).simplemaps_usmap.load) {
            (window as any).simplemaps_usmap.load()
            
            // Set up click handler using SimpleMaps API
            setTimeout(() => {
              const mapInstance = (window as any).simplemaps_usmap
              if (mapInstance && mapInstance.hooks) {
                mapInstance.hooks.click_state = function(id: string) {
                  // Silent logging - removed console.log
                  const state = statesData.find(s => s.abbreviation === id)
                  // Silent logging - removed console.log
                  if (state) {
                    if (onStateSelect) {
                      onStateSelect(state)
                    }
                    // Silent logging - removed console.log
                    router.push(`/locations/${state.id}`)
                  }
                }
                
                // Also try the over hook for debugging
                mapInstance.hooks.over_state = function(id: string) {
                  // Silent logging - removed console.log
                }
              }
            }, 100)
          }
        }
        document.head.appendChild(script)
      } catch (error) {
        // Silent error handling - removed console.error
      }
    }

    loadMapScripts()

    // Cleanup
    return () => {
      // Remove any global variables
      delete (window as any).simplemaps_usmap_mapdata
    }
  }, [onStateSelect, router])

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-navy-600 mb-6 text-center">
        Select Your State
      </h3>
      <div className="relative">
        <div 
          id="usmap" 
          ref={mapRef}
          className="w-full"
          style={{ maxHeight: '500px' }}
        />
        <div className="mt-4 text-center text-sm text-gray-600">
          Click on any state to view our locations and get a custom quote
        </div>
      </div>
    </div>
  )
}

export default HTML5USMap