export const DB_NAME = "Wait-time-app-DB"
export const ParkURL = "https://queue-times.com/parks/"
// export const ParksURLArray =[
//     "https://queue-times.com/parks/6/queue_times.json", // Magic Kingdom
//     "https://queue-times.com/parks/5/queue_times.json", // EPCOT
//     "https://queue-times.com/parks/7/queue_times.json", // HollyWood Studios
//     "https://queue-times.com/parks/8/queue_times.json"] // Animal Kingdom

export const ParkURLMap = new Map();
ParkURLMap.set("Magic Kingdom","https://queue-times.com/parks/6/queue_times.json");
ParkURLMap.set("EPCOT","https://queue-times.com/parks/5/queue_times.json");
ParkURLMap.set("HollyWood Studios","https://queue-times.com/parks/7/queue_times.json");
ParkURLMap.set("Animal Kingdom","https://queue-times.com/parks/8/queue_times.json");

