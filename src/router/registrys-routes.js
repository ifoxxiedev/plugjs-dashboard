import registry from 'plugjs-registry';

export default Router => {
  
  Router.get('/', (req, res ,next) => {
    const { service } = req.query;
    const repo = registry.repository.create();

    res.json({
      services: repo.services().filter((s) => service ? s.basePath.includes(`/${service}`) : s)
    })
  });

}