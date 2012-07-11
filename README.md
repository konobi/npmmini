npmmini provide a small lightweight server to provide a shared npm registry
for serving items from an npm cache.

# Installation

    npm install npmmini

# Usage

VERY VERY ALPHA VERSION

    node server.js

This will run the server on http://127.0.0.1:3000/

To populate the npm cache run:

    npm --cache /tmp/cache_npmmini install <pkg>

You can then use the following to use the npmmini server:

    npm --registry http://127.0.0.1:3000/ install <pkg>

# Github

For git repository and issues, please see [](http://github.com/konobi/npmmini)

# License

MIT. (See LICENSE file)

# Author

Scott McWhirter - [Github profile](http://github.com/konobi)

