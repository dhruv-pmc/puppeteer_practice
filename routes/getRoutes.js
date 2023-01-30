const express = require('express');
const router = express.Router();
const main = require('../scrapeFn/scrape');

router.post('/books',async(req,res)=>{
    try {
        const {category} = req.body;
        let scrp = await main(category);
        return res.status(200).json({
            status:"OK",
            list: scrp?.list || {}
        }) 
    } catch (error) {
        return res.status(500).json(error.message);
    }
})


module.exports  = router;