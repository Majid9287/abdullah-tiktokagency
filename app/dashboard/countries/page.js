"use client"

import { useState } from "react"
import { Plus, Edit, Trash, Check, X } from "lucide-react"

export default function CountriesPage() {
  const [countries, setCountries] = useState({
    asia: ["India", "Indonesia", "Japan", "Malaysia", "Philippines", "Singapore", "South Korea", "Thailand", "Vietnam"],
    europe: ["France", "Germany", "Italy", "Netherlands", "Poland", "Spain", "Sweden", "United Kingdom"],
    americas: ["Argentina", "Brazil", "Canada", "Chile", "Colombia", "Mexico", "United States"],
    africa: ["Egypt", "Kenya", "Morocco", "Nigeria", "Saudi Arabia", "South Africa", "UAE"],
    oceania: ["Australia", "New Zealand"],
  })

  const [activeRegion, setActiveRegion] = useState("asia")
  const [newCountry, setNewCountry] = useState("")
  const [editingCountry, setEditingCountry] = useState(null)
  const [editValue, setEditValue] = useState("")

  const regions = {
    asia: "Asia",
    europe: "Europe",
    americas: "Americas",
    africa: "Africa & Middle East",
    oceania: "Oceania",
  }

  const handleAddCountry = () => {
    if (newCountry.trim() === "") return

    setCountries({
      ...countries,
      [activeRegion]: [...countries[activeRegion], newCountry],
    })

    setNewCountry("")
  }

  const handleDeleteCountry = (index) => {
    const updatedCountries = [...countries[activeRegion]]
    updatedCountries.splice(index, 1)

    setCountries({
      ...countries,
      [activeRegion]: updatedCountries,
    })
  }

  const startEditing = (country, index) => {
    setEditingCountry(index)
    setEditValue(country)
  }

  const saveEdit = (index) => {
    if (editValue.trim() === "") return

    const updatedCountries = [...countries[activeRegion]]
    updatedCountries[index] = editValue

    setCountries({
      ...countries,
      [activeRegion]: updatedCountries,
    })

    setEditingCountry(null)
    setEditValue("")
  }

  const cancelEdit = () => {
    setEditingCountry(null)
    setEditValue("")
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Supported Countries</h1>
      </div>

      {/* Region Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        {Object.entries(regions).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveRegion(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeRegion === key ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Add Country Form */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCountry}
            onChange={(e) => setNewCountry(e.target.value)}
            placeholder={`Add a country to ${regions[activeRegion]}...`}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <button onClick={handleAddCountry} className="btn-primary">
            <Plus className="h-4 w-4 mr-1" />
            Add Country
          </button>
        </div>
      </div>

      {/* Countries List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {countries[activeRegion].map((country, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingCountry === index ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      autoFocus
                    />
                  ) : (
                    <div className="text-sm font-medium text-gray-900">{country}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{regions[activeRegion]}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingCountry === index ? (
                    <>
                      <button onClick={() => saveEdit(index)} className="text-green-600 hover:text-green-900 mr-3">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={cancelEdit} className="text-red-600 hover:text-red-900">
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(country, index)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDeleteCountry(index)} className="text-red-600 hover:text-red-900">
                        <Trash className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

