//@ts-check
import expressLoader from './express.js';
import diLoader from './dependency-injector.js';
import logger from './logger.js';

const loader = async ({ app }) => {


  await diLoader();
  logger.info('Dependency injector loaded!');

  
  logger.info('Event handlers registerd!');
  
  expressLoader({ app });
  

  logger.info('✌️ Express loaded');


  return {
    app,

  }
}


export default loader;