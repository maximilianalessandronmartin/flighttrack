const {port, mbFile, airportsFile} = require('./config/dotenv-config');
const express = require('express');
const apicache = require('apicache');
const server = express();

const cors = require('cors')
const routes = express.Router()
MBTiles = require('@mapbox/mbtiles');
const path = require('path');
const mbtilesLocation = path.resolve(__dirname, mbFile);
let cache = apicache.middleware;

let parsedJSON = require(airportsFile);

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN
}
server.use(cors(corsOptions))
//here we cached all routes
server.use(cache('60 minutes'));
//this will parse json bodies from requests
server.use(express.json())
server.use(routes)
server.use(require('body-parser').urlencoded({extended: false}));

new MBTiles(mbtilesLocation, function(err, mbtiles) {
    if (err) throw err;
    routes.get('/api/:z/:x/:y.*', function(req, res) {

        let extension = "png";
        switch (extension) {
            case "png": {
                mbtiles.getTile(req.params.z, req.params.x, req.params.y, function(err, tile, headers) {
                    if (err) {
                        res.status(404).send('Tile rendering error: ' + err + '\n');
                    } else {
                        res.header("Content-Type", "image/png")
                        res.send(tile);
                    }
                });
                break;
            }
            case "grid.json": {
                mbtiles.getGrid(req.params.z, req.params.x, req.params.y, function(err, grid, headers) {
                    if (err) {
                        res.status(404).send('Grid rendering error: ' + err + '\n');
                    } else {
                        res.header("Content-Type", "text/json")
                        res.send(grid);
                    }
                });
                break;
            }
        }
    });

});

routes.get('/api/airports', [],
    async (req, res) => {
        let airports = [];
        const filtered = Object.keys(parsedJSON)
            .filter(key => key.startsWith("ED"))
            .reduce((obj, key) => {
                obj[key] = parsedJSON[key];
                airports.push(parsedJSON[key]);
                return obj;
            }, {});



        res.status(200).json(airports);
    });


server.listen(port, () => console.log(`Server listening on port: ${port}`));