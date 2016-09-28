# rspec-render-docs

render readable docs from `rspec` JSON output

⚠️ working, but experimental prototype

## TODO

dist-script/publishing so that /bin script works

## usage

currently requires a custom `rspec` spec formatter,
as more data is needed than in the built-in one.

rspec has to be instructed to use it,
which can be done using the CLI (no config changes)

example:

```sh
bundle exec rspec --dry-run --order defined \
  --require "${PKG_DIR}/rspec/json_formatter_with_more_info.rb" \
  --format JsonFormatterWithMoreInfo \
  spec/features/ > features.json
rspec-docs features.json > features.html
```

when this package is installed globally, a `rspec-to-json` command
is installed as a shortcut.

```sh
# same as above
rspec-to-json spec/features/ > features.json && rspec-render-docs features.json > features.html
```


# license

MIT
