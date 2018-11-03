source .env

api_root="https://prodapi.decisiondeskhq.com/api/v2"
races_endpoint="/races?race_date=2018-11-06&limit=100&name=general"
results_endpoint="/races/results?race_date=2018-11-06&limit=100&name=general"

for i in 1 2 3 4 5 6
do
    curl -H "Authorization: Bearer $DDHQ_TOKEN" "$api_root$races_endpoint&page=$i" > files/base/races/base_races.page$i.json
    curl -H "Authorization: Bearer $DDHQ_TOKEN" "$api_root$results_endpoint&page=$i" > files/base/results/base_results.page$i.json
done


