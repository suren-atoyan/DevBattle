import path from 'path';
import url from 'url';

export default meta => path.dirname(new url.URL(meta).pathname);
