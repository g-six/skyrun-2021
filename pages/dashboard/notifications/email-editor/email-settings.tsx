import { DropDownButton } from "@progress/kendo-react-buttons";
import { RadioGroup } from "@progress/kendo-react-inputs"
import DropdownComponent from "components/DropdownSelectors";
import Translation from "components/Translation"
import { useRef, useState } from "react";
import { classNames } from "utils/dom-helpers"

function EmailSettings(){
  const [accentColor, setAccentColor] = useState('#ff0000')
  const colorSelector = useRef() as React.MutableRefObject<HTMLInputElement>;
  const sendEmailTo = [
    {
      label: "Client only",
      value: "1",
    },
    {
      label: "Clients and Instructors",
      value: "2",
    },
    {
      label: "Clients, instructors, admin",
      value: "3",
    },
  ];

  return (
    <div className="fixed flex justify-end bg-black bg-opacity-25 w-screen h-screen inset-y-0 pt-20 pr-72">
      <div className="bg-white w-1/3 h-full">
        <Translation
            render_as="div"
            content_key="lbl_email_settings"
            className="py-4 font-semibold"
            translations={{}}
          />

        <Translation
          render_as="div"
          content_key="Send Email to"
          className="py-4 font-semibold"
          translations={{}}
        />

        <RadioGroup 
          className="no-color-change"
          data={sendEmailTo}
        />

        <div className="space-y-4">
          <Translation
            render_as="div"
            content_key="Send email reminder"
            className="py-4 font-semibold"
            translations={{}}
          />   
          <select
              id="reminder"
              name="reminder"
              className="w-full bg-transparent border-gray-300 rounded"
              defaultValue="reminder"
          >
              <option disabled>12 hrs before</option>
              <option>12 hrs before</option>
              <option>12 hrs before</option>
          </select>
          
          <select
              id="reminder"
              name="reminder"
              className="w-full bg-transparent border-gray-300 rounded"
              defaultValue="reminder"
          >
              <option disabled>1 hrs before</option>
              <option>1 hrs before</option>
              <option>1 hrs before</option>
          </select>

          <button className="w-full py-2 bg-transparent border border-dashed rounded">
            <i className="feather-plus" />
            Add another Reminder
          </button>
        </div>

        <Translation
          render_as="div"
          content_key="Accent Color"
          className="py-4 font-semibold"
          translations={{}}
        />
        <div className="flex p-2 border rounded">
          <div className="flex">
            <div className="rounded-full h-7 w-7 " style={{background: accentColor}}/>
            <div className="ml-1 flex flex-wrap content-center">{accentColor}</div>
          </div>
          <div className="flex w-full justify-end">
            <input type="color" id="colorSelector" ref={colorSelector} name="colorSelector" value={accentColor} style={{visibility:'hidden'}} onChange={(e) => setAccentColor(e.target.value)} ></input>
            <i className="feather-edit-2  flex flex-wrap content-center" onClick={() => colorSelector.current.click()}/>
          </div>
        </div>

        <div className="h-48 flex content-end gap-3 bg-red-200">
          <button className="w-full h-auto py-2 bg-transparent border rounded">
            Cancel
          </button>
          <button className="w-full h-4 py-2 bg-primary border rounded text-white">
            Save
          </button>
        </div>


      </div>
    </div>
  )
}

export default EmailSettings