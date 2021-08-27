async function fetchLanguage() {
    try {
        const res = await fetch(
            'https://cms-np.aot.plus/jsonapi/node/page_translation/30b5cea6-fbd2-49a3-b83b-8f4e71728888',
            {
                mode: 'cors',
            },
        )
        console.log(res)
    } catch (e) {
        console.error(e)
    }
}

export default fetchLanguage