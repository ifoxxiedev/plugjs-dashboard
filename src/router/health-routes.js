

export default (Router) => {

  Router.get('/', (req, res ,next) => {
    console.log("HERE")
    res.json({ status: 'ONLY' })
  });

}