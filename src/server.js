import server from 'plugjs-server';
import registry from 'plugjs-registry';

/*
Call Registers
*/
server.register(registry.register.key, registry.register.middleware)
server.register(registry.unregister.key, registry.unregister.middleware)

export * from './api';
export default server.start
