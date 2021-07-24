import textToSpeech from '@google-cloud/text-to-speech'
import * as protos from '@google-cloud/text-to-speech/build/protos/protos'

import pageRepository from './repositories/pageRepository'

const getAudio = async (id: string) => {
  const client = new textToSpeech.TextToSpeechClient({
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: (process.env.GCP_PRIVATE_KEY ?? '').split('\\n').join('\n'),
    },
    projectId: 'fisio-notion',
  })

  const blocks = await pageRepository.getPage(id, false)
  const text = blocks.join(' ')

  // Construct the request
  const request = {
    // select the type of audio encoding
    audioConfig: { audioEncoding: 'MP3', speakingRate: 0.85 },

    input: { text: text },

    // Select the language and SSML voice gender (optional)
    voice: { languageCode: process.env.TTS_LOCALE, ssmlGender: 'NEUTRAL' },
  } as protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest

  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request)

  return response.audioContent
}

export default getAudio
