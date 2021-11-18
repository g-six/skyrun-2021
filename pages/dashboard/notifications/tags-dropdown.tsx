import { classNames } from "@progress/kendo-react-common"
import Translation from "components/Translation"
import { useState } from "react"

export const uiTags = [
  { key:'dd_lbl_First_Name', title: 'Client', isLabel: true},
  { key:'dd_item_First_Name', title: 'First Name'},
  { key:'dd_item_Last_Name', title: 'Last Name'},
  { key:'dd_item_Phone', title: 'Phone'},
  { key:'dd_item_Email', title: 'Email'},
  { key:'dd_item_Paymant_Status', title: 'Payment Status'},
  { key:'dd_item_Service', title: 'Service', isLabel: true},
  { key:'dd_item_Service_Name', title: 'Service name'},
  { key:'dd_item_Duration', title: 'Duration'},
  { key:'dd_item_Date', title: 'Date'},
  { key:'dd_item_Time', title: 'Time'},
  { key:'dd_item_Location', title: 'Location'},
  { key:'dd_item_Price', title: 'Price'},
  { key:'dd_item_Instructor', title: 'Instructor'},
  { key:'dd_item_Actions', title: 'Actions', isLabel: true},
  { key:'dd_item_Change/Cancel', title: 'Change/Cancel Appointment'},
  { key:'dd_item_Pay', title: 'Pay for the Service'},
  { key:'dd_item_Export', title: 'Export'},
]

function TagsDropdown(){
  const [search,setSearch] = useState('')
  const [filteredTag, setFilterTag] = useState(uiTags)

  const handleSearchChange = (_search: string) => {
    setSearch(_search)
    setFilterTag( (_search === '') ? uiTags : filteredTag.filter(tag => tag.title.toLocaleLowerCase().includes(_search.toLocaleLowerCase())))
  }
  return (
    <>
      <div className="w-72 h-auto p-4 shadow-lg">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <span className="feather feather-search text-gray-500 text-lg" />
          </div>
          <input
              type="text"
              name="keyword"
              id="keyword"
              className={classNames(
                  'focus:ring-primary-dark focus:border-primary-dark rounded-md',
                  'blockpy-2 pl-12 pr-9',
                  'border-gray-100 text-gray-500 placeholder-gray-300'
              )}
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search tags..."
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
              <button type="reset" className="text-primary-light w-12" onClick={() => handleSearchChange('')}>
                  <i className="feather-x" />
              </button>
          </div>
      </div>
        {
          filteredTag.map(tag => <>
            <Translation
              render_as="div"
              content_key={tag.title}
              className={classNames('py-1',
                tag.isLabel ? 
                'uppercase text-semibold text-xs':
                'text-gray-400 text-sm'

              )}
              translations={{}}
            />
          </>)
        }

      </div>
    </>
  )
  
}

export default  TagsDropdown