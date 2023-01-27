const router = require("express").Router();
const Bots = require("../db/models/Bots")

router.get("/", async(req,res,next)=> {
    try{
        const bots = await Bots.findAll()
        res.json(bots)
    } catch(err){
        next(err)
    }
})

router.get("/:id", async(req,res,next)=> {
    try{
        const bot = await Bots.findByPk(req.params.id)
        res.json(bot)
    } catch(err){
        next(err)
    }
})

router.post("/", async(req,res,next)=> {
    try{
        const bot = await Bots.create(req.body)
        res.json(bot)
    } catch(err){
        next(err)
    }
})

router.put("/:id", async(req,res,next)=> {
    try{
        const bot = await Bots.findByPk(req.params.id)
        res.send(await bot.create(req.body))
    } catch(err){
        next(err)
    }
})

router.delete("/:id", async(req,res,next)=> {
    try{
        const bot = await Bots.findByPk(req.params.id)
        bot.destory()
        res.send(cart)
    } catch(err){
        next(err)
    }
})

module.exports = router;
