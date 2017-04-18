# rspec-render-docs

> render readable docs from [`rspec`](http://rspec.info) examples

[![status: works for me](https://img.shields.io/badge/status-works%20for%20me-green.svg)](https://github.com/eins78/rspec-render-docs/issues)

## how it works

1. do a `rspec --dry-run` to get test suite info as JSON
2. render HTML document from it

## usage

the package can be installed globally or locally and has different usage options depending on how it should be used (local, server, different kinds of CIs, etc.).

it comes with 3 commands to do the above steps
alone or together:
- `rspec-to-json` (wraps `rspec` to output data),
- `rspec-render-docs` (renders docs from data)
- `rspec-to-docs` (does both)

it currently requires a custom `rspec` spec formatter,
as more data is needed than in the built-in one.

`rspec` has to be instructed to use it,
which can be done using the CLI (no config changes).

examples:

```sh
# when installed globally:
rspec-to-docs spec/features > features.html

# using local package:
./node_modules/.bin/rspec-to-docs spec/features > features.html

# custom usage
bundle exec rspec --dry-run --order defined \
  --require "./node_modules/@eins78/rspec-render-docs/rspec/json_formatter_with_more_info.rb" \
  --format JsonFormatterWithMoreInfo \
  spec/features > features.json
./node_modules/.bin/rspec-to-docs features.json > features.html
# or pipe it: cat features.json | rspec-docs > features.html
```

## hacking

the UI is rendered using React.
in theory, it could be made customizable – file an issue if you have an use case.  
meanwhile, just fork it and do `npm run build` to get your own version :)

## license

MIT
