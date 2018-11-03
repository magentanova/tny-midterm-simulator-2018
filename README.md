# Simulator

By default, runs on port 5000. Check `settings.js` and `services/ddhq.js` in the other repo to make sure you're pointing to this server with your requests. Don't use ngrok cos you'll hit their rate limit.

## To start
  
  - `npm install`

  - `source .env`

  - `bash populateFiles.sh`: This runs a series of `curl` statements to put files in `./files` that will allow this api to attempt to simulate ddhq's responses. Won't run without the `source` command from above. 

  - `npm run start`


## Simulator Controls

These are all GET routes.

  - `/api/simulator/start`

    - accepts two query parameters: "speed" and "vote_rate". these are just integers that scale up the frequency with which vote counts are updated and the amount by which they're updated. they both default to 1 if omitted. 
    
    - e.g. `GET localhost:5000/api/simulator/start?speed=100&vote_rate=100` for turbo mode. 
  
  - `/api/simulator/pause`
  
  - `/api/simulator/stop`
    
    - same as `pause`, but clears all changes to base data made by the simulator.

  - `/api/simulator/reset`

    - same as `stop`, but subsequently restarts the simulator.