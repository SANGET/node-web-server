export const index = async (req: Req, res: Res, next: Next) => {
  res.send("Awesome");
  next();
};
