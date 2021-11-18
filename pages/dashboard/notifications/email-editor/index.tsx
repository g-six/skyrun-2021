import React, { FunctionComponent } from 'react';
import Dashboard from "pages/dashboard"
import { useRouter } from 'next/router'
// import { Editor } from "react-draft-wysiwyg";
import Translation from 'components/Translation'
import { classNames } from 'utils/dom-helpers'
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import dynamic from 'next/dynamic'

const Editor = dynamic(() => {
  return import("react-draft-wysiwyg").then(mod => mod.Editor)
},{ssr:false})

const defaultLanguages = [
  {
    flag: 'us',
    label: 'EN',
  },
  {
    flag: 'cn',
    label: '中艾',
  }
] 

function EmailEditor(){
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [languages, setLanguages] = useState(defaultLanguages)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const router = useRouter()

  const uiTags = [
    { key:'btn_First_Name', title: 'First Name'},
    { key:'btn_Last_Name', title: 'Last Name'},
    { key:'btn_Phone', title: 'Phone'},
    { key:'btn_Email', title: 'Email'},
    { key:'btn_Service', title: 'Service'},
    { key:'btn_Date', title: 'Date'},
    { key:'btn_Time', title: 'Time'},
    { key:'btn_Duration', title: 'Duration'},
    { key:'btn_Calendar', title: 'Calendar'},
    { key:'btn_Price', title: 'Price'},
    { key:'btn_Instructor', title: 'Instructor'},
    { key:'btn_Change/Cancel', title: 'Change/Cancel'},
    { key:'btn_Pay', title: 'Pay'},
    { key:'btn_Export', title: 'Export'},
  ]


  const onEditorStateChange = (_editorState: any) => {
    setEditorState(_editorState)
  } 

  return (
    <Dashboard>
      <div className="py-2 px-8 text-black">
        <div className="w-full flex">
          <div className="w-auto">
            <div className="inline-flex cursor-pointer" 
              onClick={() => router.back()}>
              <i className="feather-chevron-left" />
              <div className="text-xs px-2 pt-0.5">
                <Translation
                    render_as="span"
                    content_key="btn_go_back"
                    translations={{}}
                />
              </div>
            </div>
            <div className="text-lg font-semibold py-4">
              <Translation
                  render_as="span"
                  content_key="lbl_booking_confirmation"
                  translations={{}}
              />
            </div>
          </div>
          <div className="flex w-full flex-wrap content-center justify-end gap-3 pt-2">
            <button
              className={classNames(
                'items-center text-primary px-8 py-2 h-12',
                'font-thin rounded-lg border border-gray-300',
                'rounded-r-mdk'
              )}>
                <i className="feather-settings mr-3" />
                <Translation
                    render_as="span"
                    content_key="btn_email_settings"
                    translations={{}}
                />
            </button>
            <button
              className={classNames(
                  'items-center text-primary px-8 py-2 h-12',
                  'font-thin rounded-lg border border-gray-300',
                  'rounded-r-mdk'
              )}
            >
              <i className="feather-eye mr-3" />
                <Translation
                    render_as="span"
                    content_key="btn_preview"
                    translations={{}}
                />
            </button>
            <button
              className={classNames(
                  'items-center text-primary px-8 py-2 h-12',
                  'font-thin rounded-lg border border-gray-300',
                  'rounded-r-mdk bg-primary-lighter'
              )}
            >
            <i className="feather-save mr-3" />
                <Translation
                    render_as="span"
                    content_key="btn_save"
                    translations={{}}
                />
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          {
            languages.map(lang => <>
              <button
                className={classNames(
                    'flex flex-wrap content-center justify-center text-primary p-px w-14 rounded-lg',
                    selectedLanguage.flag === lang.flag ? 'bg-primary-lighter' : ''
                )}
                onClick={() => setSelectedLanguage(lang)}
              >
                <i className={classNames(`flag-icon flag-icon-${lang.flag} flag-icon-rounded text-3xl rounded-full h-4 w-4`)} />
                <Translation
                  render_as="div"
                  content_key={lang.label}
                  className="text-sm font-semibold ml-2"
                  translations={{}}
                />
              </button>
            </>)
          }
           <select
                id="addLanguage"
                name="addLanguage"
                className={classNames(
                    'border-transparent rounded',
                    'text-sm font-semibold'
                )}
                defaultValue="default"
            >
                <option value="default" disabled selected className="add-language-placeholder">
                    +&nbsp;&nbsp; ADD LANGUAGE
                </option>
                <option value="PH">PH</option>
                <option value="JP">JP</option>
                <option value="UN">UN</option>
            </select>
        </div>

        <div className="py-5 flex flex-wrap">
          {
            uiTags.map(tag => <>
              <Translation
                  render_as="span"
                  content_key={tag.key}
                  className="text-sm ml-2 mb-2 p-1 bg-gray-50 text-gray-400"
                  translations={{}}
                />
            </>)
          }
        </div>
        <div>
          <Translation
            render_as="span"
            content_key='Insert these tags while typing by pressing "/"'
            className="text-sm text-gray-400 my-3"
            translations={{}}
          />
        </div>
        <div className="w-9/12"> 
          <Translation
            render_as="div"
            content_key="lbl_email_subject"
            className="py-4 font-semibold"
            translations={{}}
          />
          <input
            type="text"
            id="first-name"
            autoComplete="first_name"
            className={classNames(
                'px-6 py-3 mt-1 focus:ring-primary-light focus:border-primary-light block w-full shadow-sm border-gray-300 rounded-md',
            )}
          /> 
          <Translation
            render_as="div"
            content_key="lbl_email_body"
            className="py-4 font-semibold"
            translations={{}}
          />
          <Editor
            editorState={editorState}
            toolbarClassName="editor-toolbar"
            wrapperClassName="editor-wrapper"
            editorClassName="editor-body"
            onEditorStateChange={onEditorStateChange}
          />

        </div>
        
      </div>
    </Dashboard>
  )
}

export default EmailEditor