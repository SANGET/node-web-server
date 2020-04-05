import redis from "redis";

const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

export const index = async (req: Req, res: Res, next: Next) => {
  client.incr("count", (val) => {
    res.send(val);
    next();
  });
};
