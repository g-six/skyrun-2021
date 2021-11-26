
import {
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab
} from '@progress/kendo-react-layout'
import { useAppContext } from 'context/AppContext'
import { useAuth } from "context/AuthContext"
import getConfig from 'next/config'
import { useEffect, useState } from 'react'
import { useFetch } from 'utils/fetch-helper'
import { FetchMethods } from 'utils/types'
import Dashboard from ".."
import Invoices from './invoices'
import PaymentMethod from './payment-method'
import Subscriptions from './subscriptions'

const { LANDING_TRANSLATION_ID } = getConfig().publicRuntimeConfig


function DashboardProfile() {
  const { user } = useAuth()
  const { lang, translations: common_translations } = useAppContext()

  const { data: translation, is_loading } = useFetch(
    `/v1/contents?url=${encodeURI(
      `https://cms.aot.plus/jsonapi/node/page_translation/${LANDING_TRANSLATION_ID}`
    )}`,
    FetchMethods.GET,
    true,
    true
  )

  const [translations, setTranslations] = useState<
    Record<string, string>
  >({})
  const [selected, setSelected] = useState<number>(0)

  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected)
  }

  useEffect(() => {
    if (lang && translation.data?.attributes[lang]) {
      const translations_to_add: Record<string, string> = {}
      translation.data.attributes[lang].forEach(
        ({ key, value }: any) => {
          translations_to_add[key] = value
        }
      )

      setTranslations({
        ...translations,
        ...translations_to_add,
        ...common_translations,
      })
    }
  }, [translation, lang, common_translations])

  return (
    <Dashboard>
      <div className="flex flex-col mt-4">
        <TabStrip
          selected={selected}
          onSelect={handleSelect}
          className="z-20"
          animation={false}
        >
          <TabStripTab title="Subscription">
            <div className="p-10">
              <Subscriptions {...translations} />
            </div>
          </TabStripTab>
          <TabStripTab title="Payment Methods">
            <div className="p-10">
              <PaymentMethod {...translations} />
            </div>
          </TabStripTab>
          <TabStripTab title="Invoices">
            <div className="p-10">
              <Invoices {...translations} />
            </div>
          </TabStripTab>

        </TabStrip>
      </div>
    </Dashboard>
  )
}

export default DashboardProfile
