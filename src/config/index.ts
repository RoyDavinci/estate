import {serverConfig} from './server';
import mail from './mail';
import cloudinaryConfig from './cloudinary';

const config = {...serverConfig, ...mail, ...cloudinaryConfig};

export default config;
