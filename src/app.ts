import { createBot, createFlow , MemoryDB , createProvider , addKeyword  }  from '@bot-whatsapp/bot'
import { BaileysProvider , handleCtx } from '@bot-whatsapp/provider-baileys'


const flowBienvenida = addKeyword('hola').addAnswer('Buenas !! bienvenido')

const main = async () => {

    const provider = createProvider(BaileysProvider)
    provider.initHttpServer(3002)

 provider.http?.server.post('/send-message' , handleCtx(async (bot , req , res) => {
    const body = req.body
    const message = body.message
    const mediaUrl = body.mediaUrl

    await bot.sendMessage(process.env.FRIEND_NUMBER! , message, {
        media: mediaUrl
    })
    res.end('mensaje del servidor polka')
 }))


  
    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
    

}

main()


