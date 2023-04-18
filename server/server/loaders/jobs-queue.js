import Agenda from 'agenda';
import config from '../config/index.js';
import jobs from '../jobs/index.js';
export default () => {
  const jobQueue = new Agenda({
    db: { address: config.jobsqueue.db_uri, collection: 'queue-jobs' },
    processEvery: config.jobsqueue.pooltime,
    maxConcurrency: config.jobsqueue.concurrency,
  });

  jobs.initialize({ jobQueue })
  return jobQueue;
}