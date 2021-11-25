import Translation from 'components/Translation'

function Subscriptions(translations: Record<string, string>) {
  return (
    <div className="grid lg:grid-cols-3 gap-6 xl:gap-8 xl:max-w-7xl mx-auto mt-12">
      <div className="bg-white rounded-2xl shadow-2xl w-full py-10 px-8">
        <figure className="w-60 text-center m-auto mt-2 text-primary-light">
          <span className="rounded-lg p-0.5 pt-1 w-8 inline-block border-2 border-primary-light">
            <i className="feather feather-user" />
          </span>
          <Translation
            className="ml-2 circular text-lg"
            content_key="pricing_tier_0_name"
            render_as="span"
            translations={translations}
          />
        </figure>
        <Translation
          className="block text-center mt-8"
          content_key="pricing_tier_0_subtitle"
          render_as="div"
          translations={translations}
        />
        <Translation
          className="text-6xl block text-center text-primary circular-light mt-5"
          content_key="pricing_tier_0_price_usd"
          render_as="div"
          translations={translations}
        />
        <Translation
          className="text-sm block text-center text-gray-400 circular-light"
          content_key="pricing_tier_0_subtitle_monthly"
          render_as="div"
          translations={translations}
        />
      </div>
      <div className="bg-white rounded-2xl shadow-2xl w-full py-10 px-8">
        <figure className="w-60 text-center m-auto mt-2 text-primary flex items-center justify-center">
          <i className="text-2xl feather feather-users flex items-center justify-center" />
          <Translation
            className="ml-2 circular text-lg flex items-center justify-center"
            content_key="pricing_tier_1_name"
            render_as="span"
            translations={translations}
          />
        </figure>
        <Translation
          className="block text-center mt-8"
          content_key="pricing_tier_1_subtitle"
          render_as="div"
          translations={translations}
        />
        <div className="text-6xl block text-center text-primary-dark circular-light mt-5">
          <Translation
            content_key="pricing_tier_1_price_usd"
            translations={translations}
          />
        </div>
        <Translation
          className="block text-center text-gray-400 circular-light"
          content_key="pricing_subtitle_monthly"
          render_as="div"
          translations={translations}
        />
      </div>
      <div className="bg-white rounded-2xl shadow-2xl w-full py-10 px-8">
        <figure className="w-60 text-center m-auto mt-2 text-secondary flex items-center justify-center">
          <i className="text-2xl feather feather-map-pin flex items-center justify-center" />
          <Translation
            className="ml-2 circular text-lg flex items-center justify-center"
            content_key="pricing_tier_2_name"
            render_as="span"
            translations={translations}
          />
        </figure>
        <Translation
          className="block text-center mt-8"
          content_key="pricing_tier_2_subtitle"
          render_as="div"
          translations={translations}
        />
        <div className="text-6xl block text-center text-primary-dark circular-light mt-5">
          <Translation
            content_key="pricing_tier_2_price_usd"
            translations={translations}
          />
        </div>
        <Translation
          className="block text-center text-gray-400 circular-light"
          content_key="pricing_subtitle_monthly"
          render_as="div"
          translations={translations}
        />
      </div>
    </div>
  )
}

export default Subscriptions
