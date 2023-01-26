const writeFileToBucket = require("./logging");

const router = require("express").Router();

router.get("/", async (req,res,next)=> {
    const storage = new Storage();
        try {
          const results = await storage.getBuckets();
      
          const [buckets] = results;
      
          console.log('Buckets:');
          buckets.forEach(bucket => {
            console.log(bucket.name);
            res.json(results)
          });
        } catch (err) {
          console.error('ERROR:', err);
        }
   
    // writeFileToBucket(req)
})

module.exports = router;