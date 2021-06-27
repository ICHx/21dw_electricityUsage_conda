const { table } = require("console")
const fetch = require("node-fetch")
const toCsv = require('objects-to-csv')
let pobjs = []


num = 23 //23
pobjs.length = num

for (let i = 0; i < num; i++) {
    var date = 20210601 + i
    var url = `https://www.hko.gov.hk/wxinfo/dailywx/yeswx/DYN_DAT_MINDS_RYES${date}.json?get_param=value`
    pobjs[i] = fetch(url)
}

let getData = async function (fetches) {
    let weathers = []
    
    var responses = await Promise.all(fetches)
    var jsons = await Promise.all(responses.map(
        res => {
            return res.json()
        }
    ))

    var idx = 0
    weathers = await Promise.all(jsons.map(
        async j => {
            var a = j["DYN_DAT_MINDS_RYES"]["TsingYiMaxTemp"]["Val_Eng"]
            a= parseFloat(a)
            return {
                Date: 20210601+ (idx++),
                Temp: c
            }
        }))
    console.log(weathers)
    console.table(weathers)
    const csv = new toCsv(weathers)
    await csv.toDisk('./june_avg_weather.csv')

    return
}

getData(pobjs)

// "TsingYiMaxTemp" "TsingYiMinTemp" "Val_Eng"

