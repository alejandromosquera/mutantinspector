# mutantinspector

How to run?

    Run this command: npm run

Cloud: Google App Engine:

    URL: https://mutant-inspector.uk.r.appspot.com/

Code Coverage:

    How to run? Run: npm test
    -----------|---------|----------|---------|---------|-------------------
    File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
    -----------|---------|----------|---------|---------|-------------------
    All files  |      99 |       90 |     100 |    98.9 | 
    app.js    |   96.88 |      100 |     100 |   96.88 | 61
    db.js     |     100 |      100 |     100 |     100 | 
    module.js |     100 |    88.46 |     100 |     100 | 8,28,56
    -----------|---------|----------|---------|---------|-------------------

Selected Database:

    PostgreSQL is relational db selected.
    script.sql

About DNA Verification
    All buiness logic for this function is located on module.js
    This file contains:
        searchHorizontal: search for horizontal contiguos letters
        searchVertical: search for vertical contiguos letters
        searchDiagonal: search for diagonal (top/bottom or bottom/top) contiguos letters

