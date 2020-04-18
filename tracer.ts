import tracer from 'dd-trace';
tracer.init({ analytics: true, logInjection: true, runtimeMetrics: true });
export default tracer;