import {serverConfig} from './server';
import mail from './mail';

const config = {...serverConfig, ...mail};

export default config;
